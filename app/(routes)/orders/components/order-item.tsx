"use client";

import Box from "@/components/box";
import { cn } from "@/lib/utils";
import { Order } from "@/types-db";
import Image from "next/image";
import { Fragment } from "react";

interface OrderItemProps {
  order: Order;
}

const statusStyles: any = {
  processing: "text-[#F97300]",
  delivering: "text-[#FFD369]",
  delivered: "text-[#4E9F3D]",
  canceled: "text-[#CD1818]",
};

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Box className="">
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 px-4 py-2 rounded-md border border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2 ">
          {order.orderItems.map((item, i) => (
            <Fragment key={item.id}>
              {i <= 2 && (
                <div className="aspect-square w-16 min-w-16 h-16 min-h-16 rounded-md relative border-hidden bg-gray-100 dark:border-gray-800">
                  <Image
                    src={item.images[0].url}
                    alt={item.name}
                    fill
                    className="object-contain w-full h-full"
                  />
                </div>
              )}
            </Fragment>
          ))}
          {order.orderItems.length > 3 && (
            <div className="text-2xl whitespace-nowrap truncate">...</div>
          )}
        </div>

        <p className="text-lg font-semibold text-muted-foreground flex items-center">
          {order.orderItems.map((item) => item.name).join(", ")}
        </p>

        <p
          className={cn(
            "flex justify-center items-center",
            statusStyles[order.orderStatus.toLowerCase()]
          )}
        >
          {order.orderStatus}
        </p>

        <p
          className={cn(
            "text-lg font-semibold flex justify-center items-center",
            order.isPaid ? "text-emerald-500" : "text-red-500"
          )}
        >
          {order.isPaid ? "Paid" : "Not Paid"}
        </p>
      </div>
    </Box>
  );
};

export default OrderItem;
