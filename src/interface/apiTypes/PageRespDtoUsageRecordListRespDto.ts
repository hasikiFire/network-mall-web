import { type UsageRecordListRespDto } from "@/interface";

export interface PageRespDtoUsageRecordListRespDto {
    pageNum?: number;
    pageSize?: number;
    total?: number;
    list?: UsageRecordListRespDto[];
    pages?: number;
}
