import { requestClient } from '#/api/request';

enum API {
  GetPagerModel = '/flow/auth/authFlowInfo/getPagerModel',
  SaveOrUpdate = '/flow/auth/authFlowInfo/saveOrUpdate',
  Delete = '/flow/auth/authFlowInfo/deleteById',
  CheckEntityExist = '/flow/auth/authFlowInfo/checkEntityExist',
}

export const getAuthPointListByPage = (params: any) => {
  return requestClient.post<any>(API.GetPagerModel, params).then((res) => {
    if (res.rows.length > 0) {
      res.rows.forEach((item) => {
        if (item.authFlowKeys) {
          item.authFlowItems = JSON.parse(item.authFlowKeys);
        }
      });
    }
    return Promise.resolve(res);
  });
};

export const saveOrUpdate = (params: any) =>
  requestClient.post<any>(API.SaveOrUpdate, params, { responseReturn: 'body' });

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(API.CheckEntityExist, params);

export const deleteByIds = (params: any) =>
  requestClient.get(API.Delete + '/' + params.id, {});
