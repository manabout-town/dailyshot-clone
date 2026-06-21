"use client";
import { useState } from "react";
import Image from "next/image";

type ImageGalleryProps = {
  productName: string;
  scale: string | null;
  imageUrl?: string | null;
};

export default function ImageGallery({ productName, scale, imageUrl }: ImageGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-square rounded-xl bg-[#EDEAE3] overflow-hidden relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={productName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-center text-[#9CA3AF]">
            <div>
              <p className="text-5xl mb-2">🎎</p>
              <p className="text-sm font-medium">{productName}</p>
              {scale && <p className="text-xs mt-1">{scale}</p>}
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-16 h-16 rounded-lg bg-[#EDEAE3] border-2 transition-colors overflow-hidden relative ${
              active === i ? "border-[#1A1A1A]" : "border-transparent"
            }`}
          >
            {imageUrl && i === 0 && (
              <Image src={imageUrl} alt={productName} fill className="object-cover" sizes="64px" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
