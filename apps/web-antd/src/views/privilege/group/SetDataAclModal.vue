<template>
  <BasicModal>
    <div class="data-acl-wrapper">
      <div class="selected-list">
        <div class="selected-item">
          <span class="label">应用：</span>
          <div class="content">
            <Tag v-for="item in struct.app" :key="item.sn" color="orange" :closable="true" @close="handleSelectorRemove(item, 'app')">{{ item.name }}</Tag>
          </div>
        </div>
        <div class="selected-item">
          <span class="label">组织树：</span>
          <div class="content">
            <Tag v-for="item in struct.dept" :key="item.id" :color="item.sourceType == 1 ? 'purple' : 'cyan'" :closable="true" @close="handleSelectorRemove(item, 'dept')">{{ item.name }}</Tag>
          </div>
        </div>
        <div class="selected-item">
          <span class="label">人员：</span>
          <div class="content">
            <Tag v-for="item in struct.user" :key="item.id" color="blue" :closable="true" @close="handleSelectorRemove(item, 'user')">{{ item.name }}</Tag>
          </div>
        </div>
        <div class="selected-item">
          <span class="label">报表：</span>
          <div class="content">
            <Tag v-for="item in struct.dataReport" :key="item.id" color="green" :closable="true" @close="handleSelectorRemove(item, 'dataReport')">{{ item.name }}</Tag>
          </div>
        </div>
      </div>
      <Segmented v-model:value="dataAclType" :options="dataAclTypeOptions" />
      <div class="data-acl-list">
        <AppSelector v-if="dataAclType === 'app'" :selected-keys="selectedAppKeys" @change="(_keys: any, rows: any) => handleSelectorChange('app', rows)" />
        <DeptSelector v-if="dataAclType === 'dept'" :selected-keys="selectedDeptKeys" @change="(_keys: any, rows: any) => handleSelectorChange('dept', rows)" />
        <PersonalSelector v-if="dataAclType === 'user'" :selected-keys="selectedUserKeys" @change="(_keys: any, rows: any) => handleSelectorChange('user', rows)" />
        <DataReportSelector v-if="dataAclType === 'dataReport'" :selected-keys="selectedDataReportKeys" @change="(_keys: any, rows: any) => handleSelectorChange('dataReport', rows)" />
      </div>
    </div>
  </BasicModal>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { saveDataAcl, getDataAclByGroupId } from '#/api/privilege/dataAcl';
import { useVbenModal } from '@vben/common-ui';
import { Segmented, Tag, message } from 'ant-design-vue';
import AppSelector from './components/AppSelector.vue';
import DeptSelector from './components/DeptSelector.vue';
import PersonalSelector from './components/PersonalSelector.vue';
import DataReportSelector from './components/DataReportSelector.vue';

const emit = defineEmits(['success']);

const record = ref<any>({});
const dataAclType = ref('app');
const dataAclTypeOptions = [
  { label: '应用', value: 'app' },
  { label: '组织树', value: 'dept' },
  { label: '人员', value: 'user' },
  { label: '报表', value: 'dataReport' },
];
const struct: any = reactive({
  app: [],
  company: [],
  dept: [],
  user: [],
  dataReport: [],
});

const [BasicModal, modalApi] = useVbenModal({
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const data = modalApi.getData<Record<string, any>>() || {};
      record.value = data;
      dataAclType.value = 'app';
      getDataAclByGroupId({ groupId: record.value.id }).then((res: any) => {
        const companies = (res.companies || []).map((item: any) => ({
          id: item.id,
          name: item.name,
          sourceType: '1',
        }));
        const depts = (res.depts || []).map((item: any) => ({
          id: item.id,
          name: item.name,
        }));
        struct.app = (res.apps || []).map((item: any) => ({
          sn: item.id,
          name: item.name,
        }));
        struct.dept = [...companies, ...depts];
        struct.user = (res.users || []).map((item: any) => ({
          code: item.id,
          name: item.name,
        }));
        struct.dataReport = (res.dataReports || []).map((item: any) => ({
          id: item.id,
          name: item.name,
        }));
      });
    }
  },
  onConfirm() {
    handleSubmit();
  },
});

const selectedAppKeys = computed(() => struct.app.map((item: any) => item.sn));
const selectedDeptKeys = computed(() => struct.dept.map((item: any) => item.id));
const selectedUserKeys = computed(() => struct.user.map((item: any) => item.code));
const selectedDataReportKeys = computed(() => struct.dataReport.map((item: any) => item.id));

function handleSelectorChange(type: string, rows: any) {
  struct[type] = rows;
}

function handleSelectorRemove(item: any, type: string) {
  struct[type].splice(struct[type].indexOf(item), 1);
}

function handleSubmit() {
  const { app, dept, user, dataReport } = struct;
  const params: any[] = [];
  app.forEach((item: any) => {
    params.push({
      groupId: record.value.id,
      groupName: record.value.name,
      groupSn: record.value.sn,
      dataType: 'app',
      dataId: item.sn,
      dataName: item.name,
    });
  });
  dept.forEach((item: any) => {
    params.push({
      groupId: record.value.id,
      groupName: record.value.name,
      groupSn: record.value.sn,
      dataType: item.sourceType == 1 ? 'company' : 'dept',
      dataId: item.id,
      dataName: item.name,
    });
  });
  user.forEach((item: any) => {
    params.push({
      groupId: record.value.id,
      groupName: record.value.name,
      groupSn: record.value.sn,
      dataType: 'user',
      dataId: item.code,
      dataName: item.name,
    });
  });
  dataReport.forEach((item: any) => {
    params.push({
      groupId: record.value.id,
      groupName: record.value.name,
      groupSn: record.value.sn,
      dataType: 'dataReport',
      dataId: item.id,
      dataName: item.name,
    });
  });
  modalApi.setState({ loading: true, confirmLoading: true });
  saveDataAcl(params)
    .then(() => {
      message.success('保存成功');
      emit('success');
      modalApi.close();
    })
    .finally(() => {
      modalApi.setState({ loading: false, confirmLoading: false });
    });
}

defineExpose(modalApi);
</script>

<style lang="scss" scoped>
.data-acl-wrapper {
  .selected-list {
    margin-bottom: 12px;
    border: 1px solid var(--color-border-2);
    border-radius: 4px;
    padding: 5px 12px 2px;
    max-height: 140px;
    overflow-y: auto;

    .selected-item {
      display: flex;
      margin: 5px;

      .label {
        width: 70px;
        color: var(--color-text-3);
        font-size: 13px;
        text-align: right;
      }

      .content {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        min-height: 25px;
      }

      :deep(.ant-tag) {
        margin-bottom: 3px;
      }
    }

    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 3px;
    }
  }

  .data-acl-list {
    margin-top: 12px;
  }
}
</style>
