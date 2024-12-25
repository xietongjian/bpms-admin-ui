<template>
  <BasicModal >
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineEmits, defineExpose } from 'vue';

  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';

  import {message} from 'ant-design-vue';

  import { formSchema } from './category.data';
  import { saveOrUpdate, checkEntityExist } from '#/api/base/category';
  import { getCompanies } from '#/api/org/company';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);

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

  const [registerModal, { setModalProps, closeModal, changeLoading }] = useModalInner(
    async (data) => {
      await resetFields();
      isUpdate.value = !!data?.isUpdate;
      setModalProps({ confirmLoading: true });
      changeLoading(true);
      const treeData = await getCompanies();
      setModalProps({ confirmLoading: false });
      changeLoading(false);
      updateSchema([
        {
          field: 'companyId',
          componentProps: { treeData },
        },
      ]);
      let formData = data.record;

      await updateSchema([
        {
          field: 'code',
          dynamicRules: () => {
            return [
              {
                required: true,
                whitespace: true,
                message: '编码不能为空！',
              },
              {
                // 英文或数字且以英文或下划线开头
                pattern: new RegExp('^[a-zA-Z_]{1,}[0-9a-zA-Z_]{1,}$'),
                type: 'string',
                message: '请输入英文或数字且以英文或下划线开头！',
              },
              {
                max: 30,
                message: '字符长度不能大于30！',
              },
              ...getBaseDynamicRules({
                id: (unref(isUpdate) && formData && formData.id) || '',
                field: 'code',
                fieldValue: '',
                fieldName: '编码',
              }),
            ];
          },
        },
      ]);
      if (unref(isUpdate)) {
        setFieldsValue({
          ...formData,
          frontShow: formData.frontShow === 1,
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
    schema: formSchema,
    wrapperClass: 'grid-cols-1',
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});

      const valid = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      values.frontShow = values.frontShow ? 1 : 0;
      const {success, msg} = await saveOrUpdate(values);
      if(success){
        modalApi.close();
        message.success(msg);
        emit('success');
      } else{
        message.error(msg);
      }
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }
  defineExpose(modalApi);
</script>
