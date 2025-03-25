import { requestClient } from '#/api/request';

// import { CheckExistParams } from '@/api/model/baseModel';
import { Base64 } from 'js-base64';
enum Api {
  BusinessFlowApplyPageList = '/flow/bpm/businessFlowApply/getPagerModel',
  SaveOrUpdate = '/flow/bpm/businessFlow/saveOrUpdate',
  SubmitProcess = '/flow/bpm/businessFlow/submitProcess',
  PublishProcess = '/flow/bpm/businessFlow/publishBusinessFlowById',
  Delete = '/flow/bpm/businessFlowApply/delete',
  GetById = '/flow/bpm/businessFlowApply/getById',
  GetBusinessFlowById = '/flow/bpm/businessFlow/getBusinessFlowById',
  GetLastBusinessFlowApplyByBusinessFlowId = '/flow/bpm/businessFlowApply/getLastBusinessFlowApplyByBusinessFlowId',
  GetBusinessFlowApplyByFrameworkId = '/flow/bpm/businessFlowApply/getBusinessFlowApplyByFrameworkId',
  CheckEntityExist = '/flow/bpm/businessFlowApply/checkEntityExist',
  GetBusinessFlowApplyByParams = '/flow/bpm/businessFlowApply/getBusinessFlowApplyByParams',
  GetBusinessFlowApplyDetailById = '/flow/bpm/businessFlowApply/getBusinessFlowApplyDetailById',
}

// 获取表单列表
export function getBusinessFlowApplyByParams(params: any) {
  return requestClient.get(Api.GetBusinessFlowApplyByParams + '/' + params.businessFlowId);
}

export const getBusinessFlowApplyListByPage = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
  return requestClient.post<any>(Api.BusinessFlowApplyPageList, params);
};

export const getById = (params: any) => requestClient.get<any>(Api.GetById + '/' + params.id);

export const getBusinessFlowById = (params: any) =>
  requestClient.get<any>(Api.GetBusinessFlowById + '/' + params.id);

export const getByFlowId = (params: any) =>
  requestClient.get<any>(Api.GetLastBusinessFlowApplyByBusinessFlowId + '/' + params.id);

/**
 * 通过架构ID得到所有父架构及体系和父体系
 * @param params
 */
export const getBusinessFlowApplyByFrameworkId = (params: any) =>
  requestClient.get<any>(Api.GetBusinessFlowApplyByFrameworkId + '/' + params.frameworkId);

export const saveOrUpdate = (params: any) => {
  // 将html/xml内容进行转成Base64编码传入后端 - 避免xss防攻击拦截
  params.diagramsInfoXml = Base64.encode(params.diagramsInfoXml);
  return requestClient.post<any>(Api.SaveOrUpdate, params, { responseReturn: 'body' });
};

export const submitProcess = (params: any) => {
  return requestClient.post<any>(Api.SubmitProcess, params, { responseReturn: 'body' });
};

export const publishProcess = (params: any) => {
  return requestClient.post<any>(
    { url: Api.PublishProcess + '/' + params.id },
    { responseReturn: 'body' },
  );
};

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete, params);

export const getBusinessFlowApplyDetailById = (params: any) =>
  requestClient.get<any>(Api.GetBusinessFlowApplyDetailById + '/' + params.id);
