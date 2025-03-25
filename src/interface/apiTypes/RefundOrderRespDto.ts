import { type AlipayTradeRefundResponse } from "@/interface";

export interface RefundOrderRespDto {
    /** 订单ID */
    orderCode?: string;
    /** 状态。-1退款失败，0待退款，1已退款 */
    status?: string;
    /** 描述 */
    desc?: string;
    alipayResp?: AlipayTradeRefundResponse;
    /** 错误码 */
    errorCode?: string;
    /** 错误信息 */
    msg?: string;
    subMsg?: string;
}
