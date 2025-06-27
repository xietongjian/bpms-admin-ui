import { requestClient } from '#/api/request';
import { listToTree, forEach } from '#/utils/helper/treeHelper';

enum Api {
  DeptList = '/flow/org/department/getAll',
  GetOrgTree = '/flow/org/department/getOrgTree',
  SaveOrUpdate = '/flow/org/department/saveOrUpdate',
  Delete = '/flow/org/department/delete',
  CheckEntityExist = '/flow/org/department/checkEntityExist',
}

export const getDeptListData = (params: any) => {
  return requestClient.post<any>(Api.DeptList, params);
};

export const getDepts = (params: any) => {
  return getDeptListData(params).then(res => {
    res.forEach((item) => {
      item.key = item.id;
      item.value = item.id;
      item.title = item.name;
    });
    const treeData = listToTree(res, { id: 'id', children: 'children', pid: 'pid' });
    forEach(
        treeData,
        (node) => {
          if (node.children.length === 0) {
            delete node.children;
          }
        },
        { id: 'id', children: 'children', pid: 'pid' },
    );
    return treeData;
  });
};

export const getOrgListData = async () => {
  const result = await requestClient.get<any>(Api.GetOrgTree);
  result.forEach((item: any) => {
    item.title = item.name;
    item.key = item.id;
    item.value = item.id;
  });
  return result;
}

export const getOrgTree = async () => {
  const result = await getOrgListData();
  result.forEach((item) => {
    item.key = item.id;
    item.value = item.id;
    item.title = item.shortName;
    if (item.sourceType == 1) {
      item.icon = 'bx:building-house';
    } else if (item.sourceType == 2) {
      item.icon = 'ant-design:cluster-outlined';
    }
  });
  // debugger;
  const treeData = listToTree(result, { id: 'id', children: 'children', pid: 'pid' });
  forEach(
    treeData,
    (node) => {
      if (node.children.length === 0) {
        delete node.children;
      }
    },
    { id: 'id', children: 'children', pid: 'pid' },
  );
  // debugger;
  return treeData;
};

export const saveOrUpdate = (params: any) => requestClient.post(Api.SaveOrUpdate, params, {responseReturn: 'body'});

export const deleteByIds = (params: Array<string>) => requestClient.post(Api.Delete, params, {responseReturn: "body"});

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);
