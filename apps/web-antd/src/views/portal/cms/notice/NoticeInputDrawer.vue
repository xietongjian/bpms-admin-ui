<template>
  <BasicDrawer class="w-3/5">
    <Card size="small" title="基础数据" :bordered="false">
      <BasicForm>
        <template #content="slotProps">
          <TEditor placeholder="请输入"
                   :value="slotProps.field.value"
                   :minHeight="400"
                   v-bind="slotProps"
          />
        </template>
      </BasicForm>
    </Card>

    <Card size="small" title="附件设置" :bordered="false" class="!mt-5">
      <NoticeFileTable ref="noticeFileTableRef" />
    </Card>

    <template #prepend-footer>
      <Button type="primary" @click="handlePreview"> 预览 </Button>
      <Button type="primary" @click="saveAll"> 保存草稿 </Button>
      <Button type="primary" @click="submitAll"> 保存并发布 </Button>
    </template>
    <NoticePreviewDrawer ref="noticePreviewDrawerRef" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, unref, reactive, onMounted, watch, toRefs, defineExpose, defineEmits } from 'vue';
  import { baseFormSchema } from './notice.data';
  import {Card, Space, Button, message, Input} from 'ant-design-vue';
  import { getAllBoard } from '#/api/portal/cms/board';
  import {
    insert,
    update,
    publish,
    checkEntityExist,
    getNoticeById,
    getSigner,
  } from '#/api/portal/cms/notice';
  import NoticePreviewDrawer from './NoticePreviewDrawer.vue';
  import NoticeFileTable from './NoticeFileTable.vue';
  import { getAllNoticeCategory } from '#/api/portal/cms/noticeCategory';
  import { getMySubjectList, getNoticeSubjectList } from '#/api/portal/cms/noticeSubject';
  import { findNode } from '#/utils/helper/treeHelper';

  import {
    getAllNoticeTitle,
    getCustomNoticeTitlesBySubjectId,
  } from '#/api/portal/cms/noticeTitle';
  import { isEmpty } from '#/utils/is';
  import {useVbenDrawer, useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';
  import dayjs from "dayjs";
  import {TEditor} from '#/components/TEditor';

  const emit = defineEmits(['success'])
  const noticeFileTableRef = ref();
  const publishStatus = ref('');
  const noticeBaseInfo = ref({});
  const noticePreviewDrawerRef = ref();

  const boardList = ref();
  const loadingRef = ref(false);
  const allCategoryList = ref();
  const allSubjectList = ref();
  const currentSubjectId = ref();
  const currentCategoryId = ref();

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: baseFormSchema,
    wrapperClass: 'grid grid-cols-3',
  });

  const [BasicDrawer, drawerApi] = useVbenDrawer({
    closeOnClickModal: false,
    showConfirmButton: false,
    destroyOnClose: true,
    onCancel() {
      drawerApi.close();
    },
    async onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = drawerApi.getData<Record<string, any>>();
        if (values) {
          drawerApi.setState({loading: true, confirmLoading: true});
          const tempValues = JSON.parse(JSON.stringify(values))
          // formApi.setValues(tempValues);
          boardList.value = await getAllBoard({ type: 1 });
          /*await updateBaseInfoSchema([
            {
              fieldName: 'publishBoard',
              componentProps: {
                options: boardList,
                labelInValue: true,
              },
            },
          ]);*/
          await loadBaseData();
          await loadDataById(tempValues);
          // await loadDataById(va);
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
    registerNoticePreviewDrawer,
    { openDrawer: openNoticePreviewDrawer, setDrawerProps: setNoticePreviewDrawerProps },
  ] = useDrawer();

  const [registerNoticeInputDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(
    async (data) => {
      boardList.value = await getAllBoard({ type: 1 });
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
  );
*/
  // 加载数据
  async function loadDataById(params: any) {
    if (params.id) {
      loadingRef.value = true;
      const res = await getNoticeById({ id: params.id });
      res.publishTime && (res.publishTime = dayjs(res.publishTime));
      if (res.publishRanges) {
        res.publishRanges = res.publishRanges.map((item) => {
          return {
            ...item,
            code: item.rangeId,
            shortName: item.rangeName,
            name: item.rangeName,
            label: item.rangeName,
            // sourceType: OrgDataType[item.rangeType],
          };
        });
      } else {
        res.publishRanges = [];
      }
      res.publishBoard = res.publishBoard.split(',');

      currentCategoryId.value = res.categoryId;
      currentSubjectId.value = res.subjectId;
      publishStatus.value = res.publishStatus;

      res.attachments.map(item => {
        return {...item, canDown: (item.canDown===1)};
      })

      noticeFileTableRef.value.loadFileList(res.attachments);

      noticeBaseInfo.value = res;

      // await updateBaseInfoSchema({
      //   fieldName: 'titleId',
      //   component: 'ApiSelect',
      //   componentProps: {
      //     api: getAllNoticeTitle,
      //     // params: {subjectId: res.subjectId}
      //   },
      // });
      //
      // await setBaseInfoFormFieldValue(res);
      loadingRef.value = false;

      await formApi.setValues(res);

      // tableRef.value.setTableData(res.commonFiles);
    } else {

     /* setBaseInfoFormFieldValue({
        publishRanges: [],
      });*/
    }
  }

  function loadSigner() {
    getSigner({ subjectId: currentSubjectId.value, categoryId: currentCategoryId.value }).then(
      (res) => {
        /*setBaseInfoFormFieldValue({
          signerNo: res.signerNo,
          signerName: res.signerName,
        });*/
      },
    );
  }

  async function loadBaseData() {
    // boardList.value = await getAllBoard({type: 1});
    const subjectList = await getNoticeSubjectList({});
    allSubjectList.value = subjectList;

    const titleList = await getAllNoticeTitle({});

    // 渲染主体
    /*await updateBaseInfoSchema({
      fieldName: 'subjectId',
      component: 'TreeSelect',
      componentProps: {
        filterTreeNode: true,
        treeData: subjectList,
        onChange: (value, label, extra) => {
          const node = findNode(allSubjectList.value, (item) => {
            return item.id === value;
          });
          currentSubjectId.value = value;
          loadSigner();

          // 根据发文主体联动设置公文套头列表的可选项。
          /!*const fieldValues = getBaseInfoFormFieldValue();
          updateBaseInfoSchema(
            {
              fieldName: 'titleId',
              componentProps: {
                api: getCustomNoticeTitlesBySubjectId,
                params: {subjectId: node.id}
              },
            }
          )
          setBaseInfoFormFieldValue({
            subjectName: node.title,
            content: fieldValues.content
          });*!/
        },
      },
    });*/

    // 渲染所有分类
    const categoryList = await getAllNoticeCategory({ status: true });
    allCategoryList.value = categoryList;
    /*await updateBaseInfoSchema({
      fieldName: 'categoryId',
      component: 'TreeSelect',
      componentProps: {
        filterTreeNode: true,
        treeData: allCategoryList.value,
        onChange: (value, label, extra) => {
          const node = findNode(allCategoryList.value, (item) => {
            return item.id === value;
          });
          currentCategoryId.value = value;
          loadSigner();
          if (node) {
            setBaseInfoFormFieldValue({
              categoryName: node.name,
            });
          }
        },
      },
    });*/
  }

  onMounted(async () => {
    // boardList.value = await getAllBoard({type: 'NOTICE'});
    /*await updateBaseInfoSchema([
      {
        fieldName: 'publishBoard',
        componentProps: {
          options: boardList,
          labelInValue: true
        }
      }
    ]);*/

  });

  async function save(status) {
    const {valid} = await formApi.validate()
    if(!valid){
      return Promise.reject(false);
    }
    debugger;
    const baseInfoValues = await formApi.getValues();
    debugger;
    // const baseInfoValues = await formApi.getValues();
    loadingRef.value = true;
    baseInfoValues.publishRanges = baseInfoValues.publishRanges.map((item) => {
      return {
        rangeId: item.code,
        rangeName: item.name,
        // rangeType: item.rangeType || Object.values(OrgDataType)[item.sourceType - 1],
      };
    });
    // baseInfoValues.publishBoard = baseInfoValues.publishBoard.join(',')
    if (noticeFileTableRef.value) {
      console.log('table data:', noticeFileTableRef.value.getFileList());
      baseInfoValues.attachments = noticeFileTableRef.value.getFileList().map((item, idx)=>{
        return {
          id: item.id,
          fileName: item.fileName,
          fileType: item.fileName?.split('.').pop(),
          filePath: item.filePath,
          fileSize: item.fileSize,
          canDown: item.canDown?1:0,
          orderNo: idx
        };
      });
    }
    baseInfoValues.publishStatus = status;

    baseInfoValues.publishTime = dayjs(baseInfoValues.publishTime).format('YYYY-MM-DD HH:mm:ss');

    if (baseInfoValues.id) {
      return update(baseInfoValues);
    } else {
      return insert(baseInfoValues);
    }
  }

  async function saveAll() {
    const { data, msg, success } = await save(1);
    if (success) {
      message.success(msg);
      loadingRef.value = false;
    } else {
      loadingRef.value = false;
      message.error(msg);
    }
  }

  async function submitAll() {
    try {
      const { data, msg, success } = await save(null);

      const publishRes = await publish({ id: data.id });
      if (publishRes.data.success) {
        message.success(publishRes.data.msg);
      }
    } catch (e) {
      console.error(e);
    } finally {
      loadingRef.value = false;
    }
  }

  async function handlePreview() {
    const formValues = await formApi.getValues();
    const attachments = noticeFileTableRef.value.getFileList();

    noticePreviewDrawerRef.value.setData({
      isTemp: true, ...formValues,
      publishTime: dayjs(formValues.publishTime).format('YYYY-MM-DD HH:mm:ss'),
      attachments
    });
    noticePreviewDrawerRef.value.open();
    noticePreviewDrawerRef.value.setState({
      title: `预览 - ${formValues.title}`,
    });

    /*const fieldValues = await getBaseInfoFormFieldValue();
    // 预览前获取数据传入预览方法
    openNoticePreviewDrawer(true, {
      isTemp: true,
      record: fieldValues,
    });

    setNoticePreviewDrawerProps({
      title: `预览 - ${fieldValues.title || '无标题'}`,
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

<style>
  /*html {
    height: auto!important;
  }*/
</style>
<style lang="less" scoped>
  .high-form {
    padding-bottom: 48px;
  }
</style>
