export interface RestRespString {
  /** 错误码，0-成功 */
  code?: number;
  /** 响应消息 */
  message?: string;
  /** 响应数据 */
  data?: string;
}
