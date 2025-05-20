import { requestClient } from '#/api/request';
// import { OrgDataType } from '#/components/Selector/src/types';

enum Api {
  PublishRangePageList = '/flow/portal/cms/publishRange/page',
  Insert = '/flow/portal/cms/publishRange/insert',
  Update = '/flow/portal/cms/publishRange/update',
  Delete = '/flow/portal/cms/publishRange/delete',
  CheckEntityExist = '/flow/base/app/checkEntityExist',
  PublishRangeList = '/flow/portal/cms/publishRange/list',
}

export const getAllPublishRange = (params) => {
  return requestClient.post(Api.PublishRangeList, params).then((res: any) => {
    if (res) {
      res.forEach((item) => {
        item.code = item.rangeId;
        item.shortName = item.rangeName;
        item.name = item.rangeName;
        item.label = item.rangeName;
        // item.sourceType = OrgDataType[item.rangeType];
      });
    }
    return Promise.resolve(res);
  });
};

export const getPublishRangeListByPage = (params) => {
  return requestClient.post(Api.PublishRangePageList, params );
};

export const insert = (params) => requestClient.post(Api.Insert, params);

export const update = (params) => requestClient.put(Api.Update, params);

export const checkEntityExist = (params) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params?: Array<string>) => requestClient.delete(Api.Delete, params);
