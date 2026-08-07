import { requestClient } from '#/api/request';
import { listToTree } from '#/utils/helper/treeHelper';

enum Api {
  GetDocCateListData = '/flow/common/docCate/getAll',
  DocManagePageList = '/flow/common/docManage/pagerModel',
  SaveOrUpdateDocManage = '/flow/common/docManage/saveOrUpdateDocManage',
  SaveOrUpdateDocCate = '/flow/common/docCate/saveOrUpdateDocCate',
  DeleteDocCateById = '/flow/common/docCate/deleteById',
  DeleteDocManageById = '/flow/common/docManage/deleteById',
  UpdateDocManageStatus = '/flow/common/docManage/updateStatus',
}

export const getDocManagePageList = (params: any) => {
  return requestClient.post(Api.DocManagePageList, params);
};

export function updateDocManageStatus(params: any) {
  return requestClient.post(Api.UpdateDocManageStatus, params, { responseReturn: 'body' });
}

export const getDocCateListData = () => {
  return requestClient.get(Api.GetDocCateListData);
};

export const getDocCateTreeData = () => {
  return getDocCateListData().then(res => {
    const treeData = listToTree(res);
    return Promise.resolve(treeData);
  });
};

export const saveOrUpdateDocManage = (params: any) =>
  requestClient.post(Api.SaveOrUpdateDocManage, params, { responseReturn: 'body' });

export const saveOrUpdateDocCate = (params: any) =>
  requestClient.post(Api.SaveOrUpdateDocCate, params, { responseReturn: 'body' });

export const deleteDocCateById = (params: any) =>
  requestClient.post(Api.DeleteDocCateById + '/' + params.id, {}, { responseReturn: 'body' });

export const deleteDocManageById = (params: any) =>
  requestClient.post(Api.DeleteDocManageById + '/' + params.id, {}, { responseReturn: 'body' });
