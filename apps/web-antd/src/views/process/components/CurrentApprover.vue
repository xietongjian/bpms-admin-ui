<template>
  <CollapseContainer v-if="approverList.length>0" :canExpand="true" >
    <template #title>
      <div class="font-bold">当前待办人</div>
    </template>
    <div style="overflow-x: auto;overflow-y: hidden;">
      <Space>
        <div style="width: 80px; word-break: keep-all; text-overflow: ellipsis;" v-for="item in approverList" class="text-center">
          <EmpInfo :no="item.code" :name="item.name" >
            <Avatar v-if="item.headImg" :src="item.headImg">
              {{item.name}}
            </Avatar>
            <Avatar v-else style="background-color: #87d068">
              <template #icon>
                <UserOutlined />
              </template>
            </Avatar>
            <br/>
            {{item.name}}
          </EmpInfo>
        </div>
      </Space>
    </div>
  </CollapseContainer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, onMounted } from 'vue';
  import { ApartmentOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons-vue';
  import { Avatar, Space, Tag, Row, Col } from 'ant-design-vue';
  import { CollapseContainer } from '@/components/Container/index';
  import {EmpInfo} from '@/components/EmpInfo';

  export default defineComponent({
    name: 'CurrentApprover',
    components: { Space, Tag, Row, Col,
      EmpInfo,
      ApartmentOutlined,
      UserOutlined,
      ClockCircleOutlined,
      CollapseContainer,
      Avatar
    },
    props: {
      approverList: {
        type: Array,
        default: []
      }
    },
    setup(props, {emit}) {
      return {
        approverList: props.approverList,
      };
    },
  });
</script>
