<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    @ok="handleSubmit"
    wrapperFooterOffset="40"
    @visible-change="handleVisibleChange"
    :defaultFullscreen="false"
  >
    <div v-if="hackReset" class="h-full">
      <ProcessPage ref="framePageRef" :frameSrc="formUrl" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, onMounted, nextTick, computed } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, Rule, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';
  import ProcessPage from './ProcessDesignerFrame.vue';
  import { Spin } from 'ant-design-vue';
  import { saveOrUpdate } from '#/api/bpm/diagrams';
  import { ResultEnum } from '@/enums/httpEnum';

  const frameworkLibs = ['archimate', 'arrows2', 'atlassian'];
  const processLibs = [];

  export default defineComponent({
    name: 'ProcessDesignerModal',
    components: { Spin, ProcessPage, BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const mainIdRef = ref<string>('');
      const formUrl = ref<string>('');
      const framePageRef = ref(null);
      const hackReset = ref(false);
      const { createMessage } = useMessage();

      const [registerModal, { setModalProps, changeLoading, closeModal }] = useModalInner(
        async (data) => {
          changeLoading(false);
          const { type, mainId } = data;
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
        },
      );

      function getProcessDesignerSvgXml() {
        return unref(framePageRef).frameRef.contentWindow.doGetXml();
      }

      async function handleSubmit() {
        try {
          changeLoading(true);
          setModalProps({ confirmLoading: true });
          const xml = await getProcessDesignerSvgXml();

          saveOrUpdate({ mainId: mainIdRef.value, xml: xml }).then((res) => {
            if (res.data.code === ResultEnum.SUCCESS) {
              message.success(res.data.msg);
            } else {
              message.error(res.data.msg);
            }
          });
        } catch (e) {
          message.warning('当前为跨域状态，请发布后再使用！', 2);
        } finally {
          setTimeout(() => {
            changeLoading(false);
            setModalProps({ confirmLoading: false });
          }, 1000);
        }
      }

      function handleVisibleChange(visible: boolean) {
        hackReset.value = visible;
      }

      return {
        formUrl,
        hackReset,
        framePageRef,
        registerModal,
        handleSubmit,
        handleVisibleChange,
      };
    },
  });
</script>
