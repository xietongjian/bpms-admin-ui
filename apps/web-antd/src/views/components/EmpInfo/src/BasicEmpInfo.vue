<template>
  <Popover
    :z-index="2001"
    v-if="!!name"
    @visible-change="visibleChange"
    title="人员信息"
    trigger="hover"
  >
    <template #content>
      <Spin :spinning="spinning">
        <div class="emp-info-container">
          <Descriptions size="small" :column="1">
            <DescriptionsItem label="" style="text-align: center" class="emp-header-box">
              <Avatar
                v-if="empBaseInfo.headImg"
                :src="empBaseInfo.headImg"
                :size="80"
                class="emp-header"
              />
              <Avatar v-else :size="80">
                <template #icon><UserOutlined /></template>
              </Avatar>
            </DescriptionsItem>
            <DescriptionsItem label="姓名">
              <Space>
                <span>{{ name }}</span>
                <ManOutlined style="color: #10aeff" v-if="empBaseInfo.sex == 1" />
                <WomanOutlined style="color: #fb7373" v-else />
              </Space>
            </DescriptionsItem>
            <DescriptionsItem label="工号"> {{ no || '-' }} </DescriptionsItem>
            <DescriptionsItem label="手机"> {{ empBaseInfo?.mobile || '-' }} </DescriptionsItem>
            <DescriptionsItem label="邮箱"> {{ empBaseInfo?.email || '-' }} </DescriptionsItem>
            <DescriptionsItem label="所属组织">
              {{ empBaseInfo?.companyName || '-' }} - {{ empBaseInfo?.deptName || '-' }}
            </DescriptionsItem>
          </Descriptions>
        </div>
      </Spin>
    </template>
    <span class="cursor-pointer">
      <slot>
        <Tag :color="tagColor">
          <span class="emp-name-txt">{{ name }}</span>
        </Tag>
      </slot>
    </span>
  </Popover>
  <span v-else>
    <slot> - </slot>
  </span>
</template>
<script lang="ts" setup>
  import { ref, defineProps } from 'vue';
  import { Tag, Popover, Spin, Descriptions, Avatar, Space } from 'ant-design-vue';
  import { propTypes } from '#/utils/propTypes';
  import { getByCodes } from '#/api/org/personal';
  import { UserOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons-vue';
  import { usePersonalStoreWithOut } from '#/store/modules/personal';

  const personalStore = usePersonalStoreWithOut();
  const DescriptionsItem = Descriptions.Item;

  const props = defineProps({
    // 人员工号
    no: propTypes.string.def(''),
    // 人员姓名
    name: propTypes.string.def(''),
    // 标签颜色
    tagColor: propTypes.string.def('default'),
  });

  const empBaseInfo = ref({});
  const spinning = ref(false);

  function visibleChange(visible) {
    const getPersonal = personalStore.getPersonalMap[props.no];
    if (visible) {
      if (getPersonal) {
        empBaseInfo.value = getPersonal;
      } else {
        if (props.no) {
          spinning.value = true;
          getByCodes([props.no])
            .then((res) => {
              if (res && res[0]) {
                empBaseInfo.value = res[0];
                personalStore.setPersonal(res[0]);
              }
            })
            .finally(() => {
              spinning.value = false;
            });
        }
      }
    } else {
      spinning.value = false;
    }
  }
</script>

<style lang="less">
  .emp-info-container {
    width: 300px;
    .emp-header-box {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .emp-name-txt {
    word-break: break-all;
    white-space: break-spaces;
  }
</style>
