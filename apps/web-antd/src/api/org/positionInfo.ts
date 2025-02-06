import { requestClient } from '#/api/request';

import { forEach, listToTree } from '#/utils/helper/treeHelper';

enum Api {
  GetPositionInfos = '/flow/org/positionInfo/getPositionInfoTree',
  GetPositionInfoTree = '/flow/org/positionInfo/getPositionInfoTree',
  GetPagerModel = '/flow/org/positionInfo/getPagerModel',
  SaveOrUpdate = '/flow/org/positionInfo/saveOrUpdate',
  BatchSaveOrUpdatePositionSeqAndPosition = '/flow/org/positionInfo/batchSaveOrUpdatePositionSeqAndPosition',
  Delete = '/flow/org/positionInfo/delete',
  CheckEntityExist = '/flow/org/positionInfo/checkEntityExist',
}

export const getPositionInfoTree = (params?: any) => {
  const result = requestClient.post<any[]>(Api.GetPositionInfoTree, params);
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

export const getPositionInfos = (params: any) => {
  const result = requestClient.post<any>(Api.GetPositionInfos, params);

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
  return requestClient.post<any>(Api.GetPagerModel, params);
};

export const saveOrUpdate = (params: any) =>
  requestClient.post<any>(Api.SaveOrUpdate, params, {responseReturn: 'body'});

export const batchSaveOrUpdatePositionSeqAndPosition = (params?: any) =>
  requestClient.post<any>(Api.BatchSaveOrUpdatePositionSeqAndPosition, params);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteById = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete, params);
