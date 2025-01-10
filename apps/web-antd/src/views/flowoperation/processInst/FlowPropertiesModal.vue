<template>
  <BasicModal class="w-[900px]" >
    <Row
      v-if="variableData && variableData.length > 0"
      v-for="item in variableData"
      justify="space-around"
      align="middle"
      style="margin-bottom: 10px"
    >
      <Col span="6" class="text-right font-bold text-base text-ellipsis overflow-hidden"> {{ item.name }}： </Col>
      <Col span="18" class="code-viewer-bg">
        <!--        <pre v-highlight style="margin-bottom:0;"><code class="json">{{item.value||"&nbsp;"}}</code></pre>-->
        <div style="width: 100%; overflow: auto; max-height: 500px">
          <JsonPreview :data="item.value || {}" />
        </div>
      </Col>
    </Row>
    <div v-else>
      <Empty description="暂无数据" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, defineExpose } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import { Row, Col, Empty, message } from 'ant-design-vue';
  import { JsonPreview } from '#/components/CodeEditor';
  import { getVariablesByProcessInstanceId } from '#/api/flowoperation/processInst';

  const variableData = ref();

  /*const [registerModal, { setModalProps, changeLoading, closeModal }] = useModalInner(
    async (data) => {
      setModalProps({
        width: 1000,
      });
      changeLoading(true);
      const { processInstanceId: procInstId } = data.record;
      getVariablesByProcessInstanceId({ processInstanceId: procInstId })
        .then((res) => {
          variableData.value = res;
        })
        .finally(() => {
          changeLoading(false);
        });
    },
  );*/

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    showConfirmButton: false,
    cancelText: '关闭',
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          const { processInstanceId: procInstId } = values;
          getVariablesByProcessInstanceId({ processInstanceId: procInstId })
            .then((res) => {
              variableData.value = res;
            })
            .finally(() => {
              // changeLoading(false);
            });
          // formApi.setValues(values);
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    },
    onConfirm() {
      // await formApi.submitForm();
      // handleSubmit();
    },
  });

  defineExpose(modalApi)
</script>
<style lang="less">
  .code-viewer-bg {
    //background: mix(@trigger-dark-bg-color, #ccc, 80%);
  }
  .flow-properties-container {
    .ant-modal {
      .ant-modal-content {
        .ant-modal-body {
          .scroll-container {
            padding-top: 0;
            padding-bottom: 0;
          }
        }
      }
    }
  }
</style>
