"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("비밀번호가 일치하지 않습니다");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "회원가입에 실패했습니다");
      setLoading(false);
      return;
    }

    // Auto sign-in after registration
    const signInRes = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (signInRes?.error) {
      setError("회원가입 후 로그인에 실패했습니다. 직접 로그인해주세요.");
    } else {
      router.push("/shop");
      router.refresh();
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold">회원가입</h1>
          <p className="text-sm text-[#888] mt-1">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-[#1A1A1A] underline hover:text-[#E63946]">
              로그인
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#888] block mb-1.5">
              닉네임
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="컬렉터 닉네임"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#EDEAE3] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#888] block mb-1.5">
              이메일
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="email@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#EDEAE3] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#888] block mb-1.5">
              비밀번호 (6자 이상)
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#EDEAE3] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#888] block mb-1.5">
              비밀번호 확인
            </label>
            <input
              name="confirm"
              type="password"
              required
              placeholder="••••••••"
              value={form.confirm}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#EDEAE3] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]"
            />
          </div>

          {error && (
            <p className="text-xs text-[#E63946] bg-[#E63946]/5 px-3 py-2 rounded">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#1A1A1A] text-white text-sm font-medium rounded hover:bg-[#E63946] transition-colors disabled:opacity-50 mt-1"
          >
            {loading ? "처리 중..." : "가입하기"}
          </button>
        </form>
      </div>
    </div>
  );
}
