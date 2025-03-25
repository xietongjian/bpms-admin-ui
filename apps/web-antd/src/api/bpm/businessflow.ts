import { requestClient } from '#/api/request';

import { processTreeNodes } from '#/utils/helper/treeHelper';
import {Base64} from "js-base64";

enum Api {
  GetBusinessFlowListByPage = '/flow/bpm/businessFlow/getPagerModel',
  SaveOrUpdate = '/flow/bpm/businessFlow/saveOrUpdate',
  DeleteBusinessFlow = '/flow/bpm/businessFlow/deleteBusinessFlowById',
  CheckEntityExist = '/flow/bpm/businessFlow/checkEntityExist',
  Delete = '/flow/bpm/businessFlow/delete',
  GetBusinessFlowDetailById = '/flow/bpm/businessFlow/getBusinessFlowById',
  GetLeftTreeNodes = '/flow/bpm/framework/getFrameworkList',
  GetOneTwoLeftTreeNodes = '/flow/bpm/framework/getOneTwoLeftTreeNodes',
  GetChildrenTreeNodes = '/flow/bpm/framework/getChildrenTreeNodeAndBusinessFlowsByPid',
  GetChildrenBusinessFlow = '/flow/bpm/framework/getBfsByFrameworkId',
  GetChildrenBpmnFlow = '/flow/bpm/businessFlowModelinfo/getbfmsByBusinessFlowId',
  MoveBusinessFlowToFrame = '/flow/bpm/businessFlow/updateFrameworkIdById',

  GetBusinessFlowBandTreeNodes = '/flow/bpm/businessFlowModelinfo/getLeftTree',
  GetBusinessFlowTreeNodes = '/flow/bpm/businessFlow/getLeftTreeNodes',
  GetBpmnFlowById = '/flow/bpm/businessFlowModelinfo/getModelInfoById',
}

// 体系架构树
export const getLeftTreeNodes = async () => {
  const res = await requestClient.get<any>(Api.GetLeftTreeNodes);
  return processTreeNodes(res);
};
// 体系架构树（一级和二级）
export const getOneTwoLeftTreeNodes = async () => {
  const res = await requestClient.get<any>(Api.GetOneTwoLeftTreeNodes);
  const treeData = processTreeNodes(res, 'parentId');
  for (const treeDatum of treeData) {
    if (!treeDatum.children?.length) {
      treeDatum.isLeaf = true;
    }
  }
  return treeData;
};
// 体系架构树（三级及其他子级, 以及业务流程）
export const getChildrenTreeNodes = async (type, pid) => {
  const url = `${Api.GetChildrenTreeNodes}/${type}/${pid}`;
  return requestClient.get<any>(url);
};
// 体系架构树绑定的下级业务流程模型
export const getChildrenBusinessFlow = async (frameworkId) => {
  const url = Api.GetChildrenBusinessFlow + '/' + frameworkId;
  return requestClient.get<any>(url);
};
// 体系架构树下级业务流程模型绑定的具体bpmn流程
export const getChildrenBpmnFlow = async (businessFlowId) => {
  const url = Api.GetChildrenBpmnFlow + '/' + businessFlowId;
  return requestClient.get<any>(url);
};

// 移动业务流程
export const moveBusinessFlowToFrame = async (pid, id) => {
  const url = `${Api.MoveBusinessFlowToFrame}/${pid}/${id}`;
  return requestClient.post<any>(url);
};

// 业务流程树
export const getBusinessFlowTreeNodes = async () => {
  const res = await requestClient.get<any>(Api.GetBusinessFlowTreeNodes);
  return processTreeNodes(res, 'parentId');
};

// 关联流程树
export const getBusinessFlowBandTreeNodes = async () => {
  const res = await requestClient.get<any>(Api.GetBusinessFlowBandTreeNodes);
  return processTreeNodes(res, 'parentId');
};

// 关联的 bpmn 流程内容
export const getBpmnFlowById = async (id) => {
  return requestClient.get<any>(Api.GetBpmnFlowById + '/' + id);
};

export const getBusinessFlowListByPage = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
  return requestClient.post<any>(Api.GetBusinessFlowListByPage, params);
};

export const saveOrUpdate = (params: any) => {
  // 将html/xml内容进行转成Base64编码传入后端 - 避免xss防攻击拦截
  params.diagramsInfoXml = Base64.encode(params.diagramsInfoXml);
  return requestClient.post<any>(Api.SaveOrUpdate, params, {responseReturn: 'body'});
};

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params: Array<string>) =>
  requestClient.post<any>(Api.Delete, params);

export const deleteBusinessFlowById = (params: any) =>
  requestClient.post<any>(Api.DeleteBusinessFlow + '/' + params.id, {},
    {
      successMessageMode: 'message',
    },
  );

export const getBusinessFlowDetailById = (params: any) =>
  requestClient.get<any>(Api.GetBusinessFlowDetailById + '/' + params.id);
