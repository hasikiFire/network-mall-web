import { type ForeignServerListRespDto } from "..";

export interface PageRespDtoForeignServerListRespDto {
    pageNum?: number;
    pageSize?: number;
    total?: number;
    list?: ForeignServerListRespDto[];
    pages?: number;
}
