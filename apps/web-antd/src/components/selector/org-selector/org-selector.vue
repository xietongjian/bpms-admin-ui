<script setup lang="ts">
import { ref, watch, unref, useAttrs, onMounted, computed, watchEffect } from 'vue';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';
import OrgSelectorModal from './org-selector-modal.vue';
import { ApiComponent } from '@vben/common-ui';

import {
  Select,
  TreeSelect,
  Tooltip,
  Tag,
  Popover,
} from 'ant-design-vue';

import {getCompanyTreeData} from "#/api/org/company";
import {getOrgTree} from "#/api/org/dept";
import {forEach} from "#/utils/helper/treeHelper";
import {objectOmit} from "@vueuse/core";

interface Props {
  multiple: {
    type: boolean,
    default: false,
  },
  type: {
    type: 'org' | 'company' | 'dept',
    default: 'org',
  },
  /**
   * 是否弹窗选择数据
   */
  selectOnModal: {
    type: boolean,
    default: false
  },
  placeholder: {
    type: string,
    default: '请选择'
  },
  // 仅在multipart=false单选时有效
  closeOnSelect: {
    type: boolean,
    default: true;
  },
  modelValue: {
    type: object | object[],
    default: undefined,
  }
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  type: 'org',
  closeOnSelect: true,
  modelValue: [],
  selectOnModal: false,
});

const selectorDataList = ref([]);
const selectorRef = ref();
const orgSelectorModalRef = ref();
const treeData = ref([]);
const emit = defineEmits<{
  change: [string];
}>();

const modelValue = defineModel({default: [], type: Array});

const currentSelect = ref(undefined);

function handleDropdownVisibleChange(open) {
  // 展开时默认展开并滚动到选中的树节点
  if(open){
    console.log(props.modelValue);
  }
}

function handleFilterTreeNode (searchValue: string, treeNode: any) {
  if (!searchValue) return false;
  return treeNode?.title?.indexOf(searchValue) > -1;
}

watchEffect(() => {
  currentSelect.value = modelValue.value;
});

watch(
  () => currentSelect.value,
  (v) => {
    emit('change', v);
  },
);

onMounted(() => {
  if (!props.selectOnModal) {
    // initData();
  }
});

enum OrgSelectType {
  COMPANY = '1',
  DEPT = '2',
  ORG = '3',
}

async function initData() {
  debugger;
  if (props.type === 'company') {
    const res = await getCompanyTreeData();
    treeData.value = res;
    if (unref(props.multiple)) {
      setTimeout(() => {
        // getTree()?.setCheckedKeys(selectedRowKeys);
      }, 20);
    } else {
      setTimeout(() => {
        // getTree()?.setSelectedKeys(selectedRowKeys);
        // getTree()?.setExpandedKeys(selectedRowKeys);
      }, 20);
    }

    setTimeout(() => {
      // getTree()?.setExpandedKeys(unref(treeData).map((item) => item.id));
    }, 100);
  } else {
    // 部门和公司树（组织树）
    getOrgTree()
      .then((res) => {
        treeData.value = res;
        const expandKeys = [];
        // 如果只能选择部门，则将公司的数据设置禁用
        if (props.selectType === OrgSelectType.DEPT) {
          forEach(res, (item) => {
            // 只能选部门
            item.disabled = item.sourceType === OrgSelectType.COMPANY; // 部门选择器，禁用公司的选项
            item.sourceType === OrgSelectType.COMPANY && expandKeys.push(item.id); // 如果只能选择部门，需要将公司全部展开
          });
        }

        treeData.value = res as unknown as TreeItem[];

        // if (unref(props.multiple)) {
        //   setTimeout(() => {
        //     // unref(treeRef)?.setCheckedKeys(selectedRowKeys);
        //   }, 200);
        // } else {
        //   setTimeout(() => {
        //     // TODO 这里有个问题：默认展开时无法展开父节点
        //     console.log(selectedRowKeys);
        //     // getTree()?.setSelectedKeys(selectedRowKeys);
        //   }, 200);
        // }
        // expandKeys.concat(selectedRowKeys);

        // getTree()?.setExpandedKeys(expandKeys);
      })
      .finally(() => {});
  }
}

function openSelectorModal() {
  orgSelectorModalRef.value.setData({
    values: modelValue.value,
    selectType: props.type
  });
  orgSelectorModalRef.value.open();
}
const attrs = useAttrs();

const bindProps = computed(() => {
  return {
    ...objectOmit(attrs, ['onUpdate:value']),
  };
});

const api = computed(() => {
  switch (props.type){
    case 'company':
      return getCompanyTreeData;
    case 'dept':
      return getOrgTree;
    case 'org':
      return getOrgTree;
    default:
      return getOrgTree;
  }
})


</script>
<template>
  <div class="w-full">
    <template v-if="selectOnModal">
      <Select
        ref="selectorRef"
        :value="selectorDataList"
        :placeholder="placeholder"
        class="w-full"
        :open="false"
        :mode="props.multipart? 'multiple': 'tags'"
        :allowClear="true"
        :labelInValue="true"
        maxTagPlaceholder=""
        @change="changeSelectItem"
        @click="openSelectorModal"
        :showArrow="true"
      >
        <template #clearIcon>
          <CloseCircleOutlined @click="clearSelectedList"/>
        </template>
        <template #suffixIcon>
          <SearchOutlined style="color: #666"/>
        </template>
        <template #[item]="data" v-for="item in Object.keys($slots)">
          <slot :name="item" v-bind="data"></slot>
        </template>
      </Select>

      <OrgSelectorModal ref="orgSelectorModalRef" @change="handleChange"/>
    </template>
    <template  v-else>
      <ApiComponent
          labelField="name"
          valueField="code"
          :api="api"
          class="w-full"
          placeholder="请选择"
          :component="TreeSelect"
          :treeDataSimpleMode="{id: 'id', pId: 'pid', rootPId: null}"
          loadingSlot="suffixIcon"
          modelPropName="value"
          optionsPropName="treeData"
          visibleEvent="onVisibleChange"
          :multiple="multiple"
          v-bind="bindProps"
        >
          <template #tagRender="{ label, closable, onClose, option }">
            <Popover :z-index="1200">
              <template #content>
                {{ label || '-' }}
              </template>
              <Tag class="flex items-center gap-1 !text-sm p-px m-px mr-1" :closable="closable"
                   :color="option.color" @close="onClose">
                <span class="icon-[ix--building2] size-4"></span>
                {{ label || '-' }}
              </Tag>
            </Popover>
          </template>
      </ApiComponent>
<!--      <TreeSelect
          ref="selectorRef"
          searchPlaceholder="请选择"
          popupClassName="border !block"
          v-model:value="currentSelect"
          :placeholder="placeholder"
          class="w-full "
          :multiple="multiple"
          :allowClear="true"
          :labelInValue="true"
          :tree-data="treeData"
          :showSearch="true"
          @dropdownVisibleChange="handleDropdownVisibleChange"
          :filterTreeNode="handleFilterTreeNode"
      >
        <template #tagRender="{ label, closable, onClose, option }">
          <Popover :z-index="1200">
            <template #content>
              {{ label || '-' }}
            </template>
            <Tag class="flex items-center gap-1 !text-sm p-px m-px mr-1" :closable="closable" :color="option.color" @close="onClose">
              <span class="icon-[ix&#45;&#45;building2] size-4" ></span>
              {{ label || '-' }}
            </Tag>
          </Popover>
        </template>
      </TreeSelect>-->
    </template>
  </div>
</template>
