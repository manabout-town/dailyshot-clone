"use client";

import { useState } from "react";

type ImageGalleryProps = {
  productName: string;
  scale: string | null;
};

export default function ImageGallery({ productName, scale }: ImageGalleryProps) {
  const [active, setActive] = useState(0);
  const slots = [0, 1, 2, 3];

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="aspect-square rounded-xl bg-[#F8F8F8] flex items-center justify-center">
        <div className="text-center text-[#9CA3AF]">
          <p className="text-5xl mb-2">🎎</p>
          <p className="text-sm font-medium">{productName}</p>
          {scale && <p className="text-xs mt-1">{scale}</p>}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2">
        {slots.map((i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-16 h-16 rounded-lg bg-[#F8F8F8] border-2 transition-colors ${
              active === i ? "border-[#0A0A0A]" : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
