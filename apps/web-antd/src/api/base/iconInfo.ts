import { requestClient } from '#/api/request';
import {listToTree} from "#/utils/helper/treeHelper";

enum Api {
  GetIconCategoryListData = '/flow/privilege/iconCategory/getAll',
  GetIconInfoListData = '/flow/privilege/iconInfo/getAll',
  IconInfoPageList = '/flow/privilege/iconInfo/getPagerModel',
  SaveOrUpdateIconInfo = '/flow/privilege/iconInfo/saveOrUpdate',
  SaveOrUpdateIconCategory = '/flow/privilege/iconCategory/saveOrUpdate',
  DeleteIconCategoryById = '/flow/privilege/iconCategory/delete',
  DeleteIconInfoById = '/flow/privilege/iconInfo/delete',
  CheckEntityExist = '/flow/base/app/checkEntityExist',

}

export const getIconInfoListByPage = (params: any) => {
/*
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
*/

  return requestClient.post(Api.IconInfoPageList, params);
};

export async function checkEntityExist(params: any) {
  return requestClient.post<any>(Api.CheckEntityExist, params);
}

export const getIconInfoTreeData = async (params: any) => {
  const apiCategoryList = await getIconCategoryListData();
  const IconInfoList = await getIconInfoListData();

  apiCategoryList.forEach((item) => {
    item.title = item.name;
    item.type = 'category';
  });
  IconInfoList.forEach((item) => {
    item.pid = item.categoryId;
    item.title = item.name;
    item.type = 'api';
  });
  const result = [...apiCategoryList, ...IconInfoList];

  return Promise.resolve(result);
};

export const getIconCategoryListData = () => {
  return requestClient.post(Api.GetIconCategoryListData, {});
};

export const getIconInfoListData = () => {
  return requestClient.post(Api.GetIconInfoListData, {});
};

export const getIconCategoryTreeData = () => {
  return getIconCategoryListData().then((res) => {
    const treeData = listToTree(res);
    return Promise.resolve(treeData);
  });
};

export const saveOrUpdateIconInfo = (params: any) =>
  requestClient.post(Api.SaveOrUpdateIconInfo, params, { isTransformResponse: false });

export const saveOrUpdateIconCategory = (params: any) =>
  requestClient.post(Api.SaveOrUpdateIconCategory, params, { isTransformResponse: false });

export const deleteIconCategoryById = (id: any) =>
  requestClient.post(Api.DeleteIconCategoryById, [id], { isTransformResponse: false });

export const deleteIconInfoById = (id: any) =>
  requestClient.post(Api.DeleteIconInfoById, [id], { isTransformResponse: false });
