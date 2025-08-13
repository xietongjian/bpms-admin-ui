<template>
  <BasicModal >
    <BasicForm >
      <template #styleRenderSlot="{ model, field }">
        <!--        <a-input v-model:value="model[field]" placeholder="自定义slot" />-->
        <div style="line-height: 0px">
          <Space class="color-selector">
            <span
              @click="
                () => {
                  model[field] = item;
                }
              "
              v-for="item in colorList"
              class="color-item"
              :class="{ selected: item === model[field] }"
              :style="{ background: item }"
              :title="item"
            >
              <StopOutlined title="默认" style="font-size: 26px; color: gray" v-if="item === ''" />
            </span>
          </Space>
        </div>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref,defineExpose } from 'vue';
  // import { BasicModal, useModalInner } from '#/components/Modal';
  // import { BasicForm, Rule, useForm } from '#/components/Form';
  import { formSchema } from './noticeCategory.data';
  import { insert, update, checkEntityExist } from '#/api/portal/cms/noticeCategory';
  // import { CheckExistParams } from '#/api/model/baseModel';
  // import { FormValidPatternEnum } from '#/enums/commonEnum';
  import { Select, Space, Dropdown } from 'ant-design-vue';
  import { DownOutlined, StopOutlined } from '@ant-design/icons-vue';
  import {useVbenDrawer, useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';

  const colorList = [
    '',
    '#c21401',
    '#ff1e02',
    '#ffc12a',
    '#ffff3a',
    '#90cf5b',
    '#00af57',
    '#00afee',
    '#0071be',
    '#00215f',
    '#72349d',
  ];


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
      let signerSelector = [];
      if (formData.signerNo) {
        signerSelector = [
          { code: formData.signerNo, name: formData.signerName, label: formData.signerName },
        ];
      }
      setFieldsValue({
        ...formData,
        signerSelector,
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

      if (values.haveSigner) {
        if (values.refSubjectSigner) {
          values.signerNo = '';
          values.signerName = '';
        } else {
          if (values.signerSelector) {
            values.signerNo = values.signerSelector[0].code;
            values.signerName = values.signerSelector[0].name;
          }
        }
      } else {
        values.signerNo = '';
        values.signerName = '';
      }
      delete values.signerSelector;
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
      name: 'NoticeCategoryModal',
      components: { BasicModal, BasicForm, Dropdown, DownOutlined, Space, StopOutlined },
      emits: ['success', 'register'],
      setup(_, { emit }) {

        return { registerModal, registerForm, getTitle, handleSubmit, colorList };
      },
    });*/
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
