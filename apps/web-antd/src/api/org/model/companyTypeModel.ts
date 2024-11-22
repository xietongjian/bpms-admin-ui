import { BasicFetchResult } from '#/api/model/baseModel';

export type CompanyTypeParams = {
  keyword?: string;
};

export type CompanyTypeInfo = {
  id: string;
  pid: string;
  cname: string;
  shortName: string;
  status: Number;
  ename: string;
  orderNo: Number;
  code: string;
  descr: string;
};

export interface CompanyTypeListItem extends CompanyTypeInfo {
  id: string;
}

/**
 * @description: Get menu interface
 */
export interface DeleteByIdsParams {
  appIds: [];
}

/**
 * @description: Request list return value
 */

export type CompanyTypeListGetResultModel = BasicFetchResult<CompanyTypeListItem>;
