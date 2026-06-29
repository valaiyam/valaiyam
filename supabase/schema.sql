-- Valaiyam Database Schema
-- Run this in Supabase SQL editor

create table projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  customer_name text not null,
  customer_phone text,
  customer_email text,

  -- intake → analyzing → generating → security_check → qa → awaiting_payment → deploying → awaiting_review → revision → live | failed
  status text not null default 'intake',
  current_agent text,
  error_log jsonb default '[]',
  retry_count int default 0,

  intake_data jsonb,
  website_spec jsonb,
  generation_prompt text,
  generated_files jsonb,
  security_result jsonb,
  qa_result jsonb,

  github_repo text,
  preview_url text,
  production_url text,
  vercel_project_id text,

  revision_count int default 0,
  revision_requests jsonb default '[]'
);

alter table projects enable row level security;

create policy "Service role full access" on projects
  using (true)
  with check (true);

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger projects_updated_at
  before update on projects
  for each row execute function update_updated_at();

create index projects_status_idx on projects(status);
create index projects_phone_idx on projects(customer_phone);
