<template>
  <BasicDrawer class="w-1/2">
    <BasicForm />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, reactive, watch, toRefs, onMounted, defineExpose, defineEmits } from 'vue';
  import {useVbenDrawer} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import { formSchema } from './banner.data';
  import { insert, update } from '#/api/portal/cms/banner';
  import { getAllBoard } from '#/api/portal/cms/board';
  import { getAllPublishRange } from '#/api/portal/cms/publishRange';
  import { apiInfoFormSchema } from "#/views/base/apiInfo/apiInfo.data";

  const isUpdate = ref(true);
  const boardList = ref();
  const emit = defineEmits(['success'])
/*
  const [
    registerForm,
    { resetFields, updateSchema, getFieldsValue, setFieldsValue, validate },
  ] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    fieldMapToTime: [['fieldTime', ['startTime', 'endTime'], 'YYYY-MM-DD']],
  });
*/

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

  const [BasicDrawer, drawerApi] = useVbenDrawer({
    onCancel() {
      drawerApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = drawerApi.getData<Record<string, any>>();
        if (values) {
          const tempValues = JSON.parse(JSON.stringify(values))

          formApi.setValues(tempValues);
          // formApi.setValues({...values, params, requestArr: [values.method || '', values.url || '']});
          drawerApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      handleSubmit();
    },
  });

  /*const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    // setDrawerProps({ loading: true });
    setDrawerProps({ loading: true });
    isUpdate.value = !!data?.isUpdate;
    let formData = data.record;

    boardList.value = await getAllBoard({ type: 3 });

    if (unref(isUpdate)) {
      // 通过条件获取发布范围
      const publishRanges = await getAllPublishRange({
        dataId: formData.id,
        dataType: 'BANNER',
      });

      if (publishRanges) {
        formData.publishRanges = publishRanges.map((item) => {
          return {
            ...item,
            id: item.rangeId,
            shortName: item.rangeName,
            sourceType: item.rangeType,
          };
        });
      } else {
        formData.publishRanges = [];
      }

      let posterUploader = null;
      if (formData.posterPath) {
        posterUploader = [
          {
            name: 'file.name',
            filePath: formData.posterPath,
            fileType: formData.posterPath.split('.').pop(),
            fileSize: 111,
          },
        ];
      }

      await setFieldsValue({
        ...formData,
        imgUploader: [
          {
            name: 'file.name',
            filePath: formData.imgPath,
            fileType: formData.imgPath ? formData.imgPath.split('.').pop() : '',
            fileSize: 111,
          },
        ],
        status: formData.status == 1,
        posterUploader: posterUploader,

        validTimeRange: [formData.startTime, formData.endTime],
      });
    } else {
      setFieldsValue({
        publishBoard: formData.publishBoard,
      });
    }
    setDrawerProps({ loading: false });
  });*/

  async function handleSubmit() {
    try {
      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      drawerApi.setState({loading: true, confirmLoading: true});

      // if(values.imgUploader && values.imgUploader.length > 0){
      //   values.imgPath = values.imgUploader[0].filePath;
      //   delete values.imgUploader;
      // }

      if (values.posterUploader && values.posterUploader.length > 0) {
        values.posterPath = values.posterUploader[0].filePath;
        delete values.posterUploader;
      }

      if (values.validTimeRange) {
        values.startTime = values.validTimeRange[0];
        values.endTime = values.validTimeRange[1];
        delete values.validTimeRange;
      }
      values.publishRanges = values.publishRanges.map((item) => {
        return {
          rangeId: item.id,
          rangeName: item.shortName,
          rangeType: Object.values(OrgDataType)[item.sourceType - 1],
        };
      });

      values.status = values.status ? 1 : 0;

      if (values.id) {
        await update(values);
      } else {
        await insert(values);
      }

      drawerApi.close();
      emit('success');
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }

  /*export default defineComponent({
    components: {
      BasicModal,
      BasicDrawer,
      BasicForm,
      [Checkbox.name]: Checkbox,
      [CheckboxGroup.name]: CheckboxGroup,
    },
    setup(props, { emit }) {


      return {
        boardList,
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
      };
    },
  });*/

  defineExpose(drawerApi);
</script>
<style lang="less">
  .banner-view {
    .ant-upload-list-picture-card {
      .ant-upload-list-item-container {
        height: 200px !important;
        width: 500px !important;
      }
    }
  }
</style>
