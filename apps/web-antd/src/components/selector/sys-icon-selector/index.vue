<script setup lang="ts">
import type { VNode } from 'vue';
import { computed, ref, unref, useAttrs, watch, watchEffect } from 'vue';
import { usePagination } from '@vben/hooks';
import {Popover, Empty, Input, Segmented, Button, Pagination} from 'ant-design-vue';
import {getIconInfoListByPage, getIconCategoryListData} from "#/api/base/iconInfo";
import { objectOmit, refDebounced, watchDebounced } from '@vueuse/core';
// import { fetchIconsData } from './icons';
import {CloseOutlined, StopOutlined, PictureOutlined} from '@ant-design/icons-vue'
interface Props {
  pageSize?: number;
  /** 图标集的名字 */
  prefix?: string;
  /** 是否自动请求API以获得图标集的数据.提供prefix时有效 */
  autoFetchApi?: boolean;
  /**
   * 图标列表
   */
  icons?: string[];
  /** Input组件 */
  inputComponent?: VNode;
  /** 图标插槽名，预览图标将被渲染到此插槽中 */
  iconSlot?: string;
  /** input组件的值属性名称 */
  modelValueProp?: string;
  /** 图标样式 */
  iconClass?: string;
  type?: 'icon' | 'input';
}

const props = withDefaults(defineProps<Props>(), {
  prefix: 'ant-design',
  pageSize: 36,
  icons: () => [],
  iconSlot: 'default',
  iconClass: 'size-4',
  autoFetchApi: true,
  modelValueProp: 'modelValue',
  inputComponent: undefined,
  type: 'input',
});

const emit = defineEmits<{
  change: [string];
}>();

const attrs = useAttrs();

const modelValue = defineModel({ default: '', type: String });
const loading = ref();

const visible = ref(false);
const currentSelect = ref('');
const currentPage = ref(1);
const keyword = ref('');
const keywordDebounce = refDebounced(keyword, 300);
const innerIcons = ref<string[]>([]);
const currentList = ref([]);
const searchText = ref('');

const categoryId = ref('');

const categories = ref<any[]>([]);
function fetchSysIconListByCategory(e) {
  pagination.value.current = 1;
  loadData();
}

const pagination = ref({
  total: 0,
  current: 1,
  pageSize: 50,
});

watchDebounced(
  () => props.prefix,
  async (prefix) => {
    if (prefix && prefix !== 'svg' && props.autoFetchApi) {
      // innerIcons.value = await fetchIconsData(prefix);
    }
  },
  { immediate: true, debounce: 500, maxWait: 1000 },
);

/*const currentList = computed(() => {
  try {
    if (props.prefix) {
      if (
        props.prefix !== 'svg' &&
        props.autoFetchApi &&
        props.icons.length === 0
      ) {
        return innerIcons.value;
      }
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
});*/

const showList = computed(() => {
  return currentList.value.filter((item) =>
    item.name.includes(keywordDebounce.value)||item.sn.includes(keywordDebounce.value),
  );
});

const { paginationList, total, setCurrentPage } = usePagination(
  showList,
  props.pageSize,
);

watchEffect(() => {
  currentSelect.value = modelValue.value;
});

watch(
  () => currentSelect.value,
  (v) => {
    emit('change', v);
  },
);

watch(
  () => keywordDebounce.value,
  (v) => {
    loadData();
  },
);

const handleClick = (iconObj: any) => {
  currentSelect.value = iconObj.icon;
  modelValue.value = iconObj.icon;
  close();
};

function handleClear(e){
  e.preventDefault();
  e.stopPropagation();
  modelValue.value = '';
  currentSelect.value = '';
}

const handlePageChange = (page: number) => {
  pagination.value.current = page;
  loadData();
};

const handleShowSizeChange = (page: number, size: number) => {
  pagination.value.pageSize = size;
  loadData();
};

function toggleOpenState() {
  visible.value = !visible.value;
}

function open() {
  visible.value = true;
}

function handleOpenChange(val) {
  if (val) {
    loadCategories();
    loadData();
  }
}

