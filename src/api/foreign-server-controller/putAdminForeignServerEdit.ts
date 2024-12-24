import request from "@/lib/request";
import { type RestRespVoid, type DeepRequired, type ForeignEditReqDto } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * /admin/foreignServer/edit
 */
export function putAdminForeignServerEdit(input: ForeignEditReqDto, config?: AxiosRequestConfig) {
    return request.post<DeepRequired<RestRespVoid>>(`/admin/foreignServer/edit`, input, config);
}
