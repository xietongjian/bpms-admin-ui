<template>
  <Page auto-content-height>
    <BasicTable class="custom-listener-table">
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix+PerEnum.ADD" type="primary" @click="handleCreate"> 新增 </Button>
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
      <template #name="{ row }">
        {{ row.name }}
      </template>
      <template #expandContent="{ row }">
        <SubBasicTable
            height="300"
            :gridOptions="{
              size: 'mini',
              keepSource: true,
              border: false,
              stripe: true,
              pagerConfig: {enabled: false},
              columns: propertiesColumns,
              data: row.listenerProperties}"
        >
          <template #option="{row: rec}">
            <TableAction :actions="createSubActions(row, rec)" />
          </template>
        </SubBasicTable>
      </template>
    </BasicTable>
    <ListenerModal ref="listenerModalRef" @success="handleSuccess"/>
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
import type {VxeGridProps} from '#/adapter/vxe-table';
import {TableAction} from '#/components/table-action';
import {
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
import {useVbenVxeGrid} from "#/adapter/vxe-table";

const PerPrefix = 'FlowListener:';
const expressionTypeObj = ref({});
const listenerTypeObj = ref({});
const expandedRowKeys = ref([]);
const currentListener = ref<Recordable<any>>({});
const listenerModalRef = ref(),
    listenerPropertiesModalRef = ref();

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  submitOnEnter: true,
  commonConfig: {
    labelWidth: 60,
  },
  wrapperClass: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-3 lg:grid-cols-1',
  actionWrapperClass: 'col-span-3 col-start-3 text-left ml-2',
  resetButtonOptions: {
    show: true,
  },
  schema: searchFormSchema,
  handleValuesChange: (values, fieldsChanged) => {
    if(fieldsChanged.includes('listenerType')){
      tableApi.formApi.submitForm();
    }
  }
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
  expandConfig: {
    trigger: 'row',
    lazy: true,
    loadMethod: ({row}) => {
      return getListenerParamList({listenerId: row.id}).then(res => {
        row.listenerProperties = res;
        return Promise.resolve(row);
      }).catch(e => {
        console.error(e);
        return Promise.reject("加载人员失败！");
      });
    },
    toggleMethod: ({row, expanded}) => {
      if (expanded) {
        tableApi.grid.reloadRowExpand(row);
      }
      return true;
    }
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

const [BasicTable, tableApi] = useVbenVxeGrid({formOptions, gridOptions});

const [SubBasicTable] = useVbenVxeGrid();

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
});

function handleAddProperties(record: Recordable<any>, e) {
  e.stopPropagation();
  currentListener.value = record;
  listenerPropertiesModalRef.value.setData({listenerId: record.id, type: 'string'});
  listenerPropertiesModalRef.value.open();
  listenerPropertiesModalRef.value.setState({
    title: `添加【${record.name}】的属性`,
  });
}

function handleEditProperties(mainRecord: Recordable<any>, record: Recordable<any>) {
  listenerPropertiesModalRef.value.setData(record);
  listenerPropertiesModalRef.value.setState({
    title: `修改【${record.name}】的属性`,
  });
  listenerPropertiesModalRef.value.open();
  currentListener.value = mainRecord;
}

function createSubActions(mainRecord: Recordable<any>, record: Recordable<any>) {
  return [
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      icon: 'clarity:note-edit-line',
      title: '编辑',
      onClick: handleEditProperties.bind(null, mainRecord, record),
    },
    {
      auth: [PerPrefix + PerEnum.DELETE],
      icon: 'ant-design:delete-outlined',
      danger: true,
      title: '删除',
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDeleteProperty.bind(null, mainRecord, record),
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
  listenerModalRef.value.setData(record);
  listenerModalRef.value.open();
  listenerModalRef.value.setState({
    title: `编辑监听`,
  });
}

async function handleDelete(record: Recordable<any>, e) {
  e.stopPropagation();
  try {
    const {success, msg} = await deleteById(record.id);
    if (success) {
      tableApi.reload();
    } else {
      message.error(msg);
    }
  } catch (e) {
    console.error(e);
  } finally {

  }
}

function handleSuccess() {
  tableApi.reload();
}

function handleCloseFunc() {
  tableApi.reload();
  return Promise.resolve(true);
}

async function handleDeleteProperty(mainRecord: Recordable<any>, record: Recordable<any>) {
  try {
    const {success, msg} = await deleteParamById(record.id);
    if (success) {
      await tableApi.grid.reloadRowExpand(mainRecord);
      message.success(msg);
    }
  } catch (e) {
    console.error(e);
  } finally {

  }
}

function handleUpdateSecretKeySuccess() {
  currentListener.value && tableApi.grid.reloadRowExpand(currentListener.value);
}
</script>
