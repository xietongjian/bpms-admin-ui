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

export const getAllNewsCategories = (params) => {
  return requestClient.post(Api.NewsCategoryList, params);
};
export const getAllNewsCategory = (params) => {
  return getAllNewsCategories(params).then((res: any) => {
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

export const getNewsCategoryListByPage = (params: any) => {
  return requestClient.post(Api.NewsCategoryPageList, params);
};

export const insert = (params: any) => requestClient.post(Api.Insert, params, {responseReturn: 'body'});

export const update = (params: any) => requestClient.post(Api.Update, params, {responseReturn: 'body'});

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params?: Array<string>) => requestClient.delete(Api.Delete, {data: params, responseReturn: 'body'});
