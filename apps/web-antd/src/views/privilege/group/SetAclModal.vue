<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :bodyStyle="{ padding: '1px' }"
    wrapClassName="acl-modal "
  >
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'pvs'">
          <AclCheckboxGroup
            @change-check-all-status="handleChangeCheckAllStatus"
            :checkboxList="
              record.pvs.map((item) => {
                return { label: item.name, value: item.position, checked: item.flag };
              })
            "
            :groupId="aclObj.id"
            :moduleSn="record.sn"
            :moduleId="record.id"
          />
        </template>
      </template>
      <template #headerCell="{ column }">
        <template v-if="column.key === 'pvs'">
          <div style="text-align: center">
            <span style="float: left">
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
      </template>
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { aclColumns } from './group.data';
  import AclCheckboxGroup from './AclCheckboxGroup.vue';

  import { Checkbox } from 'ant-design-vue';
  import { getModuleAclsByGroupId, setAllAcl } from '@/api/privilege/acl';
  import { forEach } from '@/utils/helper/treeHelper';

  const dataSource = ref<any[]>([]);
  const aclsTableLoading = ref<boolean>(true);
  const indeterminate = ref<boolean>(false);
  const checkAllBox = ref<boolean>(false);
  const aclObj = ref({});

  const [registerTable, { setTableData, expandAll }] = useTable({
    title: '',
    size: 'small',
    dataSource: dataSource,
    loading: aclsTableLoading,
    immediate: false,
    searchInfo: {},
    columns: aclColumns,
    canResize: true,
    isTreeTable: true,
    useSearchForm: false,
    showTableSetting: false,
    bordered: false,
    showIndexColumn: false,
    pagination: false,
  });

  const [registerModal] = useModalInner(async (data) => {
    aclObj.value = data.record;
    aclsTableLoading.value = true;
    getModuleAclsByGroupId({ groupId: unref(aclObj).id }).then((res) => {
      ctrlCheckAllBox(res);
      dataSource.value = res;
      aclsTableLoading.value = false;
      setTimeout(() => {
        expandAll();
      });
    });
  });

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
        setTableData(dataSource.value);
        aclsTableLoading.value = false;
        setTimeout(() => {
          expandAll();
        });
      })
      .catch(() => {
        aclsTableLoading.value = false;
      });
  };
</script>
<style lang="less">
  .acl-modal {
    .ant-modal-body {
      .scroll-container {
        padding: 0;
      }
    }
  }
</style>
