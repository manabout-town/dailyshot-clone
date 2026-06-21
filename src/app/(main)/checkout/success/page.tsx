import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center gap-5 text-center">
      <div className="w-16 h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center text-2xl text-white">
        ✓
      </div>
      <h1 className="text-2xl font-bold">주문 완료!</h1>
      <p className="text-[#888] text-sm">
        주문이 성공적으로 접수되었습니다.<br />
        배송 준비 후 안내드리겠습니다.
      </p>
      <Link
        href="/products"
        className="mt-4 px-6 py-2.5 bg-[#1A1A1A] text-white text-sm font-medium rounded hover:bg-[#E63946] transition-colors"
      >
        쇼핑 계속하기
      </Link>
    </div>
  );
}
