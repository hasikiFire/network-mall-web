export interface UsersendEmailCodeDto {
    /** 邮箱 */
    email: string;
    /** 类型：SendCodeTypeEnum */
    type: 'REGISTER' | 'LOGIN' | 'UPDATE_PASSWORD';
}
