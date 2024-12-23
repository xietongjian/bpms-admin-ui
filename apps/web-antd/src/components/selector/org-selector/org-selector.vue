<script setup lang="ts">
import { defineComponent, ref, watch, unref, onMounted, computed, watchEffect } from 'vue';
import Icon, { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';
import OrgSelectorModal from './org-selector-modal.vue';
import {EmptyIcon, Grip, listIcons} from '@vben/icons';

import {
  Select,
  TreeSelect,
  Tooltip,
  Tag,
  Popover,
  Pagination,
} from 'ant-design-vue';

import {refDebounced} from '@vueuse/core';
import {getCompanies, getCompanyTreeData} from "#/api/org/company";
import {getOrgTree} from "#/api/org/dept";
import {forEach} from "#/utils/helper/treeHelper";

interface Props {
  multiple: {
    type: boolean,
    default: false,
  },
  type: {
    type: 'org' | 'company' | 'dept',
    default: 'org',
  },
  selectorMode: {
    type: 'default' | 'dialog',
    default: 'default'
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
  selectorMode: 'default',
});

const selectorDataList = ref([]);
const selectorRef = ref();
const orgSelectorModalRef = ref();
const treeData = ref([]);
const emit = defineEmits<{
  change: [string];
}>();

const modelValue = defineModel({default: [], type: Array});

const visible = ref(false);
const currentSelect = ref(undefined);
const keyword = ref('');
const keywordDebounce = refDebounced(keyword, 300);
const currentList = computed(() => {
  try {
    if (props.prefix) {
      const icons = listIcons('', props.prefix);
      if (icons.length === 0) {
        console.warn(`No icons found for prefix: ${props.prefix}`);
      }
      return icons;
    } else {
      return props.icons;
    }
  } catch (error) {
    console.error('Failed to load icons:', error);
    return [];
  }
});
function handleDropdownVisibleChange(open) {
  // 展开时默认展开并滚动到选中的树节点
  if(open){
    console.log(props.modelValue);
  }
  // const selectedKeys = [...this.selectedKeys];
  // const keyPath = [...extra.keyPath];
  //
  // // 清空之前展开的节点
  // tree.expandedKeys = [];
  //
  // // 展开当前选中节点的所有上级节点
  // keyPath.forEach((key) => {
  //   tree.expandedKeys.push(key);
  // });
  //
  // // 更新Vue状态
  // this.selectedKeys = keyPath;
}

function handleFilterTreeNode (searchValue: string, treeNode: any) {
  if (!searchValue) return false;
  return treeNode?.title?.indexOf(searchValue) > -1;
}

const showList = computed(() => {
  return currentList.value.filter((item) =>
      item.includes(keywordDebounce.value),
  );
});

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
  if (props.selectorMode === 'default') {
    initData();
  }
});
enum OrgSelectType {
  COMPANY = '1',
  DEPT = '2',
  ORG = '3',
}

async function initData() {
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
        if (values.selectType === OrgSelectType.DEPT) {
          forEach(res, (item) => {
            // 只能选部门
            item.disabled = item.sourceType === OrgSelectType.COMPANY; // 部门选择器，禁用公司的选项
            item.sourceType === OrgSelectType.COMPANY && expandKeys.push(item.id); // 如果只能选择部门，需要将公司全部展开
          });
        }

        treeData.value = res as unknown as TreeItem[];

        if (unref(multipart)) {
          setTimeout(() => {
            // unref(treeRef)?.setCheckedKeys(selectedRowKeys);
          }, 200);
        } else {
          setTimeout(() => {
            // TODO 这里有个问题：默认展开时无法展开父节点
            console.log(selectedRowKeys);
            // getTree()?.setSelectedKeys(selectedRowKeys);
          }, 200);
        }
        expandKeys.concat(selectedRowKeys);

        // getTree()?.setExpandedKeys(expandKeys);
      })
      .finally(() => {});
  }
}

function toggleOpenState() {
  visible.value = !visible.value;
}

function open() {
  visible.value = true;
}

function close() {
  visible.value = false;
}

function openSelectorModal() {
  orgSelectorModalRef.value.setData(modelValue.value);
  orgSelectorModalRef.value.open();
}

defineExpose({toggleOpenState, open, close});
</script>
<template>
  <div class="w-full">
    <template v-if="selectorMode === 'dialog'">
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
      <TreeSelect
          ref="selectorRef"
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
              <span class="icon-[ix--building2] size-4" ></span>
              {{ label || '-' }}
            </Tag>
          </Popover>
        </template>
<!--        <template #clearIcon>
          <CloseCircleOutlined @click="clearSelectedList"/>
        </template>-->
<!--        <template #suffixIcon>
          <SearchOutlined style="color: #666"/>
        </template>-->
<!--        <template #[item]="data" v-for="item in Object.keys($slots)">
          <slot :name="item" v-bind="data"></slot>
        </template>-->
      </TreeSelect>
    </template>
  </div>

  <!--    <VbenPopover
      v-model:open="visible"
      :content-props="{ align: 'end', alignOffset: -11, sideOffset: 8 }"
      content-class="p-0 pt-3"
    >
      <template #trigger>
        <slot :close="close" :icon="currentSelect" :open="open" name="trigger">
          <div class="flex items-center gap-2">
            <Input
              :value="currentSelect"
              class="flex-1 cursor-pointer"
              v-bind="$attrs"
              :placeholder="$t('ui.iconPicker.placeholder')"
            />
            <VbenIcon :icon="currentSelect || Grip" class="size-8" />
          </div>
        </slot>
      </template>
      <div class="mb-2 flex w-full">
        <Input
          v-model="keyword"
          :placeholder="$t('ui.iconPicker.search')"
          class="mx-2"
        />
      </div>

      <template v-if="paginationList.length > 0">
        <div class="grid max-h-[360px] w-full grid-cols-6 justify-items-center">
          <VbenIconButton
            v-for="(item, index) in paginationList"
            :key="index"
            :tooltip="item"
            tooltip-side="top"
            @click="handleClick(item)"
          >
            <VbenIcon
              :class="{
                'text-primary transition-all': currentSelect === item,
              }"
              :icon="item"
            />
          </VbenIconButton>
        </div>
        <div
          v-if="total >= pageSize"
          class="flex-center flex justify-end overflow-hidden border-t py-2 pr-3"
        >
          <Pagination
            :items-per-page="36"
            :sibling-count="1"
            :total="total"
            show-edges
            size="small"
            @update:page="handlePageChange"
          >
            <PaginationList
              v-slot="{ items }"
              class="flex w-full items-center gap-1"
            >
              <PaginationFirst class="size-5" />
              <PaginationPrev class="size-5" />
              <template v-for="(item, index) in items">
                <PaginationListItem
                  v-if="item.type === 'page'"
                  :key="index"
                  :value="item.value"
                  as-child
                >
                  <Button
                    :variant="item.value === currentPage ? 'default' : 'outline'"
                    class="size-5 p-0 text-sm"
                  >
                    {{ item.value }}
                  </Button>
                </PaginationListItem>
                <PaginationEllipsis
                  v-else
                  :key="item.type"
                  :index="index"
                  class="size-5"
                />
              </template>
              <PaginationNext class="size-5" />
              <PaginationLast class="size-5" />
            </PaginationList>
          </Pagination>
        </div>
      </template>

      <template v-else>
        <div class="flex-col-center text-muted-foreground min-h-[150px] w-full">
          <EmptyIcon class="size-10" />
          <div class="mt-1 text-sm">{{ $t('common.noData') }}</div>
        </div>
      </template>
    </VbenPopover>-->
</template>
