import { type UsageRecord } from "..";

export interface UserListRespDto {
    /** 用户ID */
    userId?: number;
    /** 名字 */
    name?: string;
    /** 邮箱 */
    email?: string;
    /** 状态 1 正常 0 无效 2 已禁用（触发审计规则） */
    status?: number;
    createdAt?: string;
    updatedAt?: string;
    /** 余额 */
    balance?: number;
    /** 货币类型（1：人民币 2: USDT） */
    currency?: string;
    usageRecord?: UsageRecord[];
}
