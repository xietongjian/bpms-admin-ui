import { requestClient } from '#/api/request';

import { doDownload } from '#/utils/domUtils';
import { forEach, listToTree } from '#/utils/helper/treeHelper';

enum Api {
  GetFormTree = '/flow/form/customExcel/getFormTree', // 查询分类+表单树
  GetCustomColumnsByFormId = '/flow/form/customExcel/getCustomColumns', // 根据表单ID查询表单所有的列 /getCustomColumns/{formId}
  DownloadFormCount = '/flow/form/customExcel/downloadData', // 查询待办，已办
  GetPagerModelCustomData = '/flow/form/customExcel/getPagerModelCustomData', // 导出发起的
  DownloadTaskProcessDetail = '/flow/report/count/downloadTaskProcessDetail', // 导出待办，已办
}

export const getFormTree = () => {
  const result = requestClient.get<any>(Api.GetFormTree);

  return Promise.resolve(result).then((res: any) => {
    res.forEach((item) => {
      item.key = item.id;
      item.value = item.id;
      item.title = item.name;
      if (item.sourceType === '1') {
        item.disabled = true;
      }
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

export const exportExcel = (params: any) => {
  if (params.userNo && params.userNo.length > 0) {
    params.userNo = params.userNo[0].code;
  }

  return requestClient.get<any>(Api.DownloadFormCount, params,
    { responseType: 'blob', isTransformResponse: false },
  );
};

// 根据表单ID查询表单列
export const getCustomColumnsByFormId = (params: any) => {
  return requestClient.get<any>(Api.GetCustomColumnsByFormId + '/' + params.formId);
};

// 查询待办，已办 taskFinishFlag： true已办  false待办
export const getPagerModelCustomData = (params: any) => {
  const query = params && { pageNum: params.pageNum, pageSize: params.pageSize };
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  const queryParam = { query, entity };
  return requestClient.post<any>(Api.GetPagerModelCustomData, params);
};
/*
// 下载Excel已发
export const downloadMyProcessDetail = (params: any) =>{
  let entity = params||{};
  if(entity){
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  let comValue = qs.stringify(entity);

  const downUrl = import.meta.env.VITE_GLOB_API_URL + Api.DownloadMyProcessDetail + '?' + comValue

  doDownload(downUrl);
  return Promise.resolve('success');
}*/

// 下载Excel待办，已办 taskFinishFlag： true已办  false待办
export const downloadTaskProcessDetail = (params: any) => {
  const entity = params || {};
  if (entity) {
    delete entity['pageNum'];
    delete entity['pageSize'];
  }
  // FIXME
  const comValue = '';//qs.stringify(entity);

  const downUrl =
    import.meta.env.VITE_GLOB_API_URL + Api.DownloadTaskProcessDetail + '?' + comValue;

  doDownload(downUrl);

  return Promise.resolve('success');
};
