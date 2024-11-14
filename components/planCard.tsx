'use client';
import { useState } from 'react';
import { Button } from './ui/button';

interface PlanCardProps {
  title: string;
  basePrice: number; // 这里是月付基础价格
  features: string[];
  buttonText: string;
  period: string; // 用来显示当前选择的周期
  isPopular?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  basePrice,
  features,
  buttonText,
  period,
  isPopular = false
}) => {
  // 计算根据周期调整的价格
  const adjustedPrice =
    period === 'annually'
      ? basePrice * 12
      : period === 'quarterly'
      ? basePrice * 3
      : basePrice;

  return (
    <div className="w-full max-w-xs rounded-xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
      {isPopular && (
        <span className="mb-2 block text-sm font-semibold text-green-500">
          🌟 推荐
        </span>
      )}
      <h3 className="mb-4 text-lg font-semibold text-gray-800">{title}</h3>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold text-gray-800">
          ${adjustedPrice}
        </span>
        <span className="ml-1 text-sm text-gray-500">
          /
          {period === 'annually'
            ? '年付'
            : period === 'quarterly'
            ? '季付'
            : '月付'}
        </span>
      </div>
      <ul className="my-4 space-y-2 text-sm text-gray-600">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span>✔️</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button variant="outline" className="mt-4 w-full">
        {buttonText}
      </Button>
    </div>
  );
};

export default PlanCard;
