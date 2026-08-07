<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Page } from '@vben/common-ui';
import { useVbenForm } from '@vben/common-ui';
import { message, Card, Button, Upload } from 'ant-design-vue';
import type { VbenFormProps } from '@vben/common-ui';
import { getNoticeById, insertNotice, updateNotice } from '#/api/portal/cms/notice';

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const noticeId = ref<number | null>(null);
const isUpdate = ref(false);

const [Form, formApi] = useVbenForm({
  commonConfig: { labelWidth: 100 },
  actionWrapperClass: 'ml-[100px]',
  schema: [
    { component: 'Input', fieldName: 'id', componentProps: { hidden: true } },
    { component: 'Input', fieldName: 'noticeNo', label: '公告编号', componentProps: { disabled: true } },
    { component: 'Input', fieldName: 'title', label: '标题', rules: 'required', componentProps: { placeholder: '请输入公告标题' } },
    {
      component: 'Select', fieldName: 'categoryId', label: '分类', rules: 'required',
      componentProps: {
        placeholder: '请选择分类',
        options: async () => {
          const { getAllNoticeCategory } = await import('#/api/portal/cms/noticeCategory');
          const categories = await getAllNoticeCategory({});
          return (categories || []).map((item: any) => ({ label: item.name, value: item.id }));
        },
      },
    },
    {
      component: 'Input', fieldName: 'source', label: '来源',
      componentProps: { placeholder: '请输入来源' },
    },
    {
      component: 'Input', fieldName: 'publisher', label: '发布人',
      componentProps: { placeholder: '请输入发布人' },
    },
    { component: 'Input', fieldName: 'remark', label: '备注', componentProps: { placeholder: '请输入备注' } },
  ],
});

async function loadData() {
  const id = route.query.id;
  if (!id) return;
  noticeId.value = Number(id);
  isUpdate.value = true;
  loading.value = true;
  try {
    const detail = await getNoticeById({ id: noticeId.value });
    formApi.setValues(detail || {});
  } finally { loading.value = false; }
}

async function handleSubmit() {
  const { valid } = await formApi.validate();
  if (!valid) return;
  const values = formApi.getValues();
  try {
    const { success, msg } = isUpdate.value ? await updateNotice(values) : await insertNotice(values);
    if (success) { message.success(msg || '保存成功'); router.back(); }
    else message.error(msg || '保存失败');
  } catch (e) { console.error(e); }
}

onMounted(() => { loadData(); });
</script>

<template>
  <Page>
    <Card :title="isUpdate ? '编辑公告' : '新增公告'" :loading="loading">
      <Form />
      <div class="flex gap-2 mt-4 ml-[100px]">
        <Button type="primary" @click="handleSubmit">保存</Button>
        <Button @click="router.back()">返回</Button>
      </div>
    </Card>
  </Page>
</template>
