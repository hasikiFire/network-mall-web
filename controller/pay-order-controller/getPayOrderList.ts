import request from "@/lib/request";
import { type RestRespListPayOrder, type DeepRequired } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * /payOrder/list
 */
export function getPayOrderList(config?: AxiosRequestConfig) {
    return request.get<DeepRequired<RestRespListPayOrder>>(`/payOrder/list`, config);
}
