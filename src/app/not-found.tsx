import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 px-4 text-center">
      <p className="text-7xl font-bold text-[#E0DDD6]">404</p>
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]">페이지를 찾을 수 없어요</h1>
        <p className="text-sm text-[#888] mt-2">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      </div>
      <Link
        href="/shop"
        className="mt-2 px-6 py-2.5 bg-[#1A1A1A] text-white text-sm font-medium rounded hover:bg-[#E63946] transition-colors"
      >
        쇼핑 계속하기
      </Link>
    </div>
  );
}
