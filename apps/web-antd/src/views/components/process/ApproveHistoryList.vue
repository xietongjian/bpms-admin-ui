<template>
  <List :loading="approvalHistoryLoading" class="[&_.ant-list-item]:px-0" item-layout="horizontal" :dataSource="historyList">
    <template #renderItem="{ item }">
      <ListItem v-if="item.type !== 'SPJS'">
        <ListItemMeta>
          <template #description>
            <div class="flex">
              <div class="flex-1">
                <div v-if="item.type !== 'SPJS'" v-html="getFormatCode(item.message || '无')"></div>
                <div v-if="item.commentAttachmentList" class="flex flex-row gap-2 mt-2">
                  <ProcessFileItem v-for="file in item.commentAttachmentList"
                      :file-name="file.fileName"
                      :file-path="file.filePath"
                      :file-size="file.fileSize"
                  />
                </div>
              </div>
              <div v-if="item.signatureImg" class="w-[120px] h-[40px] object-contain">
                <img :title="item.personalName" v-if="item.signatureImg" :src="item.signatureImg" class="w-20 h-8" />
              </div>
            </div>
          </template>
          <template #title>
            <Row type="flex">
              <Col flex="1 1 200px">
                <Space>
                  <span class="font-bold">
                    {{ item.personalName }}
                    <span v-if="item.orgLevel" class="font-size-[10px] font-thin ml-1">
                      ({{ item.orgLevel }})
                    </span>
                    <span class="font-normal text-gray-500" v-if="item.activityName">
                      （{{ item.activityName }}）
                    </span>
                  </span>
                  <Tag :color="item.type === 'BH' || item.type === 'LCZZ' ? 'error' : 'success'">
                    <span class="font-bold">{{ item.typeName }}</span>
                  </Tag>
                </Space>
              </Col>
              <Col flex="0 1 200px" class="text-right">
                <span>{{ item.time }}</span>
              </Col>
            </Row>
          </template>
          <template #avatar>
            <!-- 判断如果是终止或结束，则显示终止/办结图标 -->
            <div class="text-center">
              <div v-if="item.type === 'SPJS'">
                <Avatar style="background-color: #87d068">
                  <template #icon>
                    <CheckOutlined />
                  </template>
                </Avatar>
              </div>

              <EmpInfo v-else :no="item.personalCode" :name="item.personalName">
                <Avatar v-if="item.personalHeadImg" :src="item.personalHeadImg">
                  {{ item.personalName }}
                </Avatar>
                <Avatar v-else style="background-color: #87d068">
                  <template #icon>
                    <UserOutlined />
                  </template>
                </Avatar>
              </EmpInfo>
            </div>
          </template>
        </ListItemMeta>
      </ListItem>

      <ListItem v-if="item.type === 'LCZZ' || item.type === 'SPJS'">
        <ListItemMeta>
          <template #avatar>
            <!-- 判断如果是终止或结束，则显示终止/办结图标 -->
            <div class="text-center">
              <div v-if="item.type === 'SPJS'">
                <Avatar style="background-color: #87d068">
                  <template #icon>
                    <CheckOutlined />
                  </template>
                </Avatar>
              </div>
              <div v-if="item.type === 'LCZZ'">
                <Avatar style="background-color: #ff4d4f">
                  <template #icon>
                    <StopOutlined />
                  </template>
                </Avatar>
              </div>
            </div>
          </template>
          <template #title>
            <Row type="flex">
              <Col flex="1 1 200px">
                <Space>
                  <Tag :color="item.type === 'LCZZ' ? 'error' : 'success'">
                    <span class="font-bold">{{ item.typeName }}</span>
                  </Tag>
                </Space>
              </Col>
            </Row>
          </template>
        </ListItemMeta>
      </ListItem>
    </template>
  </List>
</template>
<script lang="ts" setup>
  import { ref, watch, defineProps } from 'vue';
  import { UserOutlined, CheckOutlined, StopOutlined } from '@ant-design/icons-vue';
  import { List, Avatar, Tag, Space, Row, Col } from 'ant-design-vue';
  import {EmpInfo} from '#/views/components/EmpInfo';
  import { getFormatCode } from '#/utils';
  import ProcessFileItem from '#/views/components/common/widgets/processFileItem/index.vue';

  const props = defineProps({
    historyList: {
      type: Array,
      default: [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  });

  const ListItem = List.Item;
  const ListItemMeta = List.Item.Meta;

  const historyList = ref([]);
  const approvalHistoryLoading = ref(false);
  watch(
    () => props.historyList, //监听
    () => {
      const res = props.historyList;
      const result = [];
      for (let i = 0; i < res.length; i++) {
        let item = res[i];
        result.push(item);
        if (item.type === 'LCZZ') {
          break;
        }
        if (item.type === 'SPJS') {
          break;
        }
      }
      historyList.value = result;
    },
  );

  watch(
    () => props.loading,
    () => {
      approvalHistoryLoading.value = props.loading;
    },
  );
</script>
