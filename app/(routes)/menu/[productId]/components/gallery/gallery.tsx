"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GalleryContentImage from "./gallery-comtent";
import GalleryTab from "./gallery-tab";

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

      <TabsList className="bg-transparent w-full mt-10">
        {images.map((img) => (
          <TabsTrigger key={img.url} value={img.url.toString()}>
            <GalleryTab imageUrl={img.url} />
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default Gallery;
