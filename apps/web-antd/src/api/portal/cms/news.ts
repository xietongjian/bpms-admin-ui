import { requestClient } from '#/api/request';
import { Base64 } from 'js-base64';

enum Api {
  NewsPageList = '/flow/portal/cms/news/getPagerModel',
  GetNewsById = '/flow/portal/cms/news/getById',
  Insert = '/flow/portal/cms/news/insert',
  Update = '/flow/portal/cms/news/update',
  Publish = '/flow/portal/cms/news/publish',
  Delete = '/flow/portal/cms/news/delete',
  CheckEntityExist = '/flow/base/app/checkEntityExist',
  NewsList = '/flow/portal/cms/news/list',
  GetPublishStatus = '/flow/portal/cms/news/getPublishStatus',
}

export const getAllNews = (params) => {
  return requestClient.post(Api.NewsList, params).then((res: any) => {
    return Promise.resolve(res);
  });
};

export const getNewsById = (params) => {
  return requestClient.get(Api.GetNewsById + `/${params.id}`).then((res: any) => {
    return Promise.resolve(res);
  });
};

export const getNewsListByPage = (params) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
  return requestClient.post(Api.NewsPageList, params);
};

export const insert = (params) => {
  // 将html/xml内容进行转成Base64编码传入后端 - 避免xss防攻击拦截
  params.content = Base64.encode(params.content);
  return requestClient.post(Api.Insert, params);
};

export const publish = (params) =>
  requestClient.post(Api.Publish + '/' + params.id, {}, { responseReturn: 'body' });

export const update = (params) => {
  // 将html/xml内容进行转成Base64编码传入后端 - 避免xss防攻击拦截
  params.content = Base64.encode(params.content);
  return requestClient.post(Api.Update, params);
};

export const checkEntityExist = (params) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params?: Array<string>) => requestClient.post(Api.Delete, params);

export const getPublishStatus = () => requestClient.get(Api.GetPublishStatus);
