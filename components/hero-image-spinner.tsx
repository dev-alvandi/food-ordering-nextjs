"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageDataProps {
  imageUrl: string;
  alt: string;
  styles: string;
}

const images: ImageDataProps[] = [
  {
    imageUrl: "/hero/burger-hero.png",
    alt: "Buffalo Wings",
    styles: "top-0 left-[42%]",
  },
  {
    imageUrl: "/hero/cake-hero.png",
    alt: "Buffalo Wings",
    styles: "top-[10%] left-3/4",
  },
  {
    imageUrl: "/hero/fish-hero.png",
    alt: "Buffalo Wings",
    styles: "top-[43%] right-0",
  },
  //
  {
    imageUrl: "/hero/hotdog-hero.png",
    alt: "Buffalo Wings",
    styles: "top-[73%] left-3/4",
  },
  {
    imageUrl: "/hero/kebab-hero.png",
    alt: "Buffalo Wings",
    styles: "bottom-0 left-[44%]",
  },
  {
    imageUrl: "/hero/pasta-hero.png",
    alt: "Buffalo Wings",
    styles: "top-[70%] left-[10%]",
  },
  {
    imageUrl: "/hero/pineapple-hero.png",
    alt: "Buffalo Wings",
    styles: "top-[40%] left-0",
  },
  {
    imageUrl: "/hero/salad-hero.png",
    alt: "Buffalo Wings",
    styles: "top-[10%] left-[10%]",
  },
];

const HeroImageSpinner = () => {
  return (
    <div className="w-full h-full relative">
      {/* <div className="w-full h-full relative animate-[spin_15s_linear_reverse_infinite]">
        {images.map((img) => (
          <div
            key={img.imageUrl}
            className={cn(
              "w-[15%] h-[15%] absolute animate-[spin_15s_linear_infinite]",
              img.styles
            )}
          >
            <Image
              src={img.imageUrl}
              alt={img.alt}
              className="w-full h-full object-contain"
              fill
            />
          </div>
        ))}
      </div> */}

      <div className="w-[70%] h-[70%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <Image
          src={"/hero/main-hero.png"}
          alt="Hero Food"
          className="w-full h-full object-contain"
          fill
        />
      </div>
    </div>
  );
};

export default HeroImageSpinner;
