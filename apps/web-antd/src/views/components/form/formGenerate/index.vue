<template>
  <div class="company-tree bg-white overflow-hidden" style="height: 100%" v-loading="loading">
    <div v-if="!generateFormInfo.jsonData" style="text-align: center">
      <Alert message="加载表单失败！" type="error" />
    </div>
    <div v-else>
      <GenerateForm
        ref="generateFormRef"
        :edit="false"
        :data="generateFormInfo.jsonData"
        style="height: 100%; min-height: 200px"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, reactive, ref, defineProps, nextTick } from 'vue';
  import { Alert } from 'ant-design-vue';
  import { GenerateForm } from '/public/form-making';
  import { getCustomFormInfoVoByModelKeyAndBusinessKey } from '#/api/flowoperation/processTask';

  const props = defineProps({
    modelKey: {
      type: String,
      default: '',
    },
    businessKey: {
      type: String,
      default: '',
    },
    procInstId: {
      type: String,
      default: '',
    },
    taskId: {
      type: String,
      default: '',
    },
    formType: {
      type: Number,
      default: 0,
    },
  });

  const loading = ref<boolean>(false);
  const generateFormRef = ref(null);
  const generateFormInfo = reactive({
    formName: '',
    jsonData: {},
    formSn: '',
    id: '',
  });

  async function fetch() {
    // getCustomFormInfoVoByModelKeyAndBusinessKey
    if (props.modelKey && props.businessKey) {
      loading.value = true;
      //
      getCustomFormInfoVoByModelKeyAndBusinessKey({
        modelKey: props.modelKey,
        businessKey: props.businessKey,
        procInstId: props.procInstId,
        taskId: props.taskId,
      })
        .then((res) => {
          const {
            success,
            data: { formInfo, formDatas, activityFormItems },
          } = res.data;
          if (success) {
            generateFormInfo.jsonData = JSON.parse(formInfo.formJson);
            nextTick(() => {
              generateFormRef.value.refresh();
              generateFormRef.value.setData(formDatas);
              setFormPermission(activityFormItems);
            });
          } else {
            alert('error');
          }
        })
        .catch((e) => {
          console.log(e, '调用接口异常。。。');
        })
        .finally(() => {
          loading.value = false;
        });
    } else {
      console.warn('modelKey和businessKey不能同时为空。');
    }
  }

  function setFormPermission(activityFormItems) {
    // if(path.indexOf('/process/approve') !== -1){
    //   // 如果是审批页，获取当前节点可编辑的项
    // }
    if(activityFormItems && activityFormItems.length > 0) {
      // if (path.indexOf('/process/launch') !== -1 || path.indexOf('/process/approve') !== -1) {
      //   formIsEdit.value = true;
      // }
      // operateType HIDE(0, "隐藏"), SHOW(1, "仅可见"), EDIT(2, "可编辑");
      const hideItems = activityFormItems.filter(item => item.operateType === 0);
      const editItems = activityFormItems.filter(item => item.operateType === 2);
      if (hideItems) {
        const hideFields = hideItems.map(item => item.makModel);
        nextTick(() => {
          generateFormRef.value.hide(hideFields);
        });
      }

      // if (path.indexOf('/process/approve') !== -1) {
      //   // 如果是审批页，获取当前节点可编辑的项
      // }

      // 如果是发起页面不作操作
      nextTick(() => {
        // 如果是审批页，获取当前节点可编辑的项
        // 先把所有的字段设置成不可编辑
        const allKeys = activityFormItems.map(item => item.makModel);
        generateFormRef.value.disabled(allKeys, true);

        if (editItems && editItems.length > 0) {
          const editFields = editItems.map(item => item.makModel);
          // 如果审批页面则不设置可编辑状态
          // if (path.indexOf('/process/approve') !== -1) {
          //   // 如果是审批页，获取当前节点可编辑的项
          //   generateFormRef.value.disabled(editFields, false);
          //   editFormFields.value = editFields;
          // }
        }
      });
    }
  }

  onMounted(() => {
    fetch();
  });
</script>
