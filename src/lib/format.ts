import Decimal from 'decimal.js';

export const formatTraffic = (bytes: number, unit = true): string => {
  if (!bytes) return '0';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = new Decimal(bytes);
  let unitIndex = 0;

  // 当流量小于 1GB 时，强制使用 MB 作为单位
  if (bytes < 1024 * 1024 * 1024) {
    // 1GB = 1024 * 1024 * 1024 B
    size = size.dividedBy(1024 * 1024); // 转换为 MB
    unitIndex = 2; // 单位设置为 MB
  } else {
    // 否则按原逻辑处理
    while (size.gte(1024) && unitIndex < units.length - 1) {
      size = size.dividedBy(1024);
      unitIndex++;
    }
  }

  // 自动判断小数点位数
  const value = size.toNumber(); // 转换为 JavaScript 数字
  if (!unit) return value.toString();
  const isInteger = Number.isInteger(value); // 判断是否为整数
  const decimalPlaces = (value.toString().split('.')[1] || '').length; // 获取小数位数

  let formattedValue: string;

  if (isInteger) {
    // 如果是整数，不显示小数点
    formattedValue = value.toFixed(0);
  } else if (decimalPlaces > 2) {
    // 如果小数位数超过 2 位，显示 2 位小数
    formattedValue = value.toFixed(2);
  } else {
    // 否则，保留原始小数位数
    formattedValue = value.toString();
  }

  return `${formattedValue} ${units[unitIndex]}`;
};
export const bToGB = (bytes: number): number => {
  return new Decimal(bytes).dividedBy(1024 * 1024 * 1024).toNumber();
};
