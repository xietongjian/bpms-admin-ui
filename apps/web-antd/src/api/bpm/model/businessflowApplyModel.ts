export interface BusinessFlowApplyParams {
  pageNum: number;
  pageSize: number;
}

export type BusinessFlowApplyInfo = {
  id: string;
  name: string;
  startActivity: string;
  endActivity: string;
  inputInfo: string;
  outputInfo: string;
  roles: number;
  activities: number;
};

export interface GetBusinessFlowItem {
  id: string;
}
