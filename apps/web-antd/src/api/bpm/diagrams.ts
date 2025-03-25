import { requestClient } from '#/api/request';


enum Api {
  SaveOrUpdate = '/flow/bpm/diagrams/saveOrUpdate',
  GetByMainId = '/flow/bpm/diagrams/getXmlByteByMainId',
  Delete = '/flow/bpm/framework/delete',
}

export const saveOrUpdate = (params: any) =>
  requestClient.post<any>(Api.SaveOrUpdate, params, { responseReturn: 'body' });

export const getXmlByteByMainId = (params: any) =>
  requestClient.get<any>(Api.GetByMainId + '/' + params.mainId);
