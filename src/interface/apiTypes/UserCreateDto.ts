export interface UserCreateDto {
  /** 名字 */
  name?: string;
  /** 邮箱 */
  email?: string;
  /** 密码 */
  password?: string;
  /** 邀请代码 */
  inviteCode?: string;
  /** 状态, 1 正常 0 无效 2 已禁用（触发审计规则） */
  status?: number;
}
