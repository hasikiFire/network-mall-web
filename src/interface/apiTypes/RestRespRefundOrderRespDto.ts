import { type RefundOrderRespDto } from "@/interface";

export interface RestRespRefundOrderRespDto {
    /** 错误码，0-成功 */
    code?: number;
    /** 响应消息 */
    message?: string;
    data?: RefundOrderRespDto;
}
