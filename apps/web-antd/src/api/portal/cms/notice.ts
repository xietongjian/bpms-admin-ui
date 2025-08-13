import { requestClient } from '#/api/request';
// import { humpToLine } from '@/utils';
import { Base64 } from 'js-base64';

enum Api {
  NoticePageList = '/flow/portal/cms/notice/getPagerModel',
  GetNoticeById = '/flow/portal/cms/notice/getById',
  Insert = '/flow/portal/cms/notice/insert',
  Update = '/flow/portal/cms/notice/update',
  Publish = '/flow/portal/cms/notice/publish',
  Delete = '/flow/portal/cms/notice/delete',
  CheckEntityExist = '/flow/base/app/checkEntityExist',
  NoticeList = '/flow/portal/cms/notice/list',
  GetSigner = '/flow/portal/cms/notice/getSigner',
  Sync = '/flow/portal/cms/notice/sync',
}

export const getAllNotice = (params: any) => {
  return requestClient.post(Api.NoticeList, params).then((res: any) => {
    return Promise.resolve(res);
  });
};

export const getNoticeById = (params: any) => {
  return requestClient.get(Api.GetNoticeById + `/${params.id}`).then((res: any) => {
    return Promise.resolve(res);
  });
};
// 获取签发人
export const getSigner = (params: any) => {
  return requestClient.post(Api.GetSigner, params);
};

export const getNoticeListByPage = (params: any) => {
  return requestClient.post(Api.NoticePageList, params);
};

export const insert = (params: any) => {
  // 将html/xml内容进行转成Base64编码传入后端 - 避免xss防攻击拦截
  params.content = Base64.encode(params.content);
  return requestClient.post(Api.Insert, params, { responseReturn: 'body' });
};

export const update = (params: any) =>
  requestClient.post(Api.Update, params, { responseReturn: 'body' });

export const publish = (params: any) =>
  requestClient.post(Api.Publish, params, { responseReturn: 'body' });

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params: Array<string>) => requestClient.delete(Api.Delete, {params, responseReturn: 'body'});

export const SyncNotice = () => requestClient.post(Api.Sync );
