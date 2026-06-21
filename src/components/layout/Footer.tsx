import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#9CA3AF]">
        <p>© 2026 FigureShop. All rights reserved.</p>
        <nav className="flex gap-6">
          <Link href="/products" className="hover:text-[#0A0A0A] transition-colors">상품 목록</Link>
          <Link href="/search" className="hover:text-[#0A0A0A] transition-colors">검색</Link>
        </nav>
      </div>
    </footer>
  );
}
