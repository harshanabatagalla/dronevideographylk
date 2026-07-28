-- dronevideography.lk — Supabase schema
-- Mirrors the TypeScript content models in src/lib/content.ts.
-- The public site can render from this once populated; the Phase 2 admin
-- dashboard performs all writes. Run in the Supabase SQL editor.

create extension if not exists "pgcrypto";

create table if not exists drones (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text,
  image text,
  specs jsonb not null default '[]',      -- [{ icon, label, value }]
  best_for text[] not null default '{}',
  sample_footage text[] not null default '{}',
  "order" int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists footage (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  poster text,
  youtube_id text,
  location text,
  category text,
  drone_slug text references drones(slug) on delete set null,
  featured boolean not null default false,
  "order" int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists locations (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  x numeric,
  y numeric,
  blurb text,
  seo jsonb not null default '{}'
);

create table if not exists packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price_from text,
  duration text,
  includes text[] not null default '{}',
  highlight boolean not null default false,
  "order" int not null default 0
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text,
  country_flag text,
  quote text not null,
  rating int not null default 5,
  "order" int not null default 0
);

create table if not exists settings (
  id int primary key default 1,
  data jsonb not null default '{}',  -- socials, whatsapp, email, phone, address
  constraint settings_singleton check (id = 1)
);

create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  country text,
  dates text,
  locations text,
  shoot_type text,
  message text not null,
  status text not null default 'new',  -- new | handled | archived
  created_at timestamptz not null default now()
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  cover text,
  body text,
  seo jsonb not null default '{}',
  published_at timestamptz
);

-- Enable Row Level Security. Public read for content, writes via service role
-- (used only by the authenticated admin dashboard / server).
alter table drones enable row level security;
alter table footage enable row level security;
alter table locations enable row level security;
alter table packages enable row level security;
alter table testimonials enable row level security;
alter table blog_posts enable row level security;

create policy "public read drones" on drones for select using (visible);
create policy "public read footage" on footage for select using (true);
create policy "public read locations" on locations for select using (true);
create policy "public read packages" on packages for select using (true);
create policy "public read testimonials" on testimonials for select using (true);
create policy "public read blog" on blog_posts for select using (published_at is not null);
