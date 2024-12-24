import request from "@/lib/request";
import { type RestRespString, type DeepRequired } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * 获取订阅链接
 * /user/getSubscribe
 */
export function getUserGetSubscribe(config?: AxiosRequestConfig) {
    return request.get<DeepRequired<RestRespString>>(`/user/getSubscribe`, config);
}
