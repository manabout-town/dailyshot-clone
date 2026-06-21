# 피규어샵 — Phase 1 + 2 Design Spec

**Date:** 2026-06-21  
**Scope:** Foundation + Catalog (결제/Auth/Admin 제외)  
**Stack:** Next.js 14 App Router · Supabase · Tailwind CSS · Framer Motion  
**Reference:** dailyshot.co 클론 — 피규어 e-commerce

---

## 1. DB 스키마

```sql
-- 브랜드 (반다이, 굿스마일, 코토부키야 등)
create table brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_ko text,
  logo_url text,
  created_at timestamptz default now()
);

-- 시리즈 (원피스, 드래곤볼, 호리미야 등)
create table series (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_ko text,
  brand_id uuid references brands(id),
  created_at timestamptz default now()
);

-- 카테고리 (애니, 게임, 스포츠, 영화 등)
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  priority int default 0
);

-- 상품
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_ko text,
  description text,
  price int not null,
  original_price int,                    -- null이면 할인 없음
  brand_id uuid references brands(id),
  series_id uuid references series(id),
  category_id uuid references categories(id),
  stock int not null default 0,
  scale text,                            -- '1/7', '1/8', 'Nendoroid', 'Figma' 등
  is_active boolean default true,
  is_featured boolean default false,
  release_date date,
  created_at timestamptz default now()
);

-- 상품 이미지 (갤러리)
create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  url text not null,
  position int default 0                 -- 정렬 순서
);
```

---

## 2. 페이지 구조 & 라우팅

| 경로 | 컴포넌트 | 렌더링 |
|------|----------|--------|
| `/` | 메인 | ISR 1h |
| `/products` | 상품 목록 | Server (URL params) |
| `/products/[id]` | 상품 상세 | ISR per-product |
| `/search` | 검색 결과 | Server (q param) |

**URL 필터 패턴:**
```
/products?category=anime&brand=goodsmile&scale=1%2F7&sort=price_asc&page=1
```

서버 컴포넌트에서 `searchParams` 직접 읽어 Supabase 쿼리 조립.

---

## 3. 컴포넌트 구조

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                        # 메인
│   ├── products/
│   │   ├── page.tsx                    # 목록
│   │   └── [id]/page.tsx               # 상세
│   └── search/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx                  # 로고 + 검색바 + 메뉴
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSection.tsx             # 히어로 배너
│   │   ├── CategoryGrid.tsx            # 카테고리 카드 (dailyshot 서비스 카드)
│   │   └── FeaturedProducts.tsx        # 추천 상품 그리드
│   ├── product/
│   │   ├── ProductCard.tsx             # 목록용 카드
│   │   ├── ProductGrid.tsx             # 카드 그리드 래퍼
│   │   ├── ProductFilters.tsx          # 필터 사이드바/바텀시트
│   │   ├── FilterChips.tsx             # 상단 활성 필터 칩
│   │   ├── ProductDetail.tsx           # 상세 페이지 메인
│   │   └── ImageGallery.tsx            # 이미지 갤러리
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       └── Skeleton.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts                   # 브라우저 클라이언트
│   │   └── server.ts                   # 서버 클라이언트
│   └── utils.ts                        # formatKRW, cn 등
└── types/database.ts
```

---

## 4. 핵심 기능 명세

### 메인 페이지 (`/`)
- 히어로: 전체 폭 배너 + CTA 버튼
- 카테고리 그리드: 애니 / 게임 / 스포츠 / 영화 카드 (dailyshot 서비스 카드 대응)
- 추천 상품: `is_featured = true` 상품 8개, 2열 그리드

### 상품 목록 (`/products`)
- 좌측 필터 (데스크탑) / 바텀시트 (모바일):
  - 카테고리, 브랜드, 시리즈, 스케일, 가격 범위
- 상단: 검색 결과 수 + 정렬 (최신순 / 낮은가격 / 높은가격 / 인기순)
- 상품 카드: 이미지 + 브랜드 + 이름 + 가격 (할인가 / 원가 취소선)
- 페이지네이션: 24개 단위

### 상품 상세 (`/products/[id]`)
- 이미지 갤러리: 메인 이미지 + 썸네일 스트립
- 정보: 브랜드 / 시리즈 / 스케일 / 발매일
- 가격 + 재고 상태 + "장바구니 담기" 버튼 (Phase 3 연결용 placeholder)
- 연관 상품: 동일 시리즈 상품 4개

### 검색 (`/search?q=`)
- 상품명(한글/영문) + 브랜드명 + 시리즈명 full-text 검색
- Supabase `ilike` 쿼리

---

## 5. UI / 비주얼

**팔레트**
| 역할 | 값 |
|------|-----|
| 배경 | `#FFFFFF` |
| 텍스트 | `#0A0A0A` |
| 강조 (레드) | `#E63946` |
| 카드 배경 | `#F8F8F8` |
| 보더 | `#E5E7EB` |
| 할인가 | `#E63946` |
| 원가 (취소선) | `#9CA3AF` |

**타입**
- 한글: `Noto Sans KR` (Bold 상품명, Regular 설명)
- 영문/숫자: `Inter`
- 가격: `tabular-nums`

**인터랙션**
- 상품 카드 hover: 이미지 1.05 scale + 그림자
- 페이지 전환: Framer Motion `opacity` fade
- 필터 변경: URL push (뒤로가기 지원)

---

## 6. 환경변수

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## 7. 구현 순서 (Phase 1 → 2)

**Phase 1 — Foundation**
1. `create-next-app` 셋업 (TypeScript + Tailwind)
2. Supabase 프로젝트 연결, 스키마 실행
3. 공통 레이아웃 (Header / Footer)
4. `types/database.ts` 생성
5. 시드 데이터 (브랜드 5개, 카테고리 4개, 상품 20개)

**Phase 2 — Catalog**
1. 메인 페이지 (Hero + CategoryGrid + FeaturedProducts)
2. 상품 목록 (ProductGrid + ProductFilters + 정렬/페이징)
3. 상품 상세 (ImageGallery + 스펙 + 연관상품)
4. 검색 페이지
5. Vercel 배포
