import { requestClient } from '#/api/request';

enum Api {
  CleanByModelKeys = '/flow/flowoperation/clear/deleteDatasByModelKey',
  SyncModel = '/flow/migrate/deModel',
  CleanByBizKeys = '/flow/flowoperation/clear/deleteDataByBusinessKey',
  CleanByProcInstIds = '/flow/flowoperation/clear/deleteDataByProcInstId',
  DeleteModelByModelKey = '/flow/flowoperation/clear/deleteModelByModelKey',
}

/**
 * 根据modelKey进行清理 - modelKeys
 */
export const cleanByModelKeys = (params: any) => {
  return requestClient.post<any>(Api.CleanByModelKeys + '/' + params.modelKeys, { },
    { isTransformResponse: false },
  );
};

/**
 * 同步模型
 * @param params
 */
export const syncModel = (params: any) => {
  return requestClient.post<any>(Api.SyncModel + '/' + params.modelType, { },
    { isTransformResponse: false },
  );
};

/**
 * 根据bizKey进行清理 - bizKeys
 */
export const cleanByBizKeys = (params: any) => {
  return requestClient.post<any>(Api.CleanByBizKeys + '/' + params.bizKeys,{ },
    { isTransformResponse: false },
  );
};

/**
 * 根据procInstId进行清理 - procInstIds
 */
export const cleanByProcInstIds = (params: any) => {
  return requestClient.post<any>(Api.CleanByProcInstIds + '/' + params.procInstIds, { },
    { isTransformResponse: false },
  );
};

/**
 * 根据modelKey删除模板
 */
export const deleteModelByModelKey = (params: any) => {
  return requestClient.post<any>(Api.DeleteModelByModelKey + '/' + params.modelKey,{ },
    { isTransformResponse: false },
  );
};
