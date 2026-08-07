import { requestClient } from '#/api/request';
import { forEach, listToTree } from '#/utils/helper/treeHelper';

enum Api {
  ModuleList = '/flow/privilege/module/getModules',
  SaveOrUpdate = '/flow/privilege/module/saveOrUpdate',
  Delete = '/flow/privilege/module/delete',
  SavePValue = '/flow/privilege/module/addPriVal',
  CheckEntityExist = '/flow/privilege/module/checkEntityExist',
}

export const getModules = (params?: any) => {
  return requestClient.post<any>(Api.ModuleList, params).then((res: any) => {
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

export const savePValue = (params: any) => requestClient.post<any>(Api.SavePValue, params, {responseReturn: 'body'});

export const deleteByIds = (params: Array<string>) =>
    requestClient.post<any>(Api.Delete, params, {responseReturn: 'body'});

export const checkEntityExist = (params: any) =>
    requestClient.post<boolean>(Api.CheckEntityExist, params);
