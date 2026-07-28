-- dronevideography.lk — Supabase setup for the KV-style app store
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query).
--
-- The whole application store (drones, footage, testimonials, enquiries,
-- settings) is kept as a single JSON document, mirroring the original local
-- file store one-to-one. This keeps the migration tiny and robust.

create table if not exists app_store (
  id int primary key default 1,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint app_store_singleton check (id = 1)
);

-- Lock the table down. It is only ever accessed with the service-role key from
-- the server (which bypasses RLS), so no public policies are added. Enabling
-- RLS with no policy means anon/public clients cannot read it (the store also
-- contains private enquiries).
alter table app_store enable row level security;

-- ---------------------------------------------------------------------------
-- Storage bucket for admin media uploads (hero video + poster).
-- If your Supabase project supports creating buckets via SQL, this creates a
-- PUBLIC bucket named `media`. Otherwise create it in the Dashboard:
--   Storage → New bucket → name: media → Public: ON
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

-- Allow public read of objects in the `media` bucket (so <video>/<img> can
-- load them). Uploads are performed server-side with the service-role key.
drop policy if exists "public read media" on storage.objects;
create policy "public read media"
  on storage.objects for select
  using (bucket_id = 'media');
