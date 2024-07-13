"use client";

import Box from "@/components/box";
import PopularContent from "@/components/popular-content";
import { Product } from "@/types-db";
import { ChevronRight, Home, Soup, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Fragment } from "react";

interface MenuPageContentProps {
  products: Product[];
}

const searchOptions = ["category", "size", "kitchen", "cuisine"];

const MenuPageContent = ({ products }: MenuPageContentProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentParams = Object.fromEntries(searchParams.entries());

  const handleClick = (param: string) => {
    if (currentParams.hasOwnProperty(param)) {
      const newParams = { ...currentParams };
      delete newParams[param];
      const href = qs.stringifyUrl({
        url: "/menu",
        query: newParams,
      });
      router.push(href);
    }
  };
  return (
    <Fragment>
      <Box key={"container-Box"} className="pt-4 pb-24 flex-col items-start">
        <Box
          key={"nav-Box"}
          className="text-neutral-700 dark:text-neutral-300 text-sm items-center"
        >
          <Link href={"/"} className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Main Page
          </Link>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
          <Link href={"/menu"} className="flex items-center gap-2">
            <Soup className="w-4 h-4" />
            Products
          </Link>

          {searchParams.get("category") && (
            <>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
              <Link href={"/menu"} className="flex items-center gap-2">
                {searchParams.get("category")}
              </Link>
            </>
          )}
        </Box>

        <Box key={"product-Box"} className="mt-8 flex-col items-start">
          {searchParams.get("category") && (
            <h2 className="flex items-center gap-2 text-3xl font-semibold text-neutral-600 dark:text-neutral-200">
              {searchParams.get("category")}
            </h2>
          )}

          <Box key={"filter-Box"} className="gap-3 my-4">
            {currentParams &&
              Object.entries(currentParams).map(([key, value]) => (
                <div
                  key={key}
                  onClick={handleClick.bind(null, key)}
                  className="px-4 py-1 cursor-pointer hover:shadow-md rounded-md bg-emerald-500/10 text-neutral-500 dark:text-neutral-200 flex items-center gap-1"
                >
                  {value}
                  <X className="w-4 h-4" />
                </div>
              ))}
          </Box>
        </Box>
      </Box>

      <div className="grid grid-col-2 lg:grid-cols-3 w-full h-full gap-4 gap-y-24">
        {products && products.length > 0 ? (
          <Fragment>
            {products.map((prod) => (
              <PopularContent key={prod.id} data={prod} />
            ))}
          </Fragment>
        ) : (
          <Fragment>
            <Box
              key={"no-products-Box"}
              className="items-center justify-center py-12 text-muted-foreground text-xl font-bold col-span-10"
            >
              No Products Available
            </Box>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default MenuPageContent;
