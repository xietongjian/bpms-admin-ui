import { requestClient } from '#/api/request';
import { forEach, listToTree } from '#/utils/helper/treeHelper';

enum Api {
  NewsCategoryPageList = '/flow/portal/cms/newsCategory/page',
  Insert = '/flow/portal/cms/newsCategory/insert',
  Update = '/flow/portal/cms/newsCategory/update',
  Delete = '/flow/portal/cms/newsCategory/delete',
  CheckEntityExist = '/flow/portal/cms/newsCategory/checkEntityExist',
  NewsCategoryList = '/flow/portal/cms/newsCategory/list',
}

export const getAllNewsCategory = (params) => {
  return requestClient.post(Api.NewsCategoryList, params).then((res: any) => {
    res.forEach((item) => {
      item.key = item.id;
      item.value = item.id;
      item.title = item.name;
      item.label = item.name;
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
    return treeData;
  });
};

export const getNewsCategoryListByPage = (params) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { ...query, ...entity };
  return requestClient.post(Api.NewsCategoryPageList, params);
};

export const insert = (params) => requestClient.post(Api.Insert, params);

export const update = (params) => requestClient.post(Api.Update, params);

export const checkEntityExist = (params) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params?: Array<string>) => requestClient.delete(Api.Delete, {params, responseReturn: 'body'});
