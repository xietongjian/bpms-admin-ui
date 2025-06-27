<template>
  <div class="flex flex-row max-w-[1200px] model-info-setting model-info-setting-wrapper">
    <div class="!w-[200px] h-full border-r">
      <Menu
        id="modelInfoSettingMenu"
        v-model:selectedKeys="selectedKeys"
        class="w-full !border-e-0"
        mode="inline"
        :items="items"
        @click="handleMenuClick"
      />
    </div>
    <div
      v-loading="loadingRef"
      id="modelInfoSettingScrollId"
      ref="modelInfoSettingScrollRef"
      class="right h-full overflow-y-auto overflow-x-hidden"
    >
      <BasicForm>
        <template #basicTitle>
<!--          <BasicTitle style="font-size: 18px" :span="true" class="mt-4 mb-0"> 基础信息 </BasicTitle>-->
          <Divider orientation="left" orientation-margin="0px" class="mt-1 mb-0 !font-bold !size-18">
            基础信息
          </Divider>
        </template>
        <template #privilegeTitle>
<!--          <BasicTitle style="font-size: 18px" :span="true" class="mt-4 mb-0"> 权限配置 </BasicTitle>-->
          <Divider orientation="left" orientation-margin="0px" class="mt-1 mb-0 !font-bold !size-18">
            权限配置
          </Divider>
        </template>

        <template #showName="slotProps">
          {{slotProps}}
