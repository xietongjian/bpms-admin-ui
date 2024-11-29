<template>
  <Collapse title="安全设置" :canExpand="false">
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
                <span v-if="hasAccessByCodes[PerPrefix + PerEnum.UPDATE]" @click="handleChangePassword">{{ item.extra }}</span>
              </div>
            </template>
            <template #description>
              <div>{{ item.description }}</div>
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
    <PasswordModal ref="passwordModalRef" @success="handlePasswordSuccess" />

  </Collapse>
</template>
<script lang="ts" setup>
  import { List, Collapse } from 'ant-design-vue';
  import { ref } from 'vue';
  import { secureSettingList } from './data';
  import PasswordModal from './PasswordModal.vue';
  import {useVbenModal} from "@vben/common-ui";
  import {useUserStore} from "@vben/stores";
  import {PerEnum} from "#/enums/perEnum";
  import {useAccess} from '@vben/access';

  const PerPrefix = 'AccountSetting:';

  const {hasAccessByCodes} = useAccess();

  const userStore = useUserStore();
  const passwordModalRef = ref();
  const ListItem = List.Item;
  const ListItemMeta = List.Item.Meta;

  const handleChangePassword = () => {
    passwordModalRef.value.open();
  }

  function handlePasswordSuccess() {
    userStore.logout(true);
  }

</script>
