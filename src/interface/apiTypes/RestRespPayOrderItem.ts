import { PayOrderItem } from './PayOrderItem';

export interface RestRespPayOrderItem {
  /** 错误码，0-成功 */
  code?: number;
  /** 响应消息 */
  message?: string;
  data?: PayOrderItem;
}
