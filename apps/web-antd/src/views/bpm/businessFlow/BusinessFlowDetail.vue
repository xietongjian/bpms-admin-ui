<template>
  <Page auto-content-height
    fixedHeight
    contentBackground
    contentFullHeight
    contentClass="p-2"
    class="custom-wrapper-content"
    style="overflow: hidden"
  >
    <template #headerContent>
      <div class="flex">
        <div class="w-full" style="font-size: 14px; line-height: 32px">
          <Space size="small">
            <span v-for="(item, i) in allParentsFrameworkAndSystem" :key="i">
              {{ item.name }}
              <RightOutlined />
            </span>
            <span>
              {{ businessFlowApply.name }}
            </span>
          </Space>
        </div>
        <div class="text-right">
          <Space size="middle">
            <Button @click="handleBack()" type="primary"> 返回 </Button>
            <Button
              v-if="dataType == 'flowApply' && businessFlowApply.procInstId"
              @click="approvalRecord(businessFlowApply)"
            >
              审批记录
            </Button>
          </Space>
        </div>
      </div>
      <ApproveHistoryModal ref="approveHistoryModalRef" @register="registerApproveHistoryModal" />
    </template>

    <div class="flex h-full" style="min-height: inherit">
      <BpmnViewer ref="viewerRef" />

      <div
        class="w-1/3 h-full bg-white ml-4 p-2 base-info-box"
        :class="{ 'base-info-box-collapse': !unCollapsed }"
        style="padding-top: 10px"
      >
        <Tooltip :title="!unCollapsed ? '展开' : '收起'" @click="unCollapsed = !unCollapsed">
          <span style="cursor: pointer" class="font-bold text-md cursor">
            <MenuFoldOutlined v-show="!unCollapsed" /><!-- 左箭头 -->
            <MenuUnfoldOutlined v-show="unCollapsed" /><!-- 右箭头 -->
            基本信息
          </span>
        </Tooltip>

        <BasicForm v-show="unCollapsed" class="!mt-4" />
      </div>
    </div>
  </Page>
</template>

