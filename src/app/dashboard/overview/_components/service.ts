import { getUsageRecordDetail, getUserGetSubscribe } from '@/api';
import { getRemainingTime } from '@/lib/date';
import dayjs from 'dayjs';
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
      data._nextResetDate = dayjs(data.nextResetDate).add(1, 'h').format(
        'YYYY-MM-DD HH:mm:ss'
      );
    }

    return data;
  }

  async getSubscribeLink() {
    const res = await getUserGetSubscribe();
    return res.data;
  }
}
export default new Service();
