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

export const getAllBanner = (params: any) => {
  return requestClient.post(Api.BannerList, params).then((res: any) => {
    return Promise.resolve(res);
  });
};

export const getBannerListByPage = (params: any) => {
  return requestClient.post(Api.BannerPageList, params);
};

export const insert = (params: any) => requestClient.post(Api.Insert, params, {responseReturn: 'body'});

export const update = (params: any) => requestClient.post(Api.Update, params, {responseReturn: 'body'});

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params?: Array<string>) => requestClient.delete(Api.Delete, {params, responseReturn: 'body'});
