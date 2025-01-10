<template>
  <Page auto-content-height>
    <BasicTable class="custom-listener-table">
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleCreate"> 新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)" />
      </template>
      <template #listenerType="{ row }">
        <Tag v-if="row.listenerType === 'taskListener'" color="default">
          {{ listenerTypeObj[row.listenerType] }}
        </Tag>
        <Tag v-if="row.listenerType === 'executionListener'" color="processing">
          {{ listenerTypeObj[row.listenerType] }}
        </Tag>
      </template>
      <template #type="{ row }">
        {{ expressionTypeObj[row.type] }}
      </template>
      <template #expandContent="{ row }">
        <div class="expand-wrapper">
          <!--
          title=""
              size="small"
              :columns="propertiesColumns"
              :useSearchForm="false"
              :immediate="false"
              :showIndexColumn="true"
              :showTableSetting="false"
              :bordered="true"
              :pagination="false"
              :emptyDataIsShowTable="false"
              :inset="true"
              rowKey="id"
              :canResize="false"
              :loading="propertiesTableLoading"
              :dataSource="listenerPropertiesData[row.id]"
          -->
          <SubBasicTable >
            <template #option="{row: rec}">
              <TableAction :actions="createSubActions(rec)" />
            </template>
          </SubBasicTable>
        </div>
      </template>

<!--      <template #expandedRowRender="{ record, index, indent, expanded }">
        <SubBasicTable
            title=""
            size="small"
            :columns="propertiesColumns"
            :useSearchForm="false"
            :immediate="false"
            :showIndexColumn="true"
            :showTableSetting="false"
            :bordered="true"
            :pagination="false"
            :emptyDataIsShowTable="false"
            :inset="true"
            rowKey="id"
            :canResize="false"
            :loading="propertiesTableLoading"
            :dataSource="listenerPropertiesData[record.id]"
        >
          <template #bodyCell="{ column, record: rec }">
            <template v-if="column.key === 'option'">
              <TableAction
                  :actions="[
                  {
                    auth: 'FlowListener:' + PerEnum.UPDATE,
                    icon: 'clarity:note-edit-line',
                    title: '编辑',
                    onClick: handleEditProperties.bind(null, rec),
                  },
                  {
                    auth: 'FlowListener:' + PerEnum.DELETE,
                    icon: 'ant-design:delete-outlined',
                    danger: true,
                    title: '删除',
                    popConfirm: {
                      title: '是否确认删除',
                      confirm: handleDeleteProperty.bind(null, rec),
                      placement: 'left',
                    },
                  },
                ]"
              />
            </template>
          </template>
        </BasicTable>
      </template>-->
    </BasicTable>
    <ListenerModal ref="listenerModalRef" @register="registerModal" @success="handleSuccess"/>
    <ListenerPropertiesModal ref="listenerPropertiesModalRef"
        @success="handleUpdateSecretKeySuccess"
        :closeFunc="handleCloseFunc"
    />
  </Page>
</template>
<script lang="ts" setup>
import {ref, unref, onMounted} from 'vue';

import {PerEnum} from '#/enums/perEnum';
import type {Recordable} from '@vben/types';
import type {VbenFormProps} from '@vben/common-ui';
import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';

import {TableAction} from '#/components/table-action';

import {
  getAll,
  deleteById,
  getListByPage,
  getExpressionTypes,
  getListenerTypes,
  getListenerParamList,
  deleteParamById,
} from '#/api/base/flowListener';
import {Tag, Button, message} from 'ant-design-vue';
import {columns, searchFormSchema, propertiesColumns} from './listener.data';
import {Page} from '@vben/common-ui';
import ListenerModal from './ListenerModal.vue';
import ListenerPropertiesModal from './ListenerPropertiesModal.vue';
// import {getCustomPagerModel} from "#/api/form/customForm";
import {useVbenVxeGrid} from "#/adapter/vxe-table";


