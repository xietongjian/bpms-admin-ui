import { requestClient } from '#/api/request';

enum Api {
  CountOnSiteMessage = '/flow/message/onSiteMessage/countOnSiteMessage',
  UpdateOnSiteMessageStatus = '/flow/message/onSiteMessage/updateOnSiteMessageStatus',
  PagerModelOnSiteMessage = '/flow/message/onSiteMessage/pagerModelOnSiteMessage',
  // /api/flow/query/pagerModelOnSiteMessage
}

export function updateOnSiteMessageStatus(params: any) {
  return requestClient.post<any>(Api.UpdateOnSiteMessageStatus + `/${params.id}`);
}

export function pagerModelOnSiteMessage(params: any) {
  const query = params&&{pageNum: params.pageNum, pageSize: params.pageSize};
  let entity = params||{};
  // 状态 0 未读  1 已读
  if(entity){
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = {query, entity};
  return requestClient.post(Api.PagerModelOnSiteMessage, params);
}

export function countOnSiteMessage(params: any) {
  return requestClient.post<any>(Api.CountOnSiteMessage, params);
}
