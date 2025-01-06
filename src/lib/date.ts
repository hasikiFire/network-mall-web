import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'; // 引入 duration 插件

// 扩展 dayjs 功能
dayjs.extend(duration);

export const getRemainingTime = (purchaseEndTime: string): string => {
  const endTime = dayjs(purchaseEndTime); // 转换为 dayjs 对象
  const now = dayjs(); // 当前时间

  // 如果结束时间早于当前时间，返回 "已过期"
  if (endTime.isBefore(now)) {
    return '已过期';
  }

  // 计算剩余时间
  const remainingDuration = dayjs.duration(endTime.diff(now));

  // 获取剩余时间的总天数、小时、分钟、秒
  const totalDays = Math.floor(remainingDuration.asDays()); // 总天数
  const hours = remainingDuration.hours(); // 剩余小时
  // const minutes = remainingDuration.minutes(); // 剩余分钟
  // const seconds = remainingDuration.seconds(); // 剩余秒

  // 拼接剩余时间
  let result = '';
  if (totalDays > 0) result += `${totalDays}天`;
  if (hours > 0) result += `${hours}小时`;
  // if (minutes > 0) result += `${minutes}分钟`;
  // if (seconds > 0) result += `${seconds}秒`;

  return result || '0秒'; // 如果剩余时间为 0，返回 "0秒"
};