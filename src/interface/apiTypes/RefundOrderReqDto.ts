export interface RefundOrderReqDto {
    /** 订单Code */
    orderCode: string;
    /** 退款原因 */
    refundReason?: string;
}
