declare class PromiseLimit {
    limit: number;
    blockQueue: any[];
    currentReqNumber: number;
    isCancel: boolean;
    constructor(limit?: number);
    call(req: any, ...args: any[]): Promise<any>;
    _handlerReq(req: any, args: any): Promise<any>;
    cancel(): void;
}
export default PromiseLimit;
