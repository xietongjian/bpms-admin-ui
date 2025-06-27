<template>
  <BasicModal class="w-[1000px]">
    <BasicForm class="personalForm">
      <template #headImg="{ model, field }">
        <Upload
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          :multiple="false"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="object-fill w-full" />
          <div v-else>
            <PlusOutlined />
            <div class="ant-upload-text">上传头像</div>
          </div>
        </Upload>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineEmits, defineExpose } from 'vue';

  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import { filterTree } from '@vben/utils';

  import { personalFormSchema } from './personal.data';
  import { saveOrUpdate } from '#/api/org/personal';
  import { message, Upload } from 'ant-design-vue';
  import {PlusOutlined} from '@ant-design/icons-vue';
  import {getDepts} from "#/api/org/dept";
  const emit = defineEmits(['success']);
  const firstLoaded = ref(false);
  const imageUrl = ref<string>('');

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    destroyOnClose: true,
    onCancel() {
      modalApi.close();
    },
    async onOpenChange(isOpen: boolean) {
      if (isOpen) {
        firstLoaded.value = false;
        const values = modalApi.getData<Record<string, any>>();
        imageUrl.value = values.headImg;
        if (values) {
          await formApi.setValues(values);
          firstLoaded.value = true;
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
      labelWidth: 80,
      componentProps: {
        class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: personalFormSchema,
    wrapperClass: 'grid-cols-5',
    handleValuesChange: (values, fieldsChanged) => {
        if(fieldsChanged.includes('companyId')){
            debugger;
            formApi.updateSchema([
                {
                    fieldName: 'deptId',
                    componentProps: {
                        class: 'w-full',
                        immediate: !!values.companyId,
                        params: {companyId: values.companyId},
                        afterFetch: (treeData) => {
                            debugger;
                            // 如果没有则设置成空
                            const filtered = filterTree(treeData, (v) => {
                                return v.id === values.deptId
                            })
                            if(filtered.length <= 0){
                                formApi.setFieldValue('deptId', null, false);
                            }
                        }
                    },
                }
            ])
        }
    }
  });


  /*const [registerModal, { setModalProps, closeModal, changeLoading }] = useModalInner(
    async (data) => {
      changeLoading(true);
      await resetFields();
      setModalProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;
      const companyTreeData = await getCompanies();
      const jobGradeTreeData = await getJobGradeTree();
      const jobPositionInfoTreeData = await getPositionInfoTree();
      let formData = data.record;

      await updateSchema([
        {
          field: 'jobGradeCode',
          componentProps: {
            treeData: jobGradeTreeData,
          },
        },
        {
          field: 'positionCode',
          componentProps: {
            treeData: jobPositionInfoTreeData,
          },
        },
        {
          field: 'companyId',
          componentProps: {
            treeData: companyTreeData,
            onChange: (e: string) => {
              updateSchema([{ field: 'deptId', componentProps: { treeData: [] } }]);
              if (e) {
                getDepts({ companyId: e }).then((res) => {
                  updateSchema([
                    {
                      field: 'deptId',
                      componentProps: { treeData: res },
                    },
                  ]);

                  const deptNode = findNode(res, (itm) => itm.value === formData.deptId);
                  let deptId = deptNode ? deptNode.id : '';
                  setFieldsValue({
                    deptId: deptId,
                  });
                });
              }
            },
          },
        },
        {
          field: 'code',
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
                field: 'code',
                fieldValue: '',
                fieldName: '工号',
              }),
            ];
          },
        },
      ]);

      if (unref(isUpdate)) {
        // 根据公司加载部门树
        const deptTreeData = await getDepts({ companyId: data.record.companyId });
        await updateSchema([
          {
            field: 'deptId',
            componentProps: { treeData: deptTreeData },
          },
        ]);
        setFieldsValue({
          ...formData,
        });

        imageUrl.value = data.record.headImg;
      } else {
        // 如果是添加并且用户选择了公司
        if (formData.companyId) {
          // 根据公司加载部门树
          const deptTreeData = await getDepts({ companyId: formData.companyId });
          await updateSchema([
            {
              field: 'deptId',
              componentProps: { treeData: deptTreeData },
            },
          ]);
          setFieldsValue({
            ...formData,
          });
        }
        imageUrl.value = '';
      }
      changeLoading(false);
    },
  );*/
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
      message.error('只允许上传JPG图片！');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片不能大于2MB！');
      return false;
    }
    getBase64(file, (imgUrl) => {
      imageUrl.value = imgUrl;
    });
    return false;
  };

  async function handleSubmit() {
    try {
      modalApi.setState({loading: true, confirmLoading: true});
      const { valid } = await formApi.validate();
      if (!valid) {
        return;
      }
      const values = await formApi.getValues();
      values.headImg = imageUrl.value;
      const {success, msg} = await saveOrUpdate(values);
      if(success){
        modalApi.close();
        emit('success');
        message.success(msg);
      } else {
        message.error(msg);
      }
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }
  defineExpose(modalApi);
</script>

