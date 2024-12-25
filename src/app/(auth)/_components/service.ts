import {
  getUserGetUserInfo,
  GetUserGetUserInfoParams,
  postUserLogin,
  postUserRegister,
  postUserSendEmailCode
} from '@/api';
import {
  UserLoginReqDto,
  UserRegisterReqDto,
  UsersendEmailCodeDto
} from '@/interface';

export default class Service {
  async register(params: UserRegisterReqDto) {
    const res = await postUserRegister(params);
    if (res.code === 200) {
      return res.data;
    }
  }

  async getEmailCode(params: UsersendEmailCodeDto) {
    const res = await postUserSendEmailCode(params);
    if (res.code === 200) {
      return res.data;
    }
  }

  async login(params: UserLoginReqDto) {
    const res = await postUserLogin(params);
    if (res.code === 200) {
      return res.data;
    }
  }

  async getUserInfo(params: GetUserGetUserInfoParams) {
    const res = await getUserGetUserInfo(params);
    if (res.code === 200) {
      return res.data;
    }
  }
}
