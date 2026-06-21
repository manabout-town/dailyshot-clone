# 피규어샵 Phase 1+2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Next.js 14 + Supabase 기반 피규어 e-commerce 카탈로그 — 메인/목록/상세/검색 페이지까지 Vercel 배포.

**Architecture:** App Router + 서버 컴포넌트가 Supabase에서 직접 fetch. 필터는 URL search params으로 관리해 뒤로가기 지원. 메인/상세는 ISR, 목록/검색은 dynamic server render.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Supabase (DB + Storage), Lucide React, clsx, tailwind-merge, Vitest

---

## File Map

```
dailyshot-clone/
├── .env.local
├── next.config.mjs
├── tailwind.config.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── page.tsx                        # 메인
│   │   ├── products/
│   │   │   ├── page.tsx                    # 목록
│   │   │   └── [id]/page.tsx               # 상세
│   │   └── search/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── CategoryGrid.tsx
│   │   │   └── FeaturedProducts.tsx
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   ├── FilterChips.tsx
│   │   │   ├── SortSelect.tsx
│   │   │   ├── ImageGallery.tsx
│   │   │   └── RelatedProducts.tsx
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       └── Skeleton.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   └── server.ts
│   │   ├── queries.ts                      # Supabase 쿼리 함수 모음
│   │   └── utils.ts
│   └── types/
│       └── database.ts
├── supabase/
│   ├── schema.sql
│   └── seed.sql
└── src/__tests__/
    └── utils.test.ts
```

---

## Task 1: 프로젝트 부트스트랩

**Files:**
- Create: `package.json` (via create-next-app)
- Create: `.env.local`
- Create: `src/__tests__/utils.test.ts`

- [ ] **Step 1: create-next-app 실행**

```bash
cd /Users/park/Desktop/dailyshot-clone
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

프롬프트 나오면 전부 기본값(Enter).

- [ ] **Step 2: 추가 의존성 설치**

```bash
npm install framer-motion @supabase/supabase-js @supabase/ssr lucide-react clsx tailwind-merge
npm install -D vitest @vitejs/plugin-react
```

- [ ] **Step 3: vitest 설정**

`vitest.config.ts` 생성:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "node",
  },
});
```

`package.json` scripts에 추가:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: .env.local 생성**

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EOF
```

Supabase 대시보드 → Project Settings → API에서 값 복사.

- [ ] **Step 5: 빈 테스트 파일 작성 후 통과 확인**

`src/__tests__/utils.test.ts`:

```ts
import { describe, it, expect } from "vitest";

describe("placeholder", () => {
  it("passes", () => {
    expect(true).toBe(true);
  });
});
```

```bash
npm test
```

Expected: `1 passed`

- [ ] **Step 6: 개발 서버 기동 확인**

```bash
npm run dev
```

Expected: `http://localhost:3000` → Next.js 기본 페이지 표시.

- [ ] **Step 7: 커밋**

```bash
git add -A
git commit -m "chore: bootstrap Next.js 14 project with Supabase + Vitest"
```

---

## Task 2: Supabase 스키마 + 시드 데이터

**Files:**
- Create: `supabase/schema.sql`
- Create: `supabase/seed.sql`

- [ ] **Step 1: schema.sql 작성**

`supabase/schema.sql`:

```sql
create table brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_ko text,
  logo_url text,
  created_at timestamptz default now()
);

create table series (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_ko text,
  brand_id uuid references brands(id),
  created_at timestamptz default now()
);

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  priority int default 0
);

create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_ko text,
  description text,
  price int not null,
  original_price int,
  brand_id uuid references brands(id),
  series_id uuid references series(id),
  category_id uuid references categories(id),
  stock int not null default 0,
  scale text,
  is_active boolean default true,
  is_featured boolean default false,
  release_date date,
  created_at timestamptz default now()
);

create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  url text not null,
  position int default 0
);
```

- [ ] **Step 2: Supabase SQL Editor에서 schema.sql 실행**

Supabase 대시보드 → SQL Editor → schema.sql 내용 붙여넣고 Run.

Expected: 5개 테이블 생성 (`brands`, `series`, `categories`, `products`, `product_images`)

- [ ] **Step 3: seed.sql 작성**

`supabase/seed.sql`:

