import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel';

export type AuthPointParams = BasicPageParams & {
  keyword?: string;
};

export type AuthPointPageParams = BasicPageParams & AuthPointParams;

export interface AuthPoint {
  id: string;
  name: string;
  sn: string;
  ifDefault: string;
  orderNo: string;
  remark: string;
}

export interface AuthPointListItem extends AuthPoint {}

/**
 * @description: Request list return value
 */
export type AuthPointListGetResultModel = BasicFetchResult<AuthPointListItem>;
