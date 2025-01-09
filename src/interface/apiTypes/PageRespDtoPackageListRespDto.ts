import { PackageListRespDto } from './PackageListRespDto';

export interface PageRespDtoPackageListRespDto {
  pageNum?: number;
  pageSize?: number;
  total?: number;
  list?: PackageListRespDto[];
  pages?: number;
}
