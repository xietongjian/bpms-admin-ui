<script lang="ts" setup>
import { ref, watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { useVbenVxeGrid, type VxeGridProps } from '#/adapter/vxe-table';

import { addGroupUsers, getUserGroupByGroupIdAndUserIdList } from '#/api/privilege/group';
import { getAccountPageList } from '#/api/privilege/account';
import OrgTree from '#/views/components/leftTree/OrgTree.vue';

const emit = defineEmits(['success']);

const loading = ref(false);
const groupId = ref('');
const selectNodes = ref<(string | number)[]>([]);
const currentNode = ref<Record<string, any>>({});
const selectRows = ref<any[]>([]);
const addedUserIds = ref<string[]>([]);

function handleCheckboxChange({ records }: { records: any[] }) {
  selectRows.value = [...records];
}

function handleSelect(_keys: (string | number)[], node: any) {
  currentNode.value = node;
  selectNodes.value = _keys;
  tableApi.query();
}

const [BasicModal, modalApi] = useVbenModal({
  title: '添加人员',
  class: 'w-[800px]',
  onOpenChange: async (isOpen: boolean) => {
    if (isOpen) {
      const data = modalApi.getData<Record<string, any>>() || {};
      groupId.value = data.groupId || '';
      selectNodes.value = [];
      currentNode.value = {};
      selectRows.value = [];
      addedUserIds.value = [];

      if (groupId.value) {
        try {
          const res = await getUserGroupByGroupIdAndUserIdList({
            groupId: groupId.value,
            userIdList: [],
          });
          addedUserIds.value = (res || []).map((item: any) => item.userId);
        } catch {
          // ignore
        }
      }
      setTimeout(() => {
        tableApi.query();
      }, 100);
    }
  },
  onConfirm: handleSubmit,
  confirmLoading: loading,
});

function handleSubmit() {
  if (selectRows.value.length === 0) {
    return;
  }
  loading.value = true;
  const users = selectRows.value.map((item: any) => ({
    userId: item.id,
    username: item.username,
  }));
  addGroupUsers({ groupId: groupId.value, users })
    .then(() => {
      emit('success');
      modalApi.close();
    })
    .catch(() => {})
    .finally(() => {
      loading.value = false;
    });
}

const gridOptions: VxeGridProps<any> = {
  columns: [
    { type: 'checkbox', width: 50 },
    { title: '账号', field: 'username', minWidth: 120 },
    { title: '姓名', field: 'nickname', minWidth: 120 },
    { title: '邮箱', field: 'email', minWidth: 150 },
    { title: '电话', field: 'tel', minWidth: 120 },
    { title: '手机', field: 'mobile', minWidth: 120 },
    { title: '组织', field: 'orgName', minWidth: 150 },
  ],
  border: true,
  showOverflow: true,
  height: 400,
  rowConfig: { keyField: 'id', isHover: true },
  checkboxConfig: {
    highlight: true,
    labelField: 'nickname',
    checkMethod: ({ row }: { row: any }) =>
      !addedUserIds.value.includes(row.id),
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }: any) => {
        const params: any = {
          pageNum: page.currentPage,
          pageSize: page.pageSize,
        };
        const node = currentNode.value;
        if (node?.type === 'company') {
          params.companyId = node.id;
        } else if (node?.type === 'department') {
          params.departmentId = node.id;
        }
        try {
          const res = await getAccountPageList(params);
          const list = (res?.records || []).filter((item: any) => item.id !== '1');
          return {
            page: { total: res?.total ?? list.length },
            result: list,
          };
        } catch {
          return { page: { total: 0 }, result: [] };
        }
      },
    },
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({ gridOptions });

watch(
  () => selectRows.value.length,
  (len) => {
    modalApi.setState({ confirmDisabled: len === 0 });
  },
  { immediate: true },
);

defineExpose(modalApi);
</script>
<template>
  <BasicModal>
    <div class="set-account-wrapper">
      <div class="set-account-left">
        <div class="set-account-title">组织架构</div>
        <OrgTree :checkable="false" :selectNodes="selectNodes" @select="handleSelect" />
      </div>
      <div class="set-account-right">
        <div class="set-account-title">人员信息</div>
        <BasicTable @checkbox-change="handleCheckboxChange" @checkbox-all="handleCheckboxChange" />
      </div>
    </div>
  </BasicModal>
</template>
<style scoped>
.set-account-wrapper {
  display: flex;
  height: 500px;
}
.set-account-left {
  width: 220px;
  flex-shrink: 0;
  border-right: 1px solid #e8e8e8;
  overflow: auto;
  padding: 0 8px 8px;
}
.set-account-right {
  flex: 1;
  overflow: hidden;
  padding: 0 8px 8px;
  display: flex;
  flex-direction: column;
}
.set-account-title {
  font-weight: 600;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 8px;
}
</style>
