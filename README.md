# 🛍️ FigureShop — 피규어 컬렉터 전문 이커머스 플랫폼

> 굿스마일 · 반다이 · 코토부키야 · 맥스팩토리 · 알터의 프리미엄 피규어를 한 곳에
> dailyshot.co 아키텍처를 참고해 구축한 풀스택 Next.js 이커머스 — 카탈로그부터 결제·마이페이지까지 완전한 쇼핑 플로우 구현

---

## 🚀 프로젝트 개요

피규어 수집가들은 국내외 여러 쇼핑몰을 돌아다니며 원하는 제품을 찾아야 했습니다.
**FigureShop**은 굿스마일, 반다이, 코토부키야 등 주요 브랜드의 피규어를 한 플랫폼에서 카테고리·브랜드·스케일 필터로 빠르게 탐색하고, 포인트 혜택까지 받으며 구매할 수 있는 전문 쇼핑몰입니다.

| 항목 | 내용 |
|------|------|
| 프로젝트 유형 | 개인 풀스택 클론 코딩 (포트폴리오) |
| 레퍼런스 | [dailyshot.co](https://dailyshot.co) 아키텍처 참고 |
| 핵심 가치 | 컬렉터 특화 탐색 · 포인트 혜택 · 전 플로우 구현 |
| 아키텍처 | Next.js 14 App Router (SSR + CSR 혼합) |

---

## 🔍 해결하고자 하는 문제

- 피규어 쇼핑몰마다 다른 UI와 필터 체계로 인한 **탐색 비효율**
- 브랜드·시리즈·스케일 등 피규어 특화 필터가 없는 **일반 이커머스의 한계**
- 모바일에서 필터 접근이 막혀 있는 **PC 중심 쇼핑 UX**
- 인트로 랜딩부터 결제 완료까지 하나로 연결된 **완성도 높은 레퍼런스 부재**

---

## ✨ 주요 특징

- **컬렉터 특화 탐색**: 카테고리·브랜드·스케일 복합 필터 + 최신/가격 정렬
- **모바일 필터 드로어**: 하단 슬라이드업 시트로 모바일에서도 완전한 필터 경험
- **이미지 갤러리**: 다중 이미지 썸네일 + 메인 전환, 화살표 네비게이션
- **포인트 시스템**: 구매금액 1% 자동 적립, 부분/전액 사용
- **배송 상태 트래킹**: 접수 → 처리중 → 배송중 → 배송완료 실시간 시뮬레이션
- **위시리스트**: 하트 버튼으로 추가·제거, 전용 마이페이지 탭
- **웜 디자인**: `#F7F6F3` 오프화이트 + `#E63946` 레드 — 컬렉터의 선반을 연상

---

## 🛠 기술 스택

**Frontend / Framework**

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion_12-FF0055?style=flat-square&logo=framer&logoColor=white)

**상태 관리 / 인증**

