export interface UserRegisterReqDto {
    /** 邮箱 */
    email: string;
    /** 昵称 */
    // name: string;
    /** 密码 */
    password: string;
    /** 邀请码 */
    inviteCode?: string;
    /** 验证码 */
    velCode: string;
}