function loadCategories() {
  getIconCategoryListData().then((res) => {
    categories.value = res.map(item => {
      return { ...item, value: item.id, title: item.name, label: item.name }
    });
    categories.value.unshift({
      value: '',
      title: '全部',
    });
  });
}

async function loadData() {
  try {
    loading.value = true;
    const params = {
      entity: {
        keyword: keywordDebounce.value,
        categoryId: categoryId.value
      },
      query: {
        pageNum: unref(pagination).current,
        pageSize: unref(pagination).pageSize,
      }
    };
    const res = await getIconInfoListByPage(params);
    currentList.value = res.rows;
    pagination.value.total = res.total;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

function close() {
  visible.value = false;
}

function onKeywordChange(v: string) {
  keyword.value = v;
}

const searchInputProps = computed(() => {
  return {
    placeholder: '请输入关键字',
    allowClear: true,
    [props.modelValueProp]: keyword.value,
    [`onUpdate:${props.modelValueProp}`]: onKeywordChange,
    class: '',
  };
});

function updateCurrentSelect(v: string) {
  currentSelect.value = v;
  const eventKey = `onUpdate:${props.modelValueProp}`;
  if (attrs[eventKey] && isFunction(attrs[eventKey])) {
    attrs[eventKey](v);
  }
}


const getBindAttrs = computed(() => {
  return objectOmit(attrs, [`onUpdate:${props.modelValueProp}`]);
});

defineExpose({ toggleOpenState, open, close });
</script>
<template>
  <Popover
    @openChange="handleOpenChange"
    trigger="click"
    v-model:open="visible"
    overlayClassName="max-w-[700px]"
  >
    <div class="group bg-card relative w-20 h-20 border border-dotted hover:border-primary rounded flex justify-center items-center cursor-pointer">
      <img v-if="!!currentSelect" :src="currentSelect" class="w-16 h-16 object-cover margin-auto"/>
      <PictureOutlined v-else class="text-4xl opacity-30" />
      <div v-if="!!currentSelect" @click="handleClear" class="group-hover:visible invisible rounded-full p-[1px] bg-primary/10 hover:bg-primary/20 absolute top-0 right-0 text-primary">
        <CloseOutlined />
      </div>
    </div>
    <template #content>
      <div class="flex flex-col">
        <div class="mb-2 flex w-full">
          <component
              v-if="inputComponent"
              :is="inputComponent"
              v-bind="searchInputProps"
          />
          <Input
              v-else
              class="h-8 w-full"
              :placeholder="'请选择图标'"
              v-model="keyword"
          />
        </div>
        <div class="overflow-x-auto">
          <Segmented
              v-model:value="categoryId"
              :options="categories"
              @change="fetchSysIconListByCategory"
          >
            <template #label="{value, title}">
              {{ title }}
            </template>
          </Segmented>
        </div>
        <div v-loading="loading" v-if="currentList.length > 0" class="max-h-[258px] p-2 overflow-y-auto min-h-40 min-w-200">
          <div class="grid w-full grid-cols-10 gap-2 justify-items-center">
            <div
                class="bg-card cursor-pointer rounded hover:ring hover:ring-2 hover:ring-primary hover:ring-primary/90 p-[1px]"
                :class="{'ring-2 ring-primary ring-primary/60': currentSelect === item.icon}"
                v-for="(item, index) in currentList"
                :key="index"
                :title="item.name"
                @click="handleClick(item)"
            >
              <img :alt="item.name" :src="item.icon" class="w-10 h-10 object-cover" />
            </div>
          </div>
        </div>

        <template v-else>
          <div class="flex-col-center text-muted-foreground border w-full min-w-[517px] p-4">
            <Empty/>
          </div>
        </template>
        <div
            v-if="pagination.total >= pagination.pageSize"
            class="flex-center flex justify-end border-t py-2 pr-3"
        >
          <Pagination
              :pageSizeOptions="['50', '100', '150', '200', '500']"
              :defaultPageSize="50"
              @change="handlePageChange"
              @showSizeChange="handleShowSizeChange"
              size="small"
              v-model:current="pagination.current"
              :total="pagination.total" />
        </div>
      </div>
    </template>
  </Popover>
</template>
