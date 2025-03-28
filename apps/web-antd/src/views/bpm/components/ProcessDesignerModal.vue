<template>
  <BasicModal
      v-bind="$attrs"
      @ok="handleSubmit"
      wrapperFooterOffset="40"
      @visible-change="handleVisibleChange"
      :defaultFullscreen="false"
  >
    <div v-if="hackReset" class="h-full">
      <ProcessPage ref="framePageRef" :frameSrc="formUrl"/>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
import {defineComponent, ref, unref, onMounted, nextTick, computed} from 'vue';
import ProcessPage from './ProcessDesignerFrame.vue';
import {message} from 'ant-design-vue';
import {saveOrUpdate} from '#/api/bpm/diagrams';
// import { ResultEnum } from '#/enums/commonEnum';
import {useVbenModal} from '@vben/common-ui';

const frameworkLibs = ['archimate', 'arrows2', 'atlassian'];
const processLibs = [];

const mainIdRef = ref<string>('');
const formUrl = ref<string>('');
const framePageRef = ref(null);
const hackReset = ref(false);

const [BasicModal, modalApi] = useVbenModal({
  title: '-',
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  async onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const values = modalApi.getData<Record<string, any>>();
      if (values) {
        modalApi.setState({loading: false, confirmLoading: false});

        const {type, mainId} = values;
        mainIdRef.value = mainId;
        const isDev = import.meta.env.DEV;
        // formUrl.value = isDev ? ('http://localhost:8080/#/?modelKey=' + data.modelKey + '&formType=customTask&formInfoId='+(data.formId||'')+'&categoryCode='+data.categoryCode+'&t=' + Math.random())
        //   : ('/form-designer/index.html#/?modelKey=' + data.modelKey + '&formType=customTask&formInfoId='+(data.formId||'')+'&categoryCode='+data.categoryCode+'&t=' + Math.random());
        const libs = type === 'framework' ? frameworkLibs.join(';') : processLibs.join(';');
        const tempA = document.createElement('a');
        tempA.href = '/flow/bpm/diagrams/getXmlByte/' + mainId;

        formUrl.value =
            '/static/drawio/index.html?dev=1&lang=zh&save=remote&drafts=0&splash=0&format=1&libs=' +
            libs +
            '&picker=0&db=0&od=0&tr=0&gh=0&gl=0&gapi=0&mainId=' +
            mainId +
            '#U' +
            tempA.href;
      }
    }
  },
  onConfirm() {
    // await baseFormApi.submitForm();
    // handleSubmit();
  },
});

function getProcessDesignerSvgXml() {
  return unref(framePageRef).frameRef.contentWindow.doGetXml();
}

async function handleSubmit() {
  try {
    modalApi.setState({loading: true, confirmLoading: true});

    const xml = await getProcessDesignerSvgXml();

    const {success, msg} = await saveOrUpdate({mainId: mainIdRef.value, xml: xml});
    if (success) {
      message.success(msg);
    } else {
      message.error(msg);
    }
  } catch (e) {
    message.warning('当前为跨域状态，请发布后再使用！', 2);
  } finally {
    modalApi.setState({loading: false, confirmLoading: false});
  }
}

function handleVisibleChange(visible: boolean) {
  hackReset.value = visible;
}
</script>
