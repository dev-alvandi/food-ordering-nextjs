"use client";

import Box from "@/components/box";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { Product } from "@/types-db";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CartItemProps {
  item: Product;
}

const CartItem = ({ item }: CartItemProps) => {
  const [qty, setQty] = useState<number>(item.qty ?? 1);

  const cart = useCart();

  const handleQty = (num: number) => {
    setQty(num);
    cart.updateItemQuantity(item.id, num);
  };

  return (
    <Box
      key={"container-Box"}
      className="flex items-center gap-4 border border-gray-200 dark:border-gray-800 p-3 rounded-lg"
    >
      <div className="aspect-square w-24 min-w-24 h-24 min-h-24 rounded-md bg-gray-100 dark:bg-gray-600 flex items-center justify-center relative overflow-hidden">
        <Image
          src={item.images[0].url}
          alt={item.name}
          fill
          className="w-full h-full object-contain"
        />
      </div>

      <div>
        <h2 className="w-full min-w-44 whitespace-nowrap truncate font-semibold text-2xl text-neutral-700 dark:text-neutral-300">
          {item.name}
        </h2>
        <div className="w-full flex justify-start items-center gap-2 flex-wrap mt-4">
          {item.kitchen && (
            <div className="rounded-md bg-emerald-500/10 px-2 py-[2px] text-[10px] font-semibold capitalize">
              {item.cuisine}
            </div>
          )}

          {item.category && (
            <div className="rounded-md bg-blue-500/10 px-2 py-[2px] text-[10px] font-semibold capitalize">
              {item.category}
            </div>
          )}

          {item.kitchen && (
            <div className="rounded-md bg-red-500/10 px-2 py-[2px] text-[10px] font-semibold capitalize">
              {item.kitchen}
            </div>
          )}

          {item.size && (
            <div className="rounded-md bg-yellow-500/10 px-2 py-[2px] text-[10px] font-semibold capitalize">
              {item.size}
            </div>
          )}
        </div>
      </div>

      <Box
        key={"quantity-Box"}
        className="flex items-center justify-center h-full"
      >
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <div
              key={num}
              className={cn(
                "w-8 h-8 cursor-pointer rounded-full flex items-center justify-center border border-hero",
                qty === num && "bg-hero shadow-md text-white"
              )}
              onClick={handleQty.bind(null, num)}
            >
              {num}
            </div>
          ))}
        </div>
      </Box>

      <Box
        key={"total-Box"}
        className="flex items-center justify-center h-full"
      >
        <h2>SEK {item.price * (item.qty ?? 1)}</h2>
      </Box>

      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={cart.removeItem.bind(null, item.id)}
        className="cursor-pointer text-muted-foreground hover:text-red-500 p-2"
      >
        <Trash className="w-4 h-4 " />
      </Button>
    </Box>
  );
};

export default CartItem;
