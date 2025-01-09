export interface UserLoginReqDto {
  /** 邮箱 */
  email: string;
  /** 密码 */
  password: string;
  /** 记住我 */
  isRemind?: boolean;
}
