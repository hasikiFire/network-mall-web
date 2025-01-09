export interface CancelOrderReqDto {
    /** 订单Code */
    orderCode: string;
    /** 取消原因 */
    cancelReason?: string;
}
