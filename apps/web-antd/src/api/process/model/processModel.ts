export type AppInfo = {
  id: string;
  name: string;
  sn: string;
  url: string;
  indexUrl: string;
  image: string;
  note: string;
  orderNo: number;
};

export interface BaseProcessVo {
  formTitle?: string;
  taskId?: string;
  activityId?: string;
  activityName?: string;
  processStatusEnum?: string;
  userCode?: string;
  message?: string;
  commentTypeEnum?: string;
  processInstanceId?: string;
}

export interface ProcessParams {
  userCode?: string;
  appSn?: string;
  formName?: string;
  startTime?: string;
  endTime?: string;
  businessKey?: string;
  orderFlag?: string;
  processInstanceId?: string;
  startedUserIds?: string;
  processDefinitionKey?: string;
  processType?: string;
  deptId?: string;
  companyId?: string;
}

export interface ProcessInstanceResultModel {
  rows: any[];
  processInstanceId?: string;
  processDefinitionId?: string;
  processDefinitionName?: string;
  processDefinitionKey?: string;
  processDefinitionType?: string;
  processDefinitionVersion?: string;
  categoryCode?: string;
  deploymentId?: string;
  businessKey?: string;
  assignees?: string;
  appId?: string;
  appSn?: string;
  createTime?: string;
  pState?: string;
  reason?: string;
  startedUserId?: string;
  startedUserName?: string;
  startedUserIds?: any;
  startedUserDept?: string;
  startedUserDeptName?: string;
  startedUserCom?: string;
  startedUserComName?: string;
  finishFlag?: string;
  processStatus?: string;
  processStatusName?: string;
  formName?: string;
  startPersonName?: string;
  startTime?: string;
  endTime?: string;
  startTimeStr?: string;
  endTimeStr?: string;
  systemName?: string;
  businessUrl?: string;
  totalTime?: string;
  currentAssignees?: string;
  currentAssigneeNos?: string;
  queryType?: string;
  newVersion?: string;
  proInstanceIdList?: any;
  tableName?: string;
}
