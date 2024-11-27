import { requestClient } from '#/api/request';

import { forEach, listToTree } from '#/utils/helper/treeHelper';

enum Api {
  Getanys = '/flow/org/positionInfo/getanyTree',
  GetanyTree = '/flow/org/positionInfo/getanyTree',
  GetPagerModel = '/flow/org/positionInfo/getPagerModel',
  SaveOrUpdate = '/flow/org/positionInfo/saveOrUpdate',
  BatchSaveOrUpdatePositionSeqAndPosition = '/flow/org/positionInfo/batchSaveOrUpdatePositionSeqAndPosition',
  Delete = '/flow/org/positionInfo/delete',
  CheckEntityExist = '/flow/org/positionInfo/checkEntityExist',
}

export const getanyTree = (params?: any) => {
  const result = requestClient.post<any[]>(Api.GetanyTree, params);
  return Promise.resolve(result).then((res: any) => {
    res.forEach((item) => {
      item.key = item.id;
      item.value = item.id;
      item.title = `${item.name} (${item.code})`;
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

export const getanys = (params: any) => {
  const result = requestClient.post<any>(Api.Getanys, params);

  return Promise.resolve(result)
    .then((res) => {
      // const treeData = listToTree(res, {id: 'id', children: 'children', pid: 'pid'});
      // forEach(treeData, (node) => {
      //   node['key'] = node.id;
      //   if (node.children.length === 0) {
      //     delete node.children;
      //   }
      // }, {id: 'id', children: 'children', pid: 'pid'});
      return res;
    })
    .catch((res) => {
      return Promise.reject('获取数据异常');
    });
};

export const getPagerModel = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
  return requestClient.post<any>(Api.GetPagerModel, params);
};

export const saveOrUpdate = (params: any) =>
  requestClient.post<any>(Api.SaveOrUpdate, params);

export const batchSaveOrUpdatePositionSeqAndPosition = (params?: any) =>
  requestClient.post<any>(Api.BatchSaveOrUpdatePositionSeqAndPosition, params);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteById = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete, params);
