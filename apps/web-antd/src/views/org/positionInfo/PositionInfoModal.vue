<script lang="ts" setup>
  import { ref, computed, unref, defineExpose, defineEmits } from 'vue';

  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import {message} from 'ant-design-vue';
  import { formSchema } from './positionInfo.data';
  import { saveOrUpdate } from '#/api/org/positionInfo';
  import { formatToDate } from '#/utils/dateUtil';
  import dayjs from "dayjs";

  const isUpdate = ref(true);
  const emit = defineEmits(["success"])

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      labelWidth: 100,
    },
    schema: formSchema,
    showDefaultActions: false,
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
          const formData = {...values, startDate: dayjs(values.startDate)};
          formApi.setValues(formData);
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await baseFormApi.submitForm();
      handleSubmit();
    },
  });
  /*const getBaseDynamicRules = (params: any) => {
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
  };*/

  /*const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    let formData = data.record;

    await updateSchema([
      {
        field: 'code',
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
              id: (unref(isUpdate) && formData && formData.id) || '',
              field: 'code',
              fieldValue: '',
              fieldName: '标识',
            }),
          ];
        },
      },
    ]);
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    }
  });*/

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});

      const { valid } = await formApi.validate();
      if (!valid) {
        return;
      }
      const values = await formApi.getValues();
      if (values.startDate) {
        values.startDate = formatToDate(values.startDate);
      }
      const {success, msg} = await saveOrUpdate(values);
      if(success){
        message.success(msg);
        modalApi.close();
        emit('success');
      } else {
        message.error(msg);
      }
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }

  defineExpose(modalApi)
</script>
<template>
  <BasicModal>
    <BasicForm/>
  </BasicModal>
</template>
