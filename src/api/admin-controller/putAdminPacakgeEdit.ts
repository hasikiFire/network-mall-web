import request from "@/lib/request";
import { type RestRespVoid, type DeepRequired, type PackageEditReqDto } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * /admin/pacakge/edit
 */
export function putAdminPacakgeEdit(input: PackageEditReqDto, config?: AxiosRequestConfig) {
    return request.post<DeepRequired<RestRespVoid>>(`/admin/pacakge/edit`, input, config);
}
