<template>
  <div>
    <BasicTable >
      <template #toolbar-actions>
        <Upload
            v-model:file-list="fileList"
            name="file"
            multiple
            :showUploadList="false"
            :customRequest="handleCustomRequest"
            accept=".jpg,.jpeg,.gif,.png,.webp,.doc,.docx,.xsl,.xslx,.ppt,.pptx,.zip,.rar"
            :disabled="uploading"
        >
          <Button type="primary" :loading="uploading">
            <upload-outlined />
            上传附件
          </Button>
        </Upload>
      </template>
      <template #action="{ row }">
        <TableAction outside :actions="createActions(row)" />
      </template>
      <template #canDown="{ row }">
        <Switch v-model:checked="row.canDown" />
      </template>
      <template #fileSize="{ row }">
        {{formatFileSize(row.fileSize)}}
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, unref, h, defineExpose } from 'vue';
  import type {Recordable} from '@vben/types';
  import { UploadOutlined } from '@ant-design/icons-vue';
  // import { useUserStore } from '#/store/modules/user';
  import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';
  import {formatFileSize} from "#/utils";
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
  import type {VxeGridProps} from '#/adapter/vxe-table';
  import {useVbenVxeGrid} from "#/adapter/vxe-table";
  import {uploadFile} from "#/api/core/upload";
  import {TableAction} from "#/components/table-action";

  const fileList = ref([]);

  function handleCustomRequest(e) {
    uploadFile({
      file: e.file,
      onError:() => {},
      onProgress: ()=> {},
      onSuccess: (url)=>{
        const currentFile = fileList.value.find(item => item.uid===e.file.uid)
        currentFile.filePath = url;
        currentFile.canDown = false;
        currentFile.fileName = currentFile.name;
        // loadTableData();
        handleInsert(currentFile);
      }
    })
  }

  const createActions = (record: any) => {
    const actions: any[] = [
      {
        label: '删除',
        danger: true,
        popConfirm: {
          title: '是否确认删除',
          confirm: () => {
            tableApi.grid?.remove(record);
            const idx = fileList.value.findIndex(item => item.filePath === record.filePath)
            fileList.value.splice(idx, 1)
          },
          okButtonProps: { danger: true },
        },
      },
    ];
    return actions;
  };

  function handleInsert(item) {
    tableApi.grid?.insertAt({
      fileName: item.name,
      fileType: item.name.split('.').pop(),
      fileSize: item.size,
      filePath: item.filePath,
      canDown: false,
    }, -1);
  }

  function loadTableData() {
    fileList.value.forEach(item => {
      tableApi.grid?.insertAt({
        fileName: item.fileName,
        fileType: item.fileName?.split('.').pop(),
        fileSize: item.fileSize,
        size: item.fileSize,
        filePath: item.filePath,
        canDown: false,
      }, -1);
    })
  }

  const columns: VxeGridProps['columns'] = [
    {
      title: '文件名',
      field: 'fileName',
      align: 'left',
    },
    {
      title: '文件类型',
      field: 'fileType',
      width: 100,
    },
    {
      title: '大小',
      field: 'fileSize',
      width: 100,
      slots: { default: 'fileSize' },
    },
    {
      title: '文件路径',
      field: 'filePath',
    },
    {
      title: '是否允许下载',
      field: 'canDown',
      width: 150,
      align: 'center',
      slots: { default: 'canDown' },
    },
    {
      width: 160,
      title: '操作',
      align: 'center',
      slots: { default: 'action' },
    },
  ];

  const accessStore = useAccessStore();
  // const { uploadUrl } = useGlobSetting();
  const uploading = ref(false);
  const uploadHeaders = ref();
  onMounted(() => {
    uploadHeaders.value = { satoken: accessStore.accessToken };
  });

  const gridOptions: VxeGridProps = {
    columns,
    columnConfig: {resizable: true},
    height: '250',
    keepSource: true,
    pagerConfig: {
      enabled: false,
    },
    border: false,
    stripe: true,
    editConfig: {
      trigger: 'click',
      mode: 'row',
    },
    rowDragConfig: {
      showIcon: true,
      animation: true,
      dragEndMethod: () => {
        debugger;
        return Promise.resolve({});
      },
    }
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({gridOptions});

  /*function createActions(record: Recordable<any>, column: any, index): any[] {
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
  }*/

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

  function getFileList() {
    return fileList.value.map(item => {
      return {
        fileName: item.fileName,
        filePath: item.filePath,
        fileType: item.fileType,
        fileSize: item.size,
        canDown: item.canDown,
      }
    });
  }

  function loadFileList(files: any) {
    fileList.value = files;
    loadTableData(files);
  }

  defineExpose({getFileList, loadFileList})
</script>
