<template>
  <BasicModal class="w-[800px] min-h-[500px]">
    <div class="flex flex-row">
      <div class="w-[200px]">
        <Tree
          :loading="treeLoading"
          treeWrapperClassName="h-[calc(100%-35px)] overflow-auto h-full"
          :clickRowToExpand="false"
          :treeData="formCategoryTreeData"
          @select="handleSelect"
          block-node
          ref="basicTreeRef"
          :field-names="{title: 'name'}"
        >
          <template #headerTitle >
            <Row align="middle" class="w-full">
              <Col span="12">
                分类
              </Col>
            </Row>
          </template>
        </Tree>
      </div>
      <div class="flex-1">
        <div>
          <div class="m-0">
            <InputSearch
              style="width: 500px"
              allow-clear
              v-model:value="formTemplateKeyword"
              placeholder="请输入关键字"
              enter-button
              @search="onSearch"
            />
          </div>
          <Divider class="mt-3" />
          <List
            :grid="{ gutter: 4, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }"
            :data-source="templateList"
            v-if="templateList.length > 0"
            :pagination="pagination">
            <template #renderItem="{ item }">
              <ListItem class="!p-0">
                <Card class="w-full" bodyStyle="padding: 8px" :hoverable="true" >
                  <div :class="`${prefixCls}__card-detail`">
                    <GenerateForm
                      class="h-[180px] w-[100px] overflow-auto"
                      :data="item.formJson"
                    />
                    <div style="margin: 5px; font-size: 14px; font-weight: bold">
                      {{ item.name }}
                      <template v-if="formCategoryDataMap[item.categoryCode]">
                        - <Tag style="font-weight: initial; font-size: 12px;">{{formCategoryDataMap[item.categoryCode]?.name}}</Tag>
                      </template>
                    </div>
                  </div>
                  <div class="text-center">
                    <Space>
                      <Button size="small" type="primary" @click="handleFormPreview(item.formJson)">
                        预览
                      </Button>
                      <Button size="small" type="primary" @click="handleInsertTemplate(item, 'insert')">
                        插入
                      </Button>
                      <Button size="small" type="primary" @click="handleInsertTemplate(item, 'replace')">
                        覆盖
                      </Button>
                    </Space>
                  </div>
                </Card>
              </ListItem>
            </template>
