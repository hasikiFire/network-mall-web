import { type PackageListRespDto } from "..";

export interface PageRespDtoPackageListRespDto {
    pageNum?: number;
    pageSize?: number;
    total?: number;
    list?: PackageListRespDto[];
    pages?: number;
}
