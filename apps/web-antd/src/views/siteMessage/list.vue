<template>
  <div >
    <BasicTable @register="registerNoticeTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'fromAssigneeName'">
          <EmpInfo :no="record.fromAssignee" :name="record.fromAssigneeName" />
        </template>
        <template v-if="column.key === 'title'">
          <a @click="handleNoticeClick(record)" href="javascript: void(0);">
            <Tooltip v-if="record.status === '0'">
              <template #title>
                未读
              </template>
              <Badge color="#f50"/>
            </Tooltip>
            <TypographyText :type="record.status === '1'?'secondary':'default'">{{ record.title }}</TypographyText>
          </a>
        </template>
      </template>
    </BasicTable>
    <ProcessFormModal
        ref="processFormModalRef"
      @register="registerProcessFormModal"
      @visible-change="handleProcessFormVisibleChange"
    />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';

  import type {VxeGridProps} from '#/adapter/vxe-table';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {Recordable} from '@vben/types';

  import {Page} from '@vben/common-ui';

  import {Badge, Breadcrumb, Tooltip, TypographyText} from 'ant-design-vue';
  import {messageTableSchema, searchFormSchema} from "./data";
  import {pagerModelOnSiteMessage, updateOnSiteMessageStatus} from "#/api/process/siteMessage";
  import {EmpInfo} from '#/views/components/EmpInfo';
  // import {useGo} from '@/hooks/web/usePage';
  import ProcessFormModal from '#/views/flowoperation/processTask/ProcessFormModal.vue';
  import {columns} from "#/views/privilege/account/account.data";
  import {getAccountPageList} from "#/api/privilege/account";
  import {useVbenVxeGrid} from "#/adapter/vxe-table";
  // import {useModal} from "@/components/Modal";

  // const [
  //   registerProcessFormModal,
  //   { openModal: openProcessFormModal, setModalProps: setProcessFormModalProps },
  // ] = useModal();

  const processFormModalRef = ref();

  const BreadcrumbItem = Breadcrumb.Item;
  // const go = useGo();

/*  const [registerNoticeTable, {getForm, setLoading, reload}] = useTable({
    api: pagerModelOnSiteMessage,
    title: '',
    columns: messageTableSchema,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
    },
    canColDrag: true,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: true,
    canResize: true,
  });*/


  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 60,
    },
    actionWrapperClass: 'col-span-2 col-start-2 text-left ml-4',
    resetButtonOptions: {
      show: false,
    },
    schema: searchFormSchema,
    wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  const gridOptions: VxeGridProps<any> = {
    checkboxConfig: {
      highlight: true,
      labelField: 'name',
    },
    columns: messageTableSchema,
    columnConfig: {resizable: true},
    height: 'auto',
    keepSource: true,
    border: false,
    stripe: true,
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          return await pagerModelOnSiteMessage({
            query: {
              pageNum: page.currentPage,
              pageSize: page.pageSize,
            },
            entity: formValues || {},
          }).then(res => {
            return Promise.resolve(res);
          });
        },
      },
    },
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

  function handleProcessFormVisibleChange(visible) {
    if (!visible) {
      setTimeout(() => {
        reload();
      }, 200);
    }
  }
  onMounted(() => {
    const {updateSchema} = getForm();
    updateSchema([
      {
        field: 'status',
        componentProps: {
          onChange: function (e) {
            reload({searchInfo: {status: e.target.value}});
          }
        }
      }
    ]);
  });

  async function handleNoticeClick(record) {
    setLoading(true);
    if(record.status === '0'){
      // 如果是未读才执行设置为已读的动作
      await updateOnSiteMessageStatus({id: record.id});
      setTimeout(() => {
        reload();
      }, 200);
    }
    // procInstId, bizId, taskId, modelKey
    const modelKey = record.processDefinitionId ? record.processDefinitionId.split(':')[0]:'';
    handleViewForm({
      ...record,
      bizId: record.businessKey,
      procInstId: record.processInstanceId,
      modelKey: modelKey,
      processDefinitionKey: modelKey,
      formName: record.title,
    });
    setLoading(false);
  }

  function handleViewForm(record: Recordable) {
    processFormModalRef.value.open();
    /*openProcessFormModal(true, {
      record,
    });
    setProcessFormModalProps({
      title: `查看流程【${record.formName}】的表单`,
      showOkBtn: false,
      centered: true,
      cancelText: '关闭',
      maskClosable: false,
    });*/
  }
</script>
