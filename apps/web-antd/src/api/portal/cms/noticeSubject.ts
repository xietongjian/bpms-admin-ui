import { requestClient } from '#/api/request';
import { forEach, listToTree } from '#/utils/helper/treeHelper';

enum Api {
  NoticeSubjectPageList = '/flow/portal/cms/noticeSubject/page',
  Insert = '/flow/portal/cms/noticeSubject/insert',
  Update = '/flow/portal/cms/noticeSubject/update',
  Delete = '/flow/portal/cms/noticeSubject/delete',
  CheckEntityExist = '/flow/portal/cms/noticeSubject/checkEntityExist',
  NoticeSubjectList = '/flow/portal/cms/noticeSubject/list',
  GetNoticeSubjectById = '/flow/portal/cms/noticeSubject/getById',
  GetMySubjectList = '/flow/portal/cms/noticeSubject/getMySubjectList',
}

export const getNoticeSubjectList = (params: any) => {
  return requestClient.post(Api.NoticeSubjectList, params).then((res: any) => {
    res.forEach((item) => {
      item.key = item.id;
      item.value = item.id;
      item.label = item.title;
    });
    return Promise.resolve(res);
  });
};

export const getAllNoticeSubject = (params: any) => {
  return getNoticeSubjectList(params).then((res) => {
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

// 获取当前登录用户可用的主体
export const getMySubjectList = async () => {
  const allSubject = await getNoticeSubjectList({});
  return requestClient.get(Api.GetMySubjectList).then((res: any) => {
    allSubject.forEach((item) => {
      item.disabled = true;
      const enabledItemIdx = res.findIndex((itm) => itm.id === item.id);
      if (enabledItemIdx !== -1) {
        item.disabled = false;
      }
    });

    const treeData = listToTree(allSubject, { id: 'id', children: 'children', pid: 'pid' });
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

export const getNoticeSubjectById = (id: string) =>
  requestClient.get(Api.GetNoticeSubjectById + '/' + id);

export const getNoticeSubjectListByPage = (params: any) => {
  return requestClient.post(Api.NoticeSubjectPageList, params);
};

export const insert = (params: any) => requestClient.post(Api.Insert, params, {responseReturn: 'body'});

export const update = (params: any) => requestClient.put(Api.Update, params, {responseReturn: 'body'});

export const checkEntityExist = (params: any) =>
  requestClient.post<boolean>(Api.CheckEntityExist, params);

export const deleteByIds = (params?: Array<string>) => requestClient.delete(Api.Delete, {data: params, responseReturn: 'body'});
