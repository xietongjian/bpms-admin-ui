<template>
  <Page auto-content-height >
    <div class="bg-card h-full">
      <Tabs tab-position="left" :tabBarStyle="tabBarStyle">
        <template v-for="item in settingList" :key="item.key">
          <TabPane :tab="item.name">
            <div class="p-4">
              <component :is="tabs[item.component]"/>
            </div>
          </TabPane>
        </template>
      </Tabs>
    </div>

  </Page>
</template>

<script lang="ts" setup>
  import {Page, useVbenModal} from '@vben/common-ui';

  import {Tabs} from 'ant-design-vue';
  import {settingList} from './data';
  import BaseSetting from './BaseSetting.vue';
  import SecureSetting from './SecureSetting.vue';
  // import AccountBind from './AccountBind.vue';
  // import MsgNotify from './MsgNotify.vue';

  const TabPane = Tabs.TabPane;
  const tabs = {
    BaseSetting,
    SecureSetting,
    // AccountBind,
    // MsgNotify,
  };

  const tabBarStyle = {
    width: '220px',
  };
</script>
<style lang="less">
  .account-setting {
    margin: 12px;

    .base-title {
      padding-left: 0;
    }

    .ant-tabs-tab-active {
    }
  }
</style>
