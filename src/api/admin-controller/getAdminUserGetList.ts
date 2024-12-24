import request from "@/lib/request";
import { type RestRespPageRespDtoUserListRespDto, type DeepRequired, type UserListReqDto } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * 查询用户列表
 * /admin/user/getList
 */
export function getAdminUserGetList(params: GetAdminUserGetListParams, config?: AxiosRequestConfig) {
    const paramsInput = {
        ...params.params,
    };
    return request.get<DeepRequired<RestRespPageRespDtoUserListRespDto>>(`/admin/user/getList`, {
        params: paramsInput,
        ...config,
    });
}

export interface GetAdminUserGetListParams {
    params: UserListReqDto;
}
