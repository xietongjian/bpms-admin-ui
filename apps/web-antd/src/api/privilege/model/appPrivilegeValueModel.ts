import { BasicFetchResult } from '#/api/model/baseModel';

export type AppPrivilegeValueParams = {
  name?: string;
  status?: string;
};

export type AppPrivilegeValueInfo = {
  id: string;
  name: string;
  position: string;
  orderNo: number;
  remark: string;
};

export interface AppPrivilegeValueListItem extends AppPrivilegeValueInfo {
  id: string;
}

export interface DeleteByIdsParams {
  appIds: [];
}

export type AppPageListGetResultModel = BasicFetchResult<AppPrivilegeValueListItem>;
