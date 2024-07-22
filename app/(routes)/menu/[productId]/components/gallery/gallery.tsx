"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GalleryContentImage from "./gallery-comtent";
import GalleryTab from "./gallery-tab";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface GalleryProps {
  images: {
    url: string;
  }[];
}

const Gallery = ({ images }: GalleryProps) => {
  return (
    <Tabs defaultValue={images[0].url} className="w-full">
      {images.map((img) => (
        <TabsContent key={img.url} value={img.url.toString()}>
          <GalleryContentImage imageUrl={img.url} />
        </TabsContent>
      ))}

      <div className="flex items-center justify-center w-full md:h-auto px-12 md:px-0">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          opts={{
            align: "start",
          }}
          className="w-full max-w-sm py-10"
        >
          <CarouselContent>
            {images.map((img, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                <TabsList className="bg-transparent w-full h-full">
                  <TabsTrigger value={img.url.toString()}>
                    <GalleryTab imageUrl={img.url} />
                  </TabsTrigger>
                </TabsList>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Tabs>
  );
};

export default Gallery;
