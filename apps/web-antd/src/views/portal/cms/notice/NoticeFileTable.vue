<template>
  <div>
    <!--    <Button type="primary" @click="handleAdd"> 上传附件 </Button>-->
    <Upload
      v-model:file-list="fileList"
      name="file"
      multiple
      @change="handleChange"
      :action="uploadUrl"
      :headers="uploadHeaders"
      :showUploadList="false"
      accept=".jpg,.jpeg,.gif,.png,.webp,.doc,.docx,.xsl,.xslx,.ppt,.pptx,.zip,.rar"
      :disabled="uploading"
    >
      <Button :loading="uploading">
        <upload-outlined />
        上传附件
      </Button>
    </Upload>

    <BasicTable >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="createActions(record, column, index)" />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, unref, h } from 'vue';
  import type {Recordable} from '@vben/types';
  import { UploadOutlined } from '@ant-design/icons-vue';
  // import { useUserStore } from '#/store/modules/user';
  import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';

  import { Button, Upload, Switch, message } from 'ant-design-vue';

/*  import {
    BasicTable,
    useTable,
    TableAction,
    BasicColumn,
    ActionItem,
    EditRecordRow,
  } from '#/components/Table';*/
  // import { useGlobSetting } from '#/hooks/setting';
  // import { ResultEnum } from '#/enums/httpEnum';
  // import {deleteById} from "#/api/portal/cms/commonFile";
  import { formatFileSize } from '#/utils';
  import type {VxeGridProps} from '#/adapter/vxe-table';

  const columns: VxeGridProps['columns'] = [
    {
      title: '文件名',
      field: 'name',
      editRow: true,
      align: 'left',
    },
    {
      title: '文件类型',
      field: 'fileType',
      editRow: true,
      width: 100,
    },
    {
      title: '大小',
      field: 'fileSize',
      editRow: false,
      width: 100,
      customRender: ({ value }) => {
        return formatFileSize(value);
      },
    },
    {
      title: '文件路径',
      field: 'filePath',
      editRow: false,
      defaultHidden: true,
    },
    {
      title: '是否允许下载',
      field: 'canDown',
      width: 150,
      align: 'center',
      customRender: ({ record }) => {
        if (!Reflect.has(record, 'pendingStatus')) {
          record.pendingStatus = false;
        }
        return h(Switch, {
          checked: record.canDown,
          checkedChildren: '允许',
          unCheckedChildren: '不允许',
          loading: record.pendingStatus,
          onChange(checked: boolean) {
            record.pendingStatus = true;
            const newStatus = checked;
            record.canDown = newStatus;
            record.pendingStatus = false;
          },
        });
      },
    },
  ];

  const data: any[] = [];

  const userStore = useUserStore();
  const accessStore = useAccessStore();
  // const { uploadUrl } = useGlobSetting();
  const uploading = ref(false);
  const uploadHeaders = ref();
  onMounted(() => {
    uploadHeaders.value = { satoken: accessStore.accessToken };
  });

  /*const [registerTable, { getDataSource, setTableData }] = useTable({
    columns: columns,
    showIndexColumn: true,
    dataSource: data,
    size: 'small',
    actionColumn: {
      width: 160,
      title: '操作',
      field: 'action',
    },
    scroll: { y: 400 },
    pagination: false,
  });*/

  function handleEdit(record: Recordable, idx) {
    console.log(record.index);
    alert(JSON.stringify(record));
  }

  function handleChange(info: Recordable) {
    const file = info.file;
    const status = file?.status;
    const url = file?.response?.data;
    const responseCode = file?.response?.code;
    const responseMsg = file?.response?.msg;
    const name = file?.name;
    const size = file?.size;

    if (status === 'uploading') {
      if (!unref(uploading)) {
        // emit('uploading', name);
        uploading.value = true;
      }
    } else if (status === 'done') {
      if (responseCode === ResultEnum.SUCCESS) {
        handleAdd({ url, name, size });
      } else {
        message.error(responseMsg);
      }
      // emit('done', name, url);
      uploading.value = false;
    } else if (status === 'error') {
      // emit('error');
      uploading.value = false;
    }
  }

  function handleAdd(file) {
    const data = getDataSource();
    const fileType = file.name.substring(file.name.lastIndexOf('.') + 1);
    const addRow: Recordable<any> = {
      name: file.name,
      filePath: file.url,
      fileType: fileType,
      fileSize: file.size,
      canDown: true,
    };
    data.push(addRow);
  }

  function createActions(record: Recordable<any>, column: any, index): any[] {
    const records = getDataSource();
    return [
      {
        label: '上移',
        onClick: upRecord.bind(null, records, index),
      },
      {
        label: '下移',
        onClick: downRecord.bind(null, records, index),
      },
      {
        label: '删除',
        danger: true,
        popConfirm: {
          title: '是否确认删除',
          placement: 'left',
          confirm: handleDel.bind(null, record, index),
          okButtonProps: { danger: true },
        },
      },
    ];
  }

  function upRecord(arr, $index) {
    if ($index == 0) {
      return;
    }
    swapItems(arr, $index, $index - 1);
  }

  function downRecord(arr, $index) {
    if ($index == arr.length - 1) {
      return;
    }
    swapItems(arr, $index, $index + 1);
  }

  function swapItems(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
  }

  function handleDel(record) {
    if (record.id) {
      // deleteById(record.id).then(res=>{
      //   message.success("删除成功");
      // });
    }

    const records = getDataSource();
    records.splice(
        records.findIndex((item) => item.key === record.key),
        1,
    );
  }

  /*export default defineComponent({
    components: { BasicTable, TableAction, UploadOutlined, Upload },
    setup() {


      return {
        registerTable,
        handleChange,
        uploadUrl,
        uploadHeaders,
        handleEdit,
        handleDel,
        createActions,
        handleAdd,
        getDataSource,
        setTableData,
        uploading,
      };
    },
  });*/
</script>
