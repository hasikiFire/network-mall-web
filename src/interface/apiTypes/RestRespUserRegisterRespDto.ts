import { UserRegisterRespDto } from '..';

export interface RestRespUserRegisterRespDto {
  /** 错误码，0-成功 */
  code?: number;
  /** 响应消息 */
  message?: string;
  data?: UserRegisterRespDto;
}
