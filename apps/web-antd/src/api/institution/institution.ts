import { requestClient } from '#/api/request';
import { processTreeNodes } from '#/utils/helper/treeHelper';

enum Api {
  GetClassificationList = '/flow/bpmbasic/institutioncat/list',
  SaveAndUpdateClassification = '/flow/bpmbasic/institutioncat/saveOrUpdate',
  DeleteClassification = '/flow/bpmbasic/institutioncat/deleteById',

  GetInstitutionTree = '/flow/bpmbasic/institutioncat/getLeftTrees',
  GetInstitutionTableData = '/flow/bpmbasic/institutioninfo/getPagerModel',
  SaveAndUpdateInstitution = '/flow/bpmbasic/institutioninfo/saveOrUpdate',
  DeleteInstitution = '/flow/bpmbasic/institutioninfo/deleteById',
  UploadInstitutionFile = '/flow/bpmbasic/institutioninfo/upload',
}

// 制度分类列表
export const getInstitutionClassification = async (params: any) => {
  return await requestClient.get<any>(Api.GetClassificationList,  params);
  // return processTreeNodes(res, 'pid', false);
};

// 制度分类添加或修改
export const saveOrUpdateClassification = (params: any) => {
  return requestClient.post<any>( Api.SaveAndUpdateClassification, params, {responseReturn: 'body'});
};

// 制度分类删除
export const deleteClassificationById = (id: string) => {
  return requestClient.post<any>(Api.DeleteClassification + '/' + id);
};

// 制度管理树
export const getInstitutionTree = async () => {
  const res = await requestClient.get<any>(Api.GetInstitutionTree);
  return processTreeNodes(res, 'parentId', false);
};

// 制度管理详细列表
export const getInstitutionTableData = async (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
  const { rows = [], total } = await requestClient.post<any>(Api.GetInstitutionTableData, params);
  for (const row of rows) {
    row.positionRangeData = JSON.parse(row.positionRange || '[]');
    row.deptRangeData = JSON.parse(row.deptRange || '[]');
  }
  return { rows, total };
};

// 制度管理添加和修改
export const saveOrUpdateInstitution = async (params: any) => {
  return await requestClient.post<any>(Api.SaveAndUpdateInstitution, params, { responseReturn: 'body'});
};

// 制度管理详细列表
export const deleteInstitutionById = async (id: any) => {
  return await requestClient.post<any>(Api.DeleteInstitution + '/' + id);
};

//
export const uploadInstitutionFile = async (data: any) => {
  return requestClient.uploadFile(Api.UploadInstitutionFile, data, {responseReturn: 'body'});
};
