<template>
  <PageWrapper dense contentFullHeight fixedHeight class="dmn-container" :v-loading="true">
    <!--<template #extra>
      <a-button type="primary" @click="handleSaveData">保存</a-button>
    </template>-->
    <template #headerContent>
      <!--<a-button type="primary" @click="handleSaveData">保存</a-button>-->
      <BasicForm @register="registerForm" />
    </template>
    <div class="p-4">
      <!--<div style="position:absolute; top: 0;left:0; z-index: 999; padding-left: 20px" class="">
        <a-button type="primary" @click="handleSaveData">保存</a-button>
      </div>-->
      <FramePage ref="dmnDesignerRef" :frameSrc="url" @on-load-success="handleLoadSuccess" />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, unref, computed, nextTick } from 'vue';
  import FramePage from '#/views/components/iframe/index.vue';
  import { useFrameKeepAlive } from '@/layouts/iframe/useFrameKeepAlive';
  import { useRouter } from 'vue-router';
  import { useMultipleTabStore } from '@/store/modules/multipleTab';
  import {
    getByModelId,
    saveDmnModel,
    saveOrUpdate,
    checkEntityExist,
    initDmnDiagram,
  } from '#/api/flowable/dmn/modelInfo';
  import { Modal, Tabs } from 'ant-design-vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { PageWrapper } from '@/components/Page';
  import { BasicForm, Rule, useForm } from '@/components/Form/index';
  import { dmnBaseFormSchema } from '../modelInfo/modelInfo.data';
  import { changeURLPar } from '#/utils/domUtils';
  import { CheckExistParams } from '#/api/model/baseModel';
  import { useTabs } from '@/hooks/web/useTabs';
  import { useGo } from '@/hooks/web/usePage';
  import { Loading, useLoading } from '@/components/Loading';

  export default defineComponent({
    name: 'DmnDesignerNoCache',
    components: { FramePage, BasicForm, Tabs, TabPane: Tabs.TabPane, PageWrapper },
    setup() {
      const { createMessage } = useMessage();
      const go = useGo();
      const router = useRouter();
      const [openFullLoading, closeFullLoading] = useLoading({
        tip: '加载中...',
      });
      const { setTitle, closeCurrent } = useTabs();
      const { currentRoute } = useRouter();
      const {
        query: { modelId, categoryCode, id },
      } = unref(currentRoute);
      const url = ref<string>('');
      const dmnDesignerRef = ref();
      const activeKey = ref<string>('formDesigner');
      const frame = ref<object>({});
      const tabStore = useMultipleTabStore();
      const currentTab = tabStore.getTabList.find(
        // 以下函数只比对了path，你应该适当修改一下，加上路由参数比对
        (item) => {
          return item.fullPath === router.currentRoute.value.fullPath;
        },
      )!;

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate, setProps }] =
        useForm({
          labelWidth: 100,
          schemas: dmnBaseFormSchema,
          submitButtonOptions: {
            text: '保存',
          },
          resetButtonOptions: {
            text: '返回',
          },
          actionColOptions: {
            span: 6,
          },
          submitFunc: handleSaveDmnInfo,
          resetFunc: handleBack,
        });

      function updateXMLAttribute(xmlStr, tagName, attrName, attrValue) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlStr, 'text/xml');

        // 检查元素是否存在
        const element = xmlDoc.getElementsByTagName(tagName)[0];
        if (!element) {
          throw new Error(`Tag "${tagName}" not found in the XML.`);
        }

        // 检查属性是否存在
        const attr = element.getAttributeNode(attrName);
        if (!attr) {
          // 如果属性不存在，则添加它
          element.setAttribute(attrName, attrValue);
        }

        // 返回更新后的XML字符串
        return new XMLSerializer().serializeToString(xmlDoc);
      }

      async function handleSaveDmnInfo() {
        setProps({
          submitButtonOptions: {
            loading: true,
          },
        });
        try {
          const values = await validate();
          try {
            // 获取XML
            const { xml } = await unref(dmnDesignerRef).frameRef.contentWindow.dmnModeler.saveXML({
              format: true,
            });

            // 如果决策表中没有hitPolicy="UNIQUE" 则添加该属性，默认为"UNIQUE"
            const resultXml = updateXMLAttribute(xml, 'decisionTable', 'hitPolicy', 'UNIQUE');

            values.modelXml = resultXml;
          } catch (e) {
            console.error(e);
          }
          if (!values.modelXml) {
            createMessage.warn('未获取到XML。');
            return;
          }

          // 新建时-处理key和name
          if (values.id) {
            values.modelXml = values.modelXml.replaceAll(/TEMP___KEY/gi, values.modelKey);
            values.modelXml = values.modelXml.replaceAll(/TEMP___NAME/gi, values.name);
          }
          const result = await saveOrUpdate(values);
          const resultData = result.data;
          if (resultData) {
            if (resultData.success) {
              const newUrl = changeURLPar(window.location.href, 'modelId', resultData.data.modelId);
              window.history.replaceState(
                {
                  path: newUrl,
                },
                '',
                newUrl,
              );
              await setFieldsValue({
                modelId: resultData.data.modelId,
                id: resultData.data.id,
              });
              updateModelKeyValidate(resultData.data.id);
              createMessage.success(resultData.msg);
              // 修改标签页名称
              if (
                currentTab.meta.title &&
                currentTab.meta.title.indexOf('-' + resultData.data.name) === -1
              ) {
                currentTab.meta.title = currentTab.meta.title + '-' + resultData.data.name;
              }
            } else {
              createMessage.error(result.data.msg);
            }
          }
        } catch (e) {
          console.error('表单验证失败！' + e);
        } finally {
          setProps({
            submitButtonOptions: {
              loading: false,
            },
          });
        }
      }

      async function updateModelKeyValidate(id) {
        await updateSchema([
          {
            field: 'modelKey',
            dynamicDisabled: () => !!id,
            dynamicRules: () => {
              return [
                {
                  required: true,
                  whitespace: true,
                  message: '编码不能为空！',
                },
                {
                  pattern: new RegExp('^[a-zA-Z_]{1,}[0-9a-zA-Z_]{1,}$'),
                  type: 'string',
                  message: '请输入英文或数字且以英文或下划线开头！',
                },
                {
                  max: 150,
                  message: '字符长度不能大于150！',
                },
                ...getBaseDynamicRules({
                  id: id || '',
                  field: 'modelKey',
                  fieldValue: '',
                  fieldName: '编码',
                }),
              ];
            },
          },
        ]);
      }

      const getBaseDynamicRules = (params: CheckExistParams) => {
        return [
          {
            trigger: 'blur',
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
        ] as Rule[];
      };

      onMounted(() => {});

      function initFormData() {
        if (modelId) {
          openFullLoading();
          getByModelId({ modelId })
            .then((res) => {
              res.name = res.modelName;
              res.id = id;
              nextTick(async () => {
                // xml渲染
                try {
                  //dmnModeler.value!.importXML(newXml || $props.xml || boostropXml)
                  res.modelXml &&
                    unref(dmnDesignerRef).frameRef.contentWindow.dmnModeler.importXML(res.modelXml);
                } catch (e) {
                  console.error(e);
                }
                // 修改标签页名称
                if (
                  currentTab.meta.title &&
                  currentTab.meta.title.indexOf('-' + res.modelName) === -1
                ) {
                  currentTab.meta.title = currentTab.meta.title + '-' + res.modelName;
                }
                await updateModelKeyValidate(res.id);
                await setFieldsValue(res);
              });
            })
            .finally(() => {
              closeFullLoading();
            });
        } else {
          if (categoryCode) {
            nextTick(() => {
              // 传入空会渲染默认xml
              initDmnDiagram({ key: '', name: '' }).then((res) => {
                const { modelXml } = res.data;
                unref(dmnDesignerRef).frameRef.contentWindow.importXML(modelXml);
              });
            });
            // 修改标签页名称
            /*if(currentTab.meta.title&&currentTab.meta.title.indexOf('-'+resultData.data.modelName) === -1){
              currentTab.meta.title = currentTab.meta.title + '-' +resultData.data.modelName  ;
            }*/
            setFieldsValue({
              categoryCode,
            });
          } else {
            Modal.warning({
              title: '提示',
              content: '请选择分类再进入编辑',
              onOk: () => {
                handleBack();
              },
            });
            return;
          }
          updateModelKeyValidate('');
        }
      }

      async function handleBack() {
        closeCurrent();
        go({ name: 'Dmn' });
      }

      // iframe加载成功回调
      function handleLoadSuccess() {
        initFormData();
      }

      url.value = '/static/dmn/designer/index.html';

      const { getFramePages, hasRenderFrame, showIframe } = useFrameKeepAlive();
      const showFrame = computed(() => unref(getFramePages).length > 0);
      return {
        getFramePages,
        hasRenderFrame,
        registerForm,
        showIframe,
        showFrame,
        dmnDesignerRef,
        url,
        frame,
        activeKey,
        handleLoadSuccess,
      };
    },
  });
</script>

<style lang="less">
  .ant-page-header.dmn-container {
    padding-top: 0;
    padding-bottom: 0;
  }
  .dmn-container {
    .ant-page-header-heading-title {
      font-weight: normal;
      .vben-basic-form .ant-form-item:not(.ant-form-item-with-help) {
        margin-bottom: 0px !important;
      }
    }
  }
</style>
