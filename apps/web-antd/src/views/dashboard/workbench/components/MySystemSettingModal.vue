<template>
  <BasicModal class="w-[1000px]">
    <div class="h-full overflow-x-hidden">
      <div class="mb-2">我的系统</div>
      <Spin :spinning="mySystemListLoading">
        <div class="border-dotted border-[1px] border-color-gray-400 p-2 min-h-[100px]">
          <div v-if="mySystemList && mySystemList.length > 0" class="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 xxl:grid-cols-6 gap-3" ref="sortableListRef">
            <div
              v-for="item in mySystemList"
              :key="item"
              class="my-handle handle"
            >
              <div
                class="min-h-[80px] group rounded-md p-2 bg-blue-200/30 hover:bg-blue-200/60 w-full text-left flex items-center flex-row cursor-pointer position-relative"
              >
                <Avatar :alt="item.name" v-if="item.imgUrl" :size="50" :src="item.imgUrl" />
                <Avatar v-else :alt="item.name" :size="50">
                  <template #icon>
                    <PictureOutlined />
                  </template>
                </Avatar>
                <div class="font-size-[14px] font-weight-[900] line-height-[20px] flex-1 text-lg ml-2">
                  <div class="line-clamp-1">{{ item.name }}</div>
                  <div class="font-size-[12px] line-height-[20px] line-clamp-1">{{ item.description }}</div>
                </div>
                <Tooltip title="移除">
                  <CloseOutlined @click="handleDeleteMySystem(item)" class="group-hover:block hidden handle-delete color-red-500 position-absolute right-2 top-2 font-size-[16px]"/>
                </Tooltip>
              </div>
            </div>
          </div>
          <div v-else class="grid grid-cols-1 gap-4" ref="sortableListRef">
            <Empty description="请从下方添加常用业务入口" />
          </div>
        </div>
      </Spin>

      <Divider class="my-4"/>
      <div class="mb-2">
        所有系统
      </div>
      <Spin :spinning="allSystemListLoading">
        <div class="border-solid border-[1px] border-color-gray-400 p-2">
          <Row :gutter="[10, 10]">
            <Col
              v-if="allSystemList && allSystemList.length > 0"
              v-for="item in allSystemList"
              :key="item"
              :xs="{ span: 8 }"
              :sm="{ span: 8 }"
              :md="{ span: 8 }"
              :lg="{ span: 6 }"
              :xl="{ span: 6 }"
              :xxl="{ span: 6 }"
            >
              <div
                class="group min-h-[80px] rounded-md p-2 bg-blue-200/30 hover:bg-blue-200/60 w-full text-left flex items-center flex-row cursor-pointer position-relative"
                :class="{ 'bg-gray-300/40  hover:bg-gray-300/40': mySystemMap[item.id] }"
              >
                <a :href="item.url" target="_blank">
                  <Avatar :alt="item.name" v-if="item.imgUrl" :size="50" :src="item.imgUrl" />
                  <Avatar v-else :alt="item.name" :size="50">
                    <template #icon>
                      <PictureOutlined />
                    </template>
                  </Avatar>
                </a>
                <a :href="item.url" target="_blank" class="flex-1 ml-2">
                  <div class="font-size-[14px] font-weight-[900] line-height-[20px] flex-1 text-lg">
                    <div class="line-clamp-1">{{ item.name }}</div>
                    <div class="font-size-[12px] line-height-[20px] line-clamp-1">{{ item.description }}</div>
                  </div>
                </a>
                <Tooltip title="添加到常用系统">
                  <PlusOutlined v-if="!mySystemMap[item.id]" @click="handleAddToMySystem(item)" class="group-hover:block hidden color-green-500 position-absolute right-2 top-2 font-size-[16px] cursor-pointer"/>
                </Tooltip>
              </div>
            </Col>
            <Col v-else span="24" class="min-h-[180px] flex flex-col items-center">
              <Empty description="请联系管理员添加常用业务入口" />
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import {ref, nextTick, computed, defineExpose, defineEmits} from 'vue';
  import {
    deleteMySystemById,
    getAllSystemList,
    getMySystemList,
    saveOrUpdateMySystem,
    saveUserSystemOrderNo,
  } from '#/api/base/systemInfo';
  import { Spin, Empty, Divider, Avatar, Row, Col, Tooltip, message } from 'ant-design-vue';
  import {useVbenModal} from '@vben/common-ui';
  import Sortable from 'sortablejs';
  import {
    CloseOutlined, PlusOutlined, PictureOutlined,
  } from '@ant-design/icons-vue';
  const emit = defineEmits(['closeFunc']);

  const sortableListRef = ref();
  const allSystemList = ref([]);
  const mySystemList = ref([]);
  const mySystemListLoading = ref(true);
  const allSystemListLoading = ref(true);

  const mySystemMap = computed(() => {
    const map = {};
    mySystemList.value.forEach((item) => {
      map[item.systemId] = item;
    });
    return map;
  });

  const [BasicModal, modalApi] = useVbenModal({
    showConfirmButton: false,
    cancelText: '关闭',
    onOpenChange: async (isOpen) => {
      if (!isOpen) {
        emit('closeFunc');
        return null;
      }
      await loadMySystems();
      await loadAllSystems();
      await nextTick();
      setTimeout(() => {
        Sortable.create(sortableListRef.value, {
          animation: 150,
          easing: 'cubic-bezier(1, 0, 0, 1)', // 移动动画。默认为 null。例如 https://easings.net/。
          handle: '.my-handle', // 在列表项中拖动手柄选择器
          onEnd: (evt) => {
            const { newIndex, oldIndex } = evt;
            const movedItem = mySystemList.value.splice(oldIndex, 1)[0];
            mySystemList.value.splice(newIndex, 0, movedItem);
            // 保存排序
            mySystemList.value.forEach((item, idx) =>{
              item['orderNo'] = idx;
            });
            saveUserSystemOrderNo(mySystemList.value);
          },
        });
      }, 100);
    },
  });

  async function loadMySystems() {
    mySystemListLoading.value = true;
    try {
      mySystemList.value = await getMySystemList();
    } catch (e) {
      console.error(e);
    } finally {
      mySystemListLoading.value = false;
    }
  }

  async function loadAllSystems() {
    try {
      allSystemListLoading.value = true;
      allSystemList.value = await getAllSystemList();
    } catch (e) {
      console.error(e);
    } finally {
      allSystemListLoading.value = false;
    }
  }

  async function handleDeleteMySystem(item) {
    const res = await deleteMySystemById({ id: item.id });
    if (res.success) {
      message.success(res.msg);
      mySystemList.value.splice(
        mySystemList.value.findIndex((itm) => item.id === itm.id),
        1
      );
    } else {
      message.error(res.msg);
    }
  }

  async function handleAddToMySystem(item) {
    allSystemListLoading.value = true;
    try {
      const res = await saveOrUpdateMySystem({systemId: item.id});
      await loadMySystems();
    } catch (e) {
      console.error(e);
    } finally {
      allSystemListLoading.value = false;
    }
  }

  defineExpose(modalApi);
</script>
