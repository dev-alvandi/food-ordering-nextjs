"use client";

import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const CartActionButton = () => {
  const [isMounted, setIsMounted] = useState(false);

  const cart = useCart();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return;
  }

  return (
    <div className="ml-4 flex justify-center items-center gap-x-4">
      <Button
        className="rounded-full"
        variant={"outline"}
        onClick={() => router.push("/cart")}
      >
        <ShoppingBag className="w-4 h-4 text-black dark:text-white" />
        <span className="text-sm font-medium ml-2 text-black dark:text-white">
          {cart.items.length}
        </span>
      </Button>
    </div>
  );
};

export default CartActionButton;
