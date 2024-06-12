"use client";

import { Fragment, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { Eraser } from "lucide-react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import CartItem from "./cart-item";
import Box from "@/components/box";
import { Separator } from "@/components/ui/separator";

interface CartContentProps {
  userId: string | null;
}

const CartContent = ({ userId }: CartContentProps) => {
  const searchParams = useSearchParams();

  const cart = useCart();

  const totalPrice = cart.items.reduce((total, item) => {
    return total + Number(item.price * (item.qty ?? 1));
  }, 0);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed");
      cart.removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Payment unsuccessful");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.removeAll, searchParams]);

  const handleCheckOut = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        products: cart.items,
        userId,
      }
    );

    window.location = res.data.url;
  };

  return (
    <Fragment>
      <div className="w-full flex items-center justify-between gap-4">
        <h2 className="text-3xl font-semibold text-neutral-700 dark:text-neutral-300">
          Cart Items
        </h2>
        {cart.items.length > 0 && (
          <Button variant={"destructive"} onClick={cart.removeAll}>
            Clear <Eraser className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>

      <div className="w-full lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8">
        <div className="col-span-8 relative">
          {cart.items.length === 0 && (
            <div className="w-full items-center flex justify-center">
              <p className="text-3xl text-neutral-600 dark:text-neutral-200 font-semibold">
                No item added to the cart
              </p>
            </div>
          )}

          <div className="w-full space-y-4">
            {cart.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {cart.items.length > 0 && (
          <div className="col-span-4 space-y-8">
            <Box
              key={"container-Box"}
              className="flex-col items-start justify-start gap-2 p-3 shadow-lg rounded-lg space-y-2 bg"
            >
              <h2 className="text-lg text-neutral-700 font-semibold">
                Order Summary
              </h2>

              <Separator />

              <Box key={"total-Box"} className="flex-col space-y-2">
                <div className="flex items-center justify-between w-full px-4 whitespace-nowrap text-muted-foreground">
                  <p className="text-black dark:text-white font-bold text-base">
                    Total
                  </p>
                  <p className="font-semibold text-2xl text-black dark:text-white">
                    SEK {totalPrice}
                  </p>
                </div>
              </Box>
            </Box>

            <Box className="flex-col items-start justify-start gap-2 shadow-lg rounded-lg p-3 space-y-2 bg-slate-50 dark:bg-slate-700">
              <h2 className="text-lg text-neutral-700 dark:text-neutral-300 font-semibold">
                Payment
              </h2>

              <Separator />
              <Button className="w-full" onClick={handleCheckOut}>
                Check Out
              </Button>
            </Box>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CartContent;
