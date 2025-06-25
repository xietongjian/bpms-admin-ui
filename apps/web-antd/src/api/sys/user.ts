import { requestClient } from '#/api/request';


enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfoById = '/getUserInfoById',
  GetUserInfo = '/flow/main/getLoginUser',
  GetPermissions = '/flow/main/getPermissions',
  TestRetry = '/testRetry',
  GetSysConfig = '/flow/base/systemConfig/getSysConfig',
  GetSysConfigVersion = '/flow/base/systemConfig/getSysConfigVersion',
  GetVerifyCode = '/flow/verify/getVerifyCode',
  RestSetPassword = '/flow/main/restSetPassword',
}

/**
 * @description: change pwd
 */
export function restSetPassword(params: any) {
  return requestClient.post(Api.RestSetPassword, params, { isReturnNativeResponse: true });
}

/**
 * @description: getSysConfig
 */
export function getSysConfig() {
  return requestClient.post<any>(Api.GetSysConfig, []);
}

/**
 * @description: getSysConfig
 */
export function getSysConfigVersion() {
  return requestClient.get<any>(Api.GetSysConfigVersion, {responseReturn: "body"});
}

/**
 * @description: getVerifyCode
 */
export function getVerifyCode() {
  return requestClient.get<any>(Api.GetVerifyCode,
    { isReturnNativeResponse: true });
}


export function getPermCode() {
  return requestClient.get<string[]>(Api.GetPermissions).then((res) => {
    let codeList = [];
    Object.keys(res).forEach((key) => {
      const values = res[key].map((item) => key + ':' + item);
      codeList = codeList.concat(values);
    });

    return Promise.resolve(codeList);
  });
}
