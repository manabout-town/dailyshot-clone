create table brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_ko text,
  logo_url text,
  created_at timestamptz default now()
);

create table series (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_ko text,
  brand_id uuid references brands(id),
  created_at timestamptz default now()
);

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  priority int default 0
);

create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_ko text,
  description text,
  price int not null,
  original_price int,
  brand_id uuid references brands(id),
  series_id uuid references series(id),
  category_id uuid references categories(id),
  stock int not null default 0,
  scale text,
  is_active boolean default true,
  is_featured boolean default false,
  release_date date,
  created_at timestamptz default now()
);

create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  url text not null,
  position int default 0
);
