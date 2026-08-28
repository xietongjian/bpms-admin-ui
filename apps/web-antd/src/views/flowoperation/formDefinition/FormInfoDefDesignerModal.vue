<template>
  <BasicModal :destroyOnClose="true">
    <template #title>
      <div class="flex w-full items-center justify-between gap-2">
        <Space class="min-w-0">
          <span>
            编辑表单 -
            <Tooltip placement="leftBottom">
              <template #title>{{ formName }}</template>
              <TypographyText class="cursor-pointer" @click="handleCopy(formName)">{{ formName }}</TypographyText>
            </Tooltip>
            <span class="mx-1">-</span>
            <TypographyText class="cursor-pointer" type="secondary" @click="handleCopy(modelKey)">{{ modelKey }}</TypographyText>
            <span class="mx-1">- 版本：</span>
            <span>{{ version }}</span>
            <span class="mx-1">-</span>
            <Tag :color="getStatusColor(formStatus)">
              {{ getStatusName(formStatus) }}
            </Tag>
          </span>
        </Space>
        <Space class="shrink-0">
          <Popconfirm
            :title="`该表单【${formName}】版本【${version}】已经发布，修改后将影响所有该版本发起的流程表单，请确认？`"
            @confirm="handleSave"
          >
            <Button type="primary" :loading="saveLoading">保存</Button>
          </Popconfirm>
          <Button @click="modalApi.close()">关闭</Button>
        </Space>
      </div>
    </template>
    <div v-if="loaded" class="h-full">
      <MakingForm ref="makingFormRef" preview key="formDefMaking" class="h-[calc(100vh-140px)]" />
    </div>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, nextTick } from 'vue';
  import { Space, Tooltip, TypographyText, Tag, Popconfirm, Button, message } from 'ant-design-vue';
  import { useVbenModal } from '@vben/common-ui';
  import { useClipboard } from '@vueuse/core';

  import { MakingForm } from '/public/static/form-making';
  import {
    getCustomFormInfoDefByDefId,
    updateCustomFormInfoDef,
  } from '#/api/form/customForm';
  import {
    getBizFormInfoDefByDefId,
    updateBizFormInfoDef,
  } from '#/api/form/bizForm';
  import { getStatusColor, getStatusName } from './modelInfo.data';

  const props = withDefaults(
    defineProps<{
      formInfoType?: string;
    }>(),
    {
      formInfoType: 'customDef',
    },
  );

  const makingFormRef = ref<any>(null);
  const loaded = ref(false);
  const saveLoading = ref(false);
  const formInfoDefId = ref('');
  const formName = ref('');
  const modelKey = ref('');
  const version = ref('');
  const formStatus = ref(0);
  const categoryCode = ref('');

  const { copy } = useClipboard();

  const loadFormDef = async (data: Record<string, any>) => {
    loaded.value = false;
    try {
      const defId = data.id;
      formInfoDefId.value = defId;
      formName.value = data.name || '';
      modelKey.value = data.modelKey || '';
      version.value = data.version || '';
      formStatus.value = data.formStatus || 0;
      categoryCode.value = data.categoryCode || '';

      let res: any;
      if (props.formInfoType === 'customDef') {
        res = await getCustomFormInfoDefByDefId({ defId });
      } else {
        res = await getBizFormInfoDefByDefId({ defId });
      }

      await nextTick();
      if (res?.formJson) {
        let formJson = res.formJson;
        if (typeof formJson === 'string') {
          formJson = JSON.parse(formJson);
        }
        setTimeout(() => {
          makingFormRef.value?.setJSON(formJson);
          loaded.value = true;
        }, 300);
      } else {
        makingFormRef.value?.setJSON([]);
        loaded.value = true;
      }
    } catch {
      loaded.value = true;
      makingFormRef.value?.setJSON([]);
    }
  };

  const [BasicModal, modalApi] = useVbenModal<Record<string, any>>({
    fullscreen: true,
    closable: false,
    fullscreenButton: false,
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const data = modalApi.getData() || {};
        loadFormDef(data);
      }
    },
  });

  defineExpose(modalApi);

  const handleCopy = (text: string) => {
    if (text) {
      copy(text);
      message.success('复制成功');
    }
  };

  const handleSave = async () => {
    if (!makingFormRef.value) return;

    const jsonStr = makingFormRef.value.getJSON();
    const html = makingFormRef.value.getHtml();

    saveLoading.value = true;
    try {
      if (props.formInfoType === 'customDef') {
        await updateCustomFormInfoDef({
          id: formInfoDefId.value,
          content: html,
          formJson: jsonStr,
        });
      } else {
        await updateBizFormInfoDef({
          id: formInfoDefId.value,
          content: html,
          formJson: jsonStr,
        });
      }
      message.success('保存成功！');
    } catch {
      message.error('保存失败！');
    } finally {
      saveLoading.value = false;
    }
  };
</script>
