<template>
  <div class="w-full">
    <Select
        v-bind="$attrs"
        v-model:value="modelValue"
        :open="false"
        :options="[]"
        :mode="selectMode"
        :allowClear="true"
        :placeholder="placeholder"
        :labelInValue="true"
        maxTagPlaceholder=""
        @click="openSelectorModal"
        :showArrow="true"
        :showSearch="true"
        class="w-full [&_.ant-select-selection-overflow]:gap-1 "
    >
      <template #tagRender="{ value, label, closable, onClose }">
        <Tag class="personal-multiple-tag leading-6 text-sm me-0"
             color="processing"
             :closable="closable"
             @close="onClose"
        >
          <!--            <template #icon>
                        <UserOutlined/>
                      </template>-->
          <template #closeIcon>
            <CloseOutlined class="!cursor-pointer text-red-600"/>
          </template>
          <span>{{ label }}</span>
        </Tag>
      </template>
      <template #clearIcon>
        <CloseCircleOutlined @click="clearSelectedList"/>
      </template>
      <template #suffixIcon>
        <SearchOutlined style="color: #666"/>
      </template>
    </Select>

    <SelectorModal ref="selectorModalRef" @change="handleChange"/>
  </div>
</template>
<script lang="ts" setup>
import { defineEmits, defineProps, ref, watch, watchEffect} from 'vue';
import SelectorModal from './SelectorModal.vue';
import {Select, Tag} from 'ant-design-vue';
import {CloseCircleOutlined, CloseOutlined, SearchOutlined, UserOutlined,} from '@ant-design/icons-vue';

interface Props {
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 选择数据类型
   * bpmn 流程模板
   * dmn 决策模板
   */
  type?: 'bpmn' | 'dmn';
  /**
   * 选中时关闭弹窗，只有单选，是否弹窗选择为true时才生效
   */
  closeOnSelect?: boolean;
  /**
   * 是否弹窗选择人员
   */
  selectOnModal?: boolean;
  /**
   * 弹窗标题
   */
  modalTitle?: string;
  placeholder?: string;
  change?: Function;
}

/**
 * [{
 *   value: '001', label: '请假流程', type: 'bpmn',
 * },{
 *   value: '002', label: '出差流程', type: 'bpmn',
 * }]
 */
const modelValue = defineModel({default: [], type: Array});
const currentSelect = ref<any[]>();

const emit = defineEmits<{
  change: [object];
}>();

const selectorModalRef = ref();
const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  type: 'bpmn',
  closeOnSelect: false,
  selectOnModal: false,
  modalTitle: '选择流程模板',
  placeholder: '请选择流程模板'
});

const selectMode = ref<string>('multiple');

watch(
    () => modelValue.value,
    (v) => {
        const val = v.map(item => {
            return {
                ...item,
                value: item.modelKey,
                label: item.modelName
            }
        })
      emit('change', val);
      if (typeof props.change === 'function') {
        props.change(val);
      }
    },
);
watchEffect(() => {
    debugger;
  currentSelect.value = modelValue.value;
});

function handleChange(items: any[]) {
  const selectedItems = JSON.parse(JSON.stringify(items));
  const result = selectedItems.map(item => {
    return {
      label: item.name || item.label,
      value: item.code || item.value,
      key: item.code,
      id: item.id,
      code: item.code,
      companyId: item.companyId,
      companyName: item.companyName,
      deptId: item.deptId,
      deptName: item.deptName,
      disabled: item.disabled,
      leaderCode: item.leaderCode,
      leaderName: item.leaderName,
      name: item.name,
    }
  });
  modelValue.value = result;
  currentSelect.value = result;
  // emit('change', result);
}

function clearSelectedList(e) {
  e.stopPropagation();
  emit('change', []);
}

// 选择弹窗
function openSelectorModal() {
  selectorModalRef.value.setData({
    ...props,
    selectedList: currentSelect.value,
  });
  selectorModalRef.value.setState({
    title: props.modalTitle
  });
  selectorModalRef.value.open();
}
</script>
