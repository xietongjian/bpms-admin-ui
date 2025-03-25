<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerBusinessModal"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { defineComponent, defineEmits, ref, computed, unref } from 'vue';
  // import { BasicModal, useModalInner } from '@/components/Modal';
  // import { BasicForm, Rule, useForm } from '@/components/Form';
  import {useVbenForm} from "#/adapter/form";
  import {useVbenModal} from '@vben/common-ui';
  import {Button, message} from 'ant-design-vue';

  import { formSchemaBusiness } from './framework.data';
  import { saveOrUpdate, checkEntityExist } from '#/api/bpm/businessflow';
  import {formSchema} from "#/views/org/jobGradeType/jobGradeType.data";

  const emit = defineEmits(['success'])

  const isUpdate = ref(true);
  const frameworkId = ref('');


  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      labelWidth: 100,
    },
    schema: formSchemaBusiness,
    showDefaultActions: false,
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


  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    async onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          formApi.resetForm();
          modalApi.setState({loading: false, confirmLoading: false});

          let formData = values;
          await formApi.updateSchema([
            {
              field: 'name',
              dynamicRules: () => {
                return [
                  {
                    required: true,
                    whitespace: true,
                    message: '名称不能为空！',
                  },
                  {
                    max: 64,
                    message: '字符长度不能大于64！',
                  },
                  /*...getBaseDynamicRules({
                    id: (unref(isUpdate) && formData && formData.id) || '',
                    field: 'name',
                    fieldValue: '',
                    fieldName: '名称',
                  }),*/
                ];
              },
            },
          ]);
          if (unref(isUpdate)) {
            frameworkId.value = values.frameworkId;
            formApi.setValues(values);
          } else {
            frameworkId.value = values.frameworkId;
          }
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await baseFormApi.submitForm();
      handleSubmit();
    },
  });


  const getTitle = computed(() => (!unref(isUpdate) ? '流程建模' : '修改模型'));

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});

      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      values['frameworkId'] = frameworkId.value;
      const {success, msg} = await saveOrUpdate(values);
      if(success){
        emit('success');
        modalApi.close();
        message.success(msg);
      } else {
        message.error(msg);
      }
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }
  /*export default defineComponent({
    name: 'Businessflow',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      return { registerBusinessModal, registerForm, getTitle, handleSubmit };
    },
  });*/
</script>
