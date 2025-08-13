<template>
  <PageWrapper v-loading="loadingRef" class="high-form">
    <a-card size="small" title="基础数据" :bordered="false" body-style="background: white;">
      <BasicForm @register="registerBaseInfo" />
    </a-card>

    <a-card size="small" title="附件设置" :bordered="false" class="!mt-5">
      <NoticeFileTable ref="tableRef" />
    </a-card>

    <template #leftFooter>
      <Space>
        <!--        <Button type="primary" @click="saveAll" v-if="publishStatus !== 'PUBLISHED'"> 保存草稿 </Button>-->
        <Button type="primary" @click="saveAll"> 保存草稿 </Button>
        <Button type="primary" @click="submitAll" v-if="publishStatus !== 'PUBLISHED'">
          发布
        </Button>
        <Button type="primary" @click="handlePreview"> 预览 </Button>
        <Button type="default" @click="handleBack"> 返回 </Button>
      </Space>
    </template>
    <NoticePreviewDrawer @register="registerNoticePreviewDrawer" />
  </PageWrapper>
</template>
<script lang="ts" setup>
import {useVbenModal} from '@vben/common-ui';
import {useVbenForm} from '#/adapter/form';
  import { ref, unref, reactive, onMounted, watch, toRefs } from 'vue';
  import { PageWrapper } from '#/components/Page';
  import { baseFormSchema } from './notice.data';
  import { Card, Space, Button, Checkbox, CheckboxGroup, message } from 'ant-design-vue';
  import { getAllBoard } from '#/api/portal/cms/board';
  import { Tinymce } from '#/components/Tinymce';
  import {
    insert,
    update,
    publish,
    checkEntityExist,
    getNoticeById,
    getSigner,
  } from '#/api/portal/cms/notice';
  import { useRouter } from 'vue-router';
  import NoticePreviewDrawer from './NoticePreviewDrawer.vue';
  import NoticeFileTable from './NoticeFileTable.vue';
  import { getAllNoticeCategory } from '#/api/portal/cms/noticeCategory';
  import { getMySubjectList, getNoticeSubjectList } from '#/api/portal/cms/noticeSubject';
  import { findNode } from '#/utils/helper/treeHelper';
  // import { useGo } from '#/hooks/web/usePage';
  import {
    getAllNoticeTitle,
    getCustomNoticeTitlesBySubjectId,
  } from '#/api/portal/cms/noticeTitle';
  // import { OrgDataType } from '#/components/Selector/src/types';
  // import { useDrawer } from '#/components/Drawer';
  import { isEmpty } from '#/utils/is';
  // import { useTabs } from '#/hooks/web/useTabs';

  const { currentRoute } = useRouter();
  const {
    query: { id },
  } = unref(currentRoute);
  const tableRef = ref<{ getDataSource: () => any } | null>(null);
  const publishStatus = ref('');
  const noticeBaseInfo = ref({});
  const go = useGo();
  const boardList = ref();
  const loadingRef = ref(false);
  const allCategoryList = ref();
  const allSubjectList = ref();
  const currentSubjectId = ref();
  const currentCategoryId = ref();
  const { closeCurrent, updatePath, setTitle } = useTabs();
  const [
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

  function loadDataById() {
    if (id) {
      loadingRef.value = true;
      getNoticeById({ id })
          .then(async (res) => {
            if (res.publishRanges) {
              res.publishRanges = res.publishRanges.map((item) => {
                return {
                  ...item,
                  code: item.rangeId,
                  shortName: item.rangeName,
                  name: item.rangeName,
                  label: item.rangeName,
                  sourceType: OrgDataType[item.rangeType],
                };
              });
            } else {
              res.publishRanges = [];
            }
            res.publishBoard = res.publishBoard.split(',');

            currentCategoryId.value = res.categoryId;
            currentSubjectId.value = res.subjectId;
            publishStatus.value = res.publishStatus;
            noticeBaseInfo.value = res;

            await updateBaseInfoSchema({
              fieldName: 'titleId',
              component: 'ApiSelect',
              componentProps: {
                api: getAllNoticeTitle,
                // params: {subjectId: res.subjectId}
              },
            });

            await setBaseInfoFormFieldValue(res);
            loadingRef.value = false;

            tableRef.value.setTableData(res.commonFiles);
          })
          .catch((e) => {
            console.error(e);
            loadingRef.value = false;
          });
    } else {
      setBaseInfoFormFieldValue({
        publishRanges: [],
      });
    }
  }

  function loadSigner() {
    getSigner({ subjectId: currentSubjectId.value, categoryId: currentCategoryId.value }).then(
        (res) => {
          setBaseInfoFormFieldValue({
            signerNo: res.signerNo,
            signerName: res.signerName,
          });
        },
    );
  }

  async function loadBaseData() {
    // boardList.value = await getAllBoard({type: 1});

    const subjectList = await getNoticeSubjectList({});
    allSubjectList.value = subjectList;

    const titleList = await getAllNoticeTitle({});

    // 渲染主体
    await updateBaseInfoSchema({
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
          /*const fieldValues = getBaseInfoFormFieldValue();
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
          });*/
        },
      },
    });

    // 渲染所有分类
    const categoryList = await getAllNoticeCategory({ status: true });
    allCategoryList.value = categoryList;
    await updateBaseInfoSchema({
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
    });
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
    await loadBaseData();
    loadDataById();
  });

  async function save(status) {
    const baseInfoValues = await validateBaseInfoForm();
    loadingRef.value = true;
    baseInfoValues.publishRanges = baseInfoValues.publishRanges.map((item) => {
      return {
        rangeId: item.code,
        rangeName: item.name,
        rangeType: item.rangeType || Object.values(OrgDataType)[item.sourceType - 1],
      };
    });
    // baseInfoValues.publishBoard = baseInfoValues.publishBoard.join(',')
    if (tableRef.value) {
      console.log('table data:', tableRef.value.getDataSource());
      /*baseInfoValues.commonFiles = tableRef.value.getDataSource().map((item, idx)=>{
        // alert(idx, item);
        return {
          id: item.id,
          name: item.name,
          fileType: item.fileType,
          filePath: item.filePath,
          fileSize: item.fileSize,
          canDown: item.canDown,
          orderNo: idx
        };
      });*/
    }
    baseInfoValues.publishStatus = status;

    if (id) {
      baseInfoValues.id = id;
      return update(baseInfoValues);
    } else {
      return insert(baseInfoValues);
    }
  }

  async function saveAll() {
    const res = await save(1);
    const {
      data: { data, msg, success },
    } = res;
    if (success) {
      message.success(msg);
      loadingRef.value = false;
      closeCurrent();
      setTimeout(() => {
        go({ name: 'NoticeInput', query: { id: data.id } });
      }, 0);
    } else {
      loadingRef.value = false;
      message.error(msg);
    }
  }

  async function submitAll() {
    try {
      const res = await save(null);
      const {
        data: { data, msg, success },
      } = res;

      const publishRes = await publish({ id: data.id });
      if (publishRes.data.success) {
        message.success(publishRes.data.msg);
        closeCurrent();
        setTimeout(() => {
          go({ name: 'NoticeInput', query: { id: data.id } });
        }, 0);
      }
    } catch (e) {
      console.error(e);
    } finally {
      loadingRef.value = false;
    }
  }
  function handleBack() {
    closeCurrent();
    go({ name: 'Notice' });
  }
  async function handlePreview() {
    const fieldValues = await getBaseInfoFormFieldValue();
    // 预览前获取数据传入预览方法
    openNoticePreviewDrawer(true, {
      isTemp: true,
      record: fieldValues,
    });

    setNoticePreviewDrawerProps({
      title: `预览 - ${fieldValues.title || '无标题'}`,
      bodyStyle: { padding: '0px', margin: '0px' },
      width: 900,
      showOkBtn: false,
      showCancelBtn: true,
      cancelText: '关闭',
    });
  }

  /*export default defineComponent({
    name: 'NoticeInputNoCache',
    components: {
      NoticePreviewDrawer,
      BasicForm,
      NoticeFileTable,
      Tinymce,
      PageWrapper,
      Space,
      [Card.name]: Card,
      [Checkbox.name]: Checkbox,
      [CheckboxGroup.name]: CheckboxGroup,
    },
    setup() {


      return {
        registerBaseInfo,
        registerNoticePreviewDrawer,
        submitAll,
        saveAll,
        handleBack,
        handlePreview,
        boardList,
        loadingRef,
        tableRef,
        publishStatus,
      };
    },
  });*/
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
