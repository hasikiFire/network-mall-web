import { User } from './User';

export interface RestRespUser {
  /** 错误码，0-成功 */
  code?: number;
  /** 响应消息 */
  message?: string;
  data?: User;
}
