export interface UserResetPassword {
  /** 邮箱 */
  email: string;
  /** 密码 */
  password: string;
  /** 验证码 */
  velCode: string;
}
