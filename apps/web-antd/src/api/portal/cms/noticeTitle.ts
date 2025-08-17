import { requestClient } from '#/api/request';

enum Api {
  NoticeTitlePageList = '/flow/portal/cms/noticeTitle/page',
  Insert = '/flow/portal/cms/noticeTitle/insert',
  Update = '/flow/portal/cms/noticeTitle/update',
  Delete = '/flow/portal/cms/noticeTitle/delete',
  CheckEntityExist = '/flow/base/app/checkEntityExist',
  NoticeTitleList = '/flow/portal/cms/noticeTitle/list',
  GetNoticeTitleById = '/flow/portal/cms/noticeTitle/getById',
  GetNoticeTitlesBySubjectId = '/flow/portal/cms/noticeTitle/getBySubjectId',
}

export const getAllNoticeTitle = (params) => {
  return requestClient.post(Api.NoticeTitleList, params).then((res: any) => {
    if (res) {
      res.forEach((item) => {
        item.value = item.id;
        item.label = item.title;
      });
    }

    return Promise.resolve(res);
  });
};
export const getNoticeTitlesBySubjectId = (params) => {
  return requestClient
    .get(Api.GetNoticeTitlesBySubjectId + '/' + params.subjectId)
    .then((res: any) => {
      if (res) {
        res.forEach((item) => {
          item.value = item.id;
          item.label = item.title;
        });
      }

      return Promise.resolve(res);
    });
};

export const getCustomNoticeTitle = (params) => {
  return getAllNoticeTitle(params).then((res) => {
    res.unshift({
      id: '',
      value: '',
      title: '不套头',
      label: '不套头',
    });
    return Promise.resolve(res);
  });
};

export const getCustomNoticeTitlesBySubjectId = (params) => {
  return getNoticeTitlesBySubjectId(params).then((res) => {
    res.unshift({
      id: '',
      value: '',
      title: '不套头',
      label: '不套头',
    });
    return Promise.resolve(res);
  });
};
export const getNoticeTitleListByPage = (params) => {
  /*if(params.field){
    params.orders = [{
      column: humpToLine(params.field),
      asc: params.order === 'ascend'
    }];
  }*/
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };

  return requestClient.post(Api.NoticeTitlePageList, params);
};

export const insert = (params: any) => requestClient.post(Api.Insert, params, {responseReturn: 'body'});

export const getNoticeTitleById = (id) => requestClient.get(Api.GetNoticeTitleById + '/' + id);

export const update = (params: any) => requestClient.post(Api.Update, params, {responseReturn: 'body'});

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params?: Array<string>) => requestClient.post(Api.Delete, params, {responseReturn: 'body'});
