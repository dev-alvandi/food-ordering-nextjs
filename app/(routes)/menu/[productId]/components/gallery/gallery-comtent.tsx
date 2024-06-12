"use client";

import Image from "next/image";

interface GalleryContentImageProps {
  imageUrl: string;
}

const GalleryContentImage = ({ imageUrl }: GalleryContentImageProps) => {
  return (
    <div className="w-full h-full aspect-square sm:rounded-lg overflow-hidden relative">
      <Image
        src={imageUrl}
        alt={imageUrl}
        className="w-full h-full object-contain"
        fill
      />
    </div>
  );
};

export default GalleryContentImage;
