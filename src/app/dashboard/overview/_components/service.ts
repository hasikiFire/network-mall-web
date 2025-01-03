import {
  getUsageRecordDetail, 
} from '@/api';
import { 
  UserRegisterReqDto, 
} from '@/interface';

export default class Service {
  async register(params: UserRegisterReqDto) {
    const res = await getUsageRecordDetail(params);
    if (res.code === 200) {
      return res.data;
    }
  }
}
