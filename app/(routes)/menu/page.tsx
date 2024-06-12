import getCategories from "@/actions/get-categories";
import Box from "@/components/box";
import Container from "@/components/container";
import FilterContainer from "@/components/filter-container";
import CategoryFilters from "./components/category-filters";
import getSizes from "@/actions/get-sizes";
import SizeFilters from "./components/size-filters";
import getKitchens from "@/actions/get-kitchens";
import getCuisines from "@/actions/get-cuisines";
import KitchenFilters from "./components/kitchen-filters";
import CuisineFilters from "./components/cuisine-filters";
import getProducts from "@/actions/get-products";
import MenuPageContent from "./components/menu-page-content";

export const revalidate = 0;

interface MenuPageProps {
  searchParams: {
    size?: string;
    isFeatured?: boolean;
    cuisine?: string;
    category?: string;
    kitchen?: string;
  };
}

const MenuPage = async ({ searchParams }: MenuPageProps) => {
  const categories = await getCategories();
  const sizes = await getSizes();
  const kitchens = await getKitchens();
  const cuisines = await getCuisines();

  const products = await getProducts({
    category: searchParams?.category,
    size: searchParams?.size,
    kitchen: searchParams?.kitchen,
    cuisine: searchParams?.cuisine,
    isFeatured: searchParams?.isFeatured,
  });

  return (
    <Container className="px-4 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-12 py-12 gap-2">
        <div className="hidden md:block col-span-2 border-r top-24">
          <FilterContainer>
            <CategoryFilters categories={categories} />
            <SizeFilters sizes={sizes} />
            <KitchenFilters kitchens={kitchens} />
            <CuisineFilters cuisines={cuisines} />
          </FilterContainer>
        </div>

        <Box className="w-full col-span-12 md:col-span-10 flex-col justify-start items-start ">
          <MenuPageContent products={products} />
        </Box>
      </div>
    </Container>
  );
};

export default MenuPage;
