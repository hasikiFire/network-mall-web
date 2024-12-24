import request from "@/lib/request";
import { type RestRespUser, type DeepRequired, type UserEditDto } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * 编辑用户
 * /admin/user/update
 */
export function postAdminUserUpdate(input: UserEditDto, config?: AxiosRequestConfig) {
    return request.post<DeepRequired<RestRespUser>>(`/admin/user/update`, input, config);
}
