<template>
  <BasicDrawer
      v-bind="$attrs"
      @register="registerDrawer"
      title="在线测试【】"
      width="50%"
      showFooter
      @ok="handleSubmit"
  >
    <BasicForm @register="registerForm"/>
  </BasicDrawer>
</template>
<script lang="ts" setup>
import {computed, ref, unref} from 'vue';
import {BasicDrawer, useDrawerInner} from '@/components/Drawer';

import {BasicForm, useForm} from '@/components/Form';
import {apiTestingFormSchema} from './apiInfo.data';
import {insert, update} from '#/api/portal/cms/banner';
import {getAllBoard} from '#/api/portal/cms/board';
import {OrgDataType} from '@/components/Selector/src/types';
import {getAllPublishRange} from '#/api/portal/cms/publishRange';

const isUpdate = ref(true);
const boardList = ref();

const [
  registerForm,
  {resetFields, updateSchema, getFieldsValue, setFieldsValue, validate},
] = useForm({
  labelWidth: 100,
  schemas: apiTestingFormSchema,
  showActionButtonGroup: false,
  fieldMapToTime: [['fieldTime', ['startTime', 'endTime'], 'YYYY-MM-DD']],
});

const [registerDrawer, {setDrawerProps, closeDrawer}] = useDrawerInner(async (data) => {
  await resetFields();
  // setDrawerProps({ loading: true });
  setDrawerProps({loading: true});
  isUpdate.value = !!data?.isUpdate;
  let formData = data.record;

  boardList.value = await getAllBoard({type: 3});

  if (unref(isUpdate)) {
    // 通过条件获取发布范围
    const publishRanges = await getAllPublishRange({
      dataId: formData.id,
      dataType: 'BANNER',
    });

    if (publishRanges) {
      formData.publishRanges = publishRanges.map((item) => {
        return {
          ...item,
          id: item.rangeId,
          shortName: item.rangeName,
          sourceType: item.rangeType,
        };
      });
    } else {
      formData.publishRanges = [];
    }

    let posterUploader = null;
    if (formData.posterPath) {
      posterUploader = [
        {
          name: 'file.name',
          filePath: formData.posterPath,
          fileType: formData.posterPath.split('.').pop(),
          fileSize: 111,
        },
      ];
    }

    await setFieldsValue({
      ...formData,
      imgUploader: [
        {
          name: 'file.name',
          filePath: formData.imgPath,
          fileType: formData.imgPath ? formData.imgPath.split('.').pop() : '',
          fileSize: 111,
        },
      ],
      status: formData.status == 1,
      posterUploader: posterUploader,

      validTimeRange: [formData.startTime, formData.endTime],
    });
  } else {
    setFieldsValue({
      publishBoard: formData.publishBoard,
    });
  }
  setDrawerProps({loading: false});
});

async function handleSubmit() {
  try {
    const values = await validate();
    setDrawerProps({confirmLoading: true});

    if (values.posterUploader && values.posterUploader.length > 0) {
      values.posterPath = values.posterUploader[0].filePath;
      delete values.posterUploader;
    }

    if (values.validTimeRange) {
      values.startTime = values.validTimeRange[0];
      values.endTime = values.validTimeRange[1];
      delete values.validTimeRange;
    }
    values.publishRanges = values.publishRanges.map((item) => {
      return {
        rangeId: item.id,
        rangeName: item.shortName,
        rangeType: Object.values(OrgDataType)[item.sourceType - 1],
      };
    });

    values.status = values.status ? 1 : 0;

    if (values.id) {
      await update(values);
    } else {
      await insert(values);
    }

    closeDrawer();
  } finally {
    setDrawerProps({confirmLoading: false});
  }
}
</script>
<style lang="less">

</style>
