import { ForeignServerListRespDto } from './ForeignServerListRespDto';

export interface PageRespDtoForeignServerListRespDto {
  pageNum?: number;
  pageSize?: number;
  total?: number;
  list?: ForeignServerListRespDto[];
  pages?: number;
}