<!--            <Row :gutter="8">
              <template v-for="item in templateList" :key="item.id">
                <Col :span="8">

                </Col>
              </template>
            </Row>-->
          </List>
          <div v-else style="margin: 80px">
            <Empty />
          </div>
        </div>
      </div>
    </div>
    <FormPreviewModal ref="formPreviewModalRef" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref, defineEmits } from 'vue';

  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';

  import { message, Tree, Input, InputSearch, Button, Tag, Space, Card, Modal, Row, Col, List, Empty, Divider } from 'ant-design-vue';
  import { GenerateForm } from '/public/static/form-making';
  import {getFormCategoryListData, getFormTemplateList} from '#/api/form/formTemplate';
  import FormPreviewModal from '#/views/components/form/formMaking/FormPreviewModal.vue';
  // import SplitPane from "#/views/components/splitPane/index.vue";
  // import {BasicTree} from "@/components/Tree";
  import {listToTree} from "#/utils/helper/treeHelper";
  const treeLoading = ref(true);
  const formCategoryDataMap = ref<any>({});
  const formCategoryTreeData = ref([]);

  const prefixCls = 'template-list';
  const formPreviewModalRef = ref();
  const ListItem = List.Item;
  const emit = defineEmits(['success']);

  // const { message, createConfirm } = useMessage();
  const currentNode = ref(undefined);

  const formTemplateKeyword = ref('');
  const modelKey = ref('');
  const categoryCode = ref('');
  const formInfoId = ref('');
  const formName = ref('');
  const templateList = ref([]);
  const pagination = ref({
    position: 'bottom',
    show: true,
    defaultPageSize: 6,
    onChange: (page, pageSize) => {
      loadData(page);
    },
  });

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    footer: null,
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          initFormCategoryTree();
          loadData(values.formId);
          modelKey.value = values.modelKey;
          categoryCode.value = values.categoryCode;
          formInfoId.value = values.formId;
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await formApi.submitForm();
      // handleSubmit();
    },
  });

  /*const [registerModal, { setModalProps, changeLoading, closeModal }] = useModalInner(
    async (data) => {
      initFormCategoryTree();
      loadData(data.formId);
      modelKey.value = data.modelKey;
      categoryCode.value = data.categoryCode;
      formInfoId.value = data.formId;
    },
  );
  const [
    registerFormPreviewModal,
    { openModal: openFormPreviewModal, setModalProps: setFormPreviewModalProps },
  ] = useModal();*/

  async function initFormCategoryTree() {
    treeLoading.value = true;
    const res = await getFormCategoryListData();
    const tempCategoryMap = {};
    res.forEach(item => {
      tempCategoryMap[item.code] = item;
      item.title = item.name;
    })
    formCategoryDataMap.value = tempCategoryMap;

    const treeData = listToTree(res);
    formCategoryTreeData.value = treeData;
    treeLoading.value = false;
  }

  async function handleSelect(node: any, e: any) {
    const selectedNode = e.selectedNodes[0];
    if (selectedNode) {
      currentNode.value = selectedNode;
      loadData();
    } else {
      currentNode.value = undefined;
      loadData();
    }
  }

  async function loadData(current = 1) {
    modalApi.setState({loading: true, confirmLoading: true});

    const params = {
      entity: {
        keyword: formTemplateKeyword.value,
        categoryCode: unref(currentNode)?.code,
        status: 1,
      },
      query: {
        pageSize: unref(pagination).defaultPageSize,
        pageNum: current,
      }
    };

    const res = await getFormTemplateList(params);
    res.rows.forEach((item) => {
      item.formJson = JSON.parse(item.formJson);
    });
    pagination.value.total = res.total;
    templateList.value = res.rows;
    modalApi.setState({loading: false, confirmLoading: false});
  }

  function handleFormPreview(formJson) {
    formPreviewModalRef.value.setData(formJson);
    formPreviewModalRef.value.open();
    formPreviewModalRef.value.setState({
      title: '预览'
    });
    /*openFormPreviewModal(true, {
      formJson,
    });
    setFormPreviewModalProps({
      title: `预览`,
      width: 1200,
      minHeight: 400,
      maskClosable: true,
      centered: true,
      showOkBtn: false,
      showCancelBtn: true,
      cancelText: '关闭',
    });*/
  }

  function onSearch() {
    loadData();
  }

  function handleInsertTemplate(record, type) {
    if (type === 'replace') {
      Modal.confirm({
        iconType: 'warning',
        content: '确定要覆盖吗？',
        onOk() {
          setTimeout(() => {
            emit('success', record, type);
          }, 300);
          modalApi.close();
        },
      });
    } else {
      setTimeout(() => {
        emit('success', record, type);
      }, 300);
      modalApi.close();
    }
  }
  defineExpose(modalApi);
</script>

<style lang="less">
  .form-template-modal {
    .ant-modal-body {
      .scroll-container {
        padding-top: 0!important;
        padding-bottom: 0!important;
      }
    }
  }
  .template-list__content {
    .ant-list {
      .ant-list-item {
        padding: 10px 5px;
      }
    }
    .template-list__card {
      .ant-card-body {
        overflow: hidden;
        padding: 5px;
        overflow: hidden;
      }
      &:hover {
        //background: rgba(0,0,0,.6);
        .template-list__action-overlay {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .template-list__action-overlay {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 999;
      }
    }
    .ant-list-pagination {
      margin-block-start: 0 !important;
    }
  }
</style>
