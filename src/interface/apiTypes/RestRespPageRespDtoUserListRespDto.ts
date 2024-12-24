import { type PageRespDtoUserListRespDto } from "..";

export interface RestRespPageRespDtoUserListRespDto {
    /** 错误码，0-成功 */
    code?: number;
    /** 响应消息 */
    message?: string;
    data?: PageRespDtoUserListRespDto;
}
