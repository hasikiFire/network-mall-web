import request from "@/lib/request";
import { type RestRespBoolean, type DeepRequired, type CancelOrderReqDto } from "../../interface";
import { type AxiosRequestConfig } from "axios";

/**
 * 取消订单
 * /payOrder/cancel
 */
export function postPayOrderCancel(input: CancelOrderReqDto, config?: AxiosRequestConfig) {
    return request.post<DeepRequired<RestRespBoolean>>(`/payOrder/cancel`, input, config);
}
