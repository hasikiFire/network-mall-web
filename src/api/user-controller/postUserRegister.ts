import request from "@/lib/request";
import { type RestRespUserRegisterRespDto, type DeepRequired, type UserRegisterReqDto } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * 用户注册接口
 * /user/register
 */
export function postUserRegister(input: UserRegisterReqDto, config?: AxiosRequestConfig) {
    return request.post<DeepRequired<RestRespUserRegisterRespDto>>(`/user/register`, input, config);
}
