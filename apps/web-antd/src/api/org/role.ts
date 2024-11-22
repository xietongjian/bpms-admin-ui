import {
  RoleInfo,
  RolePageListGetResultModel,
  RolePageParams,
  PersonalByRoleParams,
  AddCompanyRoleVo,
} from './model/roleModel';
import { BasicPageSearchParams, CheckExistParams } from '#/api/model/baseModel';

import { defHttp } from '@/utils/http/axios';
import { PersonalInfo } from '#/api/org/model/personalModel';
import { PersonalRoleParams } from '#/api/org/model/personalRoleModel';

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

export const getRoleListByPage = (params: RolePageParams) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params;
  const personalId = params.personalId;
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
    delete entity['personalId'];
  }
  const url = personalId ? Api.PageListByPersonalId + `?personalId=${personalId}` : Api.PageList;
  const queryParam = { query, entity } as BasicPageSearchParams<RolePageParams>;
  return defHttp.post<RolePageListGetResultModel>({ url, params: queryParam });
};

export const getMatrixRolePageList = (params: RolePageParams) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params;
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const url = Api.GetMatrixRolePageList + '/' + params.type;
  const queryParam = { query, entity } as BasicPageSearchParams<RolePageParams>;
  return defHttp.post<RolePageListGetResultModel>({ url, params: queryParam });
};

/**
 * 获取矩阵的角色列表，公司矩阵、部门矩阵角色
 * @param params
 */
export const getMatrixRoleList = (params: any) => {
  return defHttp.get<any>({ url: Api.GetMatrixRoleList + '/' + params.roleType });
};

// 获取组织角色 类型（公司、部门）/组织ID
export const getAllOrgMatrixRole = (params: any) => {
  //return defHttp.post<any>({ url: Api.GetAllDeptMatrixRole+'/' + params.type + '/' + params.orgId  });
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

export const getPersonalsByRole = (params: PersonalByRoleParams) => {
  return defHttp.post<PersonalInfo>({
    url: Api.GetPersonalsByRole + '/' + params.roleId,
    params: params.personal,
  });
};

export const saveOrUpdate = (params?: RoleInfo) =>
  defHttp.post<RoleInfo>({ url: Api.SaveOrUpdate, params });

export const saveBatch = (params?: AddCompanyRoleVo) =>
  defHttp.post({ url: Api.SaveBatch, params });

export const addPersonalRoles = (params?: RoleInfo) =>
  defHttp.post<RoleInfo>({
    url: Api.AddPersonalRoles + '/' + params.roleId,
    params: params.personalList,
  });

/**
 * 给角色分配人员
 * @param params
 */
export const allocationPersonals = (params: PersonalRoleParams) =>
  defHttp.post<RoleInfo>({
    url: Api.AllocationPersonals + '/' + params.roleId,
    params: params.personalList,
  });

export const deleteByIds = (params: any) =>
  defHttp.post<RoleInfo>({ url: Api.Delete + '/' + params.id });

export const deleteRolePersonal = (params?: Array<string>) =>
  defHttp.post<RoleInfo>({ url: Api.DeleteRolePersonal, params });

export const checkEntityExist = (params?: CheckExistParams) =>
  defHttp.post<boolean>({ url: Api.CheckEntityExist, params });
