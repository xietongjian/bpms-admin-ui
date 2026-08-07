import { requestClient } from '#/api/request';

enum Api {
  GetCategories = '/flow/base/category/getCategories',
  GetCategorysByLoginUser = '/flow/form/modelInfo/getCategorysByLoginUser',
}

export function getCategoriesList(params?: any) {
  return requestClient.post(Api.GetCategories, params);
}

export function getCategorysByLoginUser(params?: any) {
  return requestClient.get(Api.GetCategorysByLoginUser, params);
}
