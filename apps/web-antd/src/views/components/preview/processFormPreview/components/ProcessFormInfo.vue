<template>
  <div
    v-loading="loading"
      v-if="modelKey"
      class="generate-form-container"
      style="height: auto"
  >
    <GenerateForm
        class="generateForm min-h-[200px]"
        id="generateFormId"
        ref="generateFormRef"
        :edit="showOperation"
        :data="jsonData"
        :print-read="printRead"
    />
    <div v-if="showErrorMsg" class="show-error-tip">{{ errorMsg }}</div>
  </div>
</template>
<script lang="ts" setup>
import {ref, defineProps, defineEmits, onMounted, defineExpose, watch, unref, nextTick} from 'vue';
import { GenerateForm } from '/public/static/form-making';
import {getCustomFormInfoVoByModelKeyAndBusinessKey} from "#/api/flowoperation/processTask";

const emit = defineEmits(['success']);
const props = defineProps({
  procInstId: {
    type: String,
    default: undefined,
  },
  bizId: {
    type: String,
    default: ''
  },
  taskId: {
    type: String,
    default: ''
  },
  modelKey: {
    type: String,
    default: ''
  },
  printRead: {
    type: Boolean,
    default: false
  },
  showOperation: {
    type: Boolean,
    default: false
  }
});
const loading = ref(false);
const activeKey = ref(1);
const baseFormInfo = ref({});
const jsonData = ref({});
const generateFormRef = ref();
const showErrorMsg = ref(false);
const errorMsg = ref();

/*
watch(() => props.procInstId, (newVal, oldValue) => {
  getStartHeadInfoVo();
});
*/

onMounted(() => {
  loadCustomFormAndData();
});
/**
 * 加载自定义表单结构和数据
 */
async function loadCustomFormAndData() {
  // showBizFormData.value = true;
  loading.value = true;
  try { // 渲染自定义表单数据
    const {data, success, msg} = await getCustomFormInfoVoByModelKeyAndBusinessKey({
      modelKey: props.modelKey,
      businessKey: props.bizId,
      procInstId: props.procInstId,
      taskId: props.taskId,
    });
    if (success) {
      const {formDatas, formInfo, itemList, activityFormItems} = data;
      jsonData.value = JSON.parse(formInfo.formJson);
      nextTick(() => {
        generateFormRef.value.refresh();
        generateFormRef.value.setData(formDatas);
        setFormPermission(activityFormItems, itemList);
      });
    } else {
      showErrorMsg.value = true;
      errorMsg.value = msg;
    }
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

function setFormPermission(activityFormItems, itemList) {
  // if(path.indexOf('/process/approve') !== -1){
  //   // 如果是审批页，获取当前节点可编辑的项
  // }
  if (activityFormItems && activityFormItems.length > 0) {
    // if (path.indexOf('/process/launch') !== -1 || path.indexOf('/process/approve') !== -1) {
    //   formIsEdit.value = true;
    // }
    // operateType HIDE(0, "隐藏"), SHOW(1, "仅可见"), EDIT(2, "可编辑");
    const hideItems = activityFormItems.filter((item) => item.operateType === 0);
    const editItems = activityFormItems.filter(
        (item) => item.operateType === 2 || item.operateType === 3,
    );
    const requiredItems = activityFormItems.filter((item) => item.operateType === 3);
    if (hideItems) {
      const hideFields = hideItems.map((item) => item.fieldName);
      nextTick(() => {
        generateFormRef.value.hide(hideFields);
      });
    }

    // if (path.indexOf('/process/approve') !== -1) {
    //   // 如果是审批页，获取当前节点可编辑的项
    // }

    // 如果是发起页面不作操作
    const allItems = itemList.map((item) => item.makModel);

    // 如果是审批页，获取当前节点可编辑的项
    // 先把所有的字段设置成不可编辑
    // const allKeys = activityFormItems.map(item => item.fieldName);
    generateFormRef.value.disabled(allItems, true);

    if ((editItems && editItems.length > 0) || (requiredItems && requiredItems.length > 0)) {
      const editFields = editItems.map((item) => item.fieldName);
      const requiredFields = requiredItems.map((item) => item.fieldName);
      const requiredFieldLabels = requiredItems.map((item) => item.labelName);
      debugger;
      // 如果审批页面则不设置可编辑状态
      if (showOperation.value) {
        // 如果是审批页，获取当前节点可编辑的项
        editFormFields.value = [...editFields, ...requiredFields];

        generateFormRef.value.disabled([...editFields, ...requiredFields], false);
        // editFormFields.value = editFields;
        if (requiredFields && requiredFields.length > 0) {
          requiredFormFields.value = requiredFields;
          requiredItems.forEach(itm => {
            // 如果有必填项则设置必填
            generateFormRef.value.setOptions(itm.fieldName, {
              required: true,
            });
            generateFormRef.value.setRules(itm.fieldName, [
              {
                required: true,
                message: `请输入${itm.labelName}`,
              },
            ]);
          });
        }
      }
    }
  }
}

defineExpose({});
</script>
