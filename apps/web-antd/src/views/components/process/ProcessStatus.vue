<template>
  <!--
    DRAFT("draft", "草稿"),
    REVOKE("revoke", "撤回"),
    APPLYING("applying", "审批中"),
    ZZ("zz", "终止"),
    END("end", "结束");
  -->
  <Tag v-if="value === 'applying' || value === 'revoke'" color="#2db7f5">
    <template #icon>
      <SyncOutlined :spin="true" />
    </template>
    <span>{{ text }}</span>
  </Tag>
  <Tag v-else-if="value === 'zz'" color="#ff0000">
    <template #icon>
      <MinusCircleOutlined />
    </template>
    <span>{{ text }}</span>
  </Tag>
  <Tag v-else-if="value === 'end'" color="#87d068">
    <template #icon>
      <CheckCircleOutlined />
    </template>
    <span>{{ text }}</span>
  </Tag>
  <Tag v-else color="default">
    <template #icon>
      <ExclamationCircleOutlined />
    </template>
    <span>{{ text }}</span>
  </Tag>
</template>
<script lang="ts" setup>
  import {
    SyncOutlined,
    CheckCircleOutlined,
    MinusCircleOutlined,
    ExclamationCircleOutlined,
  } from '@ant-design/icons-vue';

  import { Tag } from 'ant-design-vue';

  const props = defineProps({
    value: {
      type: String,
    },
    text: {
      type: String,
    },
  });
</script>
