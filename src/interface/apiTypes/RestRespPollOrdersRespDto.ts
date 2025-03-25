import { type PollOrdersRespDto } from "@/interface";

export interface RestRespPollOrdersRespDto {
    /** 错误码，0-成功 */
    code?: number;
    /** 响应消息 */
    message?: string;
    data?: PollOrdersRespDto;
}
