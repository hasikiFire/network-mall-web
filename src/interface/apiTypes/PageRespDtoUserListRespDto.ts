import { UserListRespDto } from './UserListRespDto';

export interface PageRespDtoUserListRespDto {
  pageNum?: number;
  pageSize?: number;
  total?: number;
  list?: UserListRespDto[];
  pages?: number;
}
