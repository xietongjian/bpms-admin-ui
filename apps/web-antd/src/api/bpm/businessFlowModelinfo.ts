import { requestClient } from '#/api/request';


enum Api {
  GetBusinessModelInfoByBusinessFlowId = '/flow/bpm/businessFlowModelinfo/getBusinessModelInfoByBusinessFlowId',
  SaveOrUpdate = '/flow/bpm/businessFlowModelinfo/saveOrUpdate',
  Delete = '/flow/bpm/businessFlowModelinfo/delete',
}

// 获取子表单列表数据
export function getBusinessModelInfoByBusinessFlowId(params: any) {
  return requestClient.get(Api.GetBusinessModelInfoByBusinessFlowId + '/' + params.businessFlowId);
}

export const saveOrUpdate = (params: any) => {
  return requestClient.post<any>(Api.SaveOrUpdate + '/' + params.businessFlowId,
      params.modelInfoIds,
    {
      responseReturn: 'body',
    },
  );
};

export const deleteByIds = (params?: Array<string>) =>
  requestClient.post<any>(Api.Delete, params, {responseReturn: 'body'});
