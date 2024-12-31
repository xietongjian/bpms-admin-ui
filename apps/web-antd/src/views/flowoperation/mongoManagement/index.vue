<script setup lang="ts">
  /**
   * @desc MongoManagement
   * @author DragonTeam <https://www.bpmport.com>
   * @since 2024/9/28 18:33
   */

  import { DatePicker, Modal } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import { CollapseContainer } from '@/components/Container';
  import { createVNode, ref } from 'vue';
  import {
    syncAll,
    syncFlowCommentInfo,
    syncFlowExtendHisprocinst,
    syncHiActInst,
    syncHiIdEntityLink,
    syncHiProcInst,
    syncHiTaskInst,
    syncHiVarInst,
    clearHiProcInst,
    clearHiTaskInst,
    clearHiActInst,
    clearHiVarInst,
    clearFlowCommentInfo,
    clearFlowExtendHisprocinst,
    clearHiIdEntityLink,
  } from '@/api/flowoperation/MongoManagement';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { mongoJobColumns } from '@/views/flowoperation/mongoManagement/mongoManagement.data';

  defineOptions({ name: 'MongoManagement' });

  type CollapseItem = {
    label: string;
    value: number;
    syncLoading: boolean;
    clearLoading: boolean;
    startTime?: string;
    endTime?: string;
  };

  const startTime = ref<string>();
  const endTime = ref<string>();
  const onAllSync = ref(false);
  const collapseList = ref<CollapseItem[]>([
    { label: '流程实例', value: 2, syncLoading: false, clearLoading: false },
    { label: '任务实例', value: 3, syncLoading: false, clearLoading: false },
    { label: '节点实例', value: 4, syncLoading: false, clearLoading: false },
    { label: '变量实例', value: 5, syncLoading: false, clearLoading: false },
    { label: '审批意见实例', value: 6, syncLoading: false, clearLoading: false },
    { label: '流程实例扩展信息', value: 7, syncLoading: false, clearLoading: false },
    { label: '审批关联信息', value: 8, syncLoading: false, clearLoading: false },
  ]);

  async function processSync(record: CollapseItem) {
    const startTime = record.startTime;
    const endTime = record.endTime;
    if (endTime && !startTime) {
      return;
    }
    try {
      if (record.value === 1) {
        onAllSync.value = true;
        return await syncAll([startTime, endTime]);
      }

      record.syncLoading = true;
      if (record.value === 2) {
        return await syncHiProcInst([startTime, endTime]);
      }
      if (record.value === 3) {
        return await syncHiTaskInst([startTime, endTime]);
      }
      if (record.value === 4) {
        return await syncHiActInst([startTime, endTime]);
      }
      if (record.value === 5) {
        return await syncHiVarInst([startTime, endTime]);
      }
      if (record.value === 6) {
        return await syncFlowCommentInfo([startTime, endTime]);
      }
      if (record.value === 7) {
        return await syncFlowExtendHisprocinst([startTime, endTime]);
      }
      if (record.value === 8) {
        return await syncHiIdEntityLink([startTime, endTime]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      onAllSync.value = false;
      record.syncLoading = false;
    }
  }

  async function processClear(record: CollapseItem) {
    const startTime = record.startTime;
    const endTime = record.endTime;
    if (endTime && !startTime) {
      return;
    }
    try {
      record.clearLoading = true;
      if (record.value === 2) {
        return await clearHiProcInst([startTime, endTime]);
      }
      if (record.value === 3) {
        return await clearHiTaskInst([startTime, endTime]);
      }
      if (record.value === 4) {
        return await clearHiActInst([startTime, endTime]);
      }
      if (record.value === 5) {
        return await clearHiVarInst([startTime, endTime]);
      }
      if (record.value === 6) {
        return await clearFlowCommentInfo([startTime, endTime]);
      }
      if (record.value === 7) {
        return await clearFlowExtendHisprocinst([startTime, endTime]);
      }
      if (record.value === 8) {
        return await clearHiIdEntityLink([startTime, endTime]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      record.clearLoading = false;
    }
  }

  function startSyncAll() {
    if (endTime.value && !startTime.value) {
      return Modal.warning({
        icon: createVNode(ExclamationCircleOutlined),
        okText: '确定',
        content: `填写截止时间时开始时间不能为空！`,
      });
    }
    Modal.confirm({
      icon: createVNode(ExclamationCircleOutlined),
      okText: '确定',
      cancelText: '取消',
      okButtonProps: { danger: true },
      content: `确定要执行同步吗？`,
      onOk: () =>
        processSync({ endTime: endTime.value, startTime: startTime.value, value: 1 } as any),
    });
  }

  function startSync(record: CollapseItem) {
    if (record.endTime && !record.startTime) {
      return Modal.warning({
        icon: createVNode(ExclamationCircleOutlined),
        okText: '确定',
        content: `填写截止时间时开始时间不能为空！`,
      });
    }
    Modal.confirm({
      icon: createVNode(ExclamationCircleOutlined),
      okText: '确定',
      cancelText: '取消',
      okButtonProps: { danger: true },
      content: `确定要执行同步吗？`,
      onOk: () => processSync(record),
    });
  }

  function startClear(record: CollapseItem) {
    if (record.endTime && !record.startTime) {
      return Modal.warning({
        icon: createVNode(ExclamationCircleOutlined),
        okText: '确定',
        content: `填写截止时间时开始时间不能为空！`,
      });
    }
    Modal.confirm({
      icon: createVNode(ExclamationCircleOutlined),
      okText: '确定',
      cancelText: '取消',
      okButtonProps: { danger: true },
      content: `确定要执行清理吗？`,
      onOk: () => processClear(record),
    });
  }

  const [registerMongoJobTable] = useTable({
    size: 'small',
    api: async () => collapseList.value,
    columns: mongoJobColumns,
    useSearchForm: false,
    pagination: false,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      title: '操作',
      align: 'left',
      dataIndex: 'action',
    },
  });
</script>

<template>
  <PageWrapper title="历史数据管理" contentFullHeight>
    <CollapseContainer title="全量数据同步">
      <div class="pt-2 pb-2 flex justify-start items-center">
        <span class="ml-2">起止时间：</span>
        <DatePicker v-model:value="startTime" show-time />
        <DatePicker class="ml-2" v-model:value="endTime" show-time />
        <a-button class="ml-2" type="primary" :loading="onAllSync" @click="startSyncAll">{{
          onAllSync ? '同步中' : '开始同步'
        }}</a-button>
      </div>
    </CollapseContainer>

    <BasicTable class="mt-2" @register="registerMongoJobTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'startTime'">
          <DatePicker v-model:value="record.startTime" show-time />
        </template>
        <template v-if="column.key === 'endTime'">
          <DatePicker v-model:value="record.endTime" show-time />
        </template>
        <template v-if="column.key === 'action'">
          <a-button type="link" :loading="record.syncLoading" @click="startSync(record)">{{
            record.syncLoading ? '同步中' : '开始同步'
          }}</a-button>
          <a-button
            class="ml-2"
            type="link"
            danger
            :loading="record.clearLoading"
            @click="startClear(record)"
            >{{ record.clearLoading ? '清理中' : '开始清理' }}</a-button
          >
        </template>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
