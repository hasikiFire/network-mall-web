import request from "@/lib/request";
import { type RestRespUserInfoRespDto, type DeepRequired } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * 用户信息查询接口
 * /user/getUserInfo
 */
export function getUserGetUserInfo(params: GetUserGetUserInfoParams, config?: AxiosRequestConfig) {
    const paramsInput = {
        userId: params.userId,
    };
    return request.get<DeepRequired<RestRespUserInfoRespDto>>(`/user/getUserInfo`, {
        params: paramsInput,
        ...config,
    });
}

export interface GetUserGetUserInfoParams {
    userId: number;
}
