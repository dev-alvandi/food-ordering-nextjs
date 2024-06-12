import { Order } from "@/types-db";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

const getOrders = async (): Promise<Order[]> => {
  const res = await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export default getOrders;