```sql
-- 브랜드
insert into brands (name, name_ko) values
  ('Good Smile Company', '굿스마일'),
  ('Bandai', '반다이'),
  ('Kotobukiya', '코토부키야'),
  ('Max Factory', '맥스팩토리'),
  ('Alter', '알터');

-- 카테고리
insert into categories (name, slug, priority) values
  ('애니메이션', 'anime', 1),
  ('게임', 'game', 2),
  ('스포츠', 'sports', 3),
  ('영화', 'movie', 4);

-- 시리즈 (brand_id는 서브쿼리로)
insert into series (name, name_ko, brand_id) values
  ('One Piece', '원피스', (select id from brands where name = 'Bandai')),
  ('Demon Slayer', '귀멸의 칼날', (select id from brands where name = 'Good Smile Company')),
  ('Hololive', '홀로라이브', (select id from brands where name = 'Good Smile Company')),
  ('Final Fantasy', '파이널판타지', (select id from brands where name = 'Kotobukiya'));

-- 상품 (20개)
insert into products (name, name_ko, price, original_price, brand_id, series_id, category_id, stock, scale, is_active, is_featured) values
  ('Monkey D. Luffy', '몽키 D. 루피', 89000, null,
    (select id from brands where name = 'Bandai'),
    (select id from series where name = 'One Piece'),
    (select id from categories where slug = 'anime'),
    10, '1/8', true, true),

  ('Roronoa Zoro', '롤로노아 조로', 95000, 110000,
    (select id from brands where name = 'Bandai'),
    (select id from series where name = 'One Piece'),
    (select id from categories where slug = 'anime'),
    5, '1/8', true, true),

  ('Tanjiro Kamado', '카마도 탄지로', 79000, null,
    (select id from brands where name = 'Good Smile Company'),
    (select id from series where name = 'Demon Slayer'),
    (select id from categories where slug = 'anime'),
    8, '1/7', true, true),

  ('Nezuko Kamado', '카마도 네즈코', 75000, 85000,
    (select id from brands where name = 'Good Smile Company'),
    (select id from series where name = 'Demon Slayer'),
    (select id from categories where slug = 'anime'),
    3, '1/7', true, false),

  ('Hatsune Miku', '하츠네 미쿠', 135000, null,
    (select id from brands where name = 'Good Smile Company'),
    null,
    (select id from categories where slug = 'anime'),
    12, 'Nendoroid', true, true),

  ('Cloud Strife', '클라우드 스트라이프', 185000, 210000,
    (select id from brands where name = 'Kotobukiya'),
    (select id from series where name = 'Final Fantasy'),
    (select id from categories where slug = 'game'),
    4, '1/6', true, true),

  ('Tifa Lockhart', '티파 록하트', 175000, null,
    (select id from brands where name = 'Kotobukiya'),
    (select id from series where name = 'Final Fantasy'),
    (select id from categories where slug = 'game'),
    6, '1/6', true, false),

  ('Aerith Gainsborough', '에어리스 게인즈버러', 165000, 190000,
    (select id from brands where name = 'Alter'),
    (select id from series where name = 'Final Fantasy'),
    (select id from categories where slug = 'game'),
    2, '1/7', true, true),

  ('Son Goku', '손오공', 99000, null,
    (select id from brands where name = 'Bandai'),
    null,
    (select id from categories where slug = 'anime'),
    15, 'S.H.Figuarts', true, false),

  ('Vegeta', '베지터', 99000, 115000,
    (select id from brands where name = 'Bandai'),
    null,
    (select id from categories where slug = 'anime'),
    7, 'S.H.Figuarts', true, false),

  ('Link', '링크', 145000, null,
    (select id from brands where name = 'Good Smile Company'),
    null,
    (select id from categories where slug = 'game'),
    9, '1/7', true, true),

  ('Samus Aran', '사무스 아란', 155000, 175000,
    (select id from brands where name = 'Good Smile Company'),
    null,
    (select id from categories where slug = 'game'),
    3, '1/8', true, false),

  ('Iron Man', '아이언맨', 125000, null,
    (select id from brands where name = 'Bandai'),
    null,
    (select id from categories where slug = 'movie'),
    11, 'S.H.Figuarts', true, true),

  ('Spider-Man', '스파이더맨', 115000, 130000,
    (select id from brands where name = 'Bandai'),
    null,
    (select id from categories where slug = 'movie'),
    8, 'S.H.Figuarts', true, false),

  ('Batman', '배트맨', 135000, null,
    (select id from brands where name = 'Kotobukiya'),
    null,
    (select id from categories where slug = 'movie'),
    5, '1/6', true, false),

  ('Makima', '마키마', 145000, 165000,
    (select id from brands where name = 'Good Smile Company'),
    null,
    (select id from categories where slug = 'anime'),
    4, '1/7', true, true),

  ('Denji', '덴지', 95000, null,
    (select id from brands where name = 'Max Factory'),
    null,
    (select id from categories where slug = 'anime'),
    6, 'Figma', true, false),

  ('Lara Croft', '라라 크로프트', 195000, 220000,
    (select id from brands where name = 'Kotobukiya'),
    null,
    (select id from categories where slug = 'game'),
    2, '1/6', true, false),

  ('Asuka Langley', '아스카 랑레이', 155000, null,
    (select id from brands where name = 'Alter'),
    null,
    (select id from categories where slug = 'anime'),
    7, '1/7', true, false),

  ('Rei Ayanami', '레이 아야나미', 149000, 169000,
    (select id from brands where name = 'Alter'),
    null,
    (select id from categories where slug = 'anime'),
    5, '1/7', true, false);
```

- [ ] **Step 4: seed.sql 실행**

Supabase SQL Editor에서 seed.sql 내용 Run.

Expected: 5브랜드, 4카테고리, 4시리즈, 20상품 삽입.

- [ ] **Step 5: 커밋**

```bash
git add supabase/
git commit -m "chore: add Supabase schema and seed data"
```

---

## Task 3: 타입 정의 + 유틸리티

**Files:**
- Create: `src/types/database.ts`
- Create: `src/lib/utils.ts`
- Modify: `src/__tests__/utils.test.ts`

- [ ] **Step 1: utils.test.ts 작성**

