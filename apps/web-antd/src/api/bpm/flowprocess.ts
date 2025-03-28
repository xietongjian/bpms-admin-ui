import { requestClient } from '#/api/request';

import { listToTree, forEach } from '#/utils/helper/treeHelper';

enum Api {
  GetFlowProcess = '/flow/bpm/processSystem/getProcessSystemList',
  SaveOrUpdate = '/flow/bpm/processSystem/saveOrUpdate',
  Delete = '/flow/bpm/processSystem/delete',
  CheckEntityExist = '/flow/bpm/processSystem/checkEntityExist',
  GetProSystemAndFrameworkTree = '/flow/bpm/processSystem/getProSystemAndFrameworkTree',
  GetAllParentsById = '/flow/bpm/processSystem/getAllParentsById',
}

export const getFlowProcess = (params: any) => {
  const result = requestClient.post<any>(Api.GetFlowProcess, params);
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

export const getProSystemAndFrameworkTree = (params: any) => {
  const result = requestClient.post<any>(Api.GetProSystemAndFrameworkTree, params);
  return Promise.resolve(result).then((res) => {
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
  requestClient.post<any>(Api.Delete, params, {responseReturn: 'body'});

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const getAllParentsById = (params: any) =>
  requestClient.get<any>(Api.GetAllParentsById + '/' + params.systemId);

export const getAllLevels = () => {
  const levels: any[] = [];
  for (let i = 1; i <= 15; i++) {
    levels.push({ value: i, name: i });
  }
  return Promise.resolve(levels);
};
