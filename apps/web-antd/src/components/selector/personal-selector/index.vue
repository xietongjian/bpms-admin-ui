<template>
  <div class="w-full">
    <Select
        v-bind="$attrs"
        :value="modelValue"
        :open="false"
        :mode="selectMode"
        :allowClear="true"
        :placeholder="placeholder"
        :labelInValue="true"
        maxTagPlaceholder=""
        @change="changeSelectItem"
        @click="openSelectorModal"
        :showArrow="true"
        class="w-full [&_.ant-select-selection-overflow]:gap-1 "
    >
      <template #tagRender="{ value: val, label, closable, onClose, option }">
        <EmpInfo :no="val" :name="label">
          <Tag class="personal-multiple-tag leading-6 text-sm me-0"
              color="processing"
              :closable="closable"
              @close="onClose"
          >
            <template #icon>
              <UserOutlined/>
            </template>
            <template #closeIcon>
              <CloseOutlined class="!cursor-pointer" style="color: #ed6f6f"/>
            </template>
            <span style="">{{ label }}</span>
          </Tag>
        </EmpInfo>
      </template>
      <template #clearIcon>
        <CloseCircleOutlined @click="clearSelectedList"/>
      </template>
      <template #suffixIcon>
        <SearchOutlined style="color: #666"/>
      </template>
    </Select>

    <PersonalSelectorModal ref="personalSelectorModalRef" @change="handleChange"/>
  </div>
</template>
<script lang="ts" setup>
import { defineEmits, defineProps, ref, watch, watchEffect} from 'vue';
import PersonalSelectorModal from './PersonalSelectorModal.vue';
import {Select, Tag} from 'ant-design-vue';
import {CloseCircleOutlined, CloseOutlined, SearchOutlined, UserOutlined,} from '@ant-design/icons-vue';
import {EmpInfo} from '#/views/components/EmpInfo';

interface Props {
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 选择数据类型
   * personal 只选择人员
   * mix 混合，可选择人员，也可选择组织
   */
  type?: 'personal' | 'mix';
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
}

// [ { "code": "001", "name": "张三", "type": "personal" }, { "code": "002", "name": "李四", "type": "personal" } ]
const modelValue = defineModel({default: [], type: Array});
const currentSelect = ref<any[]>();

const emit = defineEmits<{
  change: [object];
}>();

const personalSelectorModalRef = ref();
const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  type: 'personal',
  closeOnSelect: false,
  selectOnModal: false,
  modalTitle: '选择人员',
  placeholder: '请选择人员'
});


const selectorListRef = ref<any[]>();
const selectMode = ref<string>('tags');

watch(
    () => modelValue.value,
    (v) => {
      emit('change', v);
    },
);
watchEffect(() => {
  modelValue.value.forEach((item: any) => {
    item['label'] = item.name;
    item['value'] = item.code;
  });
  currentSelect.value = modelValue.value;
});

function handleChange(items: any[]) {
  const result = items.map(item => {
    return {
      label: item.name,
      value: item.code
    }
  });
  modelValue.value = result;
  currentSelect.value = result;
}

function clearSelectedList(e) {
  e.stopPropagation();
  selectorListRef.value = [];
  emit('change', selectorListRef.value);
}

function changeSelectItem(items: any[]) {
  const result =
      items &&
      items.map((item) => {
        return {code: item.key, name: item.label, ...item};
      });
  selectorListRef.value = result;
}

// 选择弹窗
function openSelectorModal() {
  personalSelectorModalRef.value.setData({
    ...props,
    selectedList: currentSelect.value,
  });
  personalSelectorModalRef.value.setState({
    title: props.modalTitle
  });
  personalSelectorModalRef.value.open();
}
</script>
