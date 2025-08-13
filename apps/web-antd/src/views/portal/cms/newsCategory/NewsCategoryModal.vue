<template>
  <BasicModal >
    <BasicForm >
      <template #styleRenderSlot="{ model, field }">
        <!--        <a-input v-model:value="model[field]" placeholder="自定义slot" />-->
        <div style="line-height: 0px">
          <Space class="color-selector">
            <span @click="()=>{model[field] = item}"
                  v-for="item in colorList"
                  class="color-item"
                  :class="{'selected': item===model[field]}"
                  :style="{background: item}" :title="item">
              <StopOutlined title="默认" style="font-size: 26px; color: gray" v-if="item===''" />
            </span>
          </Space>
        </div>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { computed, ref, unref, defineExpose, defineEmits } from 'vue';
  import {useVbenDrawer, useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import { formSchema } from './newsCategory.data';
  import { checkEntityExist, insert, update } from '#/api/portal/cms/newsCategory';
  // import { CheckExistParams } from '#/api/model/baseModel';
  // import { FormValidPatternEnum } from '#/enums/commonEnum';
  import { Select, Space, Dropdown } from 'ant-design-vue';
  import { DownOutlined, StopOutlined } from '@ant-design/icons-vue';

  const colorList = [
    '',
    '#547BD5',
    '#5CCDB2',
    '#FF4D4F',
    '#B57DD7',
    '#F1A347',
    // '#00af57',
    // '#00afee',
    // '#0071be',
    // '#00215f',
    // '#72349d',
  ];

  const emit = defineEmits(['success'])

  const isUpdate = ref(true);

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: formSchema,
    wrapperClass: 'grid-cols-1',
  });

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          formApi.setValues(values);
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await formApi.submitForm();
      handleSubmit();
    },
  });

  /*const [registerForm, { resetFields, updateSchema, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const getBaseDynamicRules = (params: CheckExistParams) => {
    return [
      {
        trigger: 'blur',
        validator: (_, value) => {
          if (value) {
            return checkEntityExist({
              id: params.id,
              fieldName: params.field,
              fieldValue: value,
              fieldName: params.fieldName,
            })
                .then((res) => {
                  if (res) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(params.fieldName + '已存在，请修改！');
                  }
                })
                .catch((res) => {
                  return Promise.reject(res);
                });
          } else {
            return Promise.resolve();
          }
        },
      },
    ] as Rule[];
  };

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    let formData = data.record;

    await updateSchema([
      {
        fieldName: 'sn',
        dynamicRules: () => {
          return [
            {
              required: true,
              whitespace: true,
              message: '标识不能为空！',
            },
            {
              pattern: new RegExp(FormValidPatternEnum.SN),
              type: 'string',
              message: '请输入英文或数字！',
            },
            {
              max: 32,
              message: '字符长度不能大于32！',
            },
            ...getBaseDynamicRules({
              id: (unref(isUpdate) && formData && formData.id) || '',
              fieldName: 'sn',
              fieldValue: '',
              fieldName: '标识',
            }),
          ];
        },
        componentProps: {
          disabled: unref(isUpdate) && formData.id,
        },
      },
    ]);

    if (unref(isUpdate)) {
      setFieldsValue({
        ...formData,
      });
    }
  });*/

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function handleSubmit() {
    try {
      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      modalApi.setState({loading: true, confirmLoading: true});
      if (values.id) {
        await update(values);
      } else {
        await insert(values);
      }

      modalApi.close();
      emit('success');
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }

/*  export default defineComponent({
    name: 'NewsCategoryModal',
    components: { BasicModal, BasicForm, Dropdown, DownOutlined, Space, StopOutlined },
    emits: ['success', 'register'],
    setup(_, { emit }) {


      return { registerModal, registerForm, getTitle, handleSubmit, colorList };
    },
  });*/

  defineExpose(modalApi);
</script>

<style lang="less" scoped>
  .color-selector {
    .color-item {
      width: 26px;
      height: 26px;
      display: inline-block;
      outline: 4px solid transparent !important;
    }
    .selected {
      outline: 4px solid red !important;
    }
  }
</style>
