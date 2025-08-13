import { requestClient } from '#/api/request';

enum Api {
  BoardPageList = '/flow/portal/cms/board/getPagerModel',
  Insert = '/flow/portal/cms/board/insert',
  Update = '/flow/portal/cms/board/update',
  Delete = '/flow/portal/cms/board/delete',
  CheckEntityExist = '/flow/portal/cms/board/checkEntityExist',
  BoardList = '/flow/portal/cms/board/list',
  GetBoardTypes = '/flow/portal/cms/board/getBoardTypes',
}

/**
 * params.type=1|2|3
 * NOTICE(1, "公告"),
 * NEWS(2, "新闻"),
 * BANNER(3, "轮播图");
 * @param params
 */
export const getAllBoard = (params) => {
  return requestClient.post(Api.BoardList, params).then((res: any) => {
    res.forEach((item) => {
      item.label = item.name;
      item.value = item.sn;
      item.key = item.sn;
    });
    return Promise.resolve(res);
  });
};

export const getBoardTypes = () => {
  return requestClient.get(Api.GetBoardTypes).then((res: any) => {
    res.forEach((item) => {
      item.label = item.desc;
      item.value = item.code;
      item.key = item.code;
    });
    return Promise.resolve(res);
  });
};

export const getBoardListByPage = (params) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
  return requestClient.post(Api.BoardPageList, params);
};

export const insert = (params) => requestClient.post(Api.Insert, params);

export const update = (params) => requestClient.put(Api.Update, params);

export const checkEntityExist = (params) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params?: Array<string>) => requestClient.delete(Api.Delete, params);
