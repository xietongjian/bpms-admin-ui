import { requestClient } from '#/api/request';
import { listToTree } from '#/utils/helper/treeHelper';

enum Api {
  GetApps = '/flow/base/app/getApps',
  GetCompanyTree = '/flow/org/company/getCompanyTree',
  GetOrgTree = '/flow/org/department/getOrgTree',
  GetPersonalPagerModel = '/flow/org/personal/getPagerModel',
  SaveOrUpdateDataACLsByGroupId = '/flow/privilege/dataAcl/saveOrUpdateDataACLsByGroupId',
  GetDataAclByGroupId = '/flow/privilege/dataAcl/getDataAclVoByGroupId',
}

export const getApps = () => {
  return requestClient.post(Api.GetApps, {})
};

export const getCompanyTree = () => {
  return requestClient.get(Api.GetCompanyTree)
};

export const getOrgTree = () => {
  const result: any = requestClient.get(Api.GetOrgTree)
  return Promise.resolve(result).then((res: any) => listToTree(res, { id: 'id', children: 'children', pid: 'pid' }));
};

export const getPersonalPagerModel = (params) => {
  const { pageNum, pageSize, ...oParams } = params
  return requestClient.post(Api.GetPersonalPagerModel, { query: { pageNum, pageSize }, entity: oParams })
};

export const saveDataAcl = (params) => {
  return requestClient.post(Api.SaveOrUpdateDataACLsByGroupId + '/' + params[0].groupId, params)
};

export const getDataAclByGroupId = (params) => {
  return requestClient.get(Api.GetDataAclByGroupId + '/' + params.groupId)
};
