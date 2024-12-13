<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Authority :value="'SystemConfig:' + PerEnum.ADD">
          <a-button type="primary" @click="handleCreate"> 新增</a-button>
        </Authority>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                auth: 'SystemConfig:' + PerEnum.UPDATE,
                tooltip: '修改',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                auth: 'SystemConfig:' + PerEnum.DELETE,
                tooltip: '删除',
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                  placement: 'left',
                },
                ifShow: showDelBtn.bind(null, record),
              },
            ]"
          />
        </template>
        <template v-if="column.key === 'image'">
          <div v-if="showUploadBtn(record)" class="view-img-wrapper">
            <TableImg :size="80" :simpleShow="true" :imgList="[record.imageBase64]" />
            <div class="config-img-tool" v-if="hasPermission(`SystemConfig:${PerEnum.UPDATE}`)">
              <Space>
                <Upload
                  name="file"
                  :accept="getAccepts(record)"
                  :multiple="false"
                  :showUploadList="false"
                  :beforeUpload="beforeUpload.bind(null, record)"
                >
                  <Tooltip title="上传图片">
                    <UploadOutlined class="img-tool-btn" style="color: #10aeff" />
                  </Tooltip>
                </Upload>
                <Tooltip title="清除图片-使用默认配置">
                  <DeleteOutlined
                    @click="handleRemoveImg(record)"
                    class="img-tool-btn"
                    style="color: red"
                  />
                </Tooltip>
              </Space>
            </div>
          </div>
          <div v-else>暂无预览</div>
        </template>
      </template>
    </BasicTable>
    <SystemConfigModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { PerEnum } from '@/enums/perEnum';
  import { Authority } from '@/components/Authority';
  import { BasicTable, useTable, TableAction, TableImg } from '@/components/Table';
  import { getSystemConfigListByPage, deleteByIds, saveOrUpdate } from '#/api/base/systemConfig';
  import { Upload, Tooltip, Space } from 'ant-design-vue';
  import { columns, searchFormSchema } from './systemConfig.data';
  import SystemConfigModal from './SystemConfigModal.vue';
  import { UploadOutlined, DeleteOutlined } from '@ant-design/icons-vue';
  import { usePermission } from '@/hooks/web/usePermission';

  import { useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage, createConfirm } = useMessage();
  const { hasPermission } = usePermission();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, setLoading }] = useTable({
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
  });

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

      saveOrUpdate({ id: record.id, image: fileByteArray })
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
        saveOrUpdate({ id: record.id, image: [] })
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

  function showDelBtn(record: Recordable) {
    return record.configSn.indexOf('SYS_') === -1;
  }

  function showUploadBtn(record: Recordable) {
    return record.configSn.lastIndexOf('_IMG') !== -1;
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    deleteByIds([record.id]).then(() => {
      reload();
    });
  }

  function handleUpload(record: Recordable) {}

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
