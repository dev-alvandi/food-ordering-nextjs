import Box from "@/components/box";
import Container from "@/components/container";
import useCart from "@/hooks/use-cart";
import { auth } from "@clerk/nextjs/server";
import { ChevronRight, Home, Soup } from "lucide-react";
import Link from "next/link";
import CartContent from "./components/cart-content";

const Cartage = () => {
  const { userId } = auth();

  //   const cart = useCart();

  return (
    <div className="min-h-[80vh]">
      <Container className="py-4 h-full">
        <div className="w-full px-4 md:px-12 space-y-7 pb-7">
          <Box className="text-neutral-700 dark:text-neutral-300 items-center pt-16">
            <Link href={"/"} className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Main Page
            </Link>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
            <Link href={"/menu"} className="flex items-center gap-2">
              <Soup className="w-4 h-4" />
              Products
            </Link>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
            <p className="flex items-center gap-2 text-muted-foreground">
              cart
            </p>
          </Box>
          <CartContent userId={userId} />
        </div>
      </Container>
    </div>
  );
};

export default Cartage;
