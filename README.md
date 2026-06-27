# FigureShop

> 피규어 컬렉터를 위한 전문 e-커머스 플랫폼

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-2-3ECF8E?logo=supabase)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-FF0055?logo=framer)](https://framer.com/motion)

---

## 개요

FigureShop은 [dailyshot.co](https://dailyshot.co) 아키텍처를 참고해 구축한 피규어 전문 e-커머스 플랫폼이다. 브랜드 랜딩부터 상품 카탈로그, 장바구니, 결제, 마이페이지, 위시리스트까지 쇼핑 전 과정을 구현하며, 컬렉터의 선반을 연상시키는 웜 오프화이트 디자인 시스템이 특징이다.

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 12 |
| Auth | NextAuth.js v4 (Credentials + bcryptjs) |
| State | Zustand 5 (장바구니 · 포인트 · 위시리스트 · 주문 persist) |
| DB | 정적 TypeScript 목데이터 (Supabase 연동 예정) |
| Test | Vitest 4 |
| Font | Space Grotesk · Inter · Noto Sans KR |
| Image | next/image + picsum.photos (개발용) |

---

## 주요 기능

### 인트로 → 쇼핑몰 플로우
- `/` → `/intro` 브랜드 랜딩 (다크 테마, 스크롤 애니메이션)
- "쇼핑 시작하기" CTA → `/shop` 메인 마켓으로 진입

### 인증
- 회원가입 / 로그인 / 로그아웃 (NextAuth.js Credentials, bcrypt 해시 저장)
- 데모 계정: `user@figure.shop` / `figure123`

### 상품 카탈로그
- 상품 목록 — 카테고리 · 브랜드 · 스케일 복합 필터 + 정렬 (최신/가격)
- 모바일 필터 드로어 (하단 슬라이드 업)
- 상품 상세 — 이미지 갤러리, 스펙표, 상품 설명, 연관 상품
- 상품 상세 — 구매 후기 & 별점 (mock 데이터 15개)
- 전체 검색 — 한글/영문 상품명, 브랜드, 시리즈 동시 검색

### 장바구니 & 결제
- Zustand persist 장바구니 (세션 초기화 후에도 유지)
- 수량 조절 (재고 한도 적용) / 항목 삭제
- 포인트 시스템 — 보유 1,000,000P, 부분/전액 사용
- 결제 완료 시 구매금액 1% 포인트 자동 적립
- Mock 결제 폼 (배송정보 + 카드정보)

### 마이페이지
- 주문 내역 조회 (Zustand localStorage 영속)
- 배송 상태 트래킹 — 접수 → 처리중 → 배송중 → 배송완료 (시간 경과 시뮬레이션)
- 운송장 번호 표시 (배송중 이후)
- 보유 포인트 잔액 확인

### 위시리스트
- 상품 카드 / 상세 하트 버튼으로 추가·제거
- `/mypage/wishlist` 전용 페이지
- Zustand localStorage 영속

### 에러 처리
- `not-found.tsx` — 404 페이지
- `error.tsx` — 런타임 에러 페이지

### 디자인 시스템
- **시그니처 타이포**: 히어로에 `1/7` 아키텍처 레이아웃, Space Grotesk
- **팔레트**: 웜 오프화이트 `#F7F6F3` (컬렉터의 선반) · 레드 액센트 `#E63946`
- **카드 인터랙션**: hover → ring 테두리 + scale 이미지 확대

---

## 라우팅 구조

```
/                     → /intro (리다이렉트)
/intro                브랜드 인트로 랜딩
/shop                 메인 (추천상품 + 카테고리)
/products             전체 상품 목록 (필터/정렬)
/products/[id]        상품 상세 (갤러리 · 후기 · 연관상품)
/search?q=            검색 결과
/cart                 장바구니
/checkout             결제 (포인트 · 배송지 · 카드)
/checkout/success     주문 완료
/login                로그인
/register             회원가입
/mypage               마이페이지 (주문내역 · 포인트 · 위시리스트)
/mypage/wishlist      위시리스트
```

---

## 디렉터리 구조

```
src/
├── app/
│   ├── (main)/         # 메인 쇼핑몰 라우트 그룹
│   ├── intro/          # 브랜드 랜딩 페이지
│   ├── api/            # NextAuth, 회원가입 API Route
│   └── layout.tsx
├── components/         # 재사용 컴포넌트
├── lib/
│   ├── data/           # 정적 목데이터 (products, reviews 등)
│   ├── cart-store.ts   # Zustand 장바구니
│   ├── point-store.ts  # Zustand 포인트
│   ├── wishlist-store.ts
│   ├── order-store.ts  # 주문내역 + 배송상태 계산
│   └── auth.ts
└── types/              # TypeScript 타입 정의
```

---

## 로컬 개발 환경 설정

### 요구 사항
- Node.js 18+
- npm 또는 pnpm

### 설치

```bash
git clone https://github.com/manabout-town/dailyshot-clone.git
cd dailyshot-clone
npm install
```

### 환경 변수 설정

```env
NEXTAUTH_SECRET=   # openssl rand -hex 32
NEXTAUTH_URL=http://localhost:3000
# Supabase 연동 시 추가
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### 개발 서버 실행

```bash
npm run dev
```

→ http://localhost:3000

데모 계정 (서버 재시작 시 초기화):
- 일반: `user@figure.shop` / `figure123`
- 관리자: `admin@figure.shop` / `admin123`

### 테스트

```bash
npm test            # 단발 실행
npm run test:watch  # 감시 모드
```

---

## Phase 로드맵

- [x] **Phase 1** — 프로젝트 셋업, 정적 데이터, 카탈로그 (목록/상세/검색)
- [x] **Phase 2** — Auth(NextAuth + bcrypt), 장바구니(Zustand), 인트로 페이지
- [x] **Phase 3** — 포인트 시스템, Mock 결제, 주문완료, 마이페이지
- [x] **Phase 4** — 위시리스트, 리뷰/평점, 배송 상태 트래킹, 에러 페이지
- [ ] **Phase 5** — Supabase 연동 (상품·주문·유저 DB)
- [ ] **Phase 6** — 결제 PG 연동 (토스페이먼츠 등)
- [ ] **Phase 7** — 관리자 대시보드, 재고 관리

---

## 라이선스

MIT — [manabout-town](https://github.com/manabout-town)
