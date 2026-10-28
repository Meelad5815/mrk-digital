-- Run this in Supabase SQL Editor.
-- One private workspace row per authenticated user; data is never shared between users.
create table if not exists public.mrk_workspaces (
  user_id uuid primary key references auth.users(id) on delete cascade,
  workspace_data jsonb not null default '{"tasks":[],"clients":[],"orders":[],"income":[],"expenses":[],"projects":[]}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.mrk_workspaces enable row level security;

drop policy if exists "Users can read their own MRK workspace" on public.mrk_workspaces;
create policy "Users can read their own MRK workspace"
  on public.mrk_workspaces for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can create their own MRK workspace" on public.mrk_workspaces;
create policy "Users can create their own MRK workspace"
  on public.mrk_workspaces for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own MRK workspace" on public.mrk_workspaces;
create policy "Users can update their own MRK workspace"
  on public.mrk_workspaces for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

grant select, insert, update on public.mrk_workspaces to authenticated;
