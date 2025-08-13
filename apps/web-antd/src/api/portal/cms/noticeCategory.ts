import { requestClient } from '#/api/request';
import { listToTree, forEach } from '#/utils/helper/treeHelper';
import { humpToLine } from '#/utils';

enum Api {
  NoticeCategoryPageList = '/flow/portal/cms/noticeCategory/page',
  Insert = '/flow/portal/cms/noticeCategory/insert',
  Update = '/flow/portal/cms/noticeCategory/update',
  Delete = '/flow/portal/cms/noticeCategory/delete',
  CheckEntityExist = '/flow/portal/cms/noticeCategory/checkEntityExist',
  NoticeCategoryList = '/flow/portal/cms/noticeCategory/list',
}

export const getAllNoticeCategory = (params: any) => {
  if (params.field) {
    params.orders = [
      {
        column: humpToLine(params.field),
        asc: params.order === 'ascend',
      },
    ];
  }
  return requestClient.post(Api.NoticeCategoryList, params).then((res: any) => {
    res.forEach((item) => {
      item.value = item.id;
      item.title = item.name;
    });
    const treeData = listToTree(res, { id: 'id', children: 'children', pid: 'pid' });
    forEach(
      treeData,
      (node) => {
        if (node.children.length === 0) {
          delete node.children;
        }
      },
      { id: 'id', children: 'children', pid: 'pid' },
    );
    return Promise.resolve(treeData);
  });
};

export const getNoticeCategoryListByPage = (params) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { ...query, ...entity };
  return requestClient.post(Api.NoticeCategoryPageList, params);
};

export const insert = (params) => requestClient.post(Api.Insert, params);

export const update = (params) => requestClient.put(Api.Update, params);

export const checkEntityExist = (params) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params?: Array<string>) => requestClient.delete(Api.Delete, params, {responseReturn: 'body'});
