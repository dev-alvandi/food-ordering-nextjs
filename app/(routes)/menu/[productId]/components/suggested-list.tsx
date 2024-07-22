"use client";

import PopularContent from "@/components/popular-content";
import { Product } from "@/types-db";
import { useParams } from "next/navigation";
import { Fragment } from "react";

interface SuggestedListProps {
  products: Product[];
}

const SuggestedList = ({ products }: SuggestedListProps) => {
  const { productId } = useParams();

  return (
    <Fragment>
      <h2 className="text-3xl text-neutral-600 dark:text-neutral-200 font-semibold">
        Related Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-20 md:gap-x-4 md:gap-y-24 my-6 py-12">
        {products
          .filter((prod) => prod.id !== productId)
          .map((suggestedProd) => (
            <PopularContent key={suggestedProd.id} data={suggestedProd} />
          ))}
      </div>
    </Fragment>
  );
};

export default SuggestedList;