// const [registerModal, {openModal, setModalProps: setListenerModalProps}] = useModal();

const listenerPropertiesData = ref<object>({});

const expressionTypeObj = ref({});
const listenerTypeObj = ref({});
const propertiesTableLoading = ref(false);
const expandedRowKeys = ref([]);
const currentListener = ref<Recordable<any>>({});

const PerPrefix = 'FlowListener:';

const listenerModalRef = ref(),
    listenerPropertiesModalRef = ref();

/*const [
  registerPropertiesModal,
  {openModal: openPropertiesModal, setModalProps: setPropertiesModalProps},
] = useModal();*/
/*
const [registerTable, {reload, getForm, setProps}] = useTable({
  title: '列表',
  api: getListByPage,
  columns,
  formConfig: {
    labelWidth: 80,
    schemas: searchFormSchema,
    showAdvancedButton: false,
    showResetButton: false,
    autoSubmitOnEnter: true,
  },
  expandedRowKeys: expandedRowKeys,
  expandRowByClick: true,
  useSearchForm: true,
  bordered: true,
  showIndexColumn: true,
  showTableSetting: false,
  rowKey: 'id',
  canResize: true,
  onExpand: (expanded, record) => {
    if (expanded) {
      expandedRowKeys.value = [record.id];
      currentListener.value = record;
      reloadListenerProperties(record.id);
    } else {
      expandedRowKeys.value = [];
    }
  },
  actionColumn: {
    width: 150,
    title: '操作',
    dataIndex: 'action',
  },
});*/

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  wrapperClass: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-3',
  actionWrapperClass: 'col-span-2 col-start-3 text-left ml-4',
  resetButtonOptions: {
    show: true,
  },
  schema: searchFormSchema,
};

const gridOptions: VxeGridProps = {
  columns,
  columnConfig: {resizable: true},
  height: 'auto',
  maxHeight: '100%',
  border: false,
  keepSource: true,
  autoResize: false,
  stripe: true,
  round: false,
  radioConfig: {
    highlight: true,
    labelField: 'name',
    trigger: 'row',
  },
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        // currentModelInfo.value = {};
        return await getListByPage({
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

const gridEvents: VxeGridListeners = {
  radioChange: ({row}) => {
    // clickRow(row);
  },
  toggleRowExpand: ({row, expanded}) => {
    if(expanded){
      currentListener.value = row;
      // subTableApi.reload({listenerId: row.listenerId});
    }
  }
};

const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions, gridEvents});

const subGridOptions: VxeGridProps = {
  columns: propertiesColumns,
  columnConfig: {resizable: true},
  height: 'auto',
  maxHeight: '100%',
  border: false,
  keepSource: true,
  autoResize: false,
  stripe: true,
  round: false,
  radioConfig: {
    highlight: true,
    labelField: 'name',
    trigger: 'row',
  },
  pagerConfig: {
    enabled: false,
  },
  proxyConfig: {
    autoLoad: true,
    ajax: {
      query: async () => {
        // currentModelInfo.value = {};
        return await getListenerParamList({listenerId: currentListener.value.id});
      },
    },
  },
};

const [SubBasicTable, subTableApi] = useVbenVxeGrid({gridOptions: subGridOptions});



function reloadListenerProperties(listenerId) {
  propertiesTableLoading.value = true;
  getListenerParamList({listenerId})
      .then((res) => {
        if (res && res.length > 0) {
          listenerPropertiesData.value[listenerId] = res;
        } else {
          listenerPropertiesData.value[listenerId] = [];
        }
      })
      .finally(() => {
        propertiesTableLoading.value = false;
      });
}

async function handleCreate() {
  const formApi = tableApi.formApi;

  // 获取搜索框上的监听类型传入到新增页面
  const values = await formApi.getValues();

  listenerModalRef.value.setData({
    listenerType: values.listenerType || 'taskListener',
  });
  listenerModalRef.value.open();
  listenerModalRef.value.setState({
    title: `新增监听`,
  });
}

onMounted(async () => {
  getExpressionTypes().then((res) => {
    res.forEach((item) => {
      unref(expressionTypeObj)[item.value] = item.label;
    });
  });

  const listenerTypes = await getListenerTypes();
  listenerTypes.forEach((item) => {
    unref(listenerTypeObj)[item.value] = item.label;
  });

  tableApi.formApi.updateSchema([
    {
      fieldName: 'listenerType',
      componentProps: {
        options: listenerTypes,
        onChange: async (value) => {
          // 切换类型时先清空搜索条件
          const formApi = tableApi.formApi;
          await formApi.setValues({keyword: ''});
          tableApi.reload({listenerType: value});
        },
      },
    },
  ]);
});

function handleAddProperties(record: Recordable<any>, e) {
  e.stopPropagation();
  currentListener.value = record;
  listenerPropertiesModalRef.value.setData({listenerId: record.id, type: 'string'});
  listenerPropertiesModalRef.value.open();
  listenerPropertiesModalRef.value.setState({
    title: `添加【${record.name}】的属性`,
  });

 /* openPropertiesModal(true, {
    isUpdate: false,
    record: {listenerId: record.id, type: 'string'},
  });
  setPropertiesModalProps({
    title: `添加【${record.name}】的属性`,
  });*/
}

function handleEditProperties(record: Recordable<any>) {
  openPropertiesModal(true, {
    isUpdate: true,
    record: record,
  });
  setPropertiesModalProps({
    title: `修改【${record.name}】的属性`,
  });
}

function createSubActions(record: Recordable<any>) {
  return [
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      icon: 'clarity:note-edit-line',
      title: '编辑',
      onClick: handleEditProperties.bind(null, record),
    },
    {
      auth: [PerPrefix + PerEnum.DELETE],
      icon: 'ant-design:delete-outlined',
      danger: true,
      title: '删除',
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDeleteProperty.bind(null, record),
        placement: 'left',
        okButtonProps: {
          danger: true
        }
      },
    },
  ];
}

