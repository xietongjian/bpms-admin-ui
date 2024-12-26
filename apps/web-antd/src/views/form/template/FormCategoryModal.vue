<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineEmits } from 'vue';

  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import { formCategoryFormSchema } from './formTemplate.data';
  import { getFormCategoryTreeData, saveOrUpdateFormCategory, checkTemplateCategoryEntityExist } from '#/api/form/formTemplate';
  import { useMessage } from '@/hooks/web/useMessage';
  import {CheckExistParams} from "#/api/model/baseModel";
  import { FormValidPatternEnum } from '#/enums/commonEnum';

  const emit = defineEmits(['success']);
  const { createMessage } = useMessage();

  const isUpdate = ref(true);

  const [registerForm, { resetFields, updateSchema, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: formCategoryFormSchema,
    showActionButtonGroup: false,
  });


  const getBaseDynamicRules = (params: CheckExistParams) => {
    return [
      {
        trigger: 'blur',
        validator: (_, value) => {
          if (value) {
            return checkTemplateCategoryEntityExist({
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

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: true, loading: true });
    isUpdate.value = !!data?.isUpdate;
    let formData = data.record;
    debugger;
    const categoryTreeData = await getFormCategoryTreeData();

    await updateSchema([
      {
        field: 'pid',
        componentProps: {treeData: categoryTreeData, fieldNames: {value: 'id', label: 'name'}},
      },
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

    await setFieldsValue({
      ...formData,
    });
    setModalProps({ confirmLoading: false, loading: false });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true, loading: true });
      const values = await validate();
      const {success, msg} = await saveOrUpdateFormCategory(values);
      if(success){
        createMessage.success(msg);
        closeModal();
        emit('success');
      } else{
        createMessage.error(msg);
      }
    } finally {
      setModalProps({ confirmLoading: false, loading: false });
    }
  }
</script>
