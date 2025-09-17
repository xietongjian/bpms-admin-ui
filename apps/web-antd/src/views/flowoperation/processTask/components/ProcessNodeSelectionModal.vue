<script setup lang="ts">
  import { defineExpose, computed, defineEmits, ref, shallowRef } from 'vue';
  import {useVbenModal} from '@vben/common-ui';
  import { BpmnViewer } from '#/assets/bpmn/viewer/lib/bpmn-viewer.js';
  import { Row, Col, message } from 'ant-design-vue';
  import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer';
  import { processNodeSelectionFormSchema } from '#/views/flowoperation/processInst/processInst.data';
  import { is } from 'bpmn-js/lib/util/ModelUtil';
  import {useVbenForm} from "#/adapter/form";
  import { usePreferences } from '@vben/preferences';

  defineOptions({ name: 'ProcessNodeSelectionModal' });

  const emit = defineEmits(['success', 'register']);

  const { isDark } = usePreferences();
  const getTheme = computed(() => (isDark.value ? 'dark' : 'light'));

  const multiple = ref(false);
  const navigatedViewer = shallowRef<NavigatedViewer>();
  const bpmnViewer = shallowRef<any>();

  const historyActivityIds = shallowRef<string[]>([]);
  const selectedActivityIds = shallowRef<string[]>([]);

  let submitMethod = Promise.resolve();

  function handleViewerInit(v) {
    navigatedViewer.value = v;
    v.on('element.click', 5000, ({ element }) => {
      if (is(element, 'bpmn:Task') && historyActivityIds.value.includes(element.id)) {
        setTimeout(() => handleSelectElement(element), 40);
      }

      return false;
    });
  }

  function handleSelectElement(element) {
    const selection = navigatedViewer.value!.get('selection');
    const selectedElements = selection.get();

    if (!multiple.value) {
      if (selectedActivityIds.value.includes(element.id)) {
        selection.deselect(element);
        selectedActivityIds.value = [];
        // setFieldsValue({ activityIds: undefined });
        formApi.setValues({ activityIds: undefined });
      } else {
        selection.select([element]);
        selectedActivityIds.value = [element.id];
        // setFieldsValue({ activityIds: element.id });
        formApi.setValues({ activityIds: element.id })
      }
      return;
    }

    if (selectedActivityIds.value.includes(element.id)) {
      selection.select(selectedElements.filter((e) => e.id !== element.id));
    } else {
      selection.select([...selectedElements, element]);
    }
    selectedActivityIds.value = selection.get().map((i) => i.id);
    // setFieldsValue();
    formApi.setValues({ activityIds: selectedActivityIds.value })
  }

  function handleChangeSelect(ids) {
    const selection = navigatedViewer.value!.get('selection');
    const elementRegistry = navigatedViewer.value!.get('elementRegistry');
    if (multiple.value) {
      const elements = elementRegistry.filter((e) => ids.includes(e.id));
      selection.select(elements);
      selectedActivityIds.value = ids;
      return;
    }
    const element = elementRegistry.find((e) => e.id === ids);
    selection.select([element]);
    selectedActivityIds.value = [element.id];
  }

  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: processNodeSelectionFormSchema,
    wrapperClass: 'grid-cols-1',
  });

  /*const [registerModal, { setModalProps, changeLoading, closeModal }] = useModalInner(
    async (data) => {
      try {
        changeLoading(true);

        const { record, title, helpMessage, request, multi, formSchema } = data;

        if (request) {
          submitMethod = request;
        }

        await resetFields();

        setModalProps({ title, helpMessage, width: 1100, minHeight: 400 });

        const procInstId = record.processInstanceId;

        const { modelXml, hisActiveActivityIds, highLightedFlows, activeActivityIds } = procInstId
          ? await getHighLightedNodeVoByProcessInstanceId({ procInstId })
          : await getBpmnByModelKey(record);

        await bpmnViewer.value?.createNewProcess(modelXml);

        if (procInstId) {
          bpmnViewer.value?.setPassedNodes([...highLightedFlows, ...hisActiveActivityIds]);
          bpmnViewer.value?.setActiveNodes([...activeActivityIds]);
          bpmnViewer.value?.setProcessingMarker([...activeActivityIds]);
        }

        if (formSchema) {
          await updateSchema(formSchema);
        }

        const elements =
          bpmnViewer.value
            ?.getModeler()
            .get('elementRegistry')
            .filter((e) => is(e, 'bpmn:Task') && hisActiveActivityIds.includes(e.id)) || [];
        await updateSchema([
          {
            field: 'activityIds',
            componentProps: {
              mode: multi ? 'multiple' : 'default',
              options: elements.map((e) => ({
                label: e.businessObject.name || e.id,
                value: e.id,
              })),
              onChange: handleChangeSelect,
            },
          },
        ]);

        historyActivityIds.value = hisActiveActivityIds || [];
        selectedActivityIds.value = [];
        multiple.value = multi;

        changeLoading(false);
      } catch (e) {
        console.error(e);
      } finally {
        changeLoading(false);
      }
    },
  );*/

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
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

  async function handleSubmit() {
    try {
      const selectedElements = bpmnViewer.value
        ?.getModeler()
        ?.get('selection')
        .get()
        .map((i) => i.id);

      if (!selectedElements?.length) {
        return message.warn('请选择驳回到指定节点');
      }
      if (!multiple.value && selectedElements.length > 1) {
        return message.warn('只能选择一个元素节点');
      }

      modalApi.setState({loading: true, confirmLoading: true});

      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const formValues = await formApi.getValues();

      delete formValues['activityIds'];

      await submitMethod(multiple.value ? selectedElements : selectedElements[0], formValues);

      modalApi.close();
      emit('success');
    } finally {
      modalApi.setState({loading: false, confirmLoading: false});
    }
  }
  defineExpose(modalApi)
</script>

<template>
  <BasicModal
    v-bind="$attrs"
    wrapClassName="bpmn-viewer-node-select-container "
    @ok="handleSubmit"
  >
    <Row class="bpmn-container-fill">
      <Col :span="16">
        <BpmnViewer
          ref="bpmnViewer"
          local="zh_CN"
          translate-prefix="bpmn.information."
          :theme="getTheme"
          @viewer-init="handleViewerInit"
        />
      </Col>
      <Col :span="8">
        <BasicForm />
      </Col>
    </Row>
  </BasicModal>
</template>

<style lang="scss">
  //@import '@/assets/bpmn/viewer/lib/style.css';
  .bpmn-container-fill {
    min-height: inherit;
    position: relative;
    .bpmn-viewer {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
  }
  .bpmn-viewer-node-select-container {
    .scroll-container {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }
    .bpmn-viewer__toolbar {
      display: none;
    }
  }
</style>
