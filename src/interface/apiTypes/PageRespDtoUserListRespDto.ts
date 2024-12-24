import { type UserListRespDto } from "..";

export interface PageRespDtoUserListRespDto {
    pageNum?: number;
    pageSize?: number;
    total?: number;
    list?: UserListRespDto[];
    pages?: number;
}
