export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const DEMO_USERS: StoredUser[] = [
  { id: "1", name: "컬렉터", email: "user@figure.shop", password: "figure123" },
  { id: "2", name: "관리자", email: "admin@figure.shop", password: "admin123" },
];

let users: StoredUser[] = [...DEMO_USERS];
let nextId = 3;

export function findUserByEmail(email: string): StoredUser | undefined {
  return users.find((u) => u.email === email);
}

export function findUserByCredentials(email: string, password: string): StoredUser | undefined {
  return users.find((u) => u.email === email && u.password === password);
}

export function createUser(name: string, email: string, password: string): StoredUser {
  const user: StoredUser = { id: String(nextId++), name, email, password };
  users.push(user);
  return user;
}
