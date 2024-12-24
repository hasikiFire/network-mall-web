import { type UserLoginRespDto } from "..";

export interface RestRespUserLoginRespDto {
    /** 错误码，0-成功 */
    code?: number;
    /** 响应消息 */
    message?: string;
    data?: UserLoginRespDto;
}
