import { requestClient } from '#/api/request';
import { listToTree, forEach } from '#/utils/helper/treeHelper';

enum Api {
  GetAreas = '/flow/base/area/getAreas',
  SaveOrUpdate = '/flow/base/area/saveOrUpdate',
  Delete = '/flow/base/area/delete',
  GetAreasByPcode = '/flow/base/area/getAreasByPcode',
  CheckEntityExist = '/flow/base/area/checkEntityExist',
}

export const getAreas = (params?: any) => {
  const result = requestClient.post<any>(Api.GetAreas, params);
  return Promise.resolve(result).then((res: any) => {
    res.forEach((item) => {
      item.key = item.code;
      item.title = item.name;
    });
    const treeData = listToTree(res, { id: 'code', children: 'children', pid: 'pcode' });
    forEach(
      treeData,
      (node) => {
        if (node.children.length === 0) {
          delete node.children;
        }
      },
      { id: 'code', children: 'children', pid: 'pcode' },
    );
    return treeData;
  });
};

export const getAreasByPcode = (params?: any) => {
  return requestClient.get<any>(Api.GetAreasByPcode, params);
};

export const saveOrUpdate = (params: any) => requestClient.post<any>(Api.SaveOrUpdate, params);

export const deleteByIds = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete + '/', params);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);
