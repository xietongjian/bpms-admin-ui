<template>
  <div class="">
    <div v-if="showBaseFormInfo" class="form-header-base-info " >
      <Descriptions title="" size="small">
        <DescriptionsItem label="提交人">
          {{ baseFormInfo.personalName || '-' }}
        </DescriptionsItem>
        <DescriptionsItem label="移动电话">{{ baseFormInfo.phoneNumber || '-' }}</DescriptionsItem>
        <DescriptionsItem label="职务">{{ baseFormInfo.positionName || '-' }}</DescriptionsItem>
        <DescriptionsItem label="提交单位">{{ baseFormInfo.companyName || '-' }}</DescriptionsItem>
        <DescriptionsItem label="提交部门">{{ baseFormInfo.deptName || '-' }}</DescriptionsItem>
        <DescriptionsItem label="提交时间">{{ baseFormInfo.launchTime || '-' }}</DescriptionsItem>
      </Descriptions>
    </div>

    <Collapse size="small" collapsible="header" default-active-key="1">
      <CollapsePanel key="1" header="表单内容">
        <div style="min-height: 300px" class="p-4">
          <Skeleton :loading="jsonData === null" active>
            <GenerateForm
                class="generate-form"
                ref="generateFormRef"
                v-if="jsonData && jsonData !== null"
                :edit="formIsEdit"
                :data="jsonData"
                :print-read="printRead"
                style="height: 100%; min-height: 300px"
            />
          </Skeleton>
        </div>
      </CollapsePanel>
    </Collapse>
<!--
    <CollapseContainer :canExpand="true" class="generate-form-container mt-2">
      <template #title>
        <div class="font-bold">表单内容</div>
      </template>

    </CollapseContainer>-->
  </div>
