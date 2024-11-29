import { requestClient } from '#/api/request';

// const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: any,
  onUploadProgress: (progressEvent: any) => void,
) {
  return requestClient.post<any>(params.url, onUploadProgress, params);
}
