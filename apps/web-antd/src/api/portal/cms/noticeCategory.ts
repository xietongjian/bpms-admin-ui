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

export const getNoticeCategoriesData = (params: any) => {
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
      item.key = item.id;
      item.value = item.id;
      item.title = item.name;
      item.label = item.name;
    });
    return Promise.resolve(res);
  });
}

export const getAllNoticeCategory = (params: any) => {
  return getNoticeCategoriesData(params).then((res: any) => {
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

export const getNoticeCategoryListByPage = (params: any) => {
  return requestClient.post(Api.NoticeCategoryPageList, params);
};

export const insert = (params: any) => requestClient.post(Api.Insert, params, {responseReturn: 'body'});

export const update = (params: any) => requestClient.put(Api.Update, params, {responseReturn: 'body'});

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params?: Array<string>) => requestClient.delete(Api.Delete, {data: params, responseReturn: 'body'});
