import { type AlipayTradeQueryResponse } from "@/interface";

export interface PollOrdersRespDto {
    /** 订单ID */
    orderCode?: string;
    /** 状态。-1失败 0待支付，1已支付，2已取消，3已退款 */
    status?: string;
    /** 描述 */
    desc?: string;
    /** 错误码 */
    errorCode?: string;
    /** 错误信息 */
    msg?: string;
    subMsg?: string;
    alipayResp?: AlipayTradeQueryResponse;
}
