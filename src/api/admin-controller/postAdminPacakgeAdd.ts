import request from "@/lib/request";
import { type RestRespPackageRespDto, type DeepRequired, type PackageAddReqDto } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * 新增套餐
 * /admin/pacakge/add
 */
export function postAdminPacakgeAdd(input: PackageAddReqDto, config?: AxiosRequestConfig) {
    return request.post<DeepRequired<RestRespPackageRespDto>>(`/admin/pacakge/add`, input, config);
}
