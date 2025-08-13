<template>
  <Page auto-content-height>
    <BasicTable >
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleCreate"> 新增 </Button>
      </template>
      <template #action="{row}">
        <TableAction
            :actions="createActions(row)"
        />
      </template>

      <!--      <template #titleRender="{ record }">
        <Popover placement="right">
          <template #content>
            <div class="title-svg-render">
              <p v-html="record.titleSvg"></p>
            </div>
          </template>
          {{record.title}}
        </Popover>
      </template>
      <template #createdByRender="{ record }">
        <EmpInfo :no="record.createdByNo" :name="record.createdBy" />
      </template>
      <template #updatedByRender="{ record }">
        <EmpInfo :no="record.updatedByNo" :name="record.updatedBy" />
      </template>-->
    </BasicTable>
    <NoticeTitleModal ref="noticeTitleModalRef" @success="handleSuccess" />
  </Page>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps} from '#/adapter/vxe-table';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {TableAction} from '#/components/table-action';
  import { Popover, Button, message } from 'ant-design-vue';
  import { columns, searchFormSchema } from './noticeTitle.data';
  import NoticeTitleModal from './NoticeTitleModal.vue';
  import { getNoticeTitleListByPage, deleteByIds } from '#/api/portal/cms/noticeTitle';
  import { EmpInfo } from '#/views/components/EmpInfo';
  import { PerEnum } from '#/enums/perEnum';
  import {Page} from '@vben/common-ui';

  const PerPrefix = 'NoticeTitle:';
  const noticeTitleModalRef = ref();

  const formOptions: VbenFormProps = {
    showCollapseButton: false,
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 60,
    },
    wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    actionWrapperClass: 'pl-2 !justify-end md:!justify-start',
    actionPosition: 'left',
    actionLayout: 'inline',
    resetButtonOptions: {
      show: false,
    },
    schema: searchFormSchema,
  };

  const gridOptions: VxeGridProps = {
    checkboxConfig: {
      highlight: true,
      labelField: 'name',
    },
    columns,
    columnConfig: {resizable: true},
    height: 'auto',
    keepSource: true,
    border: false,
    stripe: true,
    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          return await getNoticeTitleListByPage({
            query: {
              pageNum: page.currentPage,
              pageSize: page.pageSize,
            },
            entity: formValues || {},
          });
        },
      },
    },
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

  function createActions(record: Recordable<any>) {
    return [
      {
        tooltip: '修改',
        auth: [PerPrefix + PerEnum.UPDATE],
        icon: 'clarity:note-edit-line',
        onClick: handleEdit.bind(null, record),
      },
      {
        auth: [PerPrefix + PerEnum.DELETE],
        tooltip: '删除',
        icon: 'ant-design:delete-outlined',
        color: 'error',
        popConfirm: {
          title: '是否确认删除',
          placement: 'left',
          confirm: handleDelete.bind(null, record),
          okButtonProps: {
            danger: true
          }
        },
      },
    ];
  }

  /*const [registerTable, { reload }] = useTable({
    title: '列表',
    api: getNoticeTitleListByPage,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showAdvancedButton: false,
      showResetButton: false,
      autoSubmitOnEnter: true,
    },
    canColDrag: true,
    useSearchForm: true,
    bordered: false,
    showIndexColumn: false,
    actionColumn: {
      width: 100,
      title: '操作',
      field: 'action',
      fixed: 'right',
    },
  });*/

  function handleCreate() {
    noticeTitleModalRef.value.setData({});
    noticeTitleModalRef.value.open();
    noticeTitleModalRef.value.setState({
      title: '新建',
    });
  }

  function handleEdit(record: Recordable) {
    noticeTitleModalRef.value.setData(record);
    noticeTitleModalRef.value.open();
    noticeTitleModalRef.value.setState({
      title: '编辑',
    });
  }

  async function handleDelete(record: Recordable) {
    const {success, msg} = await deleteByIds([record.id]);
    if(success){
      message.success(msg);
      tableApi.reload();
    }
  }

  function handleSuccess() {
    tableApi.reload();
  }

  /*export default defineComponent({
    name: 'NoticeTitle',
    components: { BasicTable, TableAction, NoticeTitleModal, Popover, Authority, EmpInfo },
    setup() {


      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        PerEnum,
      };
    },
  });*/
</script>

<style lang="less" scoped>
  .title-svg-render {
    width: 570px;
    height: 100px;
    text-align: center;
    svg {
      width: 100%;
      text-align: center;
      overflow: visible;
      text {
        font-size: 20px;
        width: 100%;
      }
    }
  }
</style>
