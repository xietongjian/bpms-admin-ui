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
            <span v-for="(item, i) in allParentsFrameworkAndSystem">
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
            <a-button @click="handleBack()" type="primary"> 返回 </a-button>
            <a-button @click="handleEditFlow()"> 修改 </a-button>
          </Space>
        </div>
      </div>
      <div class="base-info" :class="{ hide: !showBaseInfoVisible }">
        <Description
          v-if="showBaseInfoVisible"
          size="middle"
          :bordered="false"
          :column="3"
          :data="businessFlowApply"
          :schema="detailSchema"
        />
        <div class="base-info-ctrl-box">
          <div class="base-info-ctrl" @click="handleBaseInfoVisible">
            <CaretUpOutlined v-if="showBaseInfoVisible" />
            <CaretDownOutlined v-if="!showBaseInfoVisible" />
          </div>
        </div>
      </div>
    </template>
    <div class="content-container">
      <div class="svg-controller">
        <Space>
          <a-button shape="circle" @click="handleSvgZoomIn" type="primary">
            <PlusOutlined />
          </a-button>
          <a-button shape="circle" @click="handleSvgZoomReset" type="primary">
            <RetweetOutlined />
          </a-button>
          <a-button shape="circle" @click="handleSvgZoomOut" type="primary">
            <MinusOutlined />
          </a-button>
        </Space>
      </div>
      <div id="svgContainer" class="svg-container"> </div>
    </div>
  </Page>
</template>
<script lang="ts" setup>
  import { defineComponent, onMounted, ref, unref } from 'vue';
  import {Page} from '@vben/common-ui';
  import { useRoute } from 'vue-router';
  import {
    getBusinessFlowApplyByFrameworkId,
    getBusinessFlowApplyDetailById,
  } from '#/api/bpm/businessFlowApply';
  import { getBusinessFlowDetailById } from '#/api/bpm/businessflow';
  import {
    RightOutlined,
    PlusOutlined,
    MinusOutlined,
    RetweetOutlined,
    OneToOneOutlined,
    CaretUpOutlined,
    CaretDownOutlined,
  } from '@ant-design/icons-vue';
  // import { Description } from '@/components/Description/index';
  import { detailSchema } from './framework.data';
  import { Space, Button, Tooltip, message, Descriptions } from 'ant-design-vue';
  // import { useGo } from '@/hooks/web/usePage';
  // import { useMessage } from '@/hooks/web/useMessage';
  // import svgPanZoom from 'svg-pan-zoom';
  // import { useTabs } from '@/hooks/web/useTabs';
  import { getById } from '#/api/bpm/framework';
  import {useRouter} from 'vue-router';


  const router = useRouter();
  const allParentsFrameworkAndSystem = ref([]);
  const svgImgCode = ref('');
  const currentRoute = useRoute();
  const {
    query: { id, dataType },
  } = unref(currentRoute);
  const businessFlowApply = ref({});
  const panZoomTrigger = ref({});
  const showBaseInfoVisible = ref(false);
  // const { setTitle, closeCurrent } = useTabs();

  onMounted(() => {
    getById({ id }).then((res) => {
      businessFlowApply.value = res;
      loadShowHeader(res?.frameworkId);
      loadSvgXml(res?.diagramsInfoXml);
    });
  });

  function loadShowHeader(frameworkId) {
    /*getBusinessFlowApplyByFrameworkId({frameworkId}).then(res=> {
      allParentsFrameworkAndSystem.value = res.treeNodes.reverse();
    });*/
  }

  function loadSvgXml(svgXml) {
    document.getElementById('svgContainer').innerHTML = svgXml; //res为从服务器获取的xml字符串
    const svgObj = document.getElementById('svgContainer').querySelector('svg');

    svgObj?.setAttribute('id', 'svg-trigger');
    svgObj?.setAttribute('width', '100%');
    svgObj?.setAttribute('height', '100%');

    try {
      panZoomTrigger.value = svgPanZoom('#svg-trigger');
    } catch (e) {
      console.error(e);
    }
    /*
    // 用法示例
    svgPanZoom('#svg-triger', {
      zoomEnabled: true,
      fit: true,
      controlIconsEnabled: true,
      contain:true
    });
    */
  }

  function handleBaseInfoVisible() {
    showBaseInfoVisible.value = !unref(showBaseInfoVisible);
    setTimeout(() => {
      const myEvent = new Event('resize');
      window.dispatchEvent(myEvent);
    }, 200);
  }

  function handleBack() {
    // closeCurrent();
    // go();
    router.push({ name: 'ProcessFramework' });
  }
  function handleSvgZoomIn() {
    try {
      panZoomTrigger.value?.zoomIn();
    } catch (e) {
      message.error('图形加载失败！无法操作！');
    }
  }
  function handleSvgZoomReset() {
    try {
      panZoomTrigger.value?.resetZoom();
      panZoomTrigger.value?.fit();
      panZoomTrigger.value?.center();
    } catch (e) {
      message.error('图形加载失败！无法操作！');
    }
  }
  function handleSvgZoomOut() {
    try {
      panZoomTrigger.value?.zoomOut();
    } catch (e) {
      message.error('图形加载失败！无法操作！');
    }
  }

  // 编辑流程
  function handleEditFlow() {
    // go("/bpm/framework/designer?id=" + businessFlow.value.id);
    go({ name: 'FrameworkDesigner', query: { id: unref(businessFlowApply).id } });
  }

  //审批记录
  function historicalRecords() {}
  /*export default defineComponent({
    components: {
      Tooltip,
      CaretUpOutlined,
      CaretDownOutlined,
      PageWrapper,
      Space,
      RightOutlined,
      Description,
      PlusOutlined,
      MinusOutlined,
      RetweetOutlined,
      OneToOneOutlined,
    },
    setup() {
      const go = useGo();
      const { createMessage } = useMessage();


      return {
        allParentsFrameworkAndSystem,
        businessFlowApply,
        detailSchema,
        svgImgCode,
        dataType,
        handleBack,
        handleEditFlow,
        historicalRecords,
        handleSvgZoomIn,
        handleSvgZoomReset,
        handleSvgZoomOut,
        handleBaseInfoVisible,
        showBaseInfoVisible,
      };
    },
  });*/
</script>
<style lang="less">
/*  .custom-wrapper-content {
    .ant-page-header-content {
      padding-top: 0;
    }
  }*/
</style>
<style lang="less" scoped>
  /*.custom-wrapper-content:hover .base-info-ctrl-box {
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
    max-height: 175px;
    height: 175px;
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
    background-color: @component-background;
  }

  .step-form-form {
    width: 750px;
    margin: 0 auto;
  }*/
</style>
