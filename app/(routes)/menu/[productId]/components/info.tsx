"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { Product } from "@/types-db";
import {
  CookingPot,
  ShoppingCart,
  Soup,
  SquareActivity,
  Utensils,
} from "lucide-react";
import { useState } from "react";

interface InfoProps {
  product: Product;
}

const Info = ({ product }: InfoProps) => {
  const [qty, setQty] = useState(1);

  const cart = useCart();

  const handleQty = (num: number) => {
    setQty(num);
    cart.updateItemQuantity(product.id, num);
  };

  const handleAddToCart = (data: Product) => {
    cart.addItem({ ...data, qty });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
        {product.name}
      </h1>
      <div className="mt-3 flex items-end justify-between">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora,
        deserunt reiciendis. Repellendus repellat distinctio natus id! Eos,
        quibusdam laborum explicabo harum esse nostrum! Obcaecati non velit
        distinctio excepturi ipsam alias!
      </div>
      <div className="w-full flex items-center justify-start gap-2 flex-wrap px-2 mt-8">
        {product.kitchen && (
          <div className="rounded-md bg-emerald-500/10 px-3 py-2 text-[10px] font-semibold capitalize flex items-center gap-2">
            <CookingPot className="w-5 h-5" />
            {product.cuisine}
          </div>
        )}

        {product.category && (
          <div className="rounded-md bg-blue-500/10 px-3 py-2 text-[10px] font-semibold capitalize flex items-center gap-2">
            <Soup className="w-5 h-5" />
            {product.category}
          </div>
        )}

        {product.kitchen && (
          <div className="rounded-md bg-red-500/10 px-3 py-2 text-[10px] font-semibold capitalize flex items-center gap-2">
            <Utensils className="w-5 h-5" />
            {product.kitchen}
          </div>
        )}

        {product.size && (
          <div className="rounded-md bg-yellow-500/10 px-3 py-2 text-[10px] font-semibold capitalize flex items-center gap-2">
            <SquareActivity className="w-5 h-5" />
            {product.size}
          </div>
        )}
      </div>

      <div className="w-full grid grid-cols-4 my-12">
        <div className="col-span-1 space-y-8">
          <div className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
            Price
          </div>
          <div className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
            Serves
          </div>
        </div>
        <div className="col-span-3 space-y-8">
          <p className="text-xl font-bold text-black dark:text-white">
            SEK {product.price}
          </p>
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
        </div>
      </div>

      <Button
        className="w-full py-6 text-xl font-semibold hover:bg-hero hover:text-white flex items-center justify-center gap-3"
        onClick={handleAddToCart.bind(null, product)}
      >
        Add to cart
        <ShoppingCart className="w-4 h-4 font-semibold" />
      </Button>
    </div>
  );
};

export default Info;
