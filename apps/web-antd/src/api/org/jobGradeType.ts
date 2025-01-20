import { requestClient } from '#/api/request';

import { forEach, listToTree } from '#/utils/helper/treeHelper';

enum Api {
  GetJobGradeTypes = '/flow/org/jobGradeType/getJobGradeTypes',
  SaveOrUpdate = '/flow/org/jobGradeType/saveOrUpdate',
  Delete = '/flow/org/jobGradeType/delete',
  CheckEntityExist = '/flow/org/jobGradeType/checkEntityExist',
}

export const getJobGradeTypes = (params: any) => {
  const result = requestClient.post<any>(Api.GetJobGradeTypes, params);
  return result;
};

export const getJobGradeTypesToTree = (params?: any) => {
  const result = requestClient.post<any>(Api.GetJobGradeTypes, params);
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

export const saveOrUpdate = (params?: any) =>
  requestClient.post<any>(Api.SaveOrUpdate, params, {responseReturn: 'body'});

export const checkEntityExist = (params?: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteById = (params?: Array<string>) =>
  requestClient.post<any>(Api.Delete, params);
