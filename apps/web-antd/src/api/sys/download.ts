import { downloadByData } from '#/utils/file/download';
import { requestClient } from '#/api/request';

enum Api {
  DownloadApi = '/flow/api/public/downloadFile',
}

export function downloadFile(params: any) {
  return requestClient.get(
      Api.DownloadApi,
      {
        params,
        responseType: 'blob',
        responseReturn: 'body'
      }
  ).then(res => {
      downloadByData(res, params.name);
      return Promise.resolve(true);
  });
}
