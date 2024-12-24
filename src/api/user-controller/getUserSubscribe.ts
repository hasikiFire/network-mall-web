import request from "@/lib/request";
import { type AxiosRequestConfig } from "axios";
import { type DeepRequired } from "../../interface";

/**
 * 生成订阅链接
 * /user/subscribe
 */
export function getUserSubscribe(params: GetUserSubscribeParams, config?: AxiosRequestConfig) {
    const paramsInput = {
        token: params.token,
    };
    return request.get<DeepRequired<string>>(`/user/subscribe`, {
        params: paramsInput,
        ...config,
    });
}

export interface GetUserSubscribeParams {
    token: string;
}
