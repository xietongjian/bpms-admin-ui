<template>
  <BasicModal v-bind="$attrs" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { defineEmits, defineProps } from 'vue';
  import {message} from 'ant-design-vue';

  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import { copyModelInfoFormSchema, copyBizModelInfoFormSchema } from './modelInfo.data';
  import { getFlowCategories } from '#/api/base/category';
  import { copyCustForm } from '#/api/form/customForm';
  import { copyBizForm, checkEntityExist } from '#/api/form/bizForm';
  import { FormValidPatternEnum } from '#/enums/commonEnum';
  import {formSchema} from "#/views/base/app/app.data";

  const emit = defineEmits(['success', 'register']);

  const props = defineProps({
    formType: {
      default: 'custom',
      type: String,
    },
  });

  // const { createMessage } = useMessage();

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

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schemas: props.formType === 'custom' ? copyModelInfoFormSchema : copyBizModelInfoFormSchema,
    wrapperClass: 'grid-cols-1',
  });

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const values = await validate();
      changeLoading(true);
      if (props.formType === 'custom') {
        copyCustForm(values).then((res) => {
          const { data } = res;
          if (data.success) {
            createMessage.success(data.msg, 2);
            closeModal();
            emit('success');
          } else {
            createMessage.error(data.msg, 2);
            changeLoading(false);
            setModalProps({ confirmLoading: false });
          }
        });
      } else {
        copyBizForm(values)
          .then((res) => {
            const { data } = res;
            if (data.success) {
              createMessage.success(data.msg, 2);
              closeModal();
              emit('success');
            } else {
              createMessage.error(data.msg, 2);
              setModalProps({ confirmLoading: false });
              changeLoading(false);
            }
          })
          .finally(() => {
            setModalProps({ confirmLoading: false });
            changeLoading(false);
          });
      }
    } catch (e) {
      changeLoading(false);
      setModalProps({ confirmLoading: false });
    } finally {
      setModalProps({ confirmLoading: true });
    }
  }
</script>
