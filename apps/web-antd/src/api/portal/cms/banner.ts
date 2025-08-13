import { requestClient } from '#/api/request';


enum Api {
  BannerPageList = '/flow/portal/cms/banner/getPagerModel',
  Insert = '/flow/portal/cms/banner/insert',
  Update = '/flow/portal/cms/banner/update',
  Delete = '/flow/portal/cms/banner/delete',
  CheckEntityExist = '/flow/base/app/checkEntityExist',
  BannerList = '/flow/portal/cms/banner/list',
  GetBannerListByCount = '/flow/portal/cms/banner/getBannerList',
}

/**
 * 通过登录人的数据权限-获取Banner
 * params: {boardSn: '', count 4}
 */
export function getBannerListByCount(params = {}) {
  return requestClient.post<any>(Api.GetBannerListByCount, params);
}

export const getAllBanner = (params) => {
  return requestClient.post(Api.BannerList, params).then((res: any) => {
    return Promise.resolve(res);
  });
};

export const getBannerListByPage = (params) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
  return requestClient.post(Api.BannerPageList, params);
};

export const insert = (params) => requestClient.post(Api.Insert, params);

export const update = (params) => requestClient.post(Api.Update, params);

export const checkEntityExist = (params) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params?: Array<string>) => requestClient.delete(Api.Delete, {params, responseReturn: 'body'});