![Zustand](https://img.shields.io/badge/Zustand_5-443E38?style=flat-square)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js_v4-000000?style=flat-square&logo=next.js&logoColor=white)
![bcryptjs](https://img.shields.io/badge/bcryptjs-EF4444?style=flat-square)

**데이터 / 테스트**

![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest_4-6E9F18?style=flat-square&logo=vitest&logoColor=white)

**Tools**

![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js_18+-339933?style=flat-square&logo=nodedotjs&logoColor=white)

---

## 📂 프로젝트 구조

> App Router 라우트 그룹으로 쇼핑몰 레이아웃과 인트로 랜딩을 분리했습니다.

```
src/
├── app/
│   ├── (main)/             # 공통 헤더·푸터 적용 쇼핑몰 라우트 그룹
│   │   ├── shop/           # 메인 홈 (히어로 + 추천 상품 + 카테고리)
│   │   ├── products/       # 상품 목록 (필터/정렬) + [id] 상품 상세
│   │   ├── search/         # 검색 결과
│   │   ├── cart/           # 장바구니
│   │   ├── checkout/       # 결제 + /success 주문완료
│   │   ├── login/          # 로그인
│   │   ├── register/       # 회원가입
│   │   └── mypage/         # 마이페이지 + /wishlist
│   ├── intro/              # 브랜드 랜딩 (다크 테마, 인트로 애니메이션)
│   ├── api/
│   │   └── auth/           # NextAuth Route Handler + 회원가입 API
│   └── layout.tsx
├── components/
│   ├── layout/             # Header, Footer
│   ├── product/            # ProductCard, ProductFilters, ImageGallery, MobileFilterDrawer
│   ├── home/               # HeroSection, FeaturedProducts, CategoryGrid
│   ├── cart/               # CartIcon (뱃지 포함)
│   └── ui/                 # Button, Badge, Skeleton
├── lib/
│   ├── data/               # 정적 목데이터 (products, brands, categories, series, reviews)
│   ├── cart-store.ts       # Zustand 장바구니 (persist)
│   ├── point-store.ts      # Zustand 포인트 잔액
│   ├── order-store.ts      # 주문내역 + 배송상태 시뮬레이션
│   ├── wishlist-store.ts   # Zustand 위시리스트
│   ├── queries.ts          # 상품 필터/정렬/검색 순수 함수
│   └── auth.ts             # NextAuth 옵션 (Credentials + bcrypt)
├── types/
│   └── database.ts         # Product, Brand, Series, Category, ProductImage 타입
└── supabase/
    ├── schema.sql           # DB 스키마 (Phase 5 연동용)
    └── seed.sql             # 시드 데이터
```

---

## 📌 주요 기능

### 1. 브랜드 인트로 → 쇼핑몰 진입
- `/` → `/intro` 다크 테마 브랜드 랜딩 (스크롤 트리거 애니메이션)
- "쇼핑 시작하기" CTA → `/shop` 메인 마켓플레이스

### 2. 상품 탐색 & 검색
- **복합 필터**: 카테고리 · 브랜드 · 스케일, 정렬(최신순/가격 오름·내림차순)
- **모바일 필터 드로어**: `hidden lg:block` 사이드바를 모바일에서도 완전히 사용
- **전체 검색**: 한글/영문 상품명 · 브랜드 · 시리즈 다중 필드 동시 검색
- **상품 카드**: 할인율 배지, 브랜드명, 위시리스트 하트, 재고 임박 표시

### 3. 상품 상세 (PDP)
- 다중 이미지 갤러리 (썸네일 + 메인 전환 + 화살표 네비게이션)
- 스케일 · 브랜드 · 시리즈 정보, 재고 수량 표시
- 수량 선택 (+/- 컨트롤, max: stock)
- 장바구니 담기 / 바로 구매 (세션 없으면 로그인 리다이렉트)
- 구매 후기 & 별점 (평균 별점 + 분포 + 리뷰 카드)
- 같은 시리즈 연관 상품

### 4. 장바구니 & 결제
- Zustand `persist` 장바구니 — 새로고침·재방문 후에도 유지
- 수량 증감 (재고 한도 적용) / 항목 삭제
- **포인트 시스템**: 보유 1,000,000P, 부분/전액 사용 적용
- Mock 결제 폼 (배송정보 + 카드정보) → 1.2초 지연 후 주문 완료
- 결제 완료 시 구매금액 1% 포인트 자동 적립

### 5. 마이페이지
- 주문 내역 (Zustand localStorage 영속, 새 주문 상단 노출)
- **배송 상태 트래킹**: 접수 → 처리중(2분) → 배송중(10분) → 배송완료(30분) 시간 경과 시뮬레이션
- 운송장 번호 표시 (배송중 이후)
- 포인트 잔액 · 위시리스트 탭 통합

### 6. 인증 (NextAuth.js)
- Credentials Provider + bcryptjs 비밀번호 해시
- JWT 세션 전략
- 로그인 후 callbackUrl 리다이렉트 지원
- 데모 계정: `user@figure.shop` / `figure123`

---

## 🧩 기술적 하이라이트

### 1. Zustand persist — Hydration Race Condition 방지

Zustand의 `persist` 미들웨어는 컴포넌트 마운트 후 localStorage에서 수화합니다.
수화 전에 `items.length === 0` 조건이 실행되면 장바구니가 빈 것으로 오판해 `/cart`로 잘못 redirect되는 버그가 있습니다.
이를 `mounted` 플래그로 방어합니다.

```tsx
// checkout/page.tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);

// mounted 확인 후에만 redirect — 수화 완료 보장
useEffect(() => {
  if (mounted && !loading && items.length === 0) router.push("/cart");
}, [mounted, loading, items.length, router]);
```

### 2. App Router 라우트 그룹으로 레이아웃 분리

브랜드 인트로(`/intro`)는 다크 테마 전체화면이고, 쇼핑몰(`/shop`, `/products` 등)은 헤더·푸터가 있는 레이아웃이 필요합니다.
`(main)` 라우트 그룹으로 URL에 영향 없이 레이아웃을 분리합니다.

```
app/
├── intro/page.tsx          # 독립 레이아웃 (다크, 전체화면)
└── (main)/
    ├── layout.tsx           # Header + Footer 공통
    ├── shop/page.tsx
    └── products/page.tsx
```

### 3. 서버 컴포넌트 필터링 + 클라이언트 UI

상품 목록 필터링은 서버에서 `searchParams`로 처리하고, 상태를 URL에 저장합니다.
클라이언트 상태 없이 필터·정렬 상태를 공유하고 북마크·공유가 가능합니다.

```tsx
// products/page.tsx (서버 컴포넌트)
export default function ProductsPage({ searchParams }) {
  const filters = { category: searchParams.category, sort: searchParams.sort, ... };
  const { data: products, count } = getProducts(filters); // 서버에서 필터링
  return <ProductGrid products={products} />;
}
```

### 4. 모바일 필터 드로어 — URL 동기화

필터 선택값을 로컬 상태로 임시 보관 후 "적용하기" 클릭 시 일괄 URL 반영.
중간에 브라우저 back/forward를 눌러도 올바른 필터 상태를 유지합니다.

---

## 🗂️ 데이터 모델 (주요 타입)

| 타입 | 설명 | 핵심 필드 |
|------|------|-----------|
| `Product` | 상품 | `price`, `original_price`, `stock`, `scale`, `is_featured`, `release_date` |
| `Brand` | 브랜드 | `name`, `name_ko`, `logo_url` |
| `Series` | 시리즈 | `name`, `name_ko`, `brand_id` |
| `Category` | 카테고리 | `name`, `slug`, `priority` |
| `ProductImage` | 상품 이미지 | `url`, `position` |
| `CartItem` | 장바구니 항목 | `price`, `quantity`, `stock` (재고 한도 적용) |
| `Order` | 주문 | `orderId`, `items`, `usedPoints`, `earnedPoints`, `trackingNumber`, `createdAt` |

---

## 🔗 라우팅 구조

| 경로 | 설명 | 인증 필요 |
|------|------|-----------|
| `/` | `/intro` 리다이렉트 | ✗ |
| `/intro` | 브랜드 인트로 랜딩 | ✗ |
| `/shop` | 메인 홈 (히어로 + 추천상품 + 카테고리) | ✗ |
| `/products` | 전체 상품 목록 (필터/정렬/페이지네이션) | ✗ |
| `/products/[id]` | 상품 상세 (갤러리·후기·연관상품) | ✗ |
| `/search?q=` | 검색 결과 | ✗ |
| `/cart` | 장바구니 | ✗ |
| `/checkout` | 결제 (포인트·배송지·카드) | ✓ |
| `/checkout/success` | 주문 완료 | ✓ |
| `/login` | 로그인 | ✗ |
| `/register` | 회원가입 | ✗ |
| `/mypage` | 주문내역·포인트 | ✓ |
| `/mypage/wishlist` | 위시리스트 | ✓ |

**API Routes**

| Method | 경로 | 설명 |
|--------|------|------|
| `GET/POST` | `/api/auth/[...nextauth]` | NextAuth 인증 핸들러 |
| `POST` | `/api/auth/register` | 회원가입 (bcrypt 해시 저장) |

---

## ⚙️ 실행 방법

### 사전 요구사항
- Node.js 18 이상
- npm 또는 pnpm

### 설치 및 실행

```bash
git clone https://github.com/manabout-town/dailyshot-clone.git
cd dailyshot-clone
npm install
```

### 환경 변수 설정

`.env.local` 파일 생성:

```env
NEXTAUTH_SECRET=   # openssl rand -hex 32
NEXTAUTH_URL=http://localhost:3000

# Phase 5 Supabase 연동 시 추가
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# SUPABASE_SERVICE_ROLE_KEY=
```

### 개발 서버 실행

```bash
npm run dev
```

→ http://localhost:3000 접속

**데모 계정** (서버 재시작 시 메모리 초기화):

| 이메일 | 비밀번호 | 권한 |
|--------|----------|------|
| `user@figure.shop` | `figure123` | 일반 |
| `admin@figure.shop` | `admin123` | 관리자 |

### 테스트

```bash
npm test            # 단발 실행
npm run test:watch  # 감시 모드
```

---

## 🗺️ Phase 로드맵

- [x] **Phase 1** — 프로젝트 셋업, 정적 목데이터, 카탈로그 (목록/상세/검색)
- [x] **Phase 2** — 인증(NextAuth + bcrypt), 장바구니(Zustand persist), 인트로 랜딩
- [x] **Phase 3** — 포인트 시스템, Mock 결제, 주문완료 페이지, 마이페이지
- [x] **Phase 4** — 위시리스트, 리뷰·별점, 배송 상태 트래킹, 에러 페이지, 모바일 필터 드로어
- [ ] **Phase 5** — Supabase 연동 (상품·주문·유저 DB, 스키마 준비됨)
- [ ] **Phase 6** — 결제 PG 연동 (토스페이먼츠)
- [ ] **Phase 7** — 관리자 대시보드, 재고 관리

---

## 🛠️ 주요 기술 특징

**성능**
- `next/image`로 모든 상품 이미지 자동 최적화 (WebP 변환, lazy loading)
- 서버 컴포넌트에서 필터링 → 클라이언트 번들 최소화
- Zustand store 분리 (cart · point · order · wishlist) → 독립적 리렌더 제어

**보안**
- bcryptjs를 이용한 비밀번호 해시 (salt rounds 10)
- NextAuth JWT 세션
- API Route 인증 체크 (미로그인 → 401)
- 환경변수 `NEXT_PUBLIC_` 구분으로 서버 전용 키 클라이언트 노출 방지

**UX**
- 로딩 스켈레톤 UI (`Skeleton` 컴포넌트)
- `error.tsx` · `not-found.tsx` 에러 페이지
- 모든 이미지 `alt` 텍스트, 버튼 `aria-label` 접근성 지원

---

## 라이선스

MIT — [manabout-town](https://github.com/manabout-town)
