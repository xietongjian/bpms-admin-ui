import { requestClient } from '#/api/request';
import { forEach, listToTree } from '#/utils/helper/treeHelper';

enum Api {
  GetPositionSeqs = '/flow/org/positionSeq/getPositionSeqs',
  SaveOrUpdate = '/flow/org/positionSeq/saveOrUpdate',
  Delete = '/flow/org/positionSeq/deleteById',
  CheckEntityExist = '/flow/org/positionSeq/checkEntityExist',
}

export const getPositionSeqs = (params?: any) => {
  const result = requestClient.post<any>(Api.GetPositionSeqs, params );
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

export const saveOrUpdate = (params: any) =>
  requestClient.post<any>(Api.SaveOrUpdate, params, {responseReturn: 'body'});

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete, params, {responseReturn: 'body'});
