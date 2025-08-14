<template>
  <BasicDrawer>
    <BasicForm/>

    <template #insertFooter>
      <Space>
        <Button type="primary" @click="saveAll" :loading="loadingRef"> 保存草稿 </Button>
        <Button
          type="primary"
          @click="submitAll"
          v-if="publishStatus !== '3'"
          :loading="loadingRef"
        >
          发布
        </Button>
        <Button type="primary" @click="handlePreview"> 预览 </Button>
      </Space>
    </template>

    <NewsPreviewDrawer ref="newsPreviewDrawerRef" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, unref, defineEmits, defineExpose } from 'vue';
  import { baseFormSchema } from './news.data';
  import { Space, Button, message } from 'ant-design-vue';
  import { getAllBoard } from '#/api/portal/cms/board';
  import { getNewsById, insert, publish, update } from '#/api/portal/cms/news';
  import NewsPreviewDrawer from './NewsPreviewDrawer.vue';
  import { isEmpty } from '#/utils/is';
  import {useVbenDrawer} from '@vben/common-ui';
  import {useVbenForm} from "#/adapter/form";

  const emit = defineEmits(['success']);

  const loadingRef = ref(true);
  const publishStatus = ref('');
  const newsBaseInfo = ref({});

  const boardList = ref();
  const newsPreviewDrawerRef = ref();

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: baseFormSchema,
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
          getAllBoard({ type: 2 }).then(res => {
            boardList.value = res;
          });
          /*await updateBaseInfoSchema([
            {
              fieldName: 'publishBoard',
              componentProps: {
                options: boardList,
                labelInValue: true,
              },
            },
          ]);*/
          loadDataById(tempValues.id);

          formApi.setValues(tempValues);
          drawerApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      handleSubmit();
    },
  });

  /*const [
    registerBaseInfo,
    {
      updateSchema: updateBaseInfoSchema,
      getFieldsValue: getBaseInfoFormFieldValue,
      setFieldsValue: setBaseInfoFormFieldValue,
      validate: validateBaseInfoForm,
    },
  ] = useForm({
    baseColProps: {
      span: 8,
    },
    labelWidth: 100,
    schemas: baseFormSchema,
    showActionButtonGroup: false,
  });
  const [
    registerNewsPreviewDrawer,
    { openDrawer: openNewsPreviewDrawer, setDrawerProps: setNewsPreviewDrawerProps },
  ] = useDrawer();

  const [registerNewsInputDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(
    async (data) => {
      boardList.value = await getAllBoard({ type: 2 });
      await updateBaseInfoSchema([
        {
          fieldName: 'publishBoard',
          componentProps: {
            options: boardList,
            labelInValue: true,
          },
        },
      ]);
      loadDataById(data.id);
    },
  );*/

  // 加载数据
  function loadDataById(id: any) {
    if (id) {
      loadingRef.value = true;
      getNewsById({ id })
        .then((res) => {
          if (res.publishRanges) {
            res.publishRanges = res.publishRanges.map((item) => {
              return {
                ...item,
                code: item.rangeId,
                label: item.rangeName,
                name: item.rangeName,
                sourceType: OrgDataType[item.rangeType],
              };
            });
          } else {
            res.publishRanges = [];
          }

          if (res.keywords) {
            res.keywords = res.keywords.map((item) => item.content);
          } else {
            res.keywords = [];
          }

          if (res.thumbImg) {
            res.thumbUploader = [
              {
                name: 'file.name',
                filePath: res.thumbImg,
                fileType: res.thumbImg.split('.').pop(),
                fileSize: 0,
              },
            ];
          } else {
            res.thumbUploader = [];
          }
          publishStatus.value = res.publishStatus;
          // res.publishBoard = res.publishBoard.split(',');
          setBaseInfoFormFieldValue(res);
          newsBaseInfo.value = res;
          // setContentInfoFormFieldValue({content: res.content, shortContent: res.shortContent});
          loadingRef.value = false;
        })
        .finally(() => {
          loadingRef.value = false;
        });
    } else {
      loadingRef.value = false;
    }
  }

  async function save(status) {
    const baseInfoValues = await validateBaseInfoForm();
    loadingRef.value = true;
    baseInfoValues.publishRanges = baseInfoValues.publishRanges.map((item) => {
      return {
        rangeId: item.code,
        rangeName: item.name,
        rangeType: Object.values(OrgDataType)[item.sourceType - 1],
      };
    });
    // baseInfoValues.publishBoard = baseInfoValues.publishBoard.join(',')
    baseInfoValues.publishStatus = status;

    if (baseInfoValues.thumbUploader && !isEmpty(baseInfoValues.thumbUploader)) {
      baseInfoValues.thumbImg = baseInfoValues.thumbUploader[0].filePath;
      delete baseInfoValues.thumbUploader;
    }
    if (baseInfoValues.id) {
      return await update(baseInfoValues);
    } else {
      return await insert(baseInfoValues);
    }
  }

  async function saveAll() {
    try {
      await save(1);
      message.success('操作成功');
    } catch (e) {
      message.error('操作失败');
    } finally {
      loadingRef.value = false;
    }
  }

  async function submitAll() {
    try {
      const res = await save(0);
      const { data, msg, success } = res;
      if (success) {
        const publishRes = await publish({ id: data.id });
        if (publishRes.data.success) {
          message.success(publishRes.data.msg);
        }
      } else {
        message.error(msg);
      }
    } catch (e) {
      console.error(e);
    } finally {
      loadingRef.value = false;
    }
  }

  async function handlePreview() {


    newsPreviewDrawerRef.value.setData();
    newsPreviewDrawerRef.value.open();
    newsPreviewDrawerRef.value.setState({
      title: `预览 - ${unref(newsBaseInfo).title}`,
    });

/*    const fieldValues = await getBaseInfoFormFieldValue();
    // 预览前获取数据传入预览方法
    openNewsPreviewDrawer(true, {
      isTemp: true,
      record: fieldValues,
    });
    setNewsPreviewDrawerProps({
      title: `预览 - ${unref(newsBaseInfo).title}`,
      bodyStyle: { padding: '0px', margin: '0px' },
      width: 1000,
      showOkBtn: false,
      showCancelBtn: true,
      cancelText: '关闭',
    });*/
  }
  function handleSubmit() {
    emit('success');
  }

  defineExpose(drawerApi);
</script>

<style lang="less" scoped>
  .high-form {
    padding-bottom: 48px;
  }
</style>
