<template>
  <Page auto-content-height title="不同环境的流程、表单拷贝">
    <Alert type="warning" show-icon>
      <template #icon>
        <HeatMapOutlined style="color: orangered" />
      </template>
      <template #message>
        <!--        <Space>
          <span>当前运行环境：</span>
          <span class="font-bold">{{envConst[currentEnv]}}</span>
        </Space>-->
      </template>
      <template #description>
        功能说明：
        <p>
          1、将数据拷贝到不同的环境<br />
          2、拷贝规则
          <Space>
            <Tag>开发环境</Tag>
            <ArrowRightOutlined />
            <Tag color="processing">测试环境</Tag>
            <ArrowRightOutlined />
            <Tag color="success">生产环境</Tag>
            <ArrowRightOutlined />
            <Tag>开发环境</Tag>
          </Space>
        </p>
        温馨提示：
        <p> 1、拷贝数据为不可逆操作，操作请慎重！ </p>
      </template>
    </Alert>

    <CollapseContainer class="mt-4">
      <template #title>
        <Space>
          <span>自定义流程：</span>
          <span class="font-bold">{{ envConst[currentEnv] }}</span>
          <ArrowRightOutlined />
          <span class="font-bold">{{ envConst[targetEnv] }}</span>
        </Space>
      </template>
      <CustomForm />

      <div class="p-4" style="padding-top: 0; padding-left: 100px">
        <Progress
          v-if="customCopyPercent > 0 && customCopyPercent !== 100"
          :percent="customCopyPercent"
        />
        <Alert
          style="margin-bottom: 0.5rem"
          v-if="customCopyPercent === 100"
          :message="customResult.msg"
          :type="customResult.code === '100' ? 'success' : 'error'"
          closable
        />
        <Authority :value="'CopyModel:' + PerEnum.UPDATE">
          <Button
            :loading="customCopyPercent !== 100 && customCopyPercent !== 0"
            type="error"
            @click="handleCopyCustomForm"
            >开始拷贝</Button
          >
        </Authority>
      </div>
    </CollapseContainer>

    <CollapseContainer class="mt-4">
      <template #title>
        <Space>
          <span>异构流程：</span>
          <span class="font-bold">{{ envConst[currentEnv] }}</span>
          <ArrowRightOutlined />
          <span class="font-bold">{{ envConst[targetEnv] }}</span>
        </Space>
      </template>
      <BizForm />

      <div class="p-4" style="padding-top: 0; padding-left: 100px">
        <Progress v-if="bizCopyPercent > 0 && bizCopyPercent !== 100" :percent="bizCopyPercent" />
        <Alert
          style="margin-bottom: 0.5rem"
          v-if="bizCopyPercent === 100"
          :message="bizResult.msg"
          :type="bizResult.code === '100' ? 'success' : 'error'"
          closable
        />
        <Button
            v-if="hasAccessByCodes([PerPrefix + PerEnum.UPDATE])"
            :loading="bizCopyPercent !== 100 && bizCopyPercent !== 0"
            type="error"
            @click="handleCopyBizForm"
        >开始拷贝</Button
        >
      </div>
    </CollapseContainer>
  </Page>
</template>
<script lang="ts" setup>
  import { ref, unref, onMounted, nextTick } from 'vue';
  import { PerEnum } from '#/enums/perEnum';
  import {useAccess} from '@vben/access';
  import type {Recordable} from '@vben/types';
  import type {VbenFormProps} from '@vben/common-ui';
  import type {VxeGridProps, VxeGridListeners} from '#/adapter/vxe-table';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';
  import {ColPage, Page} from '@vben/common-ui';
  import {TableAction} from '#/components/table-action';

  // import { BasicForm, useForm } from '@/components/Form/index';
  // import { CollapseContainer } from '@/components/Container/index';
  import { customFormSchema, bizFormSchema } from './copyModel.data';
  import { Alert, Progress, Tag, Space, message } from 'ant-design-vue';
  import { ArrowRightOutlined, HeatMapOutlined } from '@ant-design/icons-vue';

  import {
    getSyncCategories,
    copyCustomProcess,
    copyBizProcess,
    getModelInfoByModelKey,
  } from '#/api/flowoperation/copyModelToProd';
  import { findNode } from '#/utils/helper/treeHelper';
  import {useVbenForm} from "#/adapter/form";
  const {hasAccessByCodes} = useAccess();

  const PerPrefix = 'CopyModel:';

  const envConst = {
    dev: '开发环境',
    test: '测试环境',
    prod: '生产环境',
  };

  const check = ref(null);
  const currentEnv = ref('test');
  const targetEnv = ref('test');
  const customCopyPercent = ref(0);
  const bizCopyPercent = ref(0);
  const customResult = ref({});
  const bizResult = ref({});
  const copyCustomLoading = ref<boolean>(false);
  const copyBizLoading = ref<boolean>(false);
  const syncCategories = ref([]);



  const [CustomForm, customFormApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: customFormSchema,
    wrapperClass: 'grid-cols-1',
  });


  const [BizForm, bizFormApi] = useVbenForm({
    commonConfig: {
      componentProps: {
        // class: 'w-full',
      },
    },
    showDefaultActions: false,
    layout: 'horizontal',
    schema: bizFormSchema,
    wrapperClass: 'grid-cols-1',
  });

