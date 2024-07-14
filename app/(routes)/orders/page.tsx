import getOrders from "@/actions/get-orders";
import Box from "@/components/box";
import Container from "@/components/container";
import { auth } from "@clerk/nextjs/server";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import OrdersContent from "./components/orders-content";

export const revalidate = 0; // stops recatching the page over and over

const OrdersPage = async () => {
  const { userId } = auth();

  const orders = await getOrders();

  const formattedOrders = orders.filter((order) => order.userId === userId);

  return (
    <Container className="px-4 md:px-12 bg-transparent py-12 min-h-[80vh] ">
      <Box className="text-neutral-700 dark:text-neutral-300 items-center pt-4 my-12">
        <Link href={"/"} className="flex items-center gap-2">
          <Home className="w-4 h-4" />
          Main Page
        </Link>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
        <p className="flex items-center gap-2 text-muted-foreground">
          My Orders
        </p>
      </Box>

      <h2 className="my-4 text-xl font-semibold text-neutral-700">My Orders</h2>

      <OrdersContent orders={formattedOrders} />
    </Container>
  );
};

export default OrdersPage;
