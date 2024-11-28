import React from 'react';

import { OrderForm } from './_components/orderForm';
import OrderSumary from './_components/orderSumary';
const CartPage: React.FC = () => {
  return (
    <div className="flex h-full  gap-8 bg-gray-100 p-4 py-4 py-4">
      <div className="max-w-[70%]">
        <OrderForm></OrderForm>
      </div>
      <div className='w-96 flex-1'>
        <OrderSumary></OrderSumary>
      </div>
    </div>
  );
};

export default CartPage;
