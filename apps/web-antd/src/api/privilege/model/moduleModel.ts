export type ModuleParams = {
  name?: string;
  status?: string;
};

export type ModuleInfo = {
  id: string;
  name: string;
  url: string;
  sn: string;
  status: Number;
  image: string;
  orderNo: Number;
  pid: string;
  appId: string;
  state: Number;
  component: string;
  pvs: string;
};

export interface DeleteByIdsParams {
  appIds: [];
}
