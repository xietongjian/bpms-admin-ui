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

export const getAllPublishRange = (params: any) => {
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

export const getPublishRangeListByPage = (params: any) => {
  return requestClient.post(Api.PublishRangePageList, params );
};

export const insert = (params: any) => requestClient.post(Api.Insert, params);

export const update = (params: any) => requestClient.put(Api.Update, params);

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params?: Array<string>) => requestClient.delete(Api.Delete, {data:params, responseReturn: 'body'});
