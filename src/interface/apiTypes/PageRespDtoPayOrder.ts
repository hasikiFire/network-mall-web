import { type PayOrder } from "@/interface";

export interface PageRespDtoPayOrder {
    pageNum?: number;
    pageSize?: number;
    total?: number;
    list?: PayOrder[];
    pages?: number;
}
