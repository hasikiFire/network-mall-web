import request from "@/lib/request";
import { type RestRespUser, type DeepRequired, type UserCreateDto } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * 新增用户
 * /admin/user/create
 */
export function postAdminUserCreate(input: UserCreateDto, config?: AxiosRequestConfig) {
    return request.post<DeepRequired<RestRespUser>>(`/admin/user/create`, input, config);
}
