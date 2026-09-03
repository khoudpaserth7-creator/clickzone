-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query)
-- If you already ran an older version of this file, run the MIGRATION
-- section further down instead of the CREATE TABLE statements.

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric not null,
  stock integer not null default 0,
  images text[] not null default '{}',
  category_id uuid references categories(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table categories enable row level security;
alter table products enable row level security;

-- Public (anon key) can only READ. All writes (insert/update/delete) go
-- through the admin API routes, which use the service_role key on the
-- server — never from the browser. No write policy is created here on
-- purpose.
create policy "Public can read categories"
  on categories for select
  using (true);

create policy "Public can read products"
  on products for select
  using (true);


-- ============ Member management: profiles + wallet ============

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'admin')),
  balance numeric not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric not null, -- positive = add funds, negative = deduct
  note text,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table wallet_transactions enable row level security;

-- Each signed-in user can read only their own profile / transaction
-- history. No write policy is created — balance/role changes only
-- happen through the admin API routes using the service_role key.
create policy "Users can read own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can read own transactions"
  on wallet_transactions for select
  using (auth.uid() = user_id);

-- Auto-create a profile row whenever someone signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id) values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Backfill profiles for any users who signed up before this table existed
insert into public.profiles (id)
select id from auth.users
on conflict (id) do nothing;

-- Atomically adjust a user's balance and record the transaction.
-- Called from the admin API using the service_role key.
create or replace function public.admin_adjust_balance(
  p_user_id uuid,
  p_amount numeric,
  p_note text default null
)
returns void as $$
begin
  update profiles set balance = balance + p_amount where id = p_user_id;
  insert into wallet_transactions (user_id, amount, note) values (p_user_id, p_amount, p_note);
end;
$$ language plpgsql;


-- ============ MIGRATION (only if you ran the old schema.sql before) ============
-- alter table products add column if not exists stock integer not null default 0;
-- alter table products add column if not exists images text[] not null default '{}';
-- alter table products add column if not exists category_id uuid references categories(id) on delete set null;
-- -- old single image_url / category text columns can be dropped once you've
-- -- re-entered products through the new admin panel:
-- -- alter table products drop column if exists image_url;
-- -- alter table products drop column if exists category;
