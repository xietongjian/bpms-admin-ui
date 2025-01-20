import { requestClient } from '#/api/request';

enum Api {
  PageList = '/flow/org/prodRole/getPagerModel',
  GetPageList = '/flow/org/role/getPagerModel',
  GetMatrixRolePageList = '/flow/matrix/companyDept/getPagerModelRole', // /getPagerModelRole/{roleType}
  PageListByPersonalId = '/flow/org/role/getPagerModelByPersonalId',
  GetPersonalsByRole = '/flow/org/role/getPersonalsByRole',
  SaveOrUpdate = '/flow/org/prodRole/saveOrUpdate',
  AddPersonalRoles = '/flow/org/role/addPersonalRoles',
  Delete = '/flow/org/prodRole/delete',
  DeleteRolePersonal = '/flow/org/role/deleteRolePersonal',
  CheckEntityExist = '/flow/org/prodRole/checkEntityExist',

  AllocationPersonals = '/flow/org/personalRole/allocationPersonals',
  SaveBatch = '/flow/org/companyRole/saveBatch',

  GetMatrixRoleList = '/flow/matrix/companyDept/getHeaderList',
}

export const getRoleListByPage = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params;
  const personalId = params.personalId;
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
    delete entity['personalId'];
  }
  const url = personalId ? Api.PageListByPersonalId + `?personalId=${personalId}` : Api.PageList;
  const queryParam = { query, entity };
  return requestClient.post<any>(url, params);
};

export const getMatrixRolePageList = (params: any) => {
  const url = Api.GetMatrixRolePageList + '/' + (params.entity.type??'-1');
  return requestClient.post<any>(url, params);
};

/**
 * 获取矩阵的角色列表，公司矩阵、部门矩阵角色
 * @param params
 */
export const getMatrixRoleList = (params: any) => {
  return requestClient.get<any>(Api.GetMatrixRoleList + '/' + params.roleType);
};

// 获取组织角色 类型（公司、部门）/组织ID
export const getAllOrgMatrixRole = (params: any) => {
  //return requestClient.post<any>({ url: Api.GetAllDeptMatrixRole+'/' + params.type + '/' + params.orgId  });
  const data = [
    {
      createTime: '2021-06-19 16:30:59',
      creator: null,
      updateTime: null,
      updator: null,
      delFlag: 0,
      keyword: null,
      id: '13',
      companyId: '3',
      positionId: null,
      name: '总经理',
      type: 0,
      sn: 'tj_zjl',
      note: null,
      orderNo: 3,
      companyName: null,
      personalId: null,
      personals: null,
    },
    {
      createTime: '2021-06-24 10:49:04',
      creator: null,
      updateTime: '2021-06-24 10:49:06',
      updator: '10100',
      delFlag: 1,
      keyword: null,
      id: '4028d8367a328b31017a3291c3ec0002',
      companyId: null,
      positionId: null,
      name: '技术总监',
      type: 0,
      sn: '222222333',
      note: '222',
      orderNo: 222,
      companyName: null,
      personalId: null,
      personals: null,
    },
    {
      createTime: '2021-05-25 20:14:19',
      creator: null,
      updateTime: null,
      updator: null,
      delFlag: 1,
      keyword: null,
      id: '12',
      companyId: '3',
      positionId: null,
      name: '总裁',
      type: 0,
      sn: 'tj_zc',
      note: null,
      orderNo: 2,
      companyName: null,
      personalId: null,
      personals: null,
    },
  ];
  return Promise.resolve(data);
};

export const getPersonalsByRole = (params: any) => {
  return requestClient.post<any>(Api.GetPersonalsByRole + '/' + params.roleId, params.personal);
};

export const saveOrUpdate = (params?: any) =>
  requestClient.post<any>(Api.SaveOrUpdate, params);

export const saveBatch = (params: any) =>
  requestClient.post(Api.SaveBatch, params);

export const addPersonalRoles = (params: any) =>
  requestClient.post<any>(Api.AddPersonalRoles + '/' + params.roleId, params.personalList);

/**
 * 给角色分配人员
 * @param params
 */
export const allocationPersonals = (params: any) =>
  requestClient.post<any>(Api.AllocationPersonals + '/' + params.roleId, params.personalList);

export const deleteByIds = (params: any) =>
  requestClient.post<any>(Api.Delete + '/' + params.id, {responseReturn: 'body'});

export const deleteRolePersonal = (params: Array<string>) =>
  requestClient.post<any>(Api.DeleteRolePersonal, params);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);
