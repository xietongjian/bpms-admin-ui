import { requestClient } from '#/api/request';
import { forEach, listToTree } from '#/utils/helper/treeHelper';

enum Api {
  // 获取目标分类
  GetSyncCategories = '/flow/flowoperation/copytoprod/getSyncCategories',
  CopyCustomProcess = '/flow/flowoperation/copytoprod/copyCustomProcess',
  CopyCustomTaskProcess = '/flow/flowoperation/copytoprod/copyCustomTaskProcess',
  CopyBizProcess = '/flow/flowoperation/copytoprod/copyBizProcess',
  GetEnv = '/flow/flowoperation/copytoprod/getEnv',
  GetModelInfoByModelKey = '/flow/flowoperation/copytoprod/getModelInfoByModelKey',
}

/**
 * 查询目标数据库分类
 */
export const getSyncCategories = () => {
  const result = requestClient.post<any>(Api.GetSyncCategories, {});
  return Promise.resolve(result).then((res: any) => {
    res.forEach((item) => {
      item.key = item.id;
      item.label = item.name;
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

/**
 * 获取当前环境变量
 */
export const getEnv = () => {
  return requestClient.get<any>(Api.GetEnv);
};

export const copyCustomProcess = (params: any) => {
  return requestClient.post<any>(Api.CopyCustomProcess, params,
    { responseReturn: 'body' },
  );
};

export const copyCustomTaskProcess = (params: any) => {
  return requestClient.post<any>(Api.CopyCustomTaskProcess, params,
    { isReturnNativeResponse: true },
  );
};

export const copyBizProcess = (params: any) => {
  return requestClient.post<any>(Api.CopyBizProcess, params, { responseReturn: 'body' });
};

/**
 * 通过ModelKey获取目标数据库的流程模板
 */
export const getModelInfoByModelKey = (params: any) => {
  return requestClient.get<any>(Api.GetModelInfoByModelKey + '/' + params.modelKey);
};
