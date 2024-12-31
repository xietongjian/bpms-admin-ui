<template>
  <BasicModal v-bind="$attrs" @register="registerModal" wrapClassName="flow-properties-container ">
    <Row
      v-if="variableData && variableData.length > 0"
      v-for="item in variableData"
      justify="space-around"
      align="middle"
      style="margin-bottom: 10px"
    >
      <Col span="6" class="text-right font-bold text-base"> {{ item.name }}： </Col>
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
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { Row, Col, Empty } from 'ant-design-vue';
  import { JsonPreview } from '@/components/CodeEditor';

  import { getVariablesByProcessInstanceId } from '@/api/flowoperation/processInst';

  const variableData = ref();

  const [registerModal, { setModalProps, changeLoading, closeModal }] = useModalInner(
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
  );
</script>
<style lang="less">
  .code-viewer-bg {
    background: mix(@trigger-dark-bg-color, #ccc, 80%);
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
