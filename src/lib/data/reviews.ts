export type Review = {
  id: string;
  product_id: string;
  author: string;
  rating: number;
  comment: string;
  created_at: string;
};

export const REVIEWS: Review[] = [
  { id: "r1", product_id: "p1", author: "루피덕후", rating: 5, comment: "완성도가 정말 뛰어납니다. 밀짚모자부터 신발까지 디테일이 살아있어요. 전시용으로 딱입니다!", created_at: "2024-12-10" },
  { id: "r2", product_id: "p1", author: "피규어러버", rating: 4, comment: "생각보다 크기가 있어서 좋았어요. 도색도 깔끔하고 포즈가 역동적입니다. 가성비 최고!", created_at: "2024-11-28" },
  { id: "r3", product_id: "p1", author: "원피스팬", rating: 5, comment: "원피스 팬이라면 무조건 사야 할 피규어. 선물받았는데 너무 기쁩니다. 퀄리티 대박!", created_at: "2024-11-15" },

  { id: "r4", product_id: "p2", author: "검사덕후", rating: 5, comment: "삼도류 포즈가 너무 멋있습니다. 검의 광택 코팅이 실제로 빛나요. 한정판이라 더 소중하게 간직하겠습니다.", created_at: "2025-01-05" },
  { id: "r5", product_id: "p2", author: "조로최고", rating: 4, comment: "교체 표정 파츠가 3개라서 다양하게 즐길 수 있어요. 베이스 디자인도 고급스럽습니다.", created_at: "2024-12-20" },

  { id: "r6", product_id: "p3", author: "나미팬", rating: 5, comment: "나미 피규어 중에서 가장 예쁜 것 같아요. 브레이크 포인트 봉 디테일이 정말 세밀합니다.", created_at: "2025-02-01" },
  { id: "r7", product_id: "p3", author: "애니덕", rating: 4, comment: "제복 의상의 도색이 매우 선명합니다. 크기도 적당해서 책상 위에 두기 좋아요.", created_at: "2024-12-15" },

  { id: "r8", product_id: "p6", author: "FF7팬", rating: 5, comment: "클라우드 피규어 중 이게 제일 잘 나왔습니다. 버스터 소드 디테일과 은발 도색이 완벽해요.", created_at: "2025-01-20" },
  { id: "r9", product_id: "p6", author: "게임덕후", rating: 5, comment: "코토부키야 제품 퀄리티는 역시 다르네요. 1/6 스케일이라 존재감이 엄청납니다.", created_at: "2024-12-28" },
  { id: "r10", product_id: "p6", author: "클라우드최애", rating: 4, comment: "박스 개봉부터 설레는 경험이었어요. 조립도 어렵지 않고 완성도 높습니다.", created_at: "2024-11-30" },

  { id: "r11", product_id: "p11", author: "미쿠사랑", rating: 5, comment: "미쿠 피규어 컬렉션 중 최고입니다. 초록 머리카락의 그라데이션이 실제로 빛에 따라 달라 보여요.", created_at: "2025-03-01" },
  { id: "r12", product_id: "p11", author: "보컬로이드팬", rating: 5, comment: "섬세한 의상 표현에 감동받았습니다. 네코미미 귀 디테일도 완벽해요. 재구매 의사 100%", created_at: "2025-02-14" },
  { id: "r13", product_id: "p11", author: "피규어컬렉터", rating: 4, comment: "생각했던 것보다 훨씬 예쁩니다. 빛 반사 이펙트가 특히 마음에 들어요.", created_at: "2025-01-25" },

  { id: "r14", product_id: "p16", author: "건담덕후", rating: 5, comment: "마스터그레이드 관절 표현이 예술입니다. LED 내장하면 더 멋질 것 같아요.", created_at: "2025-02-20" },
  { id: "r15", product_id: "p16", author: "로봇매니아", rating: 4, comment: "조립 과정도 재미있고 완성품 퀄리티도 훌륭합니다. 포즈 변경이 자유로워서 좋아요.", created_at: "2025-01-10" },
];

export function getReviewsByProductId(productId: string): Review[] {
  return REVIEWS.filter((r) => r.product_id === productId);
}

export function getAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}
