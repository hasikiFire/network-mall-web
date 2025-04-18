export interface UserEditDto {
  /** 用户ID */
  userId?: number;
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

export interface UserEditStatusDto {
  /** 状态 1 正常 2 已禁用（触发审计规则） 3 删除 */
  status?: number;
  /** 是否删除 0 否 1 是 */
  isDelete?: number;
  /** 用户ID */
  userID?: string; 
}
