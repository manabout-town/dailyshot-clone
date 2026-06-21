"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        <Link href="/" className="text-xl font-bold tracking-tight shrink-0">
          FIGURE<span className="text-[#E63946]">SHOP</span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden sm:flex">
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="피규어 검색..."
              className="w-full pl-4 pr-10 py-2 rounded-full border border-[#E5E7EB] text-sm focus:outline-none focus:border-[#0A0A0A]"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#0A0A0A]">
              <Search size={16} />
            </button>
          </div>
        </form>

        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium ml-auto">
          <Link href="/products" className="hover:text-[#E63946] transition-colors">전체 상품</Link>
          <Link href="/products?category=anime" className="hover:text-[#E63946] transition-colors">애니메이션</Link>
          <Link href="/products?category=game" className="hover:text-[#E63946] transition-colors">게임</Link>
          <Link href="/products?category=movie" className="hover:text-[#E63946] transition-colors">영화</Link>
        </nav>

        <button
          className="sm:hidden ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t border-[#E5E7EB] px-4 py-3 flex flex-col gap-3 text-sm font-medium">
          <form onSubmit={handleSearch} className="flex">
            <div className="relative w-full">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="피규어 검색..."
                className="w-full pl-4 pr-10 py-2 rounded-full border border-[#E5E7EB] text-sm focus:outline-none focus:border-[#0A0A0A]"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                <Search size={16} />
              </button>
            </div>
          </form>
          <Link href="/products" onClick={() => setMenuOpen(false)}>전체 상품</Link>
          <Link href="/products?category=anime" onClick={() => setMenuOpen(false)}>애니메이션</Link>
          <Link href="/products?category=game" onClick={() => setMenuOpen(false)}>게임</Link>
          <Link href="/products?category=movie" onClick={() => setMenuOpen(false)}>영화</Link>
        </div>
      )}
    </header>
  );
}
