<template>
  <div class="w-full" >
    <Row :gutter="24">
      <Col :span="20">
        <BasicForm />
      </Col>
<!--      <Col :span="10">
        <div class="change-avatar">
          <div class="mb-2">头像</div>
          <CropperAvatar
            :uploadApi="uploadApi as any"
            :value="avatar"
            btnText="更换头像"
            :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
            @change="updateAvatar"
            width="150"
          />
        </div>
      </Col>-->
    </Row>
<!--    <a-button type="primary" @click="handleSubmit"> 更新基本信息 </a-button>-->
  </div>
</template>
<script lang="ts" setup>
  // import { CropperAvatar } from '@/components/Cropper';
  import {computed, nextTick, onMounted} from 'vue';
  import { Col, Row, Collapse, message } from 'ant-design-vue';
  import {useVbenForm} from '#/adapter/form';

  // import { accountInfoApi } from '@/api/demo/account';
  import { uploadApi } from '#/api/sys/upload';
  // import headerImg from '#/assets/images/header.jpg';
  import { baseSetschemas } from './data';
  import {getUserInfoApi} from "#/api/core/user";
  import { useUserStore } from '@vben/stores';

  const userStore = useUserStore();

  const [BasicForm, formApi] = useVbenForm({
    showDefaultActions: false,
    layout: 'horizontal',
    schema: baseSetschemas,
    wrapperClass: 'grid-cols-1',
  });

  onMounted(async () => {
    await nextTick();
    const data = await getUserInfoApi();
    await formApi.setValues(data);
  });

  // const avatar = computed(() => {
  //   const { avatar } = userStore.getUserInfo;
  //   console.log(avatar);
  //   return avatar || headerImg;
  // });

  function updateAvatar({ src, data }) {
    const userinfo = userStore.getUserInfo;
    userinfo.avatar = src;
    userStore.setUserInfo(userinfo);
    console.log('data', data);
  }

  function handleSubmit() {
    message.success('更新成功！');
  }
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
