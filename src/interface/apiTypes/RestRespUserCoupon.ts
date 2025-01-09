import { UserCoupon } from './UserCoupon';

export interface RestRespUserCoupon {
  /** 错误码，0-成功 */
  code?: number;
  /** 响应消息 */
  message?: string;
  data?: UserCoupon;
}
