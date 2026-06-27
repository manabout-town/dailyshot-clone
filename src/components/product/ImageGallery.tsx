"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductImage } from "@/types/database";

type ImageGalleryProps = {
  productName: string;
  scale: string | null;
  product_images: ProductImage[];
  fallbackUrl: string | null | undefined;
};

export default function ImageGallery({ productName, scale, product_images, fallbackUrl }: ImageGalleryProps) {
  const images =
    product_images.length > 0
      ? product_images.slice().sort((a, b) => a.position - b.position)
      : fallbackUrl
      ? [{ id: "fallback", product_id: "", url: fallbackUrl, position: 0 }]
      : [];

  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  const activeUrl = images[active]?.url ?? null;

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-square rounded-xl bg-[#EDEAE3] overflow-hidden relative group">
        {activeUrl ? (
          <Image
            src={activeUrl}
            alt={`${productName} - ${active + 1}`}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-center text-[#9CA3AF]">
            <div>
              <p className="text-5xl mb-2">F</p>
              <p className="text-sm font-medium">{productName}</p>
              {scale && <p className="text-xs mt-1">{scale}</p>}
            </div>
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="이전 이미지"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              aria-label="다음 이미지"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`이미지 ${i + 1}`}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === active ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 0 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              aria-label={`이미지 ${i + 1} 선택`}
              className={`w-16 h-16 rounded-lg bg-[#EDEAE3] border-2 transition-colors overflow-hidden relative shrink-0 ${active === i ? "border-[#1A1A1A]" : "border-transparent hover:border-[#9CA3AF]"}`}
            >
              <Image
                src={img.url}
                alt={`${productName} 썸네일 ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
