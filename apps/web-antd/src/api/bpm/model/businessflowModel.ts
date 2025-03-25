export type GetBusinessFlow = {
  id: string;
  pid: string;
  name: string;
  startActivity: string;
  endActivity: string;
  inputInfo: string;
  outputInfo: string;
  roles: number;
  activities: number;
};

export interface BusinessFlowParams {
  pageNum: number;
  pageSize: number;
  frameworkId: string;
}

export interface GetBusinessFlowItem extends GetBusinessFlow {
  id: string;
}

export type BusinessFlowDetail = {
  id: string;
  name: string;
  processSystemName: string;
  frameworkName: string;
  ownerName: string;
  status: number;
  endActivity: string;
  inputInfo: string;
  outputInfo: string;
  roles: number;
  activities: number;
};
