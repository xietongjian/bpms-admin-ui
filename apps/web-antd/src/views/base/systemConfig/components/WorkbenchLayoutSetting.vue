<template>
  <div class="">
    <Button type="primary" @click="handleWorkbenchDesigner">{{dataItem.configName}}</Button>
    <WorkbenchLayoutModal ref="workbenchLayoutModalRef"/>
  </div>
</template>
<script lang="ts" setup>
import {defineProps, ref} from 'vue';
import {Button} from "ant-design-vue";
import WorkbenchLayoutModal from "./WorkbenchLayoutModal.vue";

const workbenchLayoutModalRef = ref();
const props = defineProps({
  dataItem: {
    type: Array,
    default: () => [],
  },
})
function handleWorkbenchDesigner() {
  workbenchLayoutModalRef.value.setData();
  workbenchLayoutModalRef.value.open();

}

</script>
<style lang="scss" scoped>
</style>
