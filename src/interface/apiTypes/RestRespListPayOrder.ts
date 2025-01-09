import { PayOrder } from './PayOrder';

export interface RestRespListPayOrder {
  /** 错误码，0-成功 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: PayOrder[];
}
