import { requestClient } from '#/api/request';
import { listToTree, forEach } from '#/utils/helper/treeHelper';


enum Api {
  GetDicTypes = '/flow/base/dicType/getDicTypes',
  SaveOrUpdate = '/flow/base/dicType/saveOrUpdate',
  Delete = '/flow/base/dicType/delete',
  CheckEntityExist = '/flow/base/dicType/checkEntityExist',
}

export const getDicTypes = (params?: any) => {
  const result = requestClient.post<any>(Api.GetDicTypes, params);
  return Promise.resolve(result).then((res) => {
    res.forEach((item) => {
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

export const saveOrUpdate = (params: any) => requestClient.post<any>(Api.SaveOrUpdate, params, {responseReturn: 'body'});

export const deleteByIds = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete, params);

export const checkEntityExist = (params?: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);
