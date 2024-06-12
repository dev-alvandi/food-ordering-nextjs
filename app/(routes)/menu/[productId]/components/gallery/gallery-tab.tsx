"use client";

import Image from "next/image";

interface GalleryTabProps {
  imageUrl: string;
}

const GalleryTab = ({ imageUrl }: GalleryTabProps) => {
  return (
    <div className="w-24 h-24 aspect-square rounded-md relative">
      <Image
        src={imageUrl}
        alt={imageUrl}
        className="w-full h-full object-contain"
        fill
      />
    </div>
  );
};

export default GalleryTab;
