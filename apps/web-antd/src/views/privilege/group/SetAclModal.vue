<template>
  <BasicModal contentClass="overflow-hidden m-0 p-0 pt-2" class="w-[70%] min-w-[500px] min-h-[80%] h-[500px]">
    <div class="h-full w-full">
      <BasicTable >
        <template #pvs="{row}">
          <AclCheckboxGroup
              @change-check-all-status="handleChangeCheckAllStatus"
              :checkboxList="
                row.pvs.map((item) => {
                  return { label: item.name, value: item.position, checked: item.flag };
                })
              "
              :groupId="aclObj.id"
              :moduleSn="row.sn"
              :moduleId="row.id"
          />
        </template>
        <template #pvsHeader="{column}">
          <div class="text-center" style="text-align: center">
            <span class="float-start">
              <Checkbox
                  v-model:checked="checkAllBox"
                  :indeterminate="indeterminate"
                  @click="checkAll"
              >全选</Checkbox
              >
            </span>
            <span> 操作权限 </span>
          </div>
        </template>
      </BasicTable>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref, defineExpose } from 'vue';
  import type {VxeGridProps} from '#/adapter/vxe-table';
  import {aclColumns} from './group.data';
  import AclCheckboxGroup from './AclCheckboxGroup.vue';
  import {useVbenVxeGrid} from '#/adapter/vxe-table';

  import { Checkbox } from 'ant-design-vue';
  import { getModuleAclsByGroupId, setAllAcl } from '#/api/privilege/acl';
  import { forEach } from '#/utils/helper/treeHelper';
  import {useVbenModal} from "@vben/common-ui";

  const dataSource = ref<any[]>([]);
  const aclsTableLoading = ref<boolean>(true);
  const indeterminate = ref<boolean>(false);
  const checkAllBox = ref<boolean>(false);
  const aclObj = ref({});

  const [BasicModal, modalApi] = useVbenModal({
    draggable: true,
    centered: true,
    showConfirmButton: false,
    cancelText: '关闭',
    onCancel() {
      modalApi.close();
    },
    onOpenChange(isOpen: boolean) {
      if (isOpen) {
        const values = modalApi.getData<Record<string, any>>();
        if (values) {
          aclObj.value = values;
          // baseFormApi.setValues(values);
          modalApi.setState({loading: false, confirmLoading: false});
        }
      }
    }
  });

  const gridOptions: VxeGridProps<any> = {
    columns: aclColumns,
    columnConfig: {resizable: true},
    minHeight: '80%',
    height: 'auto',
    pagerConfig: {
      enabled: false,
    },
    rowConfig: {
      keyField: 'id',
    },
    treeConfig: {
      parentField: 'pid',
      rowField: 'id',
      transform: true,
      expandAll: true,
    },
    keepSource: true,
    border: 'none',
    stripe: true,

    proxyConfig: {
      ajax: {
        query: async ({page}, formValues) => {
          return getModuleAclsByGroupId({ groupId: unref(aclObj).id }).then((res) => {
            ctrlCheckAllBox(res);
            dataSource.value = res;
            aclsTableLoading.value = false;
            return res
          });
        },
      },
    },
  };

  const [BasicTable, tableApi] = useVbenVxeGrid({gridOptions});

  function ctrlCheckAllBox(treeData) {
    let allSize = 0;
    let trueSize = 0;
    let falseSize = 0;
    forEach(treeData, (node) => {
      if (node.pvs) {
        node.pvs.forEach((item) => {
          allSize++;
          if (item.flag) {
            trueSize++;
          } else {
            falseSize++;
          }
        });
      }
    });
    if (trueSize === allSize) {
      checkAllBox.value = true;
      indeterminate.value = false;
    } else if (falseSize === allSize) {
      checkAllBox.value = false;
      indeterminate.value = false;
    } else {
      indeterminate.value = true;
    }
  }

  function handleChangeCheckAllStatus() {
    // tableApi.reload();
    getModuleAclsByGroupId({ groupId: unref(aclObj).id }).then((res) => {
      ctrlCheckAllBox(res);
    });
  }

  // 选择所有权限值
  const checkAll = (e) => {
    aclsTableLoading.value = true;
    indeterminate.value = false;
    setAllAcl({ checked: e.target.checked ? 1 : 0, aclInfo: { releaseId: unref(aclObj).id } })
      .then((res) => {
        forEach(dataSource.value, (node) => {
          node.pvs &&
            node.pvs.forEach((item) => {
              item.flag = e.target.checked;
            });
        });
        tableApi.reload();
        aclsTableLoading.value = false;
      })
      .catch(() => {
        aclsTableLoading.value = false;
      });
  };
  defineExpose(modalApi);
</script>
<style lang="scss">
  .acl-modal {
    .ant-modal-body {
      .scroll-container {
        padding: 0;
      }
    }
  }
</style>