<script lang="ts" setup>
  import { onMounted, ref, shallowRef, unref } from 'vue';
  import {Page} from '@vben/common-ui';
  import { useRoute } from 'vue-router';
  import { getBusinessFlowById } from '#/api/bpm/businessFlowApply';
  import { RightOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
  import { businessFlowApplyFormSchema } from './businessFlowApply.data';
  import { Space, Tooltip, Button } from 'ant-design-vue';
  // import { useGo } from '@/hooks/web/usePage';
  // import { useModal } from '@/components/Modal';
  // import { useTabs } from '@/hooks/web/useTabs';
  import ApproveHistoryModal from '#/views/flowoperation/processInst/ApproveHistoryModal.vue';
  import { BpmnViewer } from '#/assets/bpmn/viewer/lib/bpmn-viewer';
  // import { BasicForm, useForm } from '@/components/Form';
  import {useVbenForm} from '#/adapter/form';

  import { getAllParentsById } from '#/api/bpm/framework';

  // const go = useGo();
  // const [registerApproveHistoryModal, { openModal: openApproveHistoryModal, setModalProps }] =
  //   useModal();
  const allParentsFrameworkAndSystem = ref<Record<string, any>[]>([]);
  const currentRoute = useRoute();
  const {
    query: { id, dataType },
  } = unref(currentRoute);
  const businessFlowApply = ref<Record<string, any>>({});
  const unCollapsed = ref(true);
  // const { closeCurrent } = useTabs();

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      labelWidth: 100,
    },
    disabled: true,
    schema: businessFlowApplyFormSchema,
    showDefaultActions: false,
  });

  onMounted(() => {
    // 查看主表详情
    if (dataType === 'flow') {
      getBusinessFlowById({ id }).then((res) => {

        formApi.setValues({
          ...res,
          modelKey: [{ modelKey: res.modelKey, name: res.modelName }],
          ownerCode: [{ code: res.ownerCode, name: res.ownerName }],
        });
        businessFlowApply.value = res;
        loadShowHeader(res.frameworkId);
        loadSvgXml(res.diagramsInfoXml);
        // 判断修改按钮是否需要显示-判断当前状态下是否允许修改
        // 如果主表按钮不显示，则查申请表的最后一条审批记录
        // if (!res.showButton) {
        //   getBusinessFlowApplyByParams({ businessFlowId: id })
        //     .then((subRes) => {
        //       if (subRes) {
        //         // 得到有草稿的一条数据则允许编辑
        //         const subEditItems = subRes.filter((itm) => itm.status === 'CG');
        //         if (subEditItems && subEditItems[0]) {
        //           businessFlowApplySubEdit.value = subEditItems[0];
        //         }
        //       }
        //     })
        //     .finally(() => {
        //       // formTableLoading.value = false;
        //     });
        // }
      });
    }
    // else {
    //   // 查看申请表详情
    //   getBusinessFlowApplyDetailById({ id }).then((res) => {
    //     businessFlow.value = res;
    //     loadShowHeader(res.frameworkId);
    //     loadSvgXml(res.diagramsInfoXml);
    //   });
    // }
  });

  async function loadShowHeader(frameworkId: string) {
    const allParents = await getAllParentsById({ frameworkId });
    if (allParents) {
      const currentParent = allParents[0];
      if (currentParent.ownerCode) {
        await formApi.setValues({
          ownerCode: [
            {
              code: currentParent.ownerCode,
              name: currentParent.ownerName,
            },
          ],
          frameworkId: currentParent.id,
        });
      }
    }
    allParentsFrameworkAndSystem.value = allParents.reverse();
  }

  const viewerRef = shallowRef<ComponentInstance<typeof BpmnViewer>>();
  function loadSvgXml(xml: string) {
    viewerRef.value?.createNewProcess(xml);
  }

  function handleBack() {
    // closeCurrent();
    // go({ name: 'BusinessFlow' });
  }

  //审批记录
  function approvalRecord(record: Recordable<any>) {
    openApproveHistoryModal(true, {
      record: { processInstanceId: record.procInstId },
      isUpdate: true,
    });
    setModalProps({
      width: 800,
      height: 500,
      title: `审批记录`,
      showOkBtn: false,
      cancelText: '关闭',
    });
  }
</script>

<style lang="less">
  .custom-wrapper-content {
    .ant-page-header-content {
      padding-top: 0;
    }
  }
</style>
<style lang="less" scoped>
  .custom-wrapper-content:hover .base-info-ctrl-box {
    opacity: 1;
  }
  .base-info-ctrl-box {
    transition: opacity 0.5s;
    opacity: 0;
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: -30px;
    height: 30px;
  }
  .base-info-ctrl {
    width: 80px;
    margin: auto;
    border-radius: 25px;
    cursor: pointer;
    background: #536dfe;
    color: white;
    line-height: 16px;
    height: 30px;
  }
  .base-info.show {
  }
  .base-info.hide {
    height: 0;
    margin-top: 0;
  }
  .base-info {
    max-height: 105px;
    height: 105px;
    margin-top: 10px;
    transition: height 0.2s ease;
    position: relative;
  }
  .svg-controller {
    text-align: center;
    position: absolute;
    top: -60px;
    opacity: 0;
    transition: 0.8s;
    margin: auto;
    width: 100%;
  }
  .content-container {
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .content-container:hover .svg-controller {
    top: 8px;
    opacity: 1;
  }
  .svg-container {
    height: 100%;
    cursor: move;
  }
  .step-form-content {
    padding: 24px;
    //background-color: @component-background;
  }

  .base-info-box-collapse {
    width: 40px;
    text-align: center;
  }
  .step-form-form {
    width: 750px;
    margin: 0 auto;
  }
</style>
