import { requestClient } from '#/api/request';

import { listToTree, forEach } from '#/utils/helper/treeHelper';

enum Api {
  CompanyList = '/flow/org/company/getCompanies',
  SaveOrUpdate = '/flow/org/company/saveOrUpdate',
  Delete = '/flow/org/company/delete',
  CheckEntityExist = '/flow/org/company/checkEntityExist',
}

export const getCompaniesListData = async (params?: any) => {
  const result = await requestClient.post<any>(Api.CompanyList, params||{});
  result.forEach((item: any) => {
    item.title = item.cname;
    item.key = item.id;
  });
  return result;
}
export const getCompanies = async (params?: any) => {
  const res = await getCompaniesListData(params);
  res.forEach((item: any) => {
    item.key = item.id;
    item.value = item.id;
    item.title = item.shortName;
    item.icon = 'bx:building-house';
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
};
export const getCompanyTreeData = async (params?: any) => {
  const res = await getCompaniesListData(params);
  res.forEach((item: any) => {
    item.key = item.id;
    item.value = item.id;
    item.title = item.shortName;
    item.icon = 'bx:building-house';
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
};

export const saveOrUpdate = (params: any) => requestClient.post<any>(Api.SaveOrUpdate, params, {responseReturn: 'body'});

export const deleteByIds = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete, params, {responseReturn: 'body'});

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);
