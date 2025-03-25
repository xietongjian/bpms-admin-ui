export type GetFrameworkParams = {
  keyword?: string;
};

export type GetFramework = {
  id: string;
  pid: string;
  name: string;
  level: string;
  code: string;
  descr: string;
  nextProcess: string;
  objective: string;
  inputInfo: string;
  outputInfo: string;
  processStart: string;
  processEnd: string;
  processKpi: string;
};

export interface GetFrameworkItem extends GetFramework {
  id: string;
}
