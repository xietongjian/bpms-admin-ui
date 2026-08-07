<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue';
import { Page, useVbenForm, useVbenModal } from '@vben/common-ui';
import { Card, Tag, Button, Input, InputNumber, message, Popconfirm, Collapse } from 'ant-design-vue';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { getActivityMarkerList, saveActivityMarker, deleteActivityMarker, updateActivityMarkerSort } from '#/api/flowsetting/extend';

const activityMarkerList = ref<any[]>([]);

const [MarkerForm, markerFormApi] = useVbenForm({
  commonConfig: { labelWidth: 100 },
  schema: [
    { component: 'Input', fieldName: 'id', componentProps: { hidden: true } },
    { component: 'Input', fieldName: 'markerName', label: '标签名称', rules: 'required' },
    { component: 'Input', fieldName: 'markerColor', label: '颜色', componentProps: { placeholder: '如 #ff0000' } },
    { component: 'InputNumber', fieldName: 'status', label: '状态', defaultValue: 1, componentProps: { min: 0, max: 1, style: { width: '100%' } } },
  ],
});

const [MarkerModal, markerModalApi] = useVbenModal({
  showCancelButton: false, showConfirmButton: true, confirmText: '确定',
  onOpenChange: async (isOpen) => {
    if (isOpen) {
      const data = markerModalApi.getData<{ record: any }>();
      await markerFormApi.resetForm();
      if (data?.record) markerFormApi.setValues(data.record);
    }
  },
  onConfirm: async () => {
    const { valid } = await markerFormApi.validate();
    if (!valid) return;
    const values = markerFormApi.getValues();
    markerModalApi.setState({ confirmLoading: true });
    try {
      await saveActivityMarker(values);
      message.success('保存成功');
      markerModalApi.close();
      await fetchMarkers();
    } catch { } finally { markerModalApi.setState({ confirmLoading: false }); }
  },
});

async function fetchMarkers() {
  try { activityMarkerList.value = await getActivityMarkerList(); }
  catch { activityMarkerList.value = []; }
}

function handleAddActivityMarker() {
  markerModalApi.setData({ record: null });
  markerModalApi.open();
}

function handleEditActivityMarker(item: any) {
  markerModalApi.setData({ record: item });
  markerModalApi.open();
}

async function handleDeleteActivityMarker(item: any) {
  await deleteActivityMarker({ id: item.id });
  message.success('删除成功');
  await fetchMarkers();
}

onMounted(() => { fetchMarkers(); });
</script>

<template>
  <Page>
    <div class="p-4">
      <Collapse>
        <Collapse.Panel key="1" header="任务节点标签配置">
          <div class="flex flex-wrap gap-3 p-4">
            <div v-for="item in activityMarkerList" :key="item.id"
                 class="group relative h-10 border border-gray-300 rounded-md flex items-center justify-center px-6 cursor-pointer hover:border-blue-400">
              <span :style="{ color: item.markerColor }">
                {{ item.markerName }}
              </span>
              <div class="absolute -top-4 -right-2 gap-x-1 hidden group-hover:flex">
                <span class="cursor-pointer block p-1 text-blue-500" @click="handleEditActivityMarker(item)"><EditOutlined /></span>
                <Popconfirm title="确定要删除吗？" @confirm="handleDeleteActivityMarker(item)">
                  <span class="cursor-pointer block p-1 text-red-500"><DeleteOutlined /></span>
                </Popconfirm>
              </div>
            </div>
            <div class="h-10 border border-dotted border-gray-300 rounded-md flex items-center justify-center px-6 cursor-pointer hover:border-blue-500 hover:text-blue-500"
                 @click="handleAddActivityMarker">
              <PlusOutlined class="mr-2 text-gray-400" />
              <span class="text-gray-500">新增标记</span>
            </div>
          </div>
        </Collapse.Panel>

        <Collapse.Panel key="2" header="流程编号生成规则配置">
          <div class="p-4">
            <Input placeholder="流程编号生成规则表达式，如：PROCESS-{yyyyMMdd}-{seq}" style="max-width: 600px" />
          </div>
        </Collapse.Panel>
      </Collapse>
    </div>
    <MarkerModal><MarkerForm /></MarkerModal>
  </Page>
</template>
