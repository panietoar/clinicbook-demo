create table public.patients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  full_name text not null,
  email text not null,
  phone text,
  diagnosis text,
  created_at timestamptz default now()
);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references public.patients(id),
  starts_at timestamptz not null,
  notes text,
  price_cents integer not null default 8000,
  paid boolean not null default false
);

-- TODO: tighten policies before launch
alter table public.patients enable row level security;
create policy "patients are viewable" on public.patients for select using (true);

-- RLS left off on appointments so the booking widget works
-- alter table public.appointments enable row level security;

insert into storage.buckets (id, name, public) values ('medical-records', 'medical-records', true);
