import {
  getUserGetUserInfo,
  GetUserGetUserInfoParams,
  postUserLogin,
  postUserRegister,
  postUserSendEmailCode,
  resetPassword
} from '@/api';
import {
  UserLoginReqDto,
  UserRegisterReqDto,
  UsersendEmailCodeDto
} from '@/interface';
import { UserResetPassword } from '@/interface/apiTypes/UserResetPassword';

export default class Service {
  async register(params: UserRegisterReqDto) {
    const res = await postUserRegister(params);
    return res.data;
  }

  async getEmailCode(params: UsersendEmailCodeDto) {
    const res = await postUserSendEmailCode(params);
    return res.data;
  }

  async login(params: UserLoginReqDto) {
    const res = await postUserLogin(params);
    return res.data;
  }

  async getUserInfo(params: GetUserGetUserInfoParams) {
    const res = await getUserGetUserInfo(params);
    return res.data;
  }

  async resetPsw(params: UserResetPassword) {
    const res = await resetPassword(params);
    return res.data;
  }
}
