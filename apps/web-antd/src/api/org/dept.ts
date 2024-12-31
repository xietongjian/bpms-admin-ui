import { requestClient } from '#/api/request';
import { listToTree, forEach } from '#/utils/helper/treeHelper';

enum Api {
  DeptList = '/flow/org/department/getAll',
  GetOrgTree = '/flow/org/department/getOrgTree',
  SaveOrUpdate = '/flow/org/department/saveOrUpdate',
  Delete = '/flow/org/department/delete',
  CheckEntityExist = '/flow/org/department/checkEntityExist',
}

export const getDepts = (params: any) => {
  const result = requestClient.post<any>(Api.DeptList, params);
  return Promise.resolve(result).then((res: any) => {
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
  return treeData;
};

export const saveOrUpdate = (params: any) => requestClient.post(Api.SaveOrUpdate, params);

export const deleteByIds = (params: Array<string>) => requestClient.post(Api.Delete, params);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);
