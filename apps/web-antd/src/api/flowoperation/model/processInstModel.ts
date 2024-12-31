import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel';

export type ProcessInstParams = {
  keyword?: string;
  field?: string;
  order?: string;
};

export type ProcessInstPageParams = BasicPageParams & ProcessInstParams;

export type ProcessInst = {
  processInstanceId?: string;
  processDefinitionId?: string;
  processDefinitionName?: string;
  processDefinitionKey?: string;
  processDefinitionType?: Number;
  processDefinitionVersion?: Number;
  categoryCode?: string;
  deploymentId?: string;
  businessKey?: string;
  assignees?: string;
  appId?: string;
  appSn?: string;
  createTime?: any;
  pState?: Boolean;
  reason?: string;
  startedUserId?: string;
  startedUserName?: string;
  startedUserIds?: any;
  startedUserDept?: string;
  startedUserDeptName?: string;
  startedUserCom?: string;
  startedUserComName?: string;
  finishFlag?: Boolean;
  processStatus?: string;
  processStatusName?: string;
  formName?: string;
  startPersonName?: string;
  startTime?: any;
  endTime?: any;
  startTimeStr?: string;
  endTimeStr?: string;
  appName?: string;
  businessUrl?: string;
  totalTime?: string;
  currentAssignees?: any;
  queryType?: Number;
  newVersion?: string;
  proInstanceIdList?: any;
  tableName?: string;
};

/**
 * @description: Request list return value
 */

export type ProcessInstPageListGetResultModel = BasicFetchResult<ProcessInst>;
