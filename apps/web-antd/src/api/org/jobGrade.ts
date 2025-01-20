import { requestClient } from '#/api/request';

import { forEach, listToTree } from '#/utils/helper/treeHelper';

enum Api {
  GetJobGrades = '/flow/org/jobGrade/getJobGrades',
  GetJobGradeTree = '/flow/org/jobGrade/getJobGradeTree',
  SaveOrUpdate = '/flow/org/jobGrade/saveOrUpdate',
  BatchSaveJobGradeTypeAndJobGrade = '/flow/org/jobGrade/batchSaveJobGradeTypeAndJobGrade',
  Delete = '/flow/org/jobGrade/delete',
  CheckEntityExist = '/flow/org/jobGrade/checkEntityExist',
}

export const getJobGradeTree = (params?: any) => {
  const result = requestClient.post<any[]>( Api.GetJobGradeTree, params);
  return Promise.resolve(result).then((res: any) => {
    res.forEach((item) => {
      item.key = item.id;
      item.title = `${item.name} (${item.code})`;
      item.value = item.id;
    });
    const treeData = listToTree(res, { id: 'id', children: 'children', pid: 'pid' });
    forEach(
      treeData,
      (node) => {
        node.showName = `${node.name} (${node.code})`;
        if (node.sourceType === '1') {
          node.selectable = false;
          node.disabled = true;
        }
        if (node.children.length === 0) {
          delete node.children;
        }
      },
      { id: 'id', children: 'children', pid: 'pid' },
    );
    return treeData;
  });
};

export const getJobGrades = (params: any) => {
  const result = requestClient.post<any[]>(Api.GetJobGrades, params);
  return result;
};

export const saveOrUpdate = (params?: any) =>
  requestClient.post<any>(Api.SaveOrUpdate, params, {responseReturn: 'body'});

export const batchSaveJobGradeTypeAndJobGrade = (params?: any) =>
  requestClient.post<any>(Api.BatchSaveJobGradeTypeAndJobGrade, params);

export const checkEntityExist = (params?: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteById = (params?: Array<string>) =>
  requestClient.post<any>(Api.Delete, params);
