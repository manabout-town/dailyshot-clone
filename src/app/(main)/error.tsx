"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 px-4 text-center">
      <p className="text-5xl font-bold text-[#E0DDD6]">!</p>
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]">오류가 발생했습니다</h1>
        <p className="text-sm text-[#888] mt-2">예상치 못한 오류가 발생했습니다. 다시 시도해주세요.</p>
      </div>
      <button
        onClick={reset}
        className="px-6 py-2.5 bg-[#1A1A1A] text-white text-sm font-medium rounded hover:bg-[#E63946] transition-colors"
      >
        다시 시도
      </button>
    </div>
  );
}
