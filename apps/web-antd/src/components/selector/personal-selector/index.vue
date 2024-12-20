<template>
  <div>
    <Select
      :value="selectorListRef"
      v-bind="attrs"
      style="width: 100%"
      :open="false"
      :mode="selectMode"
      :allowClear="true"
      :labelInValue="true"
      maxTagPlaceholder=""
      @change="changeSelectItem"
      @click="openSelectorModal"
      :showArrow="true"
    >
      <template #tagRender="{ value: val, label, closable, onClose, option }">
        <EmpInfo :no="val" :name="label">
          <Tag
            class="personal-multiple-tag"
            color="processing"
            :closable="closable"
            style="font-size: 14px; line-height: 20px; margin-right: 3px"
            @close="onClose"
          >
            <template #icon>
              <UserOutlined />
            </template>
            <template #closeIcon>
              <CloseOutlined style="color: #ed6f6f" />
            </template>
            <span style="">{{ label }}</span>
          </Tag>
        </EmpInfo>
      </template>
      <template #clearIcon>
        <CloseCircleOutlined @click="clearSelectedList" />
      </template>
      <template #suffixIcon>
        <SearchOutlined style="color: #666" />
      </template>
      <template #[item]="data" v-for="item in Object.keys($slots)">
        <slot :name="item" v-bind="data"></slot>
      </template>
    </Select>

    <PersonalSelectorModal @register="registerPersonalModal" @change="handleChange" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watch, unref, onMounted } from 'vue';
  import PersonalSelectorModal from './PersonalSelectorModal.vue';
  import Icon from '#/components/Icon/Icon.vue';
  import { Tooltip, Select, Tag } from 'ant-design-vue';


  import {
    SearchOutlined,
    CloseCircleOutlined,
    UserOutlined,
    CloseOutlined,
  } from '@ant-design/icons-vue';
  import { selectorContainerProps } from './props';
  import { EmpInfo } from '#/views/components/EmpInfo';

  export default defineComponent({
    name: 'PersonalSelector',
    components: {
      SearchOutlined,
      CloseCircleOutlined,
      UserOutlined,
      CloseOutlined,
      PersonalSelectorModal,
      Select,
      Icon,
      Tag,
      EmpInfo,
      Tooltip,
    },
    props: selectorContainerProps,
    emits: ['change'],

    setup(props, { emit, attr }) {
      const attrs = useAttrs();
      const [
        registerPersonalModal,
        { openModal: openPersonalSelector, setModalProps: setPersonalModalProps },
      ] = useModal();
      const selectorListRef = ref<any[]>([]);
      const selectorValue = ref<any[]>([]);
      const selectMode = ref<string>('');

      onMounted(() => {
        if (props.multiple) {
          selectMode.value = 'multiple';
        } else {
          selectMode.value = '';
        }
      });

      watch(
        () => props.value,
        (value = []) => {
          value &&
            value.forEach((item) => {
              item.label = item.name;
              item.key = item.code;
            });
          selectorListRef.value = value;
        },
        { immediate: true },
      );

      function handleChange(items: any[]) {
        items &&
          items.forEach((item) => {
            item.value = item.code;
            item.label = item.name;
            item.key = item.code;
            item.title = item.name;
          });
        selectorListRef.value = items || [];
        emit('change', selectorListRef.value);
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
            return { code: item.key, name: item.label, ...item };
          });
        selectorListRef.value = result;
        emit('change', result);
      }

      // 选择弹窗
      function openSelectorModal(record: Recordable) {
        if (unref(attrs).disabled) {
          return;
        }
        // 加载已选择的数据
        openPersonalSelector(true, {
          selectorProps: {
            ...props,
            defaultSelectedOrgKeys: props.defaultSelectedOrgKeys,
            selectedList: selectorListRef.value,
          },
        });
        let title = props.title;
        if (!title) {
          title = `选择人员`;
        }

        setPersonalModalProps({
          title,
          width: 850,
          centered: true,
          showOkBtn: true,
          showCancelBtn: true,
        });
      }

      return {
        attrs,
        registerPersonalModal,
        openSelectorModal,
        selectorValue,
        handleChange,
        changeSelectItem,
        clearSelectedList,
        selectorListRef,
        selectMode,
      };
    },
  });
</script>
<style lang="less">
  .personal-multiple-tag {
    height: 23px;
    line-height: 22px;
    margin-top: 2px;
    margin-bottom: 2px;
    .ant-tag-close-icon {
      font-size: inherit;
    }
  }
</style>
