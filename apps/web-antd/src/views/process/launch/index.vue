<script lang="ts" setup>
import type {VxeGridProps} from '#/adapter/vxe-table';
import {ref, unref, nextTick} from 'vue';
import type {VbenFormProps} from '@vben/common-ui';
import {Page, useVbenModal} from '@vben/common-ui';
import {Button, Tree, Image, Tag, Tooltip, Popconfirm, message, Card} from 'ant-design-vue';
import {useVbenVxeGrid} from '#/adapter/vxe-table';
import {deleteByIds, getAppListByPage} from '#/api/base/app';
import { getCategories } from '#/api/base/category';
// import AppInputModal from './AppInputModal.vue';
// import AppSecretKeyModal from './AppSecretKeyModal.vue';
import {AccessControl} from '@vben/access';
import {listColumns, searchFormSchema} from "#/views/base/app/app.data";
import {PerEnum} from "#/enums/perEnum";
import { listToTree } from '#/utils/helper/treeHelper';


import {
  SquareEditOutline,
  DeleteOutline,
  CloudSecurityOutline,
  QuestionMarkCircleOutline,
} from '@vben/icons';

// const [AppModal, modalApi] = useVbenModal({
//   connectedComponent: null,//AppInputModal,
//   centered: true,
// });
const categoryTreeRef = ref(null);
interface RowType {
  id: string;
  name: string;
  sn: string;
  url: string;
  indexUrl: string;
  orderNo: number;
  status: 1 | 0;
  platformEnabled: 1 | 0;
  note: string;
}

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

const gridOptions: VxeGridProps<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: listColumns,
  columnConfig: {resizable: true},
  height: 'auto',
  keepSource: true,
  border: false,
  stripe: true,
  proxyConfig: {
    ajax: {
      query: async ({page}, formValues) => {
        return await getAppListByPage({
          query: {
            pageNum: page.currentPage,
            pageSize: page.pageSize,
          },
          entity: formValues || {},
        }).then(res => {
          res.items = res.rows;
          return Promise.resolve(res);
        });
      },
    },
  },
};

fetch();

async function fetch() {
  getCategories().then(res => {
    const tempTreeData = listToTree(res);

    tempTreeData.unshift({
      code: "draftList",
      name: "我的草稿",
      pid: "",
    });
    tempTreeData.unshift({
      code: "myCommonlyList",
      name: "常用流程",
      pid: "",
    });
    treeData.value = tempTreeData;
    nextTick(() => {
      // 加载后展开节层级
      if(unref(treeData).length < 10){
        //unref(categoryTreeRef)?.filterByLevel(1);
      }
    });
  }).finally(()=>{
    // treeLoading.value = false;
  });
}
const [Grid, gridApi] = useVbenVxeGrid({formOptions, gridOptions});

async function handleDelete(record: any) {
  try {
    const result = await deleteByIds([record.id]);
    const {success, msg} = result;
    if (success) {
      message.success(msg);
      await gridApi.reload();
    } else{
      message.error(msg);
    }
  } catch (e) {
    message.error(e.message);
  }
}

const treeData = ref([]);

function handleSelect(keys: string, e) {
  const node = e.selectedNodes[0];
  if(node){
    currentCategory.value = node;
  }else{
    currentCategory.value = {};
  }
  pager.value.pageNum = 1;
  pagination.current = 1;
  searchTxt.value = '';
  fetchModelByPage();
}

</script>

<template>
  <Page content-class="flex flex-row gap-4 h-full" auto-content-height>



    <Card size="small" class="w-1/4 h-full" title="流程分类"
          body-style="padding: 4px;">
      <template #extra>
      </template>
      <Tree
        ref="categoryTreeRef"
        block-node
        :tree-data="treeData"
        @select="handleSelect"
        :fieldNames="{title: 'name', key: 'code'}"
      />
    </Card>

    <Card size="small" class="flex-1" title="基础示例">
      <template #extra>
      </template>
      <div>
        aaaa
      </div>
    </Card>
<!--
    <div class="flex">
      <div class="w-400">
        aaaa
      </div>
      <div class="flex-1">
        bbb
      </div>
    </div>-->
<!--    <Grid table-title="列表">
      <template #toolbar-tools>
        <AccessControl :codes="['App:'+PerEnum.ADD]" type="code">
          <Button type="primary" @click="handleAdd">新建</Button>
        </AccessControl>
      </template>

      <template #action="{row}">
        <AccessControl :codes="['App:'+PerEnum.UPDATE]" type="code">
          <Tooltip title="编辑">
            <Button type="link" @click="handleEdit(row)">
              <template #icon>
                <SquareEditOutline class="size-4 mx-auto"/>
              </template>
            </Button>
          </Tooltip>
        </AccessControl>

        <AccessControl :codes="['App:'+PerEnum.UPDATE]" type="code">
          <Tooltip title="密钥">
            <Button type="link" @click="handleViewSecretKey(row)">
              <template #icon>
                <CloudSecurityOutline class="size-4 mx-auto"/>
              </template>
            </Button>
          </Tooltip>
        </AccessControl>

        <AccessControl :codes="['App:'+PerEnum.UPDATE]" type="code">
          <Popconfirm @confirm="handleDelete(row)" :ok-button-props="{danger: true}">
            <template #title >
              <div class="w-32">
                确定要删除吗？
              </div>
            </template>
            <template #icon>
              <QuestionMarkCircleOutline class="text-red-500 size-6"/>
            </template>
            <Button type="link" danger>
              <template #icon>
                <DeleteOutline class="size-4 mx-auto"/>
              </template>
            </Button>
          </Popconfirm>
        </AccessControl>
      </template>

      <template #image="{ row }">
        <Image :src="row.image" height="30" width="30"/>
      </template>

      <template #status="{ row }">
        <Tag v-if="row.status===1" color="green">启用</Tag>
        <Tag v-else color="red">禁用</Tag>
      </template>

      <template #platformEnabled="{ row }">
        <Tag v-if="row.platformEnabled===1" color="green">开启</Tag>
        <Tag v-else>关闭</Tag>
      </template>
    </Grid>-->
<!--    <AppModal @onSuccess="gridApi.reload()"/>-->
  </Page>
</template>
