import request from "@/lib/request";
import { type RestRespVoid, type DeepRequired, type UsersendEmailCodeDto } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * Send email verification code interface
 * /user/sendEmailCode
 */
export function postUserSendEmailCode(input: UsersendEmailCodeDto, config?: AxiosRequestConfig) {
    return request.post<DeepRequired<RestRespVoid>>(`/user/sendEmailCode`, input, config);
}
