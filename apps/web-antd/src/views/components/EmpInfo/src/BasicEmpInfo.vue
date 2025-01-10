<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import { Tag, Popover, Spin, Descriptions, Avatar, Space } from 'ant-design-vue';
import { getByCodes } from '#/api/org/personal';
import { UserOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons-vue';
import { usePersonalStore } from '#/store/personal';

const { personalRequestCache, getPersonalInfo, setPersonalInfo } = usePersonalStore();

const DescriptionsItem = Descriptions.Item;

const props = defineProps({
  // 人员工号
  no: {
    type: String,
    default: '',
  },
  // 人员姓名
  name: {
    type: String,
    default: '',
  },
  // 标签颜色
  tagColor: {
    type: String,
    default: 'default',
  },
});

const empBaseInfo = ref({});
const spinning = ref(false);

function visibleChange(visible) {

  const personal = getPersonalInfo(props.no);

  if (visible) {
    if (personal) {
      empBaseInfo.value = personal;
    } else {
      if (props.no && !personalRequestCache.has(props.no)) {
        spinning.value = true;
        personalRequestCache.set(
            props.no,
            getByCodes([props.no])
                .then((res) => {
                  if (res && res[0]) {
                    empBaseInfo.value = res[0];
                    // 缓存到store 这样就不用重复获取了
                    // 内部处理了push的逻辑 这里不用push
                    setPersonalInfo(props.no, res[0]);
                  }
                })
                .finally(() => {
                  // 移除请求状态缓存
                  personalRequestCache.delete(props.no);
                  spinning.value = false;
                }),
        );
      }
    }
  } else {
    spinning.value = false;
  }
}
</script>

<template>
  <Popover
    :z-index="2001"
    v-if="!!name"
    @open-change="visibleChange"
    title="人员信息"
    trigger="hover"
  >
    <template #content>
      <Spin :spinning="spinning">
        <div class="w-[300px] emp-info-container">
          <Descriptions size="small" :column="1">
            <DescriptionsItem label="" class="emp-header-box text-center">
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


<style lang="scss">
  .emp-info-container {
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