function createActions(record: Recordable<any>) {
  return [
    {
      auth: [PerPrefix + PerEnum.ADD],
      icon: 'ant-design:plus-outlined',
      tooltip: '添加参数',
      onClick: handleAddProperties.bind(null, record),
    },
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      tooltip: '修改',
      icon: 'clarity:note-edit-line',
      onClick: handleEdit.bind(null, record),
    },
    {
      auth: [PerPrefix + PerEnum.DELETE],
      tooltip: '删除',
      icon: 'ant-design:delete-outlined',
      danger: true,
      onClick: (e) => {
        e.stopPropagation();
      },
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
        placement: 'left',
        okButtonProps: {
          danger: true,
        }
      },
    },
  ];
}

function handleEdit(record: Recordable<any>, e) {
  e.stopPropagation();
  openModal(true, {
    record,
    isUpdate: true,
  });
}

function handleDelete(record: Recordable<any>, e) {
  e.stopPropagation();
  deleteById(record.id).then(() => {
    reload();
  });
}

function handleSuccess() {
  setTimeout(() => {
    reload();
  }, 200);
}

function handleCloseFunc() {
  setTimeout(() => {
    reload();
  }, 200);
  return Promise.resolve(true);
}

function handleDeleteProperty(record: Recordable<any>) {
  deleteParamById(record.id)
      .then(() => {
        reloadListenerProperties(unref(currentListener).id);
      })
      .finally(() => {
      });
}

function handleUpdateSecretKeySuccess() {
  reloadListenerProperties(unref(currentListener).id);
  expandedRowKeys.value = [unref(currentListener).id];
}
</script>
<style lang="less">
.custom-listener-table {
  .ant-table-expanded-row {
    .ant-table-cell {
      .vben-basic-table {
        .ant-table {
          margin: 0 !important;
        }
      }
    }
  }
}
</style>
