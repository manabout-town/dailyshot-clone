"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import CartIcon from "@/components/cart/CartIcon";

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F7F6F3]/95 backdrop-blur-sm border-b border-[#E0DDD6]">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
        <Link href="/shop" className="font-display text-xl font-bold tracking-tight shrink-0">
          FS<span className="text-[#E63946]">.</span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-sm hidden sm:flex ml-6">
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="브랜드, 시리즈, 상품명..."
              className="w-full pl-3 pr-9 py-1.5 bg-[#EDEAE3] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] placeholder:text-[#888] border-0"
            />
            <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#1A1A1A]">
              <Search size={14} />
            </button>
          </div>
        </form>

        <nav className="hidden sm:flex items-center gap-5 text-sm ml-auto text-[#888]">
          <Link href="/products" className="hover:text-[#1A1A1A] transition-colors">전체</Link>
          <Link href="/products?category=anime" className="hover:text-[#1A1A1A] transition-colors">애니</Link>
          <Link href="/products?category=game" className="hover:text-[#1A1A1A] transition-colors">게임</Link>
          <Link href="/products?category=movie" className="hover:text-[#1A1A1A] transition-colors">영화</Link>
          <CartIcon />
          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/shop" })}
              className="text-[#E63946] hover:text-[#1A1A1A] transition-colors text-sm"
            >
              로그아웃
            </button>
          ) : (
            <Link href="/login" className="px-3 py-1.5 bg-[#1A1A1A] text-white text-xs rounded hover:bg-[#E63946] transition-colors">
              로그인
            </Link>
          )}
        </nav>

        <div className="sm:hidden ml-auto flex items-center gap-3">
          <CartIcon />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴"
            className="text-[#1A1A1A]"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t border-[#E0DDD6] bg-[#F7F6F3] px-4 py-3 flex flex-col gap-3 text-sm">
          <form onSubmit={handleSearch}>
            <div className="relative w-full">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="브랜드, 시리즈, 상품명..."
                className="w-full pl-3 pr-9 py-1.5 bg-[#EDEAE3] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] placeholder:text-[#888]"
              />
              <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#888]">
                <Search size={14} />
              </button>
            </div>
          </form>
          <Link href="/products" onClick={() => setMenuOpen(false)} className="text-[#1A1A1A]">전체 상품</Link>
          <Link href="/products?category=anime" onClick={() => setMenuOpen(false)} className="text-[#1A1A1A]">애니메이션</Link>
          <Link href="/products?category=game" onClick={() => setMenuOpen(false)} className="text-[#1A1A1A]">게임</Link>
          <Link href="/products?category=movie" onClick={() => setMenuOpen(false)} className="text-[#1A1A1A]">영화</Link>
          {session ? (
            <button onClick={() => signOut({ callbackUrl: "/shop" })} className="text-[#E63946] text-left text-sm">
              로그아웃
            </button>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)} className="text-[#1A1A1A]">로그인</Link>
          )}
        </div>
      )}
    </header>
  );
}
