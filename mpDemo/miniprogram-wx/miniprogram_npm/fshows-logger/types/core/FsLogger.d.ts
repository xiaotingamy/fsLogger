import { IFsLoggerConfig, ISendInfo, LoggerPromise, IFsLogger, IRequestOptions } from '../types';
export default class FsLogger {
    defaults: IFsLoggerConfig;
    sendInfo: ISendInfo;
    requestOptions: IRequestOptions;
    constructor(initConfig: IFsLoggerConfig);
    _logByEnv(level: string, content: string | object): LoggerPromise;
    log(level: string, content: string | object): LoggerPromise;
    info(content: string | object): LoggerPromise;
    warn(content: string | object): LoggerPromise;
    error(content: string | object): LoggerPromise;
    axiosHttpLog(level: string, content: string | object, context: IFsLogger): LoggerPromise;
    myRequestHttpLog(level: string, content: string | object, context: IFsLogger): LoggerPromise;
    wxRequestHttpLog(level: string, content: string | object, context: IFsLogger): LoggerPromise;
    /**
     * @function: 修改日志上报内容的基本字段
     * @author: guoxt
     * @param {ISendInfo} info
     * @return {*}
     */
    updateInfo(info: ISendInfo): void;
}
