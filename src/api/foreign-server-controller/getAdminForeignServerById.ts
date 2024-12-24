import request from "@/lib/request";
import { type RestRespForeignServer, type DeepRequired } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * /admin/foreignServer/{id}
 */
export function getAdminForeignServerById(params: GetAdminForeignServerByIdParams, config?: AxiosRequestConfig) {
    return request.get<DeepRequired<RestRespForeignServer>>(`/admin/foreignServer/${params.id}`, config);
}

export interface GetAdminForeignServerByIdParams {
    id: number;
}
