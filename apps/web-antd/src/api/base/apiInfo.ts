import { requestClient } from '#/api/request';
import {listToTree} from "#/utils/helper/treeHelper";
import axios from 'axios';

enum Api {
  GetApiCategoryListData = '/flow/simulate/apiCategory/getAll',
  GetApiInfoListData = '/flow/simulate/apiInfo/getAll',
  ApiInfoPageList = '/flow/simulate/apiInfo/getPagerModel',
  SaveOrUpdateApiInfo = '/flow/simulate/apiInfo/saveOrUpdate',
  SaveOrUpdateApiCategory = '/flow/simulate/apiCategory/saveOrUpdate',
  DeleteApiCategoryById = '/flow/simulate/apiCategory/delete',
  DeleteApiInfoById = '/flow/simulate/apiInfo/delete',
}

export const apiTesting = (params: any) => {
  const headers = {
    'Accept': 'application/json, text/plain, */*',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    ...params.headers
  }
  const reqConfig = {
    url: params.url,
    headers,
    method: params.method,
    data: params.requestBody,
    params: params.params,
    timeout: 10000,
  };
  if(/^http/.test(params.url)){
    return axios.request(reqConfig);
  }
  return requestClient.request(params.url, reqConfig);
};

export const getApiInfoListByPage = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };

  return requestClient.post(Api.ApiInfoPageList, params);
};

export const getApiInfoTreeData = async (params: any) => {
  const apiCategoryList= await getApiCategoryListData();
  const apiInfoList = await getApiInfoListData();

  apiCategoryList.forEach(item => {
    item.title = item.name;
    item.type = 'category';
  })
  apiInfoList.forEach(item => {
    item.pid = item.categoryId;
    item.title = item.name;
    item.type = 'api';
  });
  const result = [...apiCategoryList, ...apiInfoList];

  return Promise.resolve(result);
};

export const getApiCategoryListData = () => {
  return requestClient.post(Api.GetApiCategoryListData, {});
};


export const getApiInfoListData = () => {
  return requestClient.post(Api.GetApiInfoListData, {});
}

export const getApiCategoryTreeData = () => {
  return getApiCategoryListData().then(res => {
    const treeData = listToTree(res);
    return Promise.resolve(treeData);
  });
}

export const saveOrUpdateApiInfo = (params: any) => requestClient.post(Api.SaveOrUpdateApiInfo, params, {isTransformResponse: false});

export const saveOrUpdateApiCategory = (params: any) => requestClient.post(Api.SaveOrUpdateApiCategory, params, {isTransformResponse: false});

export const deleteApiCategoryById = (id: any) => requestClient.post(Api.DeleteApiCategoryById, [id], {isTransformResponse: false});

export const deleteApiInfoById = (id: any) => requestClient.post(Api.DeleteApiInfoById, [id], {isTransformResponse: false});
