<template>
  <BasicModal class="w-[600px]" v-bind="$attrs" >
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, defineEmits, defineProps, defineExpose } from 'vue';
  import {message} from 'ant-design-vue';

  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import { copyModelInfoFormSchema, copyBizModelInfoFormSchema } from './modelInfo.data';
  import { getFlowCategories } from '#/api/base/category';
  import { copyCustForm } from '#/api/form/customForm';
  import { copyBizForm, checkEntityExist } from '#/api/form/bizForm';
  import { FormValidPatternEnum } from '#/enums/commonEnum';

  const emit = defineEmits(['success', 'register']);

  const formType = ref('custom');


  // const { message } = useMessage();

  /*const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: props.formType === 'custom' ? copyModelInfoFormSchema : copyBizModelInfoFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const getBaseDynamicRules = (params: any) => {
    return [
      {
        trigger: 'blur',
        validator: (_, value) => {
          if (value) {
            return checkEntityExist({
              id: params.id,
              field: params.field,
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

  const [registerModal, { setModalProps, changeLoading, closeModal }] = useModalInner(
    async (data) => {
      resetFields();
      changeLoading(true);
      let formData = data.record;
      // 加载分类
      getFlowCategories()
        .then(async (res) => {
          await updateSchema([
            {
              field: 'newCategoryCode',
              componentProps: {
                treeData: res,
              },
            },
          ]);
        })
        .finally(() => {
          changeLoading(false);
        });

      if (props.formType === 'biz') {
        await updateSchema([
          {
            field: 'newModelKey',
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
                  max: 40,
                  message: '字符长度不能大于40！',
                },
                ...getBaseDynamicRules({
                  id: '',
                  field: 'newModelKey',
                  fieldValue: '',
                  fieldName: '流程标识',
                }),
              ];
            },
          },
        ]);
        setFieldsValue({
          fromModelKey: formData.modelKey,
          newCategoryCode: formData.categoryCode,
          newModelName: formData.name + '-copy',
          newModelKey: formData.modelKey + '_copy',
        });
      } else {
        setFieldsValue({
          fromModelKey: formData.modelKey,
          newCategoryCode: formData.categoryCode,
          newModelName: formData.name + '-copy',
        });
      }
    },
  );*/


  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        formType.value = values.formType === 0 ? 'custom' : 'biz';
        formApi.setState({ schema: values.formType === 0 ? copyModelInfoFormSchema: copyBizModelInfoFormSchema });

        debugger;
        if (values) {
          formApi.setValues({
            fromModelKey: values.modelKey,
            newCategoryCode: values.categoryCode,
            newModelName: values.name + '-copy',
            newModelKey: values.modelKey + '_copy',
          });
          // 自定义表单
          if(values.formType === 0){
            // 设置表单规则
          }
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await formApi.submitForm();
      handleSubmit();
    },
  });

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: [],
    wrapperClass: 'grid-cols-1',
  });

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});
      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      const {success, msg} =
          formType.value === 'custom'
          ? await copyCustForm(values)
          : await copyBizForm(values);

      if (success) {
        message.success(msg, 2);
        modalApi.close();
        emit('success');
      } else {
        message.error(msg, 2);
      }
    } catch (e) {
      console.error(e);
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }
  defineExpose(modalApi);
</script>
