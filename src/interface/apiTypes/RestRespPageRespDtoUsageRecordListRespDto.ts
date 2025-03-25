import { type PageRespDtoUsageRecordListRespDto } from "@/interface";

export interface RestRespPageRespDtoUsageRecordListRespDto {
    /** 错误码，0-成功 */
    code?: number;
    /** 响应消息 */
    message?: string;
    data?: PageRespDtoUsageRecordListRespDto;
}
