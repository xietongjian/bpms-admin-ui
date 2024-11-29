<template>
  <Button @click="doBack" type="link" title="返回">
    <template #icon>
      <LeftOutlined />
    </template>
  </Button>
</template>
<script lang="ts" setup>
  import { Button } from 'ant-design-vue';
  import { LeftOutlined } from '@ant-design/icons-vue';
  import { useGo } from '@/hooks/web/usePage';

  const go = useGo();
  function doBack() {
    if (window.opener) {
      window.close();
    } else if (history.state.back) {
      history.back();
    } else {
      go('/process/todo');
    }
  }
</script>
