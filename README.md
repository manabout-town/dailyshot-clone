# FigureShop

피규어 컬렉터를 위한 전문 e-커머스 플랫폼. [dailyshot.co](https://dailyshot.co) 클론 프로젝트.

**Live →** *(Vercel 배포 예정)*

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Auth | NextAuth.js (Credentials) |
| State | Zustand (장바구니 persist) |
| Font | Space Grotesk + Inter + Noto Sans KR |
| Image | next/image + picsum.photos |

---

## 주요 기능

### 인트로 → 쇼핑몰 플로우
- `/` → `/intro` 브랜드 랜딩 (다크 테마, 스크롤 애니메이션)
- "쇼핑 시작하기" → `/shop` 메인 마켓

### 인증
- 회원가입 / 로그인 / 로그아웃 (NextAuth.js Credentials)
- 데모 계정: `user@figure.shop` / `figure123`

### 쇼핑 카탈로그
- 상품 목록 — 카테고리 · 브랜드 · 스케일 필터 + 정렬
- 상품 상세 — 이미지 갤러리, 스펙표, 연관상품
- 검색 — 한글/영문 상품명, 브랜드, 시리즈 전체 검색

### 장바구니 & 결제
- Zustand persist 장바구니 (새로고침 후에도 유지)
- 수량 조절 / 삭제
- Mock 결제 폼 (배송정보 + 카드정보, 토스페이 UI 스타일)

### 디자인 시스템
- **시그니처:** 히어로 `1/7` 아키텍처 타이포 (Space Grotesk)
- 웜 오프화이트 팔레트 `#F7F6F3` — 컬렉터의 선반 느낌
- 레드 액센트 `#E63946`
- 카드 hover → ring 테두리 + scale 이미지 확대

---

## 라우팅 구조

```
/                   → /intro (리다이렉트)
/intro              브랜드 인트로 랜딩
/shop               메인 (추천상품 + 카테고리)
/products           전체 상품 목록 (필터/정렬)
/products/[id]      상품 상세
/search?q=          검색 결과
/cart               장바구니
/checkout           결제
/checkout/success   주문 완료
/login              로그인
/register           회원가입
```

---

## 로컬 실행

```bash
npm install

# 환경변수
echo "NEXTAUTH_SECRET=$(openssl rand -hex 32)" >> .env.local
echo "NEXTAUTH_URL=http://localhost:3000" >> .env.local

npm run dev
```

→ http://localhost:3000

---

## 데이터 구조

Supabase 없이 **정적 TypeScript 파일**로 구현. DB 없이 즉시 실행 가능.

```
src/lib/data/
├── brands.ts      브랜드 5개 (굿스마일, 반다이, 코토부키야, 맥스팩토리, 알터)
├── categories.ts  카테고리 4개 (애니, 게임, 스포츠, 영화)
├── series.ts      시리즈 4개
└── products.ts    상품 20개 (picsum.photos 이미지)
```

SQL 스키마 참조: [`supabase/schema.sql`](./supabase/schema.sql) · [`supabase/seed.sql`](./supabase/seed.sql)

---

## Phase 로드맵

- [x] **Phase 1+2** — 프로젝트 셋업, 정적 데이터, 카탈로그 (목록/상세/검색)
- [x] **Phase 2.5** — Auth(NextAuth), 장바구니(Zustand), Mock 결제, 인트로 페이지
- [ ] **Phase 3** — 토스페이먼츠 실결제 연동
- [ ] **Phase 4** — 관리자 대시보드, 재고 관리
- [ ] **Phase 5** — Supabase 전환, 실사용 데이터

---

## 환경변수

```env
NEXTAUTH_SECRET=   # openssl rand -hex 32
NEXTAUTH_URL=http://localhost:3000
```

---

Made with ☕ — [manabout-town](https://github.com/manabout-town)