</template>
<script lang="ts" setup>
  import { nextTick, onMounted, ref, unref, watch } from 'vue';
  import { Collapse, Descriptions, DescriptionsItem, Skeleton, message, CollapsePanel
  } from 'ant-design-vue';
  import { useRouter } from 'vue-router';

  import {
    getBizInfoVoByModelKey,
    getCustomFormInfoVoByModelKeyAndBusinessKey,
    startCustomFormProcess,
  } from '#/api/process/process';
  // import { CollapseContainer } from '@/components/Container';
  import { GenerateForm } from '/public/static/form-making';
  import { updateCustomFormData, getFormItemShowsByTaskId } from '#/api/process/customForm';
  import ProcessApproveHistoryInfo
    from "#/views/components/preview/processFormPreview/components/ProcessApproveHistoryInfo.vue";
  const router = useRouter();

  const CollapseItem = Collapse.Item;
  const props = defineProps({
    formType: {
      type: Number,
      default: -1,
    },
    printRead: {
      type: Boolean,
      default: false,
    },
    modelKey: {
      type: String,
      default: '',
    },
    bizId: {
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
    viewType: {
      type: String,
      default: 'view', // launch 发起页面；approve 审批页面: view 查看页面
    },
  });

  const baseFormInfo = ref({});
  const showBaseFormInfo = ref(false);

  const { currentRoute } = useRouter();
  const jsonData = ref(null);
  const generateFormRef = ref();
  // approve/:modelKey/:procInstId/:bizId/:taskId/:showPost
  const { path, params } = unref(currentRoute);

  const editFormFields = ref([]);
  const formIsEdit = ref(false);
  if (props.viewType === 'approve' || props.viewType === 'launch') {
    formIsEdit.value = true;
  }

  function getUrlValue(val) {
    return val == '0' ? '' : val;
  }

  // fetch();

  watch(
    () => props.formType,
    (newValue, oldValue) => {
      if (newValue !== -1) {
        // fetch();
      } else {
        message.error('未定义的表单类型！');
      }
    },
  );

  onMounted(() => {
    if (props.modelKey == 0) {
      // message.error("流程定义Key【processDefinitionKey】不能为空！");
      return;
    }
    // 加载数据
    // fetch();
  });

  function fetchFormData(params: any) {
    // modelKey, bizId, procInstId
    if (params.formType === 1) {
      // 渲染业务表单数据
      getBizInfoVoByModelKey({
        modelKey: params.modelKey,
        bizId: params.bizId,
        procInstId: params.procInstId,
      })
        .then((res) => {
          const result = res.data;
          if (result.success) {
            const { formJson } = result.data;
            jsonData.value = JSON.parse(formJson);
            nextTick(() => {
              generateFormRef.value.refresh();
              setFormPermission();
            });
          } else {
            message.error(result.msg);
          }
        })
        .finally(() => {
          // unref(framePageRef).hideIframeLoading();
        });
    } else if (params.formType === 0) {
      debugger;
      // 渲染自定义表单数据
      getCustomFormInfoVoByModelKeyAndBusinessKey({
        modelKey: params.modelKey??'',
        bizId: params.bizId??'',
        procInstId: params.procInstId??'',
      })
        .then((res) => {
          const {success, msg, data} = res;
          if (success) {
            const { formDatas, formInfo } = data;
            if (formDatas.personal_name) {
              showBaseFormInfo.value = true;
              baseFormInfo.value = {
                personalName: formDatas.personal_name,
                positionName: formDatas.position_name,
                companyName: formDatas.company_name,
                deptName: formDatas.dept_name,
                phoneNumber: formDatas.phone_number,
                launchTime: formDatas.launch_time,
              };
            } else {
              showBaseFormInfo.value = false;
            }
            jsonData.value = JSON.parse(formInfo.formJson);
            nextTick(() => {
              generateFormRef.value.refresh();
              generateFormRef.value.setData(formDatas);
              setFormPermission();
            });
            // iframe.loadCustomFormData({...result.data, isEdit: formIsEdit});
            // 加载成功后关闭Loading
          } else {
            message.error(msg);
          }
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          // unref(framePageRef).hideIframeLoading();
        });
    }
  }

  function setFormPermission() {
    if (props.taskId) {
      getFormItemShowsByTaskId({ formType: props.formType, taskId: props.taskId }).then((res) => {
        if (res && res.length > 0) {
          if (props.viewType === 'launch') {
            formIsEdit.value = true;
          }
          // operateType HIDE(0, "隐藏"), SHOW(1, "仅可见"), EDIT(2, "可编辑");
          const hideItems = res.filter((item) => item.operateType === 0);
          const editItems = res.filter((item) => item.operateType === 2);
          if (hideItems) {
            const hideFields = hideItems.map((item) => item.makModel);
            nextTick(() => {
              generateFormRef.value.hide(hideFields);
            });
          }

          if (path.indexOf('/process/approve') !== -1) {
            // 如果是审批页，获取当前节点可编辑的项
          }

          // 如果是发起页面不作操作
          if (props.viewType === 'launch') {
            return;
          } else {
            // 否则如果是查看或审批页面则
            nextTick(() => {
              // 如果是审批页，获取当前节点可编辑的项
              // 先把所有的字段设置成不可编辑
              const allKeys = res.map((item) => item.makModel);
              generateFormRef.value.disabled(allKeys, true);

              if (editItems && editItems.length > 0) {
                const editFields = editItems.map((item) => item.makModel);
                // 如果审批页面则不设置可编辑状态
                if (props.viewType === 'approve') {
                  // 如果是审批页，获取当前节点可编辑的项
                  generateFormRef.value.disabled(editFields, false);
                  editFormFields.value = editFields;
                }
              }
            });
          }
        } else {
          console.warn('查询到的表单字段权限为空');
        }
      });
    } else {
    }
  }

  function saveFormData() {
    debugger;
    if (editFormFields.value.length === 0) {
      return Promise.resolve({
        success: true,
        msg: '没有可编辑的项，不需要保存数据！',
        code: '100',
      });
    }
    // 判断表单类型
    if (props.formType === 0) {
      return getFormData(true)
        .then((res) => {
          const formData = { defaultFormDataVo: { code: props.bizId }, makFormDataVo: res };
          const data = { dataJson: {}, procInstId: '', modelKey: '' };
          // 只保存可编辑的字段
          let tempFormData = {};
          editFormFields.value.forEach((item) => {
            tempFormData[item] = res[item];
          });
          formData.makFormDataVo = tempFormData;
          data.dataJson = JSON.stringify(formData);
          data.procInstId = props.procInstId;
          data.modelKey = props.modelKey;
          return updateCustomFormData(data).then((res) => {
            return Promise.resolve(res.data);
          });
        })
        .catch((e) => {
          return Promise.reject('表单验证失败' + e);
        });
    } else {
      // 如果是业务表单，则调用业务表单里面的方法-这里需指定方法名
      return getFormData(true)
        .then((res) => {
          const formData = { defaultFormDataVo: { bizId: props.bizId }, makFormDataVo: {} };
          const data = { dataJson: {}, procInstId: '', modelKey: '' };
          // 只保存可编辑的字段
          let tempFormData = {};
          editFormFields.value.forEach((item) => {
            tempFormData[item] = res[item];
          });
          formData.makFormDataVo = tempFormData;
          data.dataJson = formData;
          data.procInstId = props.procInstId;
          data.modelKey = props.modelKey;

          // 判断是否有doSaveForm事件
          const eventExists = validEventExists('doSaveForm');
          if (!eventExists) {
            message.error('未找到动作【doSaveForm】');
            return Promise.reject(
              "未找到动作【doSaveForm】。\n提示：\n1、请在表单中添加【doSaveForm】动作；\n2、该动作需要返回【Promise.resolve({success: true, msg: '保存成功', code: '100'})】对象。",
            );
          }
          const doSaveResult = unref(generateFormRef).triggerEvent('doSaveForm', data);
          if (doSaveResult instanceof Promise) {
            return doSaveResult;
          } else {
            return Promise.reject(
              "调用自定义表单中的动作，需要返回【Promise.resolve({success: true, msg: '提交成功', code: ''})】",
            );
          }
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    }
  }

  function validEventExists(eventName) {
    debugger;
    return unref(jsonData).config.eventScript.some((item) => item.name === eventName);
  }

  function getFormData(validate) {
    debugger;
    // 1草稿；2已发起流程
    // const validStatus = status == '2';
    return unref(generateFormRef)
      .getData(validate)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((e) => {
        if (typeof e === 'string') {
          formValidateMsg(e);
        }
        return Promise.reject(e);
      });
  }

  // 表单验证错误提示
  function formValidateMsg(msg) {
    message.warn(msg);
    const isError = document.querySelector('.fm-form .is-error');
    if (isError) {
      isError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // 'doSubmitForm'
  function triggerEvent(event, data) {
    return unref(generateFormRef).triggerEvent(event, data);
  }

  // 保存草稿/提交
  function submitFlowForm(status) {
    // 判断表单类型。
    // 如果是自定义表单：
    if (props.formType === 0) {
      return getFormData(status)
        .then((res) => {
          const formData = { defaultFormDataVo: { code: props.bizId }, makFormDataVo: res };
          const data = {
            dataJson: JSON.stringify(formData),
            formDraftStatus: status,
            modelKey: props.modelKey,
          };
          debugger;
          return startCustomFormProcess(data);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    } else if (props.formType === 1) {
      // 如果是业务表单，需要满足以下约定
      // 1、在表单中添加动作
      // 1.1、动作需要返回Promise.resolve({success: true, msg: '', code: ''});
      // status 1草稿；2已发起流程
      // 保存草稿时不需要表单校验
      return unref(generateFormRef)
        .getData(status == '2')
        .then((formData) => {
          const eventExists = validEventExists('doSubmitForm');
          if (!eventExists) {
            message.error('未找到动作【doSubmitForm】');
            return Promise.reject(
              "未找到动作【doSubmitForm】。\n提示：\n1、请在表单中添加【doSubmitForm】动作；\n2、该动作需要返回【Promise.resolve({success: true, msg: '提交成功', code: '100'})】对象。",
            );
          }
          const doSubmitResult = unref(generateFormRef).triggerEvent('doSubmitForm', {
            type: status == '2' ? 'SUBMIT' : 'SAVE',
            data: formData,
          });
          if (doSubmitResult instanceof Promise) {
            return doSubmitResult;
          } else {
            return Promise.reject(
              "【doSubmitForm】动作需要返回【Promise.resolve({success: true, msg: '提交成功', code: ''})】",
            );
          }
        })
        .catch((e) => {
          if (typeof e === 'string') {
            formValidateMsg(e);
          }
          return Promise.reject(e);
        });
    }
  }

  defineExpose({
    getFormData,
    fetchFormData,
  });
</script>
