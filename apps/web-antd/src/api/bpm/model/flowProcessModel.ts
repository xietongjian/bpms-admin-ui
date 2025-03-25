export type GetFlowProcessParams = {
  keyword?: string;
};

export type GetFlowProcess = {
  id: string;
  pid: string;
  name: string;
  descr: string;
};

export interface GetFlowProcessItem extends GetFlowProcess {
  id: string;
}
