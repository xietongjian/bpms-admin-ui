import { requestClient } from '#/api/request';
import { listToTree, forEach } from '#/utils/helper/treeHelper';

enum Api {
  ModuleList = '/flow/privilege/module/getModules',
  SaveOrUpdate = '/flow/privilege/module/saveOrUpdate',
  Delete = '/flow/privilege/module/delete',
  SavePValue = '/flow/privilege/module/addPriVal',
  CheckEntityExist = '/flow/privilege/module/checkEntityExist',
}

export const getModules = (params?: any) => {
  const result = requestClient.post<any>(Api.ModuleList, { params });
  return Promise.resolve(result).then((res: any) => {
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

export const saveOrUpdate = (params: any) => requestClient.post<any>(Api.SaveOrUpdate,{ params });

export const savePValue = (params: any) => requestClient.post<any>(Api.SavePValue, { params });

export const deleteByIds = (params: Array<string>) =>
    requestClient.post<any>(Api.Delete, { params });

export const checkEntityExist = (params: any) =>
    requestClient.post<boolean>(Api.CheckEntityExist, { params });
