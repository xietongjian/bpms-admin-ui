<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :defaultFullscreen="false"
    wrap-class-name="form-template-modal "
  >
    <Row class="h-full">
      <Col span="4">
        <BasicTree
            :loading="treeLoading"
            treeWrapperClassName="h-[calc(100%-35px)] overflow-auto h-full"
            :clickRowToExpand="false"
            :treeData="formCategoryTreeData"
            @select="handleSelect"
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
        </BasicTree>
      </Col>
      <Col span="20">
        <div :class="`${prefixCls}__content`">
          <div style="margin: 10px 10px 0">
            <a-input-search
                style="width: 500px"
                v-model:value="formTemplateKeyword"
                placeholder="请输入关键字"
                enter-button
                @search="onSearch"
            />
          </div>
          <Divider style="margin: 10px" />
          <List v-if="templateList.length > 0" :pagination="pagination">
            <Row :gutter="8">
              <template v-for="item in templateList" :key="item.id">
                <Col :span="8">
                  <ListItem>
                    <Card style="width: 100%" :hoverable="true" :class="`${prefixCls}__card`">
                      <div :class="`${prefixCls}__card-detail`">
                        <GenerateForm
                            style="height: 100%; height: 100px; overflow: auto"
                            :data="item.formJson"
                        />
                        <div style="margin: 5px; font-size: 14px; font-weight: bold">
                          {{ item.name }}
                          <template v-if="formCategoryDataMap[item.categoryCode]">
                            - <Tag style="font-weight: initial; font-size: 12px;">{{formCategoryDataMap[item.categoryCode]?.name}}</Tag>
                          </template>
                        </div>
                      </div>
                      <div :class="`${prefixCls}__action-overlay`">
                        <Space>
                          <Button type="primary" @click="handleFormPreview(item.formJson)">
                            预览
                          </Button>
                          <Button type="primary" @click="handleInsertTemplate(item, 'insert')">
                            插入
                          </Button>
                          <Button type="primary" @click="handleInsertTemplate(item, 'replace')">
                            覆盖
                          </Button>
                        </Space>
                      </div>
                    </Card>
                  </ListItem>
                </Col>
              </template>
            </Row>
          </List>
          <div v-else style="margin: 80px">
            <Empty />
          </div>
        </div>
      </Col>
    </Row>
    <FormPreviewModal @register="registerFormPreviewModal" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref, defineEmits } from 'vue';
  import {message} from 'ant-design-vue';

  import {useVbenModal} from '@vben/common-ui';
  import {useVbenForm} from '#/adapter/form';

  import { Button, Tag, Space, Card, Row, Col, List, Empty, Divider } from 'ant-design-vue';
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
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          initFormCategoryTree();
          loadData(data.formId);
          modelKey.value = data.modelKey;
          categoryCode.value = data.categoryCode;
          formInfoId.value = data.formId;
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

  function loadData(current = 1) {
    changeLoading(true);
    getFormTemplateList({
      keyword: formTemplateKeyword.value,
      categoryCode: unref(currentNode)?.code,
      pageSize: unref(pagination).defaultPageSize,
      pageNum: current,
      status: 1,
    })
      .then((res) => {
        res.rows.forEach((item) => {
          item.formJson = JSON.parse(item.formJson);
        });
        pagination.value.total = res.total;
        templateList.value = res.rows;
      })
      .finally(() => {
        changeLoading(false);
      });
  }

  function handleFormPreview(formJson) {
    openFormPreviewModal(true, {
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
    });
  }

  function onSearch() {
    loadData();
  }

  function handleInsertTemplate(record, type) {
    if (type === 'replace') {
      createConfirm({
        iconType: 'warning',
        content: '确定要覆盖吗？',
        onOk() {
          setTimeout(() => {
            emit('success', record, type);
          }, 300);
          closeModal();
        },
      });
    } else {
      setTimeout(() => {
        emit('success', record, type);
      }, 300);
      closeModal();
    }
  }
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
