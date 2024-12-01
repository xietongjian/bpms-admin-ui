import { requestClient } from '#/api/request';

import { listToTree, forEach } from '#/utils/helper/treeHelper';

enum Api {
  CompanyList = '/flow/org/company/getCompanies',
  SaveOrUpdate = '/flow/org/company/saveOrUpdate',
  Delete = '/flow/org/company/delete',
  CheckEntityExist = '/flow/org/company/checkEntityExist',
}

export const getCompanies = (params?: any) => {
  const result = requestClient.post<any>(Api.CompanyList, params||{});
  return Promise.resolve(result).then((res: any) => {
    res.forEach((item) => {
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
  });
};

export const saveOrUpdate = (params: any) => requestClient.post<any>(Api.SaveOrUpdate, params);

export const deleteByIds = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete, params);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);
