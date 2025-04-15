<script lang="ts" setup>
import {defineExpose, defineEmits, ref} from 'vue';
import {useVbenModal} from '@vben/common-ui';
import {message} from 'ant-design-vue';
import {accountFormSchema} from './account.data';
import {useVbenForm} from '#/adapter/form';
import {saveOrUpdate} from '#/api/privilege/account';

const emit = defineEmits<{
  onSuccess: [void];
}>();

const [BasicModal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = modalApi.getData<Record<string, any>>();
      if (values) {
        baseFormApi.setValues(values);
        modalApi.setState({loading: false, confirmLoading: false});
      }
    }
  },
  onConfirm() {
    handleSubmit();
  },
});

const [BasicForm, baseFormApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: accountFormSchema,
  wrapperClass: 'grid-cols-1',
});

async function handleSubmit() {
  modalApi.setState({loading: true, confirmLoading: true});
  const {valid} = await baseFormApi.validate();
  if (!valid) {
    return;
  }
  try {
    const values = await baseFormApi.getValues();
    const {msg, success} = await saveOrUpdate(values);
    if (success) {
      message.success(msg);
      modalApi.close();
      emit('onSuccess');
    } else {
      message.error(msg);
    }
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      message.error(error.message);
    } else {
      message.error('An unknown error occurred');
    }
  } finally {
    modalApi.setState({loading: false, confirmLoading: false});
  }
}

defineExpose(modalApi);
</script>

<template>
  <BasicModal class="w-[800px]">
    <BasicForm/>
  </BasicModal>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep(.ant-upload) {
    width: 100px;
    height: 100px;
  }
}
</style>



<!--
<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" class="accountForm">
      <template #headImg="{ model, field }">
        <Upload
          style="margin: auto"
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          :multiple="false"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width: 100px; height: 100px" />
          <div v-else>
            <plus-outlined />
            <div class="ant-upload-text">上传头像</div>
          </div>
        </Upload>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineEmits } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, Rule, useForm } from '@/components/Form/index';
  import { Upload } from 'ant-design-vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { PlusOutlined } from '@ant-design/icons-vue';

  import { accountFormSchema } from './account.data';
  import { saveOrUpdate, checkEntityExist } from '#/api/privilege/account';
  import { CheckExistParams } from '#/api/model/baseModel';
  import { FormValidPatternEnum } from '@/enums/commonEnum';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const imageUrl = ref<string>('');
  const { createMessage } = useMessage();

  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: accountFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
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

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    let formData = data.record;

    await updateSchema([
      {
        field: 'username',
        dynamicRules: () => {
          return [
            {
              required: true,
              whitespace: true,
              message: '用户名不能为空！',
            },
            {
              pattern: new RegExp(FormValidPatternEnum.SN),
              type: 'string',
              message: '请输入英文或数字！',
            },
            {
              max: 30,
              message: '字符长度不能大于30！',
            },
            ...getBaseDynamicRules({
              id: (unref(isUpdate) && formData && formData.id) || '',
              field: 'username',
              fieldValue: '',
              fieldName: '用户名',
            }),
          ];
        },
      },
      {
        field: 'userNo',
        dynamicRules: () => {
          return [
            {
              required: true,
              whitespace: true,
              message: '工号不能为空！',
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
              field: 'userNo',
              fieldValue: '',
              fieldName: '工号',
            }),
          ];
        },
      },
      {
        field: 'mobile',
        dynamicRules: () => {
          return [
            {
              required: true,
              whitespace: true,
              message: '手机不能为空！',
            },
            {
              pattern: new RegExp(FormValidPatternEnum.MOBILE),
              type: 'string',
              message: '请输入正确的手机号！',
            },
            {
              max: 32,
              message: '字符长度不能大于32！',
            },
            ...getBaseDynamicRules({
              id: (unref(isUpdate) && formData && formData.id) || '',
              field: 'mobile',
              fieldValue: '',
              fieldName: '手机号',
            }),
          ];
        },
      },
      {
        field: 'email',
        dynamicRules: () => {
          return [
            {
              pattern: new RegExp(FormValidPatternEnum.EMAIL),
              type: 'string',
              message: '请输入正确的邮箱地址！',
            },
            {
              max: 256,
              message: '字符长度不能大于256！',
            },
            ...getBaseDynamicRules({
              id: (unref(isUpdate) && formData && formData.id) || '',
              field: 'email',
              fieldValue: '',
              fieldName: '邮箱',
            }),
          ];
        },
      },
      {
        field: 'realNameSelector',
        label: '姓名',
        required: true,
        component: 'PersonalSelector',

        componentProps: ({ formModel }) => {
          return {
            multiple: false,
            onChange: (users) => {
              if (users) {
                const user = users[0];
                formModel.realName = user.name;
                formModel.userNo = user.code;
                formModel.sex = user.sex;
                //formModel.headImg=user.headImg;
                if (user.headImg !== 'init') {
                  imageUrl.value = user.headImg;
                }
                formModel.mobile = user.mobile;
                formModel.email = user.email;
              }
            },
          };
        },
        colProps: {
          span: 16,
        },
      },
    ]);
    imageUrl.value = data.record?.image || '';

    const initVal = [];
    if (formData.userNo && formData.realName) {
      initVal.push({
        name: formData?.realName || '', // 显示名称
        code: formData?.userNo || '', // 数据编码
        headImg: 'init',
      });
    }
    setFieldsValue({
      realNameSelector: initVal,
      ...data.record,
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  // 解析为base64位
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    // 读取文件
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      createMessage.error('只允许上传JPG图片！');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      createMessage.error('图片不能大于2MB！');
      return false;
    }
    getBase64(file, (imgUrl) => {
      imageUrl.value = imgUrl;
    });
    return false;
  };

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const values = await validate();
      values.image = imageUrl.value;
      delete values.realNameSelector;
      const {
        data: { success, msg },
      } = await saveOrUpdate(values);
      if (success) {
        createMessage.success(msg);
        closeModal();
        emit('success');
      } else {
        createMessage.error(msg);
      }
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
<style lang="scss" scoped>
  .accountForm {
    position: relative;
  }
</style>
-->
