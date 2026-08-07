<script lang="ts" setup>
import { computed, defineExpose, nextTick, ref, unref } from 'vue';
import { message } from 'ant-design-vue';
import { useVbenModal } from '@vben/common-ui';
import { useVbenForm } from '#/adapter/form';
import { assignmentFormSchema } from './calendarAssign.data';
import {
  getAvailableCalendarList,
  getCalendarTypeList,
  saveCalendarYearOrg,
  updateCalendarYearOrgRemark,
} from '#/api/base/calendarManage/calendarAssign.api';
import type { VbenFormSchema } from '#/adapter/form';

const emit = defineEmits<{
  success: [void];
}>();

const isUpdate = ref(false);
const selectedType = ref<any>();
const selectedCalendar = ref<any>();
const calendarOptions = ref<any[]>([]);
const calendarTypeOptions = ref<any[]>([]);
const isSyncingCalendarYear = ref(false);
const currentOrg = ref<any>();

const yearOptions = computed(() => {
  const currentYear = new Date().getFullYear();
  return [currentYear, currentYear + 1, currentYear + 2].map((year) => ({
    label: String(year),
    value: String(year),
  }));
});

const getTitle = computed(() => (unref(isUpdate) ? '编辑分配备注' : '分配日历'));

const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  title: getTitle.value,
  onCancel() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (!isOpen) return;
    initModal();
  },
  onConfirm() {
    handleSubmit();
  },
});

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {},
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: assignmentFormSchema,
  wrapperClass: 'grid-cols-1',
});

async function initModal() {
  const data = modalApi.getData<Record<string, any>>();
  if (!data) return;

  await formApi.resetForm();
  modalApi.setState({ confirmLoading: false });
  isUpdate.value = !!data?.isUpdate;
  currentOrg.value = data?.currentOrg || {};
  selectedType.value = undefined;
  selectedCalendar.value = undefined;
  calendarOptions.value = [];

  await bindDynamicProps();
  await loadTypeOptions();

  if (unref(isUpdate)) {
    selectedType.value = findCalendarTypeByCode(data.record?.typeCode);
    selectedCalendar.value = data.record;
    await formApi.setValues({
      ...data.record,
      orgId: data.record?.orgId,
      orgName: data.record?.orgName,
      yearId: data.record?.yearId,
      yearName: data.record?.yearName,
      year: String(data.record?.year || ''),
      typeCode: data.record?.typeCode,
    });
    await loadCalendarOptions();
    modalApi.setState({ title: '编辑分配备注' });
    return;
  }

  const defaultYear = String(new Date().getFullYear());
  await formApi.setValues({
    orgId: unref(currentOrg)?.id,
    orgName: unref(currentOrg)?.name || unref(currentOrg)?.title,
    year: defaultYear,
  });

  if (calendarTypeOptions.value.length) {
    selectedType.value = calendarTypeOptions.value[0].raw;
    await formApi.setValues({ typeCode: calendarTypeOptions.value[0].value });
    await loadCalendarOptions();
  }
  modalApi.setState({ title: '分配日历' });
}

function updateSchemaSync(schema: VbenFormSchema[]) {
  // In vben5, updateSchema might be different
  // The form updates its schema through the formApi
}

async function bindDynamicProps() {
  // In vben5, we handle dynamic options differently
  // The year options are fixed from computed
}

async function loadTypeOptions() {
  const list = (await getCalendarTypeList()) || [];
  calendarTypeOptions.value = list.map((item: any) => ({
    label: item.name,
    value: item.type || item.code,
    raw: item,
  }));
}

function findCalendarTypeByCode(typeCode?: string) {
  return unref(calendarTypeOptions).find((item: any) => item.value === typeCode)?.raw;
}

async function loadCalendarOptions(keyword = '') {
  const values = await formApi.getValues();
  const typeCode = selectedType.value?.type || values.typeCode;
  if (!typeCode) {
    calendarOptions.value = [];
    return;
  }
  const res = await getAvailableCalendarList({
    year: values.year,
    typeCode,
    keyword,
  });
  const list = Array.isArray(res) ? res : res?.rows || [];
  calendarOptions.value = list;
}

function getYearIdOptions() {
  return calendarOptions.value.map((item: any) => ({
    label: `${item.name || item.yearName || '-'}（${item.year || '-'}）`,
    value: item.id,
    raw: item,
  }));
}

async function handleSubmit() {
  try {
    const { valid, values } = await formApi.validate();
    if (!valid) return;
    modalApi.setState({ confirmLoading: true });

    if (unref(isUpdate)) {
      await updateCalendarYearOrgRemark({
        yearId: values.yearId,
        year: values.year,
        yearName: values.yearName,
        orgId: values.orgId,
        orgName: values.orgName,
        remark: values.remark,
      });
    } else {
      const calendar = selectedCalendar.value;
      await saveCalendarYearOrg({
        yearId: values.yearId,
        year: calendar?.year || values.year,
        yearName: calendar?.name || calendar?.yearName,
        orgId: values.orgId,
        orgName: values.orgName,
        remark: values.remark,
      });
    }

    modalApi.close();
    emit('success');
    message.success('保存成功');
  } catch (e: any) {
    message.error(e?.message || '保存失败');
  } finally {
    modalApi.setState({ confirmLoading: false });
  }
}

defineExpose(modalApi);
</script>
<template>
  <BasicModal class="w-[600px]" :title="getTitle">
    <BasicForm>
      <template #typeCode="{ fieldSchema, model }">
        <a-radio-group
          v-model:value="model.typeCode"
          :disabled="isUpdate"
          :options="calendarTypeOptions"
          @change="(e: any) => { selectedType = findCalendarTypeByCode(e.target.value); selectedCalendar = undefined; model.yearId = undefined; loadCalendarOptions(); }"
        />
      </template>
      <template #year="{ fieldSchema, model }">
        <a-radio-group
          v-model:value="model.year"
          :disabled="isUpdate"
          :options="yearOptions"
          @change="() => { selectedCalendar = undefined; model.yearId = undefined; loadCalendarOptions(); }"
        />
      </template>
      <template #yearId="{ fieldSchema, model }">
        <a-select
          v-model:value="model.yearId"
          :disabled="isUpdate"
          show-search
          :filter-option="false"
          placeholder="请选择可分配日历"
          :options="getYearIdOptions()"
          @search="loadCalendarOptions"
          @change="(val: string, option: any) => { const cal = option?.raw || calendarOptions.find((item: any) => item.id === val); selectedCalendar = cal; if (cal?.year && model.year !== String(cal.year)) { model.year = String(cal.year); } }"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
