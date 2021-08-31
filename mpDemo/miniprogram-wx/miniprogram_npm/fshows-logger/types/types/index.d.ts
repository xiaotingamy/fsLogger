/**
 * @interface 上报内容
 */
export interface ISendInfo {
    AppId?: string;
    Content?: string | object;
    Level?: string;
    LocalMachineTime?: string | undefined;
    UserAgent?: string;
    SystemInfo?: string;
    [propName: string]: any;
}
export interface IRequestOptions {
    url: string;
    method: 'POST' | 'GET';
    data: object | string;
    timeout: number;
    [propName: string]: any;
}
/**
 * @interface 配置选项
 */
export interface IFsLoggerConfig {
    url: string;
    timeout?: number;
    data?: (() => ISendInfo) | object;
    [propName: string]: any;
}
export interface LoggerResponse<T = any> {
    data?: T;
    status?: number;
    statusText?: string;
    [propName: string]: any;
}
export interface LoggerPromise<T = any> extends Promise<LoggerResponse<T>> {
}
export interface IFsLogger {
    defaults: IFsLoggerConfig;
    sendInfo: ISendInfo;
    requestOptions: IRequestOptions;
    _logByEnv<T = any>(level: string, content: string | object): LoggerPromise<T>;
    log<T = any>(level: string, content: string | object): LoggerPromise<T>;
    info<T = any>(content: string | object): LoggerPromise<T>;
    warn<T = any>(content: string | object): LoggerPromise<T>;
    error<T = any>(content: string | object): LoggerPromise<T>;
    axiosHttpLog<T = any>(level?: string, content?: string | object): LoggerPromise<T>;
    myRequestHttpLog<T = any>(level?: string, content?: string | object): LoggerPromise<T>;
    wxRequestHttpLog<T = any>(level?: string, content?: string | object): LoggerPromise<T>;
    updateInfo(info: ISendInfo): void;
}
