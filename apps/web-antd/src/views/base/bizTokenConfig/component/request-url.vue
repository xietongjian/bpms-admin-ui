<script lang="ts" setup>
import { Input, Select } from 'ant-design-vue';
import {FormValidPatternEnum} from '#/enums/commonEnum';

const ServerTypeList = [
  {
    label: 'Get',
    value: 'GET',
  },
  {
    label: 'Post',
    value: 'POST',
  },
];

const emit = defineEmits(['blur', 'change']);

const modelValue = defineModel<[string, string]>({
  default: () => [undefined, undefined],
});

function onChange() {
  emit('change', modelValue.value);
}
</script>
<template>
  <div class="flex w-full gap-1">
    <Select
      v-model:value="modelValue[0]"
      class="w-[100px]"
      placeholder="请求方式"
      :class="{ 'valid-success': !!modelValue[0] }"
      :options="ServerTypeList"
      @blur="emit('blur')"
      @change="onChange"
    />
    <Input
      placeholder="请输入URL"
      class="flex-1"
      allow-clear
      :class="{ 'valid-success': modelValue[1]?.match(new RegExp(FormValidPatternEnum.URL)) }"
      v-model:value="modelValue[1]"
      :maxlength="255"
      @blur="emit('blur')"
      @change="onChange"
    />
  </div>
</template>
