-- =========================================================
-- QUADRA ACADEMY — Esquema para Supabase
-- Pegalo en Supabase → SQL Editor → Run.
-- =========================================================

-- Cursos comprados por cada alumno.
-- Solo el administrador (o el webhook del medio de pago, con la service key) inserta filas.
create table if not exists public.enrollments (
  user_id     uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  created_at  timestamptz not null default now(),
  primary key (user_id, course_slug)
);

-- Progreso por lección.
create table if not exists public.lesson_progress (
  user_id     uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  lesson_id   text not null,
  done_at     timestamptz not null default now(),
  primary key (user_id, course_slug, lesson_id)
);

-- URLs de los videos (protegidas): solo las ve quien compró el curso,
-- o cualquiera si la lección es gratuita.
create table if not exists public.lesson_videos (
  course_slug text not null,
  lesson_id   text not null,
  video       text not null,          -- 'youtube:ID', 'vimeo:ID' o URL .mp4
  is_free     boolean not null default false,
  primary key (course_slug, lesson_id)
);

alter table public.enrollments     enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.lesson_videos   enable row level security;

-- enrollments: cada alumno ve solo sus compras (sin insert/update/delete desde el navegador)
drop policy if exists "ver mis compras" on public.enrollments;
create policy "ver mis compras" on public.enrollments
  for select to authenticated using (user_id = (select auth.uid()));

-- lesson_progress: cada alumno gestiona solo su progreso, y solo de cursos que compró
drop policy if exists "ver mi progreso" on public.lesson_progress;
create policy "ver mi progreso" on public.lesson_progress
  for select to authenticated using (user_id = (select auth.uid()));

drop policy if exists "guardar mi progreso" on public.lesson_progress;
create policy "guardar mi progreso" on public.lesson_progress
  for insert to authenticated with check (
    user_id = (select auth.uid())
    and exists (select 1 from public.enrollments e where e.user_id = (select auth.uid()) and e.course_slug = lesson_progress.course_slug)
  );

drop policy if exists "borrar mi progreso" on public.lesson_progress;
create policy "borrar mi progreso" on public.lesson_progress
  for delete to authenticated using (user_id = (select auth.uid()));

-- lesson_videos: gratis para todos; pagas solo para inscritos
drop policy if exists "videos gratis" on public.lesson_videos;
create policy "videos gratis" on public.lesson_videos
  for select to anon, authenticated using (is_free);

drop policy if exists "videos de mis cursos" on public.lesson_videos;
create policy "videos de mis cursos" on public.lesson_videos
  for select to authenticated using (
    exists (select 1 from public.enrollments e where e.user_id = (select auth.uid()) and e.course_slug = lesson_videos.course_slug)
  );

-- =========================================================
-- EJEMPLOS DE USO (ejecutar a mano desde el SQL Editor)
-- =========================================================
-- Cargar el video de una lección:
--   insert into public.lesson_videos (course_slug, lesson_id, video, is_free)
--   values ('tributacion-paraguay', 't-3', 'vimeo:123456789', false)
--   on conflict (course_slug, lesson_id) do update set video = excluded.video, is_free = excluded.is_free;
--
-- Activar un curso a un alumno después de que pagó:
--   insert into public.enrollments (user_id, course_slug)
--   select id, 'tributacion-paraguay' from auth.users where email = 'alumno@correo.com'
--   on conflict do nothing;
--
-- Membresía: activar todos los cursos a un alumno:
--   insert into public.enrollments (user_id, course_slug)
--   select u.id, s.slug from auth.users u,
--     unnest(array['contabilidad-desde-cero','tributacion-paraguay','facturacion-electronica-sifen',
--                  'ips-aportes-y-planillas','ministerio-de-trabajo','ia-para-contadores',
--                  'ia-para-emprendedores','excel-para-contadores']) as s(slug)
--   where u.email = 'alumno@correo.com'
--   on conflict do nothing;
