import { Fragment } from "react";

import Container from "@/components/container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import getProducts, { Query } from "@/actions/get-products";
import PopularContent from "@/components/popular-content";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { FileHeart, Salad, Truck } from "lucide-react";
import HeroImageSpinner from "@/components/hero-image-spinner";

export const revalidate = 0; // stops recatching the page over and over

const HomePage = async () => {
  const productQuery: Query = {
    isFeatured: true,
  };

  const products = await getProducts(productQuery);

  return (
    <Container className="px-4 pt-6 md:px-12">
      <section className="grid grid-cols-1 md:grid-cols-2 py-12 pt-16">
        <div className="flex flex-col items-start justify-start gap-4">
          <p className="px-6 py-1 rounded-full text-neutral-500 dark:text-neutral-300 border border-gray-300">
            Wanna grab a bite?
          </p>
          <h2 className="text-5xl font-bold tracking-wider uppercase text-neutral-700 dark:text-neutral-200 my-4">
            Just come to
            <span className="block py-4">
              {process.env.NEXT_PUBLIC_APP_NAME} & Order
            </span>
          </h2>

          <p className="text-base text-center md:text-left text-neutral-500 dark:text-neutral-100 my-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
            dolorum debitis iusto iure dicta fugit? Eligendi id corrupti est.
          </p>

          <div className="my-4 flex text-center justify-center gap-6 w-full md:w-auto">
            <Link href={"/menu"}>
              <Button className="px-8 md:px-16 py-4 md:py-6 rounded-full bg-hero dark:text-neutral-300 hover:dark:text-hero">
                Order Now
              </Button>
            </Link>
            <Link href={"/"}>
              <Button
                className="px-8 md:px-16 py-4 md:py-6 rounded-full"
                variant={"outline"}
              >
                Explore More
              </Button>
            </Link>
          </div>
        </div>

        <div className="">
          <div className="w-full relative h-[35rem] flex items-center justify-center">
            {/* <Image
              src={"/img/Food.png"}
              alt="Hero Food"
              fill
              objectFit="contain"
              className="w-full h-full absolute"
            /> */}
            <HeroImageSpinner />
          </div>
        </div>
      </section>

      {/* Popular section */}

      {products ? (
        <section className="grid grid-cols-1 md:grid-cols-4 py-12 my-6 gap-6 gap-y-20">
          {products.slice(0, 4).map((prod) => (
            <PopularContent key={prod.id} data={prod} />
          ))}
        </section>
      ) : (
        <div className="w-full text-center text-xl font-semibold">
          No product found yet.
        </div>
      )}

      {/* Why Choose us section */}
      <section className="flex flex-col items-center justify-center py-12 my-4">
        <h2 className="text-5xl font-bold tracking-wider uppercase text-neutral-700 dark:text-neutral-300 my-4">
          Why choose us?
        </h2>
        <p className="w-full md:w-[35rem] text-base text-center text-neutral-500 dark:text-neutral-200 my-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni dolorum
          debitis iusto iure dicta fugit? Eligendi id corrupti est.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full my-6 mt-20">
          <Card className="shadow-lg rounded-md border-none p-4 py-12 flex flex-col items-center justify-center gap-4">
            <Salad className="w-8 h-8 text-hero" />
            <CardTitle className="text-neutral-600 dark:text-neutral-100">
              Serve Healthy Food
            </CardTitle>
            <CardDescription className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam, minus ipsam in, non asperiores pariatur velit
              consequatur consectetur.
            </CardDescription>
          </Card>
          <Card className="shadow-lg rounded-md border-none p-4 py-12 flex flex-col items-center justify-center gap-4">
            <FileHeart className="w-8 h-8 text-hero" />
            <CardTitle className="text-neutral-600 dark:text-neutral-200">
              Best Quality
            </CardTitle>
            <CardDescription className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam, minus ipsam in, non asperiores pariatur velit
              consequatur consectetur.
            </CardDescription>
          </Card>
          <Card className="shadow-lg rounded-md border-none p-4 py-12 flex flex-col items-center justify-center gap-4">
            <Truck className="w-8 h-8 text-hero" />
            <CardTitle className="text-neutral-600 dark:text-neutral-200">
              Fast Delivery
            </CardTitle>
            <CardDescription className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam, minus ipsam in, non asperiores pariatur velit
              consequatur consectetur.
            </CardDescription>
          </Card>
        </div>
      </section>

      {/* Chefs section */}
      <section className="flex flex-col items-center justify-center py-12 my-4">
        <h2 className="text-5xl font-bold tracking-wider uppercase text-neutral-700 dark:text-neutral-300 my-4">
          Our Special Chefs
        </h2>
        <p className="w-full md:w-[35rem] text-base text-center text-neutral-500 dark:text-neutral-100 my-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni dolorum
          debitis iusto iure dicta fugit? Eligendi id corrupti est.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full my-6 mt-20">
          <Card className="shadow-lg relative rounded-md border-none flex flex-col items-center justify-center h-96 md:h-[35rem] bg-hero/30 ">
            <Image
              className="w-full h-full object-contain"
              src={"/img/chef1.png"}
              alt="Chef 1"
              fill
            />
          </Card>
          <Card className="shadow-lg relative rounded-md border-none flex flex-col items-center justify-center h-96 md:h-[35rem] bg-hero/30 md:mt-20">
            <Image
              className="w-full h-full object-contain"
              src={"/img/chef2.png"}
              alt="Chef 2"
              fill
            />
          </Card>
          <Card className="shadow-lg relative rounded-md border-none flex flex-col items-center justify-center h-96 md:h-[35rem] bg-hero/30 ">
            <Image
              className="w-full h-full object-contain"
              src={"/img/chef3.png"}
              alt="Chef 3"
              fill
            />
          </Card>
        </div>
      </section>
    </Container>
  );
};

export default HomePage;
