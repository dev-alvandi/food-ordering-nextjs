import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Box from "@/components/box";
import Container from "@/components/container";
import { ChevronRight, Home, Soup } from "lucide-react";
import Link from "next/link";
import Gallery from "./components/gallery/gallery";
import Info from "./components/info";
import SuggestedList from "./components/suggested-list";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({ category: product.category });
  return (
    <Container className="px-4 md:px-12">
      <Box className="text-neutral-700 dark:text-neutral-300 items-center pt-20">
        <Link href={"/"} className="flex items-center gap-2">
          <Home className="w-4 h-4" />
          Main Page
        </Link>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
        <Link href={"/menu"} className="flex items-center gap-2">
          <Soup className="w-4 h-4" />
          Products
        </Link>
      </Box>

      <div className="px-4 py-10 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Gallery */}

          <Gallery images={product.images} />
          <div className="sm:mt-16 sm:px-0 lg:mt-0">
            {/* Info  */}

            <Info product={product} />
          </div>
        </div>

        <SuggestedList products={suggestedProducts} />
      </div>
    </Container>
  );
};

export default ProductPage;