```ts
import { describe, it, expect } from "vitest";
import { formatKRW, getDiscountRate, cn } from "@/lib/utils";

describe("formatKRW", () => {
  it("formats numbers with Korean locale commas", () => {
    expect(formatKRW(89000)).toBe("89,000");
    expect(formatKRW(1000000)).toBe("1,000,000");
    expect(formatKRW(0)).toBe("0");
  });
});

describe("getDiscountRate", () => {
  it("calculates discount percentage", () => {
    expect(getDiscountRate(90000, 100000)).toBe(10);
    expect(getDiscountRate(75000, 100000)).toBe(25);
  });
  it("rounds to nearest integer", () => {
    expect(getDiscountRate(66000, 99000)).toBe(33);
  });
});

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("a", "b")).toBe("a b");
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
npm test
```

Expected: FAIL (utils.ts 없음)

- [ ] **Step 3: utils.ts 작성**

`src/lib/utils.ts`:

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKRW(amount: number): string {
  return amount.toLocaleString("ko-KR");
}

export function getDiscountRate(price: number, originalPrice: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
npm test
```

Expected: `3 passed`

- [ ] **Step 5: types/database.ts 작성**

`src/types/database.ts`:

```ts
export type Brand = {
  id: string;
  name: string;
  name_ko: string | null;
  logo_url: string | null;
  created_at: string;
};

export type Series = {
  id: string;
  name: string;
  name_ko: string | null;
  brand_id: string;
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  priority: number;
};

export type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  position: number;
};

export type Product = {
  id: string;
  name: string;
  name_ko: string | null;
  description: string | null;
  price: number;
  original_price: number | null;
  brand_id: string;
  series_id: string | null;
  category_id: string;
  stock: number;
  scale: string | null;
  is_active: boolean;
  is_featured: boolean;
  release_date: string | null;
  created_at: string;
  brand?: Brand;
  series?: Series | null;
  category?: Category;
  product_images?: ProductImage[];
};

export type ProductFilters = {
  category?: string;
  brand?: string;
  scale?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "price_asc" | "price_desc";
  page?: number;
  q?: string;
};
```

- [ ] **Step 6: Supabase 클라이언트 작성**

`src/lib/supabase/client.ts`:

```ts
import { createBrowserClient } from "@supabase/ssr";

export function getSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

`src/lib/supabase/server.ts`:

```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
}
```

- [ ] **Step 7: queries.ts 작성**

`src/lib/queries.ts`:

```ts
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ProductFilters } from "@/types/database";

const PRODUCT_SELECT = `
  id, name, name_ko, price, original_price, stock, scale, is_active, is_featured, release_date, created_at,
  brand:brands(id, name, name_ko),
  series:series(id, name, name_ko),
  category:categories(id, name, slug),
  product_images(id, url, position)
`;

export async function getProducts(filters: ProductFilters = {}) {
  const supabase = createSupabaseServerClient();
  const { category, brand, scale, minPrice, maxPrice, sort = "newest", page = 1 } = filters;
  const PAGE_SIZE = 24;

  // 조인 테이블 컬럼은 직접 .eq() 불가 → ID 먼저 resolve
  const [categoryResult, brandResult] = await Promise.all([
    category
      ? supabase.from("categories").select("id").eq("slug", category).single()
      : Promise.resolve({ data: null }),
    brand
      ? supabase.from("brands").select("id").eq("name_ko", brand).single()
      : Promise.resolve({ data: null }),
  ]);

  let query = supabase
    .from("products")
    .select(PRODUCT_SELECT, { count: "exact" })
    .eq("is_active", true);

  if (categoryResult.data) query = query.eq("category_id", categoryResult.data.id);
  if (brandResult.data) query = query.eq("brand_id", brandResult.data.id);
  if (scale) query = query.eq("scale", scale);
  if (minPrice) query = query.gte("price", minPrice);
  if (maxPrice) query = query.lte("price", maxPrice);

  if (sort === "price_asc") query = query.order("price", { ascending: true });
  else if (sort === "price_desc") query = query.order("price", { ascending: false });
  else query = query.order("created_at", { ascending: false });

  const from = (page - 1) * PAGE_SIZE;
  query = query.range(from, from + PAGE_SIZE - 1);

  return query;
}

export async function getProductById(id: string) {
  const supabase = createSupabaseServerClient();
  return supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", id)
    .eq("is_active", true)
    .single();
}

export async function getFeaturedProducts() {
  const supabase = createSupabaseServerClient();
  return supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_featured", true)
    .eq("is_active", true)
    .limit(8);
}

export async function getRelatedProducts(seriesId: string | null, categoryId: string, excludeId: string) {
  const supabase = createSupabaseServerClient();
  let query = supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .neq("id", excludeId)
    .limit(4);

  if (seriesId) {
    query = query.eq("series_id", seriesId);
  } else {
    query = query.eq("category_id", categoryId);
  }
  return query;
}

export async function searchProducts(q: string) {
  const supabase = createSupabaseServerClient();
  const term = `%${q}%`;
  return supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .or(`name.ilike.${term},name_ko.ilike.${term}`)
    .limit(48);
}

export async function getCategories() {
  const supabase = createSupabaseServerClient();
  return supabase.from("categories").select("*").order("priority");
}

export async function getBrands() {
  const supabase = createSupabaseServerClient();
  return supabase.from("brands").select("id, name, name_ko").order("name");
}
```

