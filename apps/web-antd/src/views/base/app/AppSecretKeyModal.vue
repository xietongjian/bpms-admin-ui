<script lang="ts" setup>
import {useVbenModal} from '@vben/common-ui';
import {Button, message, Popconfirm, Space} from 'ant-design-vue';
import {secretKeyFormSchema} from './app.data';
import {useVbenForm} from '#/adapter/form';
import {refreshSecretKey} from '#/api/base/app';
import {QuestionMarkCircleOutline} from '@vben/icons';
import {ref, unref} from "vue";

const emit = defineEmits<{
  onSuccess: [void];
}>();

// 用于判断用户是否操作过数据
const dataChanged = ref(false);

const secretKeyIsNull = ref(true);

const [Modal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      dataChanged.value = false;
      const values = modalApi.getData<Record<string, any>>();
      if (values) {
        secretKeyIsNull.value = !values.secretKey;
        baseFormApi.setValues(values);
        modalApi.setState({loading: false, confirmLoading: false});
      }
    } else {
      if (unref(dataChanged)) {
        emit('onSuccess');
      }
    }
  }
});

const [BaseForm, baseFormApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
    labelWidth: 150
  },
  showDefaultActions: false,
  layout: 'horizontal',
  schema: secretKeyFormSchema,
  wrapperClass: 'grid-cols-1',
});

async function refreshSecretKeyHandle() {
  try {
    const values = await baseFormApi.getValues();
    modalApi.setState({loading: true});

    const {data, msg, success} = await refreshSecretKey(values.id);
    if (success) {
      message.success(msg);
      await baseFormApi.setValues({...values, secretKey: data});
      secretKeyIsNull.value = false;
      dataChanged.value = true;
    } else {
      message.error(msg);
    }
  } finally {
    modalApi.setState({loading: false});
  }
}

</script>
<template>
  <Modal class="w-[600px]">
    <BaseForm>
      <template #sn="{field, value}">
        {{ value }}
      </template>

      <template #ctrl="slotProps">
        <div class="">
          <Space class="mt-2">
            <Button v-if="secretKeyIsNull" @click="refreshSecretKeyHandle()"> 生成密钥 </Button>
            <Popconfirm
              v-else
              title="确定要重新生成秘钥吗？"
              @confirm="refreshSecretKeyHandle()"
              :ok-button-props="{danger: true}"
            >
              <template #icon>
                <QuestionMarkCircleOutline class="text-red-500 size-6"/>
              </template>
              <Button danger > 更新密钥 </Button>
            </Popconfirm>

            <Button type="primary" @click="handleCopy"> 复制 </Button>
          </Space>
        </div>
      </template>
    </BaseForm>
  </Modal>
</template>
