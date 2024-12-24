import request from "@/lib/request";
import { type RestRespBoolean, type DeepRequired } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * 查询登录状态
 * /user/isLogin
 */
export function getUserIsLogin(config?: AxiosRequestConfig) {
    return request.get<DeepRequired<RestRespBoolean>>(`/user/isLogin`, config);
}
