"use client";

import { Product } from "@/types-db";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeartCrack, HeartIcon, ShoppingCartIcon } from "lucide-react";
import { useState } from "react";
import useCart from "@/hooks/use-cart";

interface PopularContentProps {
  data: Product;
}

const PopularContent = ({ data }: PopularContentProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const cart = useCart();

  const handleAddToCart = (product: Product) => {
    cart.addItem({ ...product, qty: 1 });
  };

  const wishListIcon = isLiked ? (
    <HeartIcon fill="#eb2d3a" stroke="#eb2d3a" className="w-5 h-5" />
  ) : (
    <HeartCrack className="w-5 h-5" />
  );

  return (
    <Card className="w-full max-h-[22rem] dark:bg-[#0C0C0C] bg-white shadow-lg border-none flex flex-col justify-center items-center relative py-6 pt-24 md:pt-28 ">
      <div className="absolute -top-[4%] md:-top-[20%] overflow-hidden w-24 md:w-40 h-24 md:h-40 rounded-full bg-hero flex justify-center items-center p-1 md:p-2 ">
        <div className="w-full h-full rounded-full bg-white relative">
          <Image
            src={data.images[0].url}
            alt={data.name}
            fill
            className="object-contain w-full h-full"
          />
        </div>
      </div>

      <Link href={`/menu/${data.id}`} className="w-full px-2 text-center">
        <CardTitle className="text-neutral-700 dark:text-neutral-300 hover:text-black hover:dark:text-white truncate w-full transition">
          {data.name}
        </CardTitle>
      </Link>

      <div className="w-full flex justify-center items-center gap-2 flex-wrap px-1 mt-4">
        {data.kitchen && (
          <div className="rounded-md bg-emerald-500/10 px-2 py-[2px] text-[10px] font-semibold capitalize">
            {data.cuisine}
          </div>
        )}

        {data.category && (
          <div className="rounded-md bg-blue-500/10 px-2 py-[2px] text-[10px] font-semibold capitalize">
            {data.category}
          </div>
        )}

        {data.kitchen && (
          <div className="rounded-md bg-red-500/10 px-2 py-[2px] text-[10px] font-semibold capitalize">
            {data.kitchen}
          </div>
        )}

        {data.size && (
          <div className="rounded-md bg-yellow-500/10 px-2 py-[2px] text-[10px] font-semibold capitalize">
            {data.size}
          </div>
        )}
      </div>

      <CardDescription className="text-center px-2 my-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio esse ea
        voluptas aliquid natus quia voluptates atque.
      </CardDescription>

      <div className="w-full flex justify-between px-2 mt-4">
        <Button
          variant={"outline"}
          className="rounded-full font-bold text-lg text-muted-foreground"
        >
          SEK {data.price}
        </Button>
        <Link href={`/menu/${data.id}`}>
          <Button className="bg-hero px-12 rounded-full dark:text-neutral-300 hover:dark:text-hero">
            Buy Now
          </Button>
        </Link>
      </div>

      {/* Add to cart */}

      <Button
        className="absolute right-0 top-0 rounded-tl-none rounded-tr-lg rounded-bl-lg rounded-br-none p-2 px-3 dark:bg-neutral-300"
        onClick={handleAddToCart.bind(null, data)}
      >
        <ShoppingCartIcon className="w-4 h-4" />
      </Button>

      {/* Add to wish list */}
      <Button
        variant={"ghost"}
        className="absolute left-0 top-0 rounded-tl-none rounded-tr-lg rounded-bl-lg rounded-br-none p-2 px-3"
        onClick={() => setIsLiked((prevState) => !prevState)}
      >
        {wishListIcon}
      </Button>
    </Card>
  );
};

export default PopularContent;
