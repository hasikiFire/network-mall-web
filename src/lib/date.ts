import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';

dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(utc);

export const getRemainingTime = (purchaseEndTime: string) => {
  // 解析时间并指定时区
  const endTime = dayjs(purchaseEndTime).tz('Asia/Shanghai'); // 直接解析为本地时间
  const now = dayjs().tz('Asia/Shanghai'); // 当前时间，指定时区

  console.log('结束时间:', endTime.format('YYYY-MM-DD HH:mm:ss'));
  console.log('当前时间:', now.format('YYYY-MM-DD HH:mm:ss'));

  // 如果结束时间早于当前时间，返回 "已过期"
  if (endTime.isBefore(now)) {
    return '已过期';
  }

  // 计算剩余时间
  const remainingDuration = dayjs.duration(endTime.diff(now));

  // 获取剩余时间的总天数、小时
  const totalDays = Math.floor(remainingDuration.asDays()); // 总天数
  const hours = Math.floor(remainingDuration.asHours() % 24); // 剩余小时
  const minutes = Math.floor(remainingDuration.asMinutes() % 60); // 剩余分钟

  // 如果没有天数，只返回小时和分钟
  if (totalDays === 0) {
    return `${hours}小时${minutes}分钟`;
  }

  // 如果有天数，返回天数、小时和分钟
  return `${totalDays}天${hours}小时`;
};
