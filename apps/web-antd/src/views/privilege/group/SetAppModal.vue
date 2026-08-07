<template>
  <BasicModal>
    <div class="app-list">
      <Checkbox
        v-for="item in appList"
        :key="item.id"
        v-model:checked="item.checked"
        @change="handleChange"
      >
        <IconifyIcon :icon="item.image || 'ant-design:appstore-outlined'" class="size-5" height="20" width="20" />
        <span class="pl-0.5">{{ item.name }}</span>
      </Checkbox>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useVbenModal } from '@vben/common-ui';
import { Checkbox } from 'ant-design-vue';
import { getApps, addGroupApps } from '#/api/privilege/groupApp';
import { message } from 'ant-design-vue';
import { IconifyIcon } from '@vben/icons';

const appList = ref<any[]>([]);
const record = ref<any>({});

const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  showConfirmButton: false,
  cancelText: '关闭',
  onCancel() {
    modalApi.close();
  },
  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = modalApi.getData<Record<string, any>>();
      if (values) {
        record.value = values;
        const checkedAppSns = (values.groupApps || [])?.map((item: any) => item.appSn);
        const res = await getApps();
        appList.value = (res || []).map((item: any) => ({
          ...item,
          checked: checkedAppSns.includes(item.sn),
        }));
      }
    }
  },
});

function handleChange() {
  const checkedApps = appList.value.filter((item: any) => item.checked);
  addGroupApps({
    groupId: record.value.id,
    appSns: checkedApps.map((item: any) => item.sn),
  }).then(() => {
    message.success('保存成功');
  });
}

defineExpose(modalApi);
</script>
<style scoped>
.app-list {
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
