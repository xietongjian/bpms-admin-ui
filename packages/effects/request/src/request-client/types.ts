import type {
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';

type ExtendOptions = {
  /** 响应数据的返回方式。
   * raw: 原始的AxiosResponse，包括headers、status等，不做是否成功请求的检查。
   * body: 返回响应数据的BODY部分（只会根据status检查请求是否成功，忽略对code的判断，这种情况下应由调用方检查请求是否成功）。
   * data: 解构响应的BODY数据，只返回其中的data节点数据（会检查status和code是否为成功状态）。
   */
  responseReturn?: 'body' | 'data' | 'raw';
};
type RequestClientConfig<T = any> = AxiosRequestConfig<T> & ExtendOptions;

type RequestResponse<T = any> = AxiosResponse<T> & {
  config: RequestClientConfig<T>;
};

type RequestContentType =
  | 'application/json;charset=utf-8'
  | 'application/octet-stream;charset=utf-8'
  | 'application/x-www-form-urlencoded;charset=utf-8'
  | 'multipart/form-data;charset=utf-8';

type RequestClientOptions = CreateAxiosDefaults & ExtendOptions;

interface RequestInterceptorConfig {
  fulfilled?: (
    config: ExtendOptions & InternalAxiosRequestConfig,
  ) =>
    | (ExtendOptions & InternalAxiosRequestConfig<any>)
    | Promise<ExtendOptions & InternalAxiosRequestConfig<any>>;
  rejected?: (error: any) => any;
}

interface ResponseInterceptorConfig<T = any> {
  fulfilled?: (
    response: RequestResponse<T>,
  ) => Promise<RequestResponse> | RequestResponse;
  rejected?: (error: any) => any;
}

type MakeErrorMessageFn = (message: string, error: any) => void;

interface HttpResponse<T = any> {
  /**
   * 0 表示成功 其他表示失败
   * 0 means success, others means fail
   */
  code: string;
  data: T;
  msg: string;
}

export type {
  HttpResponse,
  MakeErrorMessageFn,
  RequestClientConfig,
  RequestClientOptions,
  RequestContentType,
  RequestInterceptorConfig,
  RequestResponse,
  ResponseInterceptorConfig,
};

export type ErrorMessageMode = 'message' | 'modal' | 'none' | undefined;
export type SuccessMessageMode = ErrorMessageMode;

/**
 * 拓展axios的请求配置
 */
declare module 'axios' {
  interface AxiosRequestConfig {
    /** 是否加密请求参数  */
    encrypt?: boolean;
    /**
     * 错误弹窗类型
     */
    errorMessageMode?: ErrorMessageMode;
    /**
     * 是否格式化日期
     */
    formatDate?: boolean;
    /**
     * 是否返回原生axios响应
     */
    isReturnNativeResponse?: boolean;
    /**
     * 是否需要转换响应 即只获取{code, msg, data}中的data
     */
    isTransformResponse?: boolean;
    /**
     * param添加到url后
     */
    joinParamsToUrl?: boolean;
    /**
     * 加入时间戳
     */
    joinTime?: boolean;
    /**
     * 成功弹窗类型
     */
    successMessageMode?: SuccessMessageMode;
  }
}
