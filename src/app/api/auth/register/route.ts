import { NextResponse } from "next/server";
import { findUserByEmail, createUser } from "@/lib/user-store";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json({ error: "모든 필드를 입력해주세요" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "비밀번호는 6자 이상이어야 합니다" }, { status: 400 });
  }

  const existing = findUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: "이미 사용 중인 이메일입니다" }, { status: 409 });
  }

  const user = createUser(name, email, password);
  return NextResponse.json({ id: user.id, name: user.name, email: user.email }, { status: 201 });
}
