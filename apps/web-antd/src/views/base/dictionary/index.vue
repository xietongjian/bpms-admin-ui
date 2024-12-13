<template>
  <Page auto-content-height>
    <DictTypeTree class="w-1/5 xl:w-1/5" @select="handleDictTypeSelect" />
    <DictionaryTable
      ref="dictionaryRef"
      @handle-select="handleDictSelect"
      class="w-2/5 xl:w-2/5 ml-2 mr-2"
    />
    <DictionaryItemTable ref="dictionaryItemRef" class="w-2/5 xl:w-2/5" />
  </Page>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import {Page} from '@vben/common-ui';
  import DictTypeTree from './DictTypeTree.vue';
  import DictionaryTable from './DictionaryTable.vue';
  import DictionaryItemTable from './DictionaryItemTable.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useModal } from '@/components/Modal';

  const { createMessage } = useMessage();

  const [registerModal, { openModal }] = useModal();
  const dictionaryRef = ref();
  const dictionaryItemRef = ref();

  function handleDictTypeSelect(dictTypeId = '') {
    if (dictTypeId) {
      dictionaryRef.value.filterByDictType(dictTypeId);
      dictionaryItemRef.value.cleanTableData();
    } else {
      dictionaryRef.value.cleanTableData();
    }
  }

  function handleDictSelect(dictId) {
    if (dictId) {
      dictionaryItemRef.value.filterByDict(dictId);
    } else {
      dictionaryItemRef.value.cleanTableData();
    }
  }
</script>
