import { type PayResponse } from "@/interface";

export interface RestRespPayResponse {
    /** 错误码，0-成功 */
    code?: number;
    /** 响应消息 */
    message?: string;
    data?: PayResponse;
}
