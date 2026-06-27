import bcrypt from "bcryptjs";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
};

const DEMO_USERS: StoredUser[] = [
  { id: "1", name: "컬렉터", email: "user@figure.shop", passwordHash: bcrypt.hashSync("figure123", 10) },
  { id: "2", name: "관리자", email: "admin@figure.shop", passwordHash: bcrypt.hashSync("admin123", 10) },
];

let users: StoredUser[] = [...DEMO_USERS];
let nextId = 3;

export function findUserByEmail(email: string): StoredUser | undefined {
  return users.find((u) => u.email === email);
}

export function findUserByCredentials(email: string, password: string): StoredUser | undefined {
  const user = users.find((u) => u.email === email);
  if (!user) return undefined;
  return bcrypt.compareSync(password, user.passwordHash) ? user : undefined;
}

export function createUser(name: string, email: string, password: string): StoredUser {
  const user: StoredUser = { id: String(nextId++), name, email, passwordHash: bcrypt.hashSync(password, 10) };
  users.push(user);
  return user;
}