/*
  // 自定义表单
  const [
    registerCustomForm,
    {
      updateSchema: updateCustomSchema,
      resetFields: resetCustomFields,
      getFieldsValue: getCustomFieldsValue,
      setFieldsValue: setCustomFieldsValue,
      validate: validateCustomForm,
    },
  ] = useForm({
    labelWidth: 100,
    schemas: customFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  // 业务表单
  const [
    registerBizForm,
    {
      updateSchema: updateBizSchema,
      resetFields: resetBizFields,
      setFieldsValue: setBizFieldsValue,
      validate: validateBizForm,
    },
  ] = useForm({
    labelWidth: 100,
    schemas: bizFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });*/

  onMounted(() => {
    // getEnv().then(res=>{
    //   currentEnv.value = res;
    //   if(res === 'dev'){
    //     targetEnv.value = 'test';
    //   }else if(res === 'test'){
    //     targetEnv.value = 'prod';
    //   }else if(res === 'prod'){
    //     targetEnv.value = 'dev';
    //   }
    // });
  });

  nextTick(() => {
    return;
    // 此功能已经废弃
    getSyncCategories().then((res) => {
      syncCategories.value = res;
      // 自定义表单
      updateCustomSchema([
        {
          field: 'sourceModel',
          componentProps: {
            onChange: (e) => {
              let node = null;
              if (e && e.length > 0) {
                node = findNode(res, (item) => item.code === e[0].categoryCode);
              }
              setCustomFieldsValue({
                categoryCode: node ? node.id : '',
              });
            },
          },
        },
        {
          field: 'categoryCode',
          componentProps: {
            treeData: res,
          },
        },
      ]);
      // 业务表单
      updateBizSchema([
        {
          field: 'sourceModel',
          componentProps: {
            onChange: (e) => {
              if (e && e.length > 0) {
                const node = findNode(res, (item) => item.code === e[0].categoryCode);
                setBizFieldsValue({
                  categoryCode: node ? node.id : '',
                });

                // 通过ModelKey查询目标库是否有此流程
                getModelInfoByModelKey({ modelKey: e[0].modelKey }).then((res) => {
                  if (res) {
                    setBizFieldsValue({
                      targetModelInfo: res.name,
                      // categoryCode: res.categoryCode
                    });
                  } else {
                    setBizFieldsValue({
                      targetModelInfo: '',
                    });
                  }
                });
              }
            },
          },
        },
        {
          field: 'categoryCode',
          componentProps: {
            treeData: res,
          },
        },
      ]);
      // 自定义任务表单
      /*updateCustomTaskSchema([
      {
        field: 'sourceModel',
        componentProps: {
          onChange: (e)=>{
            let node = null;
            if(e && e.length>0) {
              node = findNode(res, (item) => item.code === e[0].categoryCode);
            }
            setCustomTaskFieldsValue({
              categoryCode: node ? node.code : ''
            });
          }
        }
      },
      {
        field: 'categoryCode',
        componentProps: {
          treeData: res,
        },
      },
    ]);*/
    });
  });

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
  }

  async function handleCopyCustomForm() {
    customCopyPercent.value = 0;
    const values = await validateCustomForm();
    const modelInfo = values.sourceModel[0];
    createConfirm({
      iconType: 'warning',
      title: '警告',
      content: `此操作将会在目标【${envConst[unref(targetEnv)]}】中创建名为【${modelInfo.name}】的流程，是否继续？`,
      okButtonProps: {
        type: 'error',
      },
      onOk: async () => {
        const customInterval = setInterval(() => {
          customCopyPercent.value += getRandomIntInclusive(1, 5);
          if (unref(customCopyPercent) >= 100) {
            clearInterval(customInterval);
            customCopyPercent.value = 100;
            resetCustomFields();
          }
        }, 50);
        values.modelKey = modelInfo.modelKey;
        delete values.sourceModel;
        copyCustomLoading.value = true;
        copyCustomProcess(values)
          .then((res) => {
            const resData = res.data;
            // message.success(resData.msg);
            // resetCustomFields();
            customResult.value = resData;
          })
          .catch((e) => {
            customCopyPercent.value = 100;
            customResult.value = { code: '101', msg: `服务器异常，请稍后再试！${e.message}` };
          })
          .finally(() => {
            // copyCustomLoading.value = false;
          });
      },
    });
  }

  async function handleCopyBizForm() {
    bizCopyPercent.value = 0;
    const values = await validateBizForm();
    const { modelKey, name } = values.sourceModel[0];
    let msgContent = `流程【${name}(${modelKey})】在【${envConst[unref(targetEnv)]}】中不存在，是否创建？`;
    if (values.targetModelInfo) {
      msgContent = `流程【${name}(${modelKey})】在【${envConst[unref(targetEnv)]}】中已经存在，是否覆盖？`;
    }
    createConfirm({
      iconType: 'warning',
      title: '警告',
      content: msgContent,
      okButtonProps: {
        type: 'error',
      },
      onOk: async () => {
        const bizInterval = setInterval(() => {
          bizCopyPercent.value += getRandomIntInclusive(1, 5);
          if (unref(bizCopyPercent) >= 100) {
            clearInterval(bizInterval);
            bizCopyPercent.value = 100;
            resetBizFields();
          }
        }, 50);

        values.modelKey = values.sourceModel[0].modelKey;
        delete values.sourceModel;
        delete values.targetModelInfo;
        copyBizLoading.value = true;
        const node = findNode(unref(syncCategories), (item) => item.id === values.categoryCode);
        values.categoryCode = node.code;
        copyBizProcess(values)
          .then((res) => {
            const resData = res.data;
            bizResult.value = resData;
            // message.success(resData.msg);
            // resetBizFields();
          })
          .catch((e) => {
            bizCopyPercent.value = 100;
            bizResult.value = { code: '101', msg: `服务器异常，请稍后再试！${e.message}` };
          })
          .finally(() => {
            // copyBizLoading.value = false;
          });
      },
    });
  }
</script>

<style lang="less" scoped>
  .center-align {
    text-align: center;
  }
</style>
