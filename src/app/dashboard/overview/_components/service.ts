import { getUsageRecordDetail, getUserGetSubscribe } from '@/api';
import { getRemainingTime } from '@/lib/date';
import Decimal from 'decimal.js';

class Service {
  async getRecordDetail() {
    const res = await getUsageRecordDetail();

    const data = res.data;
    if (data) {
      data._endTime = getRemainingTime(data.purchaseEndTime);
      data._remainingTraffic = new Decimal(data.dataAllowance)
        .sub(data.consumedDataTransfer)
        .toNumber();
    }

    return data;
  }

  async getSubscribeLink() {
    const res = await getUserGetSubscribe();
    return res.data;
  }
}
export default new Service();
