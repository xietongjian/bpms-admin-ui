<template>
  <Page auto-content-height class="">
    <div class="flex flex-row h-full">
      <DictTypeTree
          @select="handleDictTypeSelect"
          class="w-1/5 mr-2"
      />
      <DictionaryTable
          ref="dictionaryRef"
          @handle-select="handleDictSelect"
          class="w-2/5 flex-1 mr-2"
      />
      <DictionaryItemTable
          ref="dictionaryItemRef"
          class="w-2/5 flex-1"
      />
    </div>
  </Page>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import {Page} from '@vben/common-ui';
  import DictTypeTree from './DictTypeTree.vue';
  import DictionaryTable from './DictionaryTable.vue';
  import DictionaryItemTable from './DictionaryItemTable.vue';

  const dictionaryRef = ref();
  const dictionaryItemRef = ref();

  function handleDictTypeSelect(node: any) {
    if (node) {
      dictionaryRef.value.filterByDictType(node.id);
      dictionaryItemRef.value.cleanTableData();
    } else {
      dictionaryRef.value.cleanTableData();
    }
  }

  function handleDictSelect(dictId: string) {
    if (dictId) {
      dictionaryItemRef.value.filterByDict(dictId);
    } else {
      dictionaryItemRef.value.cleanTableData();
    }
  }
</script>
