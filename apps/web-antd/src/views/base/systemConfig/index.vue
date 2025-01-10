<template>
  <Page auto-content-height>
    <BasicTable @register="registerTable">
      <template #toolbar-tools>
        <Button v-access:code="PerPrefix + PerEnum.ADD" type="primary" @click="handleCreate">新增</Button>
      </template>
      <template #action="{ row }">
        <TableAction :actions="createActions(row)"/>
      </template>

      <template #image="{ row }">
        <div v-if="showUploadBtn(row)" class="view-img-wrapper">
          <TableImg :size="80" :simpleShow="true" :imgList="[row.imageBase64]"/>
          <div class="config-img-tool" v-access:code="PerPrefix+PerEnum.UPDATE" >
            <Space>
              <Upload
                  name="file"
                  :accept="getAccepts(row)"
                  :multiple="false"
                  :showUploadList="false"
                  :beforeUpload="beforeUpload.bind(null, row)"
              >
                <Tooltip title="上传图片">
                  <UploadOutlined class="img-tool-btn" style="color: #10aeff"/>
                </Tooltip>
              </Upload>
              <Tooltip title="清除图片-使用默认配置">
                <DeleteOutlined
                    @click="handleRemoveImg(row)"
                    class="img-tool-btn"
                    style="color: red"
                />
              </Tooltip>
            </Space>
          </div>
        </div>
        <div v-else>暂无预览</div>
      </template>
    </BasicTable>
    <SystemConfigModal ref="systemConfigModalRef" @register="registerModal" @success="handleSuccess"/>
  </Page>
</template>
<script lang="ts" setup>
import {nextTick, ref} from 'vue';
import type {VxeGridProps} from '#/adapter/vxe-table';
import type {VbenFormProps} from '@vben/common-ui';

import {PerEnum} from '#/enums/perEnum';
// import { BasicTable, useTable, TableAction, TableImg } from '@/components/Table';
import {getSystemConfigListByPage, deleteByIds, saveOrUpdate} from '#/api/base/systemConfig';
import {Upload, Tooltip, Space, message, Modal, Button} from 'ant-design-vue';
import {columns, searchFormSchema} from './systemConfig.data';
import SystemConfigModal from './SystemConfigModal.vue';
import {UploadOutlined, DeleteOutlined} from '@ant-design/icons-vue';
import type {Recordable} from '@vben/types';
import {TableAction} from '#/components/table-action';


import {Page} from "@vben/common-ui";
import {useVbenVxeGrid} from "#/adapter/vxe-table";

const PerPrefix = 'SystemConfig:';


// const [registerModal, { openModal }] = useModal();
/*const [registerTable, { reload, setLoading }] = useTable({
  title: '列表',
  api: getSystemConfigListByPage,
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
  bordered: true,
  showIndexColumn: true,
  actionColumn: {
    width: 100,
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
  actionWrapperClass: 'col-span-2 col-start-2 text-left ml-4',
  resetButtonOptions: {
    show: false,
  },
  schema: searchFormSchema,
};

const gridOptions: VxeGridProps<any> = {
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
        return await getSystemConfigListByPage({
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

function createActions(row: Recordable<any>) {
  return [
    {
      auth: [PerPrefix + PerEnum.UPDATE],
      tooltip: '修改',
      icon: 'clarity:note-edit-line',
      onClick: handleEdit.bind(null, row),
    },
    {
      auth: [PerPrefix + PerEnum.DELETE],
      tooltip: '删除',
      icon: 'ant-design:delete-outlined',
      danger: true,
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, row),
        placement: 'left',
        okButtonProps: {
          danger: true
        }
      },
      ifShow: showDelBtn.bind(null, row),
    },
  ];
}

const beforeUpload = (record, file) => {
  setLoading(true);
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  // 文件读取成功完成后的处理
  reader.onload = function (ev) {
    const array = new Uint8Array(ev.target.result);
    const fileByteArray = [];

    for (let i = 0; i < array.length; i++) {
      fileByteArray.push(array[i]);
    }

    saveOrUpdate({id: record.id, image: fileByteArray})
        .then((res) => {
          createMessage.success('上传成功，按Ctrl+F5强制刷新页面才能生效');
          handleSuccess();
        })
        .finally(() => {
          setLoading(false);
        });
  };
  return false;
};

const handleRemoveImg = (record) => {
  createConfirm({
    iconType: 'warning',
    content: '确定要删除图片吗？',
    onOk() {
      saveOrUpdate({id: record.id, image: []})
          .then((res) => {
            createMessage.success('删除成功，按Ctrl+F5强制刷新页面才能生效');
            handleSuccess();
          })
          .finally(() => {
            setLoading(false);
          });
    },
    okButtonProps: {
      danger: true,
    },
  });
};

const getAccepts = (record) => {
  if (record.configSn === 'SYS_FAVICON_IMG') {
    return '.ico';
  }
  return '.png';
};

function handleCreate() {
  openModal(true, {
    isUpdate: false,
  });
}

function showDelBtn(record: Recordable<any>) {
  return record.configSn.indexOf('SYS_') === -1;
}

function showUploadBtn(record: Recordable<any>) {
  return record.configSn.lastIndexOf('_IMG') !== -1;
}

function handleEdit(record: Recordable<any>) {
  openModal(true, {
    record,
    isUpdate: true,
  });
}

function handleDelete(record: Recordable<any>) {
  deleteByIds([record.id]).then(() => {
    reload();
  });
}

function handleUpload(record: Recordable<any>) {
}

function handleSuccess() {
  setTimeout(() => {
    reload();
  }, 200);
}
</script>
<style lang="less" scoped>
.view-img-wrapper {
  position: relative;
  overflow: hidden;

  .config-img-tool {
    position: absolute;
    bottom: -30px;
    width: 100%;
  }

  &:hover {
    .config-img-tool {
      bottom: 0px;
    }
  }
}

.config-img-tool {
  .img-tool-btn {
    cursor: pointer;
    font-size: 18px;
  }
}
</style>
