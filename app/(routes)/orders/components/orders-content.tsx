"use client";

import { Order } from "@/types-db";
import OrderItem from "./order-item";

interface OrdersContentProps {
  orders: Order[];
}

const OrdersContent = ({ orders }: OrdersContentProps) => {
  if (orders.length === 0) {
    return (
      <div className="w-full border rounded-lg border-gray-100 p-4 flex flex-col justify-start items-center">
        No Order Found
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg p-4 flex flex-col items-center justify-start gap-4 mt-4">
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrdersContent;
