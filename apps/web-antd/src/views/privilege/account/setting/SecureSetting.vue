<template>
  <CollapseContainer title="安全设置" :canExpand="false">
    <List>
      <template v-for="item in secureSettingList" :key="item.key">
        <ListItem>
          <ListItemMeta>
            <template #title>
              {{ item.title }}
              <div
                class="float-right mt-10px mr-30px text-blue-500 text-font-normal cursor-pointer"
                v-if="item.extra"
              >
                <Authority :value="'AccountSetting:' + PerEnum.UPDATE">
                  <span @click="handleChangePassword">{{ item.extra }}</span>
                </Authority>
              </div>
            </template>
            <template #description>
              <div>{{ item.description }}</div>
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
    <PasswordModal @register="registerPasswordModal" @success="handlePasswordSuccess" />

  </CollapseContainer>
</template>
<script lang="ts" setup>
  import { CollapseContainer } from '@/components/Container';
  import { List } from 'ant-design-vue';
  import { secureSettingList } from './data';
  import PasswordModal from './PasswordModal.vue';
  import {useModal} from "@/components/Modal";
  import {useUserStore} from "@/store/modules/user";
  import {PerEnum} from "@/enums/perEnum";
  import {Authority} from "@/components/Authority";

  const userStore = useUserStore();
  const [registerPasswordModal, { openModal: openPasswordModal }] = useModal();

  const ListItem = List.Item;
  const ListItemMeta = List.Item.Meta;

  const handleChangePassword = () => {
    openPasswordModal(true, {
      isUpdate: true,
    });
  }

  function handlePasswordSuccess() {
    userStore.logout(true);
  }

</script>
