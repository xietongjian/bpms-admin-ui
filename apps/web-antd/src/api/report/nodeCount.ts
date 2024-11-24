import { defHttp } from '@/utils/http/axios';

enum Api {
  GetModelByNodeReportQueryVo = '/flow/report/node/getModelByNodeReportQueryVo',
  DownloadNodeCount = '/flow/report/node/download',
}

export const getModelByNodeReportQueryVo = (params: any) => {
  if (params.userNo && params.userNo.length > 0) {
    params.userNo = params.userNo[0].code;
  }
  return defHttp.post<any>({ url: Api.GetModelByNodeReportQueryVo, params });
};

export const exportExcel = (params: any) => {
  if (params.userNo && params.userNo.length > 0) {
    params.userNo = params.userNo[0].code;
  }
  return defHttp.get<any>(
    { url: Api.DownloadNodeCount, params, responseType: 'blob' },
    { isTransformResponse: false },
  );
};
