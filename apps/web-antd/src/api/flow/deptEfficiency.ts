import { requestClient } from '#/api/request';

// 流程效率-企业效率
export async function assigneeProcessEfficiencyApi(data: any) {
  return requestClient.post('/flow/deptEfficiency/assigneeProcessEfficiency', data);
}

// 流程效率-部门流程效率
export async function deptProcessEfficiencyApi(data: any) {
  return requestClient.post('/flow/deptEfficiency/deptProcessEfficiency', data);
}

// 流程效率-部门流程效率前10
export async function processEfficiencyTop10Api(data: any) {
  return requestClient.post('/flow/deptEfficiency/processEfficiencyTop10', data);
}

// 流程效率-流程时效监控节点
export async function deptEfficiencyNodeApi(data: any) {
  return requestClient.post('/flow/deptEfficiency/nodeEfficiency', data);
}

// 流程效率-质量
export async function deptQualityApi(data: any) {
  return requestClient.post('/flow/deptEfficiency/quality', data);
}

// 流程工作量排名
export async function deptProcessVolumeApi(data: any) {
  return requestClient.post('/flow/deptEfficiency/deptProcessVolume', data);
}
