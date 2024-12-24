import { type UserInfoRespDto } from "..";

export interface RestRespUserInfoRespDto {
    /** 错误码，0-成功 */
    code?: number;
    /** 响应消息 */
    message?: string;
    data?: UserInfoRespDto;
}
