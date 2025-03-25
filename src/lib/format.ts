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

  // 格式化数值，去掉末尾的 0
  const formattedValue = parseFloat(value.toFixed(3)).toString();

  return `${formattedValue} ${units[unitIndex]}`;
};

export const bToGB = (bytes: number | string) => {
  if (!bytes) return 0;
  return parseFloat(
    new Decimal(bytes ?? 0)
      .dividedBy(1024 * 1024 * 1024)
      .toNumber()
      .toFixed(3)
      .toString()
  );
};

export const GBToB = (bytes: number | string) => {
  if (!bytes) return 0;
  return parseFloat(
    new Decimal(bytes ?? 0)
      .mul(1024 * 1024 * 1024)
      .toNumber()
      .toFixed(3)
      .toString()
  );
};
