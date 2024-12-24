import request from "@/lib/request";
import { type RestRespUserLoginRespDto, type DeepRequired, type UserLoginReqDto } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * 用户登录接口
 * /user/login
 */
export function postUserLogin(input: UserLoginReqDto, config?: AxiosRequestConfig) {
    return request.post<DeepRequired<RestRespUserLoginRespDto>>(`/user/login`, input, config);
}