<!--          <Space style="font-weight: bold">
            <TypographyText @click="doCopyContent(model['name'])">
              {{ model['name'] || '-' }}
            </TypographyText>
            /
            <TypographyText @click="doCopyContent(model['modelKey'])">
              {{ model['modelKey'] || '-' }}
            </TypographyText>
          </Space>-->
        </template>
      </BasicForm>
      <div class="h-25"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { defineComponent, ref, unref, watch, onMounted, defineEmits, defineExpose, computed, nextTick } from 'vue';
  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps} from '#/adapter/vxe-table';

  import { modelInfoSettingFormSchema } from './modelInfo.data';
  import { saveOrUpdate, getByModelId, checkEntityExist } from '#/api/flowable/bpmn/modelInfo';
  import { getAppliedRange, getSkipSet } from '#/api/form/form';
  import { getAll } from '#/api/form/authPoint';
  import { getFlowCategories } from '#/api/base/category';
  import { getAll as getAllApps } from '#/api/base/app';
  import { message, Space, TypographyText, Menu, Divider } from 'ant-design-vue';
  // import { copyText } from '@/utils/copyTextToClipboard';
  // import { ScrollContainer } from '@/components/Container';
  import { useClipboard } from '@vueuse/core';

  import { FormValidPatternEnum } from '#/enums/commonEnum';
  import {useVbenForm} from "#/adapter/form";
  import {formSchema} from "#/views/org/jobGrade/jobGrade.data";
  defineComponent({
    name: 'ModelInfoSetting',
  });
  const { isSupported, copy, copied } = useClipboard({ legacy: true });

  const props = defineProps({
    modelId: {
      type: String,
      default: '',
    },
    formType: {
      type: String,
      default: 'custom',
    },
    categoryCode: {
      type: String,
      default: '',
    },
  });
  const showStatusList = [
    {
      label: 'PC',
      value: 'pc',
    },
    {
      label: 'Pad',
      value: 'ipad',
    },
    {
      label: '手机',
      value: 'mobile',
    },
  ];
  const loadingRef = ref(false);
  const selectedKeys = ref<string[]>(['basicTitleId']);
  const modelInfoSettingScrollRef = ref<Nullable<any>>(null);

  const items = ref([
    {
      label: '基础配置',
      key: 'basicTitleId',
    },
    {
      label: '权限配置',
      key: 'privilegeTitleId',
    },
  ]);

  const currentFormType = computed(() => {
    return props.formType;
  });

  watch(
    () => props.modelId,
    (newVal, oldVal) => {
      loadFormData(newVal);
    },
  );

  const getScroll = () => {
    const scroll = unref(modelInfoSettingScrollRef);
    if (!scroll) {
      throw new Error('scroll is Null');
    }
    return scroll;
  };


  const [BasicForm, formApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
      labelWidth: 120,
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: modelInfoSettingFormSchema,
    wrapperClass: 'grid-cols-1',
  });
  /*
  const [registerForm, { setFieldsValue, updateSchema, validate, clearValidate, scrollToField }] = useForm({
    labelWidth: 150,
    schemas: modelInfoSettingFormSchema,
    showResetButton: false,
    showSubmitButton: false,
    showAdvancedButton: false,
    scrollToFirstError: true
  });*/

  function handleMenuClick(event) {
    nextTick(() => {
      if (event.key === 'basicTitleId') {
        scrollTo(0);
      }
      if (event.key === 'privilegeTitleId') {
        scrollTo(430);
      }
    });
  }

  function scrollTo(top: number) {
    getScroll()?.scrollTo(top);
  }

  async function initDefaultData() {
    getAppliedRange().then(async (res) => {
      formApi.updateSchema([
        {
          fieldName: 'appliedRange',
          componentProps: { options: res },
        },
      ]);
    });

    getSkipSet().then(async (res) => {
      formApi.updateSchema([
        {
          fieldName: 'skipSet',
          componentProps: { options: res },
        },
      ]);
    });


    // 加载系统
    getAllApps()
      .then(async (res) => {
        if (currentFormType.value !== 'custom') {
          res = res.filter((item) => item.sn !== 'flow');
        }
        formApi.updateSchema([
          {
            fieldName: 'appSn',
            dynamicDisabled: currentFormType.value === 'custom',
            defaultValue: currentFormType.value === 'custom' ? 'portal' : null,
            componentProps: { options: res },
          },
        ]);
      })
      .finally(() => {});

    getAll()
      .then(async (res) => {
        const defaultAuthPointList = res.filter(item => item.ifDefault === 1).map(item => item.sn);
        formApi.updateSchema([
          {
            fieldName: 'authPointList',
            componentProps: { options: res },
          },
        ]);
        if (!props.modelId) {
          formApi.setValues({
            authPointList: defaultAuthPointList,
          });
        }
      })
      .finally(() => {});
    // 加载分类
    /*getFlowCategories().then(res => {
        debugger;
      formApi.updateSchema([
        {
          fieldName: 'categoryCode',
          defaultValue: props.categoryCode || null,
          componentProps: {
            treeData: res,
          },
        },
      ]);
    });*/

    if (props.modelId) {
      loadFormData(props.modelId);
    } else {
      formApi.setValues({
        formType: unref(currentFormType) === 'bizNoForm' ? 2 : 1,
        showStatus: showStatusList.map((item) => item.value),
      });
    }
  }

  function initFormSchema() {
    if (props.formType !== 'custom') {
      const getBaseDynamicRules = (params: any) => {
        if (props.modelId) {
          return [];
        }
        return [
          {
            max: 60,
            message: '字符长度不能大于60！',
          },
          {
            // 英文或数字且以英文或下划线开头
            pattern: new RegExp('^[a-zA-Z_]{1,}[0-9a-zA-Z_]{0,}$'),
            type: 'string',
            message: '请输入英文或数字且以英文或下划线开头！',
          },
          {
            trigger: ['change', 'blur'],
            validator: (_, value) => {
              if (value) {
                return checkEntityExist({
                  id: params.id,
                  field: params.field,
                  fieldValue: value,
                  fieldName: params.fieldName,
                })
                  .then((res) => {
                    if (res) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(params.fieldName + '已存在，请修改！');
                    }
                  })
                  .catch((res) => {
                    return Promise.reject(res);
                  });
              } else {
                return Promise.resolve();
              }
            },
          },
        ] as any[];
      };
      // 业务表单增加表单验证
      formApi.updateSchema([
        /*{
          fieldName: 'modelKey',
          dynamicRules: () => {
            return [
              {
                required: true,
                whitespace: true,
                message: '标识不能为空！',
              },
              {
                pattern: new RegExp(FormValidPatternEnum.FIELD_NAME_SN),
                type: 'string',
                message: '请输入英文或数字！',
              },
              {
                max: 40,
                message: '字符长度不能大于40！',
              },
              ...getBaseDynamicRules({
                id: props.modelId,
                field: 'modelKey',
                fieldValue: '',
                fieldName: '流程标识',
              }),
            ];
          },
        },*/
        {
          fieldName: 'flowOwnerNo',
          componentProps: {
            onChange: (values) => {
              // 新建时，选择流程Owner的时候自动带出归属部门
              if (!props.modelId) {
                let ownDept = [];
                if (values) {
                  ownDept = values.map(item => {
                    return {
                      id: item.deptId,
                      code: item.deptId,
                      shortName: item.deptName,
                      name: item.deptName,
                      label: item.deptName,
                      key: item.deptId,
                    };
                  });
                }
                formApi.setValues({
                  ownDeptId: ownDept,
                });
              }
            },
          },
        },
      ]);
    }
  }

  onMounted(() => {
    initDefaultData();
    initFormSchema();
  });

  async function loadFormData(modelId) {
    // debugger;
    loadingRef.value = true;
    // 获取数据回显
    getByModelId(modelId)
      .then(async (res) => {
        debugger;
        const dockings = [] as any,
          owner = [] as any,
          ownDept = [] as any;
        if (res.processDockingNo) {
          dockings.push({
            label: res.processDockingName,
            key: res.processDockingNo,
            name: res.processDockingName,
            code: res.processDockingNo,
          });
        }

        if (res.flowOwnerNo) {
          owner.push({
            code: res.flowOwnerNo,
            name: res.flowOwnerName,
            label: res.flowOwnerName,
            key: res.flowOwnerNo,
          });
        }

        if (res.ownDeptId) {
          ownDept.push({
            code: res.ownDeptId,
            shortName: res.ownDeptName,
            name: res.ownDeptName,
            label: res.ownDeptName,
            key: res.ownDeptId,
          });
        }

        const applyCompanies = JSON.parse(res.applyCompanies||'[]') || [];
        applyCompanies &&
          applyCompanies.forEach((item) => {
            item.shortName = item.name;
            item.id = item.id;
            item.key = item.id;
            item.label = item.name;
          });

        const superuser = res.superuser ? JSON.parse(res.superuser) : [];
        superuser &&
          superuser.forEach((item) => {
            item.label = item.name;
            item.key = item.code;
          });
        const authPointList = JSON.parse(res.authPointList);

        await formApi.updateSchema([
          {
            fieldName: 'processDockingNo',
            componentProps: {
              options: dockings,
            },
          },
          {
            fieldName: 'flowOwnerNo',
            componentProps: {
              options: owner,
            },
          } /*
            {
              field: 'ownDeptId',
              componentProps: {
                options: ownDept,
              },
            },*/,
          /*{
          field: 'applyCompanies',
          componentProps: {
            options: applyCompanies,
          },
        },*/
          {
            fieldName: 'superuser',
            componentProps: {
              options: superuser,
            },
          },
        ]);

        if (res.showStatus) {
          res.showStatus = res.showStatus.split(';');
        } else {
          res.showStatus = [];
        }

        formApi.setValues({
          modelKey: res.modelKey,
          name: res.name,
          categoryCode: res.categoryCode,
          appliedRange: res.appliedRange,
          formType: res.formType,
          orderNo: res.orderNo,
          id: res.id,
          processDockingNo: dockings,
          flowOwnerNo: owner,
          ownDeptId: ownDept,
          applyCompanies: applyCompanies,
          superuser: superuser,
          authPointList,
          skipSet: res.skipSet,
          backFlag: res.backFlag ? 1 : 0,
          showStatus: res.showStatus,
          modelIcon: res.modelIcon,
          appSn: res.appSn,
          version: res.version,
        });
        // formApi.clearValidate();
      })
      .finally(() => {
        loadingRef.value = false;
      });
  }

  async function handleSubmit() {
    try {
      // formType 0:自定义；1：业务
      loadingRef.value = true;
      const {valid} = await formApi.validate();
      if(!valid){
        return;
      }
      const values = await formApi.getValues();
      debugger;
      // 适用单位（公司）
      if (values.applyCompanies && values.applyCompanies.length > 0) {
        let applyCompanies = values.applyCompanies.map((item) => {
          return { id: item.value, name: item.label };
        });
        values.applyCompanies = JSON.stringify(applyCompanies);
      } else {
        values.applyCompanies = '[]';
      }

      if (values.flowOwnerNo && values.flowOwnerNo.length > 0) {
        values.flowOwnerName = values.flowOwnerNo[0].name;
        values.flowOwnerNo = values.flowOwnerNo[0].code;
      }

      if (values.ownDeptId && values.ownDeptId.length > 0) {
        values.ownDeptName = values.ownDeptId[0].name;
        values.ownDeptId = values.ownDeptId[0].id;
      }

      if (values.authPointList && values.authPointList.length > 0) {
        values.authPointList = JSON.stringify(values.authPointList);
      }

      if (values.superuser && values.superuser.length > 0) {
        let superuser = values.superuser.map((item) => {
          return { code: item.code, name: item.name };
        });
        values.superuser = JSON.stringify(superuser);
      } else {
        values.superuser = '[]';
      }

      if (values.processDockingNo && values.processDockingNo.length > 0) {
        let processDockingNameArr = [];
        let processDockingNoArr = [];
        values.processDockingNo.forEach((item) => {
          processDockingNameArr.push(item.name);
          processDockingNoArr.push(item.code);
        });
        values.processDockingNo = processDockingNoArr.join(',');
        values.processDockingName = processDockingNameArr.join(',');
      }
      values.backFlag = values.backFlag === 1;
      if (values.showStatus && values.showStatus.length > 0) {
        values.showStatus = values.showStatus.join(';');
      } else {
        values.showStatus = '';
      }
      if (Array.isArray(values.modelIcon) && values.modelIcon.length > 0) {
        values.modelIcon = values.modelIcon[0];
      }

      const {data, success, msg} = await saveOrUpdate(values);
      if (success && data) {
        message.success({ content: msg, style: { marginTop: '40px' } });
        loadFormData(data.modelId);
        debugger;
        return Promise.resolve(data);
      } else {
        message.error(msg);
        return Promise.reject(msg);
      }
    } catch (e) {
      // debugger;
      // scrollToField(e.errorFields[0].name[0]);
      return Promise.reject(e);
    } finally {
      loadingRef.value = false;
      // setModalProps({ confirmLoading: false });
      // return Promise.reject(false);
    }
  }
  function doCopyContent(content) {
    copy(content);
  }

  defineExpose({
    handleSubmit,
  });
</script>
<style lang="scss">
  .model-info-setting {
    border: 1px solid var(--border-color);
    border-top: 0;
    height: 100%;
    margin: auto;
    display: flex;
    > .left {
      width: 200px;
      #modelInfoSettingMenu {
        border-inline-end: none;
      }
    }
    > .right {
      flex: 1;
      height: 100%;
      padding: 16px!important;
      border-left: 1px solid var(--border-color);
    }
  }
</style>
