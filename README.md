# FigureShop

> 피규어 컬렉터를 위한 전문 e-커머스 플랫폼

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-2-3ECF8E?logo=supabase)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-FF0055?logo=framer)](https://framer.com/motion)

---

## 개요

FigureShop은 [dailyshot.co](https://dailyshot.co) 아키텍처를 참고해 구축한 피규어 전문 e-커머스 플랫폼이다. 브랜드 랜딩부터 상품 카탈로그, 장바구니, 결제까지 쇼핑 전 과정을 구현하며, 컬렉터의 선반을 연상시키는 웜 오프화이트 디자인 시스템이 특징이다.

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 12 |
| Auth | NextAuth.js v4 (Credentials Provider) |
| State | Zustand 5 (persist 미들웨어) |
| Database | Supabase 2 |
| Test | Vitest 4 |
| Font | Space Grotesk · Inter · Noto Sans KR |

---

## 주요 기능

### 인트로 → 쇼핑몰 플로우

- `/` → `/intro` 브랜드 랜딩 (다크 테마, 스크롤 애니메이션)
- "쇼핑 시작하기" CTA → `/shop` 메인 마켓으로 진입

### 인증

- 회원가입 / 로그인 / 로그아웃 (NextAuth.js Credentials)
- 데모 계정: `user@figure.shop` / `figure123`

### 상품 카탈로그

- 상품 목록 — 카테고리 · 브랜드 · 스케일 복합 필터 + 정렬
- 상품 상세 페이지 — 이미지 갤러리, 스펙표, 연관상품
- 전체 검색 — 한글/영문 상품명, 브랜드, 시리즈 동시 검색

### 장바구니 & 결제

- Zustand persist 장바구니 (세션 초기화 후에도 유지)
- 수량 조절 / 항목 삭제 / 전체 초기화
- Mock 결제 폼 — 배송정보 + 카드정보 (토스페이 UI 스타일)

### 디자인 시스템

- **시그니처 타이포**: 히어로에 `1/7` 아키텍처 레이아웃, Space Grotesk
- **팔레트**: 웜 오프화이트 `#F7F6F3` (컬렉터의 선반) · 레드 액센트 `#E63946`
- **카드 인터랙션**: hover → ring 테두리 + scale 이미지 확대

---

## 디렉터리 구조

```
src/
├── app/
│   ├── (main)/         # 메인 쇼핑몰 라우트 그룹
│   ├── intro/          # 브랜드 랜딩 페이지
│   ├── api/            # NextAuth, 상품 API Route
│   └── layout.tsx
├── components/         # 재사용 컴포넌트
├── lib/                # Supabase 클라이언트, 유틸리티
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
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

### 개발 서버 실행

```bash
npm run dev
```

→ http://localhost:3000

### 테스트

```bash
npm test          # 단발 실행
npm run test:watch  # 감시 모드
```

---

## 라이선스

MIT
