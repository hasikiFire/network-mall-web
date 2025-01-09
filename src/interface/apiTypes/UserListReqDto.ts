export interface UserListReqDto {
  pageNum?: number;
  pageSize?: number;
  fetchAll?: boolean;
  /** 用户ID */
  userId?: number;
  /** 名字 */
  name?: string;
  /** 邮箱 */
  email?: string;
  /** 状态 1 正常 0 无效 2 已禁用（触发审计规则） */
  status?: number;
}
