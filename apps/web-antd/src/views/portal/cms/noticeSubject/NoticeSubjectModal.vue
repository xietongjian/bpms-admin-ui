<template>
  <BasicModal >
    <BasicForm />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref,defineExpose } from 'vue';
  import {useVbenDrawer, useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import { formSchema } from './noticeSubject.data';
  import { insert, update, checkEntityExist } from '#/api/portal/cms/noticeSubject';
  // import { CheckExistParams } from '#/api/model/baseModel';
  import { FormValidPatternEnum } from '#/enums/commonEnum';
  // import { OrgDataType } from '#/components/Selector/src/types';
  import { getAllPublishRange } from '#/api/portal/cms/publishRange';

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

/*
  const [registerForm, { resetFields, updateSchema, setFieldsValue, validate }] = useForm({
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

    if (formData?.signerNo) {
      formData.signerSelector = [{ code: formData.signerNo, name: formData.signerName }];
    } else {
      formData && (formData.signerSelector = []);
    }

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

    let signerSelector = [];
    if (formData?.haveSigner) {
      signerSelector = [
        { code: formData.signerNo, name: formData.signerName, label: formData.signerName },
      ];
    }
    let usingRanges = [];
    let signatureImgUploader = [];

    if (unref(isUpdate)) {
      /!*if(formData.id){
        usingRanges = await getAllPublishRange({dataId: formData.id, dataType: 'NOTICE_SUBJECT'});
      }*!/

      if (formData.signatureImg) {
        signatureImgUploader = [
          {
            name: 'file.name',
            filePath: formData.signatureImg,
            fileType: formData.signatureImg.split('.').pop(),
            fileSize: 111,
          },
        ];
      }

      setFieldsValue({
        ...formData,
        // usingRanges: usingRanges,
        // logoUploader: logoUploader,
        signatureImgUploader: signatureImgUploader,
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
      debugger;
      /*values.usingRanges = values.usingRanges.map(item=>{
        return {
          rangeId: item.code,
          rangeName: item.name,
          rangeType: Object.keys(OrgDataType)[item.sourceType-1]
        }
      });*/

      if (values.haveSigner) {
        const signer = values.signerSelector;
        values.signerName = signer[0].name;
        values.signerNo = signer[0].code;
      } else {
        values.signerNo = '';
        values.signerName = '';
      }

      // logoUploader， signatureImgUploader
      if (values.logoUploader && values.logoUploader.length > 0) {
        values.logo = values.logoUploader[0].filePath;
        delete values.logoUploader;
      } else {
        values.logo = '';
      }
      // if(values.signatureImgUploader && values.signatureImgUploader.length>0){
      //   values.signatureImg = values.signatureImgUploader[0].filePath
      //   delete values.signatureImgUploader;
      // }else{
      //   values.signatureImg='';
      // }

      delete values.signerSelector;
      values.haveSigner = values.haveSigner ? 1 : 0;
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

  /*export default defineComponent({
    name: 'NoticeSubject',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {


      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });*/
</script>
