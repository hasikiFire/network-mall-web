import { type PageRespDtoPayOrder } from '@/interface';

export interface RestRespPageRespDtoPayOrder {
  /** 错误码，0-成功 */
  code?: number;
  /** 响应消息 */
  message?: string;
  data?: PageRespDtoPayOrder;
}
