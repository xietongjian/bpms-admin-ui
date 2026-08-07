import { requestClient } from '#/api/request';

enum Api {
  AccountPageList = '/flow/portal/account/getPagerModel',
  SaveOrUpdate = '/flow/portal/account/updateAccount',
  Delete = '/flow/portal/account/delete',
  SetPassword = '/flow/portal/account/setPwd',
}

export async function getAccountPageListApi(params: any) {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = { ...params };
  delete entity.pageNum;
  delete entity.pageSize;
  return requestClient.post(Api.AccountPageList, { query, entity });
}

export async function saveOrUpdateAccountApi(params: any) {
  return requestClient.post(Api.SaveOrUpdate, params);
}

export async function deleteAccountByIdsApi(params: string[]) {
  return requestClient.post(Api.Delete, params);
}

export async function setAccountPasswordApi(params: any) {
  return requestClient.post(Api.SetPassword, params);
}
