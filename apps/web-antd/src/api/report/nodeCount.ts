import { requestClient } from '#/api/request';


enum Api {
  GetModelByNodeReportQueryVo = '/flow/report/node/getModelByNodeReportQueryVo',
  DownloadNodeCount = '/flow/report/node/download',
}

export const getModelByNodeReportQueryVo = (params: any) => {
  if (params.userNo && params.userNo.length > 0) {
    params.userNo = params.userNo[0].code;
  }
  return requestClient.post<any>(Api.GetModelByNodeReportQueryVo, params);
};

export const exportExcel = (params: any) => {
  if (params.userNo && params.userNo.length > 0) {
    params.userNo = params.userNo[0].code;
  }
  return requestClient.get<any>(Api.DownloadNodeCount, params, {responseType: 'blob', responseReturn: 'body' });
};
