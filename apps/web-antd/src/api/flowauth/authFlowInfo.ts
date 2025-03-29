import { requestClient } from '#/api/request';

enum Api {
  GetPagerModel = '/flow/auth/authFlowInfo/getPagerModel',
  SaveOrUpdate = '/flow/auth/authFlowInfo/saveOrUpdate',
  Delete = '/flow/auth/authFlowInfo/deleteById',
  CheckEntityExist = '/flow/auth/authFlowInfo/checkEntityExist',
}

export const getAuthPointListByPage = (params: any) => {
  return requestClient.post<any>(Api.GetPagerModel, params).then((res) => {
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
  requestClient.post<any>(Api.SaveOrUpdate, params, { responseReturn: 'body' });

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params: any) =>
  requestClient.get(Api.Delete + '/' + params.id, {});
