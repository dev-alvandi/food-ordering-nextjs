import { Product } from "@/types-db";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (productId: string): Promise<Product> => {
  const res = await fetch(`${URL}/${productId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export default getProduct;