- [ ] **Step 8: tsc 통과 확인**

```bash
npx tsc --noEmit
```

Expected: 에러 없음.

- [ ] **Step 9: 커밋**

```bash
git add src/types/ src/lib/
git commit -m "feat: add database types, utils, and Supabase query helpers"
```

---

## Task 4: 글로벌 레이아웃

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: globals.css 설정**

`src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&family=Inter:wght@400;500;600;700&display=swap');

:root {
  --font-korean: 'Noto Sans KR', sans-serif;
  --font-sans: 'Inter', sans-serif;
}

body {
  font-family: var(--font-sans);
  color: #0A0A0A;
  background: #FFFFFF;
}

.font-korean {
  font-family: var(--font-korean);
}
```

- [ ] **Step 2: Header 작성**

`src/components/layout/Header.tsx`:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, X, ShoppingCart, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        {/* 로고 */}
        <Link
          href="/"
          className="shrink-0 font-korean text-xl font-black tracking-tight text-black"
        >
          피규어샵
        </Link>

        {/* 검색바 */}
        <form
          onSubmit={handleSearch}
          className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 focus-within:border-black focus-within:bg-white transition-colors"
        >
          <Search className="h-4 w-4 shrink-0 text-gray-400" strokeWidth={1.8} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="브랜드, 시리즈, 캐릭터 검색"
            className="flex-1 bg-transparent font-korean text-sm text-black placeholder:text-gray-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="shrink-0 text-gray-400 hover:text-gray-700"
            >
              <X className="h-4 w-4" strokeWidth={1.8} />
            </button>
          )}
        </form>

        {/* 네비 */}
        <nav className="hidden items-center gap-1 sm:flex">
          {[
            { href: "/products", label: "전체상품" },
            { href: "/products?category=anime", label: "애니" },
            { href: "/products?category=game", label: "게임" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-lg px-3 py-2 font-korean text-sm font-medium transition-colors",
                pathname === href
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          className="rounded-xl border border-gray-200 p-2.5 text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="장바구니"
        >
          <ShoppingCart className="h-5 w-5" strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Footer 작성**

`src/components/layout/Footer.tsx`:

```tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-korean text-lg font-black text-black">피규어샵</p>
            <p className="mt-1 font-korean text-sm text-gray-500">
              국내외 피규어 전문 쇼핑몰
            </p>
          </div>
          <nav className="flex flex-wrap gap-4 font-korean text-sm text-gray-500">
            <Link href="/products" className="hover:text-black">전체상품</Link>
            <Link href="/products?category=anime" className="hover:text-black">애니메이션</Link>
            <Link href="/products?category=game" className="hover:text-black">게임</Link>
            <Link href="/products?category=movie" className="hover:text-black">영화</Link>
          </nav>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="font-korean text-xs text-gray-400">
            © 2026 피규어샵. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: layout.tsx 수정**

`src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "피규어샵 — 피규어 전문 쇼핑몰",
  description: "반다이, 굿스마일, 코토부키야 등 국내외 피규어 전문 쇼핑몰",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 5: 빌드 확인**

```bash
npm run build
```

Expected: 에러 없이 빌드 완료.

- [ ] **Step 6: 커밋**

```bash
git add src/app/layout.tsx src/app/globals.css src/components/layout/
git commit -m "feat: add global layout with Header and Footer"
```

---

## Task 5: 공통 UI 컴포넌트

**Files:**
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Skeleton.tsx`

- [ ] **Step 1: Badge 작성**

`src/components/ui/Badge.tsx`:

```tsx
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "discount" | "soldout" | "new";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold font-korean",
        variant === "default" && "bg-gray-100 text-gray-700",
        variant === "discount" && "bg-red-50 text-red-600",
        variant === "soldout" && "bg-gray-200 text-gray-500",
        variant === "new" && "bg-black text-white",
        className
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 2: Skeleton 작성**

`src/components/ui/Skeleton.tsx`:

```tsx
import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-gray-100", className)}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-square w-full rounded-2xl" />
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-5 w-1/2" />
    </div>
  );
}
```

- [ ] **Step 3: 커밋**

```bash
git add src/components/ui/
git commit -m "feat: add Badge and Skeleton UI components"
```

---

## Task 6: 상품 카드 + 그리드

**Files:**
- Create: `src/components/product/ProductCard.tsx`
- Create: `src/components/product/ProductGrid.tsx`

- [ ] **Step 1: ProductCard 작성**

`src/components/product/ProductCard.tsx`:

```tsx
import Link from "next/link";
import Image from "next/image";
import { cn, formatKRW, getDiscountRate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/types/database";

interface Props {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: Props) {
  const mainImage = product.product_images?.sort((a, b) => a.position - b.position)[0];
  const hasDiscount = product.original_price != null && product.original_price > product.price;
  const discountRate = hasDiscount ? getDiscountRate(product.price, product.original_price!) : 0;
  const isSoldOut = product.stock === 0;

  return (
    <Link
      href={`/products/${product.id}`}
      className={cn("group flex flex-col gap-3", className)}
    >
      {/* 이미지 */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square">
        {mainImage ? (
          <Image
            src={mainImage.url}
            alt={product.name_ko ?? product.name}
            fill
            className={cn(
              "object-cover transition-transform duration-300 group-hover:scale-105",
              isSoldOut && "opacity-50"
            )}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-300">
            <span className="font-korean text-sm">이미지 없음</span>
          </div>
        )}
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Badge variant="soldout">품절</Badge>
          </div>
        )}
        {hasDiscount && !isSoldOut && (
          <div className="absolute left-2 top-2">
            <Badge variant="discount">{discountRate}%</Badge>
          </div>
        )}
      </div>

      {/* 정보 */}
      <div className="flex flex-col gap-1">
        <p className="font-korean text-xs font-medium text-gray-400">
          {product.brand?.name_ko ?? product.brand?.name}
          {product.scale && ` · ${product.scale}`}
        </p>
        <p className="font-korean text-sm font-semibold text-black line-clamp-2 group-hover:text-red-500 transition-colors">
          {product.name_ko ?? product.name}
        </p>
        <div className="flex items-baseline gap-1.5">
          <span className="font-korean text-base font-bold tabular-nums text-black">
            ₩{formatKRW(product.price)}
          </span>
          {hasDiscount && (
            <span className="font-korean text-xs tabular-nums text-gray-400 line-through">
              ₩{formatKRW(product.original_price!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: ProductGrid 작성**

`src/components/product/ProductGrid.tsx`:

```tsx
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import type { Product } from "@/types/database";

interface Props {
  products: Product[];
  loading?: boolean;
}

export function ProductGrid({ products, loading = false }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-korean text-gray-400">상품이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: 커밋**

```bash
git add src/components/product/ProductCard.tsx src/components/product/ProductGrid.tsx
git commit -m "feat: add ProductCard and ProductGrid components"
```

---

## Task 7: 메인 페이지

**Files:**
- Create: `src/components/home/HeroSection.tsx`
- Create: `src/components/home/CategoryGrid.tsx`
- Create: `src/components/home/FeaturedProducts.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: HeroSection 작성**

`src/components/home/HeroSection.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="bg-black py-24 text-white">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl px-4 text-center"
      >
        <p className="mb-4 font-korean text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
          Figure Collection
        </p>
        <h1 className="mb-6 font-korean text-5xl font-black leading-tight sm:text-7xl">
          당신의 컬렉션을<br />완성하세요
        </h1>
        <p className="mb-10 font-korean text-lg text-gray-400">
          반다이 · 굿스마일 · 코토부키야 등<br className="sm:hidden" /> 국내외 피규어 전문 쇼핑몰
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/products"
            className="inline-flex h-13 items-center gap-2 rounded-full bg-red-500 px-8 font-korean text-base font-bold text-white transition-all hover:bg-red-600 active:scale-95"
          >
            전체 상품 보기
          </Link>
          <Link
            href="/products?is_featured=true"
            className="inline-flex h-13 items-center gap-2 rounded-full border border-white/20 px-8 font-korean text-base font-medium text-white transition-all hover:bg-white/10 active:scale-95"
          >
            추천 상품
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: CategoryGrid 작성**

`src/components/home/CategoryGrid.tsx`:

```tsx
import Link from "next/link";
import { getCategories } from "@/lib/queries";

const CATEGORY_COLORS: Record<string, string> = {
  anime: "bg-purple-50 hover:bg-purple-100",
  game: "bg-blue-50 hover:bg-blue-100",
  sports: "bg-green-50 hover:bg-green-100",
  movie: "bg-amber-50 hover:bg-amber-100",
};

const CATEGORY_EMOJI: Record<string, string> = {
  anime: "🎌",
  game: "🎮",
  sports: "⚽",
  movie: "🎬",
};

export async function CategoryGrid() {
  const { data: categories } = await getCategories();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="mb-6 font-korean text-2xl font-bold text-black">카테고리</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(categories ?? []).map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className={`group flex flex-col gap-2 rounded-2xl p-6 transition-colors ${CATEGORY_COLORS[cat.slug] ?? "bg-gray-50 hover:bg-gray-100"}`}
          >
            <span className="text-3xl">{CATEGORY_EMOJI[cat.slug] ?? "📦"}</span>
            <span className="font-korean text-lg font-bold text-black group-hover:text-red-500 transition-colors">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: FeaturedProducts 작성**

`src/components/home/FeaturedProducts.tsx`:

```tsx
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/queries";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { Product } from "@/types/database";

export async function FeaturedProducts() {
  const { data: products } = await getFeaturedProducts();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-korean text-2xl font-bold text-black">추천 상품</h2>
        <Link
          href="/products"
          className="font-korean text-sm font-medium text-gray-500 hover:text-black transition-colors"
        >
          전체보기 →
        </Link>
      </div>
      <ProductGrid products={(products ?? []) as Product[]} />
    </section>
  );
}
```

- [ ] **Step 4: 메인 page.tsx 작성**

`src/app/page.tsx`:

```tsx
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

export const revalidate = 3600; // ISR 1시간

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
    </>
  );
}
```

- [ ] **Step 5: 개발 서버에서 메인 페이지 확인**

```bash
npm run dev
```

`http://localhost:3000` → Hero + 카테고리 4개 + 추천 상품 그리드 표시 확인.

- [ ] **Step 6: 커밋**

```bash
git add src/components/home/ src/app/page.tsx
git commit -m "feat: add home page with Hero, CategoryGrid, FeaturedProducts"
```

---

## Task 8: 상품 목록 페이지

**Files:**
- Create: `src/components/product/ProductFilters.tsx`
- Create: `src/components/product/FilterChips.tsx`
- Create: `src/components/product/SortSelect.tsx`
- Create: `src/app/products/page.tsx`

- [ ] **Step 1: SortSelect 작성**

`src/components/product/SortSelect.tsx`:

```tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") ?? "newest";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    params.delete("page");
    router.push(`/products?${params.toString()}`);
  };

  return (
    <select
      value={current}
      onChange={handleChange}
      className="rounded-lg border border-gray-200 px-3 py-2 font-korean text-sm text-black focus:border-black focus:outline-none"
    >
      <option value="newest">최신순</option>
      <option value="price_asc">낮은 가격순</option>
      <option value="price_desc">높은 가격순</option>
    </select>
  );
}
```

- [ ] **Step 2: FilterChips 작성**

`src/components/product/FilterChips.tsx`:

```tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

const FILTER_LABELS: Record<string, string> = {
  category: "카테고리",
  brand: "브랜드",
  scale: "스케일",
};

export function FilterChips() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeFilters = ["category", "brand", "scale"].filter(
    (key) => searchParams.get(key)
  );

  if (activeFilters.length === 0) return null;

  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    params.delete("page");
    router.push(`/products?${params.toString()}`);
  };

  const clearAll = () => router.push("/products");

  return (
    <div className="flex flex-wrap items-center gap-2">
      {activeFilters.map((key) => (
        <button
          key={key}
          onClick={() => removeFilter(key)}
          className="inline-flex items-center gap-1 rounded-full border border-black bg-black px-3 py-1.5 font-korean text-xs font-semibold text-white"
        >
          {FILTER_LABELS[key]}: {searchParams.get(key)}
          <X className="h-3 w-3" strokeWidth={2.5} />
        </button>
      ))}
      <button
        onClick={clearAll}
        className="font-korean text-xs text-gray-400 hover:text-black underline"
      >
        전체 초기화
      </button>
    </div>
  );
}
```

- [ ] **Step 3: ProductFilters 작성**

`src/components/product/ProductFilters.tsx`:

```tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Brand, Category } from "@/types/database";

const SCALES = ["1/4", "1/6", "1/7", "1/8", "Nendoroid", "Figma", "S.H.Figuarts"];

interface Props {
  categories: Category[];
  brands: Brand[];
}

export function ProductFilters({ categories, brands }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`/products?${params.toString()}`);
  };

  const current = {
    category: searchParams.get("category"),
    brand: searchParams.get("brand"),
    scale: searchParams.get("scale"),
  };

  return (
    <aside className="flex flex-col gap-6 w-52 shrink-0">
      {/* 카테고리 */}
      <div>
        <p className="mb-3 font-korean text-xs font-bold uppercase tracking-widest text-gray-400">
          카테고리
        </p>
        <ul className="flex flex-col gap-1">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() =>
                  setFilter("category", current.category === cat.slug ? null : cat.slug)
                }
                className={cn(
                  "w-full rounded-lg px-3 py-2 text-left font-korean text-sm font-medium transition-colors",
                  current.category === cat.slug
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                )}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 브랜드 */}
      <div>
        <p className="mb-3 font-korean text-xs font-bold uppercase tracking-widest text-gray-400">
          브랜드
        </p>
        <ul className="flex flex-col gap-1">
          {brands.map((brand) => (
            <li key={brand.id}>
              <button
                onClick={() =>
                  setFilter("brand", current.brand === brand.name_ko ? null : brand.name_ko)
                }
                className={cn(
                  "w-full rounded-lg px-3 py-2 text-left font-korean text-sm font-medium transition-colors",
                  current.brand === brand.name_ko
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                )}
              >
                {brand.name_ko ?? brand.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 스케일 */}
      <div>
        <p className="mb-3 font-korean text-xs font-bold uppercase tracking-widest text-gray-400">
          스케일
        </p>
        <ul className="flex flex-col gap-1">
          {SCALES.map((scale) => (
            <li key={scale}>
              <button
                onClick={() =>
                  setFilter("scale", current.scale === scale ? null : scale)
                }
                className={cn(
                  "w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
                  current.scale === scale
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                )}
              >
                {scale}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
```

- [ ] **Step 4: products/page.tsx 작성**

`src/app/products/page.tsx`:

```tsx
import { Suspense } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductFilters } from "@/components/product/ProductFilters";
import { FilterChips } from "@/components/product/FilterChips";
import { SortSelect } from "@/components/product/SortSelect";
import { getProducts, getCategories, getBrands } from "@/lib/queries";
import type { Product, ProductFilters as Filters } from "@/types/database";

interface Props {
  searchParams: {
    category?: string;
    brand?: string;
    scale?: string;
    sort?: string;
    page?: string;
  };
}

export const dynamic = "force-dynamic";

export default async function ProductsPage({ searchParams }: Props) {
  const filters: Filters = {
    category: searchParams.category,
    brand: searchParams.brand,
    scale: searchParams.scale,
    sort: (searchParams.sort as Filters["sort"]) ?? "newest",
    page: searchParams.page ? parseInt(searchParams.page) : 1,
  };

  const [{ data: products, count }, { data: categories }, { data: brands }] =
    await Promise.all([
      getProducts(filters),
      getCategories(),
      getBrands(),
    ]);

  const totalCount = count ?? 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="font-korean text-2xl font-bold text-black">전체 상품</h1>
        <p className="mt-1 font-korean text-sm text-gray-400">
          총 {totalCount.toLocaleString("ko-KR")}개 상품
        </p>
      </div>

      <div className="flex gap-8">
        {/* 사이드바 필터 */}
        <Suspense>
          <ProductFilters
            categories={categories ?? []}
            brands={brands ?? []}
          />
        </Suspense>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 min-w-0">
          <div className="mb-4 flex items-center justify-between gap-4">
            <Suspense>
              <FilterChips />
            </Suspense>
            <Suspense>
              <SortSelect />
            </Suspense>
          </div>
          <ProductGrid products={(products ?? []) as Product[]} />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: 목록 페이지 동작 확인**

`http://localhost:3000/products` → 상품 그리드, 필터, 정렬 동작 확인.
`http://localhost:3000/products?category=anime` → 애니 필터 적용 확인.

- [ ] **Step 6: 커밋**

```bash
git add src/components/product/ProductFilters.tsx src/components/product/FilterChips.tsx src/components/product/SortSelect.tsx src/app/products/page.tsx
git commit -m "feat: add product list page with filters, sort, and chips"
```

---

## Task 9: 상품 상세 페이지

**Files:**
- Create: `src/components/product/ImageGallery.tsx`
- Create: `src/components/product/RelatedProducts.tsx`
- Create: `src/app/products/[id]/page.tsx`

- [ ] **Step 1: ImageGallery 작성**

`src/components/product/ImageGallery.tsx`:

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types/database";

interface Props {
  images: ProductImage[];
  productName: string;
}

export function ImageGallery({ images, productName }: Props) {
  const sorted = [...images].sort((a, b) => a.position - b.position);
  const [selected, setSelected] = useState(0);

  if (sorted.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-gray-100">
        <span className="font-korean text-sm text-gray-400">이미지 없음</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* 메인 이미지 */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Image
              src={sorted[selected].url}
              alt={`${productName} ${selected + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
              priority={selected === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 썸네일 */}
      {sorted.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sorted.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                i === selected
                  ? "border-black"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={img.url}
                alt={`썸네일 ${i + 1}`}
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
```

- [ ] **Step 2: RelatedProducts 작성**

`src/components/product/RelatedProducts.tsx`:

```tsx
import { getRelatedProducts } from "@/lib/queries";
import { ProductGrid } from "./ProductGrid";
import type { Product } from "@/types/database";

interface Props {
  seriesId: string | null;
  categoryId: string;
  excludeId: string;
}

export async function RelatedProducts({ seriesId, categoryId, excludeId }: Props) {
  const { data: products } = await getRelatedProducts(seriesId, categoryId, excludeId);

  if (!products || products.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-6 font-korean text-xl font-bold text-black">
        {seriesId ? "같은 시리즈 상품" : "비슷한 상품"}
      </h2>
      <ProductGrid products={products as Product[]} />
    </section>
  );
}
```

- [ ] **Step 3: 상세 page.tsx 작성**

`src/app/products/[id]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { ShoppingCart, Package } from "lucide-react";
import { getProductById } from "@/lib/queries";
import { ImageGallery } from "@/components/product/ImageGallery";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Badge } from "@/components/ui/Badge";
import { formatKRW, getDiscountRate } from "@/lib/utils";
import type { Product } from "@/types/database";

export const revalidate = 3600;

interface Props {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: Props) {
  const { data: product, error } = await getProductById(params.id);

  if (error || !product) notFound();

  const p = product as unknown as Product;
  const hasDiscount = p.original_price != null && p.original_price > p.price;
  const discountRate = hasDiscount ? getDiscountRate(p.price, p.original_price!) : 0;
  const isSoldOut = p.stock === 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* 이미지 */}
        <ImageGallery
          images={p.product_images ?? []}
          productName={p.name_ko ?? p.name}
        />

        {/* 정보 */}
        <div className="flex flex-col gap-5">
          {/* 브랜드 + 시리즈 */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">{p.brand?.name_ko ?? p.brand?.name}</Badge>
            {p.series && (
              <Badge variant="default">{p.series.name_ko ?? p.series.name}</Badge>
            )}
            {p.scale && <Badge variant="default">{p.scale}</Badge>}
          </div>

          {/* 상품명 */}
          <div>
            <h1 className="font-korean text-2xl font-bold text-black sm:text-3xl">
              {p.name_ko ?? p.name}
            </h1>
            {p.name_ko && (
              <p className="mt-1 text-sm text-gray-400">{p.name}</p>
            )}
          </div>

          {/* 가격 */}
          <div className="flex items-baseline gap-3">
            <span className="font-korean text-3xl font-black tabular-nums text-black">
              ₩{formatKRW(p.price)}
            </span>
            {hasDiscount && (
              <>
                <span className="font-korean text-lg tabular-nums text-gray-400 line-through">
                  ₩{formatKRW(p.original_price!)}
                </span>
                <Badge variant="discount">{discountRate}% 할인</Badge>
              </>
            )}
          </div>

          {/* 스펙 */}
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-2xl border border-gray-200 p-4 font-korean text-sm">
            {[
              { label: "브랜드", value: p.brand?.name_ko ?? p.brand?.name },
              { label: "스케일", value: p.scale ?? "—" },
              { label: "발매일", value: p.release_date ?? "—" },
              { label: "재고", value: isSoldOut ? "품절" : `${p.stock}개 남음` },
            ].map(({ label, value }) => (
              <>
                <dt key={`dt-${label}`} className="font-medium text-gray-500">{label}</dt>
                <dd key={`dd-${label}`} className="text-black">{value}</dd>
              </>
            ))}
          </dl>

          {/* 장바구니 버튼 */}
          <button
            disabled={isSoldOut}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-black font-korean text-base font-bold text-white transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={2} />
            {isSoldOut ? "품절" : "장바구니 담기"}
          </button>

          {/* 배송 안내 */}
          <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-3">
            <Package className="h-4 w-4 shrink-0 text-gray-400" strokeWidth={1.8} />
            <p className="font-korean text-xs text-gray-500">
              5만원 이상 무료배송 · 평균 3~5일 내 출고
            </p>
          </div>

          {/* 상품 설명 */}
          {p.description && (
            <div className="border-t border-gray-200 pt-5">
              <p className="font-korean text-sm leading-relaxed text-gray-600">
                {p.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 연관 상품 */}
      <RelatedProducts
        seriesId={p.series_id}
        categoryId={p.category_id}
        excludeId={p.id}
      />
    </div>
  );
}
```

- [ ] **Step 4: 상세 페이지 확인**

`http://localhost:3000/products` → 상품 클릭 → 상세 페이지 표시 확인.
이미지 없는 상품 → "이미지 없음" placeholder 표시 확인.

- [ ] **Step 5: 커밋**

```bash
git add src/components/product/ImageGallery.tsx src/components/product/RelatedProducts.tsx src/app/products/
git commit -m "feat: add product detail page with image gallery and related products"
```

---

## Task 10: 검색 페이지

**Files:**
- Create: `src/app/search/page.tsx`

- [ ] **Step 1: search/page.tsx 작성**

`src/app/search/page.tsx`:

```tsx
import { Search } from "lucide-react";
import { searchProducts } from "@/lib/queries";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { Product } from "@/types/database";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: Props) {
  const q = searchParams.q?.trim() ?? "";

  const { data: products } = q ? await searchProducts(q) : { data: [] };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="font-korean text-2xl font-bold text-black">
          {q ? `"${q}" 검색 결과` : "검색"}
        </h1>
        {q && (
          <p className="mt-1 font-korean text-sm text-gray-400">
            {products?.length ?? 0}개 상품 발견
          </p>
        )}
      </div>

      {!q ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <Search className="h-12 w-12 text-gray-200" strokeWidth={1.5} />
          <p className="font-korean text-gray-400">
            위 검색창에서 피규어를 검색하세요
          </p>
        </div>
      ) : (
        <ProductGrid products={(products ?? []) as Product[]} />
      )}
    </div>
  );
}
```

- [ ] **Step 2: 검색 동작 확인**

Header 검색창에 "루피" 입력 → `/search?q=루피` → 상품 표시 확인.
결과 없는 검색어 → "0개 상품 발견" + 빈 상태 확인.

- [ ] **Step 3: 커밋**

```bash
git add src/app/search/page.tsx
git commit -m "feat: add search page"
```

---

## Task 11: 최종 빌드 + Vercel 배포

**Files:**
- Create: `.env.local` (이미 있음, Vercel에 env 추가 필요)

- [ ] **Step 1: 전체 타입 체크**

```bash
npx tsc --noEmit
```

Expected: 에러 없음.

- [ ] **Step 2: 전체 테스트**

```bash
npm test
```

Expected: 3 passed.

- [ ] **Step 3: 프로덕션 빌드 확인**

```bash
npm run build
```

Expected: 에러 없이 빌드 완료. 라우트 목록 표시.

- [ ] **Step 4: GitHub 리포 생성 + 푸시**

```bash
git remote add origin https://github.com/<your-username>/dailyshot-clone.git
git push -u origin main
```

- [ ] **Step 5: Vercel 배포**

```bash
npx vercel --prod
```

또는 Vercel 대시보드 → Import Git Repository → dailyshot-clone.

- [ ] **Step 6: Vercel 환경변수 설정**

Vercel 대시보드 → Settings → Environment Variables:
```
NEXT_PUBLIC_SUPABASE_URL       = <값>
NEXT_PUBLIC_SUPABASE_ANON_KEY  = <값>
```

→ Redeploy.

- [ ] **Step 7: 최종 확인**

배포된 URL에서 확인:
- `/` → 메인 페이지 (Hero + 카테고리 + 추천 상품)
- `/products` → 전체 상품 목록 + 필터
- `/products?category=anime` → 애니 필터 적용
- `/products/<id>` → 상세 페이지
- 검색창 → 검색 결과

- [ ] **Step 8: 최종 커밋**

```bash
git add .
git commit -m "chore: Phase 1+2 complete — figure shop catalog live"
git push
```
