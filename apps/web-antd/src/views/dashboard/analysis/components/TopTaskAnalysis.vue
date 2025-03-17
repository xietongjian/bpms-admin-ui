<template>
  <div class="top-task-analysis ml-[20px] h-full">
    <div class="p-2 w-full !bg-gradient-to-r !from-blue-700/90 !to-blue-500/20 !color-white">
      <RadioGroup
        class="analysis-date-range bg-transparent !color-white border-none"
        size="small"
        v-model:value="dateRangeNum"
        @change="handleChangeDateRange"
        button-style="solid"
      >
        <RadioButton class="!border-0 !bg-transparent !color-teal-100 overflow-hidden" :value="7">近七天</RadioButton>
        <RadioButton class="!border-0 !bg-transparent !color-teal-100 overflow-hidden" :value="30">近一个月</RadioButton>
        <RadioButton class="!border-0 !bg-transparent !color-teal-100 overflow-hidden" :value="90">近三个月</RadioButton>
      </RadioGroup>
    </div>
    <div>
      <List
        :loading="topFastDurationTaskLoading"
        size="small"
        item-layout="horizontal"
        :data-source="topFastDurationTaskPersonal"
      >
        <template #renderItem="{ item, index }">
          <ListItem class="display: block;">
            <div class="w-1/2">
              {{ index + 1 }}
              <CrownOutlined :style="`color: ${index <= 2 ? '#CD7F32' : ''}`" />
              {{ item.statName }}
            </div>
            <div class="w-1/2 text-right">
              {{ formatSecToStr((item.total || 0) / 1000) }}
            </div>
          </ListItem>
        </template>
      </List>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, unref, defineProps } from 'vue';
  import { Radio, List } from 'ant-design-vue';
  import { basicProps } from './props';
  import { CrownOutlined } from '@ant-design/icons-vue';
  import { countLatestNumDaysFastSlowTaskAssignee } from '#/api/report/flowCount';
  import { formatSecToStr } from '#/utils/dateUtil';

  const RadioButton = Radio.Button;
  const RadioGroup = Radio.Group;
  const ListItem = List.Item;

  const props = defineProps({
    ...basicProps,
    orderBy: {
      type: String,
      default: 'ASC',
    },
  });

  const dateRangeNum = ref(30);
  const topFastDurationTaskLoading = ref(false);
  const topFastDurationTaskPersonal = ref([]);

  onMounted(() => {
    fetchData();
  });

  function handleChangeDateRange() {
    fetchData();
  }

  function fetchData() {
    topFastDurationTaskLoading.value = true;
    countLatestNumDaysFastSlowTaskAssignee({
      orderBy: props.orderBy,
      dayNum: unref(dateRangeNum),
      num: 8,
    })
      .then((res) => {
        topFastDurationTaskPersonal.value = res;
        topFastDurationTaskLoading.value = false;
      })
      .catch((e) => {
        console.error(e);
        topFastDurationTaskLoading.value = false;
      });
  }
</script>
<style lang="scss" scoped>
  .analysis-date-range {
    .ant-radio-button-wrapper-checked {
      font-weight: bold;
      border: none;
      border-bottom: 2px solid white !important;
      background: transparent;
      color: white;
      border-radius: 0;
    }
  }
</style>
