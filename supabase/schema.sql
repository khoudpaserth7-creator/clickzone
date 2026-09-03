create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'admin')),
  balance numeric not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric not null,
  note text,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table wallet_transactions enable row level security;

create policy "Users can read own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can read own transactions"
  on wallet_transactions for select
  using (auth.uid() = user_id);

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

insert into public.profiles (id)
select id from auth.users
on conflict (id) do nothing;

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
