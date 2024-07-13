"use client";

import Box from "@/components/box";
import { cn } from "@/lib/utils";
import { Cuisine } from "@/types-db";
import { Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface CuisineFiltersProps {
  cuisines: Cuisine[];
}

const CuisineFilters = ({ cuisines }: CuisineFiltersProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleCuisineClick = (cuisine: string) => {
    const currentParams = Object.fromEntries(searchParams.entries());

    if (currentParams.cuisine === cuisine) {
      delete currentParams.cuisine;
    } else {
      currentParams.cuisine = cuisine;
    }

    const href = qs.stringifyUrl({
      url: "/menu/",
      query: currentParams,
    });

    router.push(href);
  };

  return (
    <Box className="flex-col gap-2 border-b pb-4 cursor-pointer">
      <h2 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
        Cuisine
      </h2>
      <Box className="flex-col gap-2 mt-2">
        {cuisines &&
          cuisines.map((cuisine) => (
            <div
              key={cuisine.id}
              className={cn(
                "text-sm font-semibold text-neutral-500 flex items-center gap-2",
                cuisine.name === searchParams.get("cuisine") && "text-hero"
              )}
              onClick={handleCuisineClick.bind(null, cuisine.name)}
            >
              {cuisine.name}
              {cuisine.name === searchParams.get("cuisine") && (
                <Check className="w-5 h-5 text-hero" />
              )}
            </div>
          ))}
      </Box>
    </Box>
  );
};

export default CuisineFilters;
