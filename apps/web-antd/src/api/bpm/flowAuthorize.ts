import { requestClient } from '#/api/request';


enum Api {
  SaveOrUpdate = '/flow/bpm/flowAuthorize/saveOrUpdate',
  GetFlowAuthorizeByBusinessFlowId = '/flow/bpm/flowAuthorize/getFlowAuthorizeByBusinessFlowId',
}

export const saveOrUpdate = (params: any) =>
  requestClient.post<any>(Api.SaveOrUpdate + '/' + params.businessFlowId,
      params.flowAuthorizes, {responseReturn: 'body'});

export const getFlowAuthorizeByBusinessFlowId = (params: any) =>
  requestClient.get<any>(Api.GetFlowAuthorizeByBusinessFlowId + '/' + params.businessFlowId);
