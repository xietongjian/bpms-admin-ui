import { requestClient } from '#/api/request';

import { forEach, listToTree } from '#/utils/helper/treeHelper';

enum Api {
  PageList = '/flow/org/companyRole/getRoles',
  GetRolesByCompanyId = '/flow/org/companyRole/getRolesByCompanyId',
  SaveOrUpdate = '/flow/org/roleScope/saveBatch',
  GetPersonalsByRoleIdAndOrgId = '/flow/org/roleScope/getPersonalsByRoleIdAndOrgId',
  AddPersonalRoles = '/flow/org/role/addPersonalRoles',
  Delete = '/flow/org/role/delete',
  DeleteById = '/flow/org/roleScope/deleteById',
  DeleteRolePersonal = '/flow/org/role/deleteRolePersonal',
  CheckEntityExist = '/flow/org/role/checkEntityExist',

  AllocationPersonals = '/flow/org/personalRole/allocationPersonals',

  GetDeptList = '/flow/matrix/companyDept/getDeptList',
  GetCompanyList = '/flow/matrix/companyDept/getCompanyList',
  // 保存矩阵角色里面的人员
  SaveOrUpdateRoleScope = '/flow/matrix/companyDept/saveOrUpdateRoleScope',
  // 删除矩阵角色里面的人员
  DeleteMatrixPersonalById = '/flow/org/roleScope/deleteById',
  GetMatrixPersonal = '/flow/matrix/companyDept/getRoleSocpesByOrgIdAndRoleId',
}

// 获取部门矩阵数据
export const getDeptMatrixList = async (params: any) => {
  const result = requestClient.post<any>(Api.GetDeptList, params);
  return Promise.resolve(result).then((res) => {
    const treeData = listToTree(res, { id: 'id', children: 'children', pid: 'pid' });
    forEach(
      treeData,
      (node) => {
        if (node.children.length === 0) {
          delete node.children;
        }
      },
      { id: 'id', children: 'children', pid: 'pid' },
    );
    return treeData;
  });
};

// 获取公司矩阵数据
export const getCompanyMatrixList = async (params: any) => {
  delete params['roleKeyword'];
  const result = requestClient.post<any>(Api.GetCompanyList, params);
  return Promise.resolve(result).then((res) => {
    const treeData = listToTree(res, { id: 'id', children: 'children', pid: 'pid' });
    forEach(
      treeData,
      (node) => {
        if (node.children.length === 0) {
          delete node.children;
        }
      },
      { id: 'id', children: 'children', pid: 'pid' },
    );
    return treeData;
  });
};

export const getRoleListByPage = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params;
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
    delete entity['personalId'];
  }
  const queryParam = { query, entity };
  return requestClient.post<any>(Api.PageList, params);
};

// 通过组织获取该组织下的角色及角色下的人员数据
export const getRolesByCompanyId = (params: any) => {
  return requestClient.get(Api.GetRolesByCompanyId + '/' + params.companyId);
};

export const getPersonalsByRoleIdAndOrgId = (params: any) => {
  return requestClient.get(Api.GetPersonalsByRoleIdAndOrgId + '/' + params.orgId + '/' + params.roleId);
};

export const getMatrixPersonal = (params: any) => {
  return requestClient.post(Api.GetMatrixPersonal, params);
};

export const saveOrUpdate = (params: any) =>
  requestClient.post<any>(Api.SaveOrUpdate, params, { isReturnNativeResponse: true });

export const saveOrUpdateRoleScope = (params: any) =>
  requestClient.post<any>(Api.SaveOrUpdateRoleScope, params,
    { isReturnNativeResponse: true },
  );

export const addPersonalRoles = (params: any) =>
  requestClient.post<any>(Api.AddPersonalRoles + '/' + params.roleId,
    params.personalList);

/**
 * 给角色分配人员
 * @param params
 */
export const allocationPersonals = (params: any) =>
  requestClient.post<any>(Api.AllocationPersonals + '/' + params.roleId,
    params.personalList);

export const deleteByIds = (params?: Array<string>) =>
  requestClient.post<any>(Api.Delete, params);

export const deleteById = (id: string) => requestClient.post(Api.DeleteById + '/' + id, {});

export const deleteMatrixPersonalById = (params: any) =>
  requestClient.post(Api.DeleteMatrixPersonalById + '/' + params.id,
    { isReturnNativeResponse: true },
  );

export const deleteRolePersonal = (params: any) =>
  requestClient.post<any>(Api.DeleteRolePersonal + '/' + params.id);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);
