create table if not exists niveles (
  id text primary key,
  name text not null,
  range text not null,
  short text not null,
  image text not null,
  tagline text not null,
  intro text not null,
  focus text not null,
  benefits jsonb not null default '[]',
  experiences jsonb not null default '[]',
  support text not null default '',
  projects jsonb not null default '[]',
  profile text not null default '',
  grados jsonb not null default '[]',
  orden int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists cursos (
  id uuid primary key default gen_random_uuid(),
  nivel_id text not null references niveles(id) on delete cascade,
  nombre text not null,
  descripcion text not null default '',
  orden int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists noticias (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  resumen text not null default '',
  imagen text not null default '',
  fecha date not null default current_date,
  orden int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists horarios (
  id uuid primary key default gen_random_uuid(),
  nivel_id text references niveles(id) on delete cascade,
  dia text not null,
  hora text not null,
  actividad text not null default 'Clases',
  orden int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists admins (
  email text primary key,
  created_at timestamptz not null default now()
);

alter table admins enable row level security;

drop policy if exists "self_select_admins" on admins;
create policy "self_select_admins" on admins for select
  using (email = (auth.jwt() ->> 'email'));

create or replace function is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from admins where email = (auth.jwt() ->> 'email')
  );
$$;

create table if not exists suscriptores (
  email text primary key,
  nombre text,
  origen text not null default 'login_no_autorizado',
  created_at timestamptz not null default now()
);

alter table suscriptores enable row level security;

drop policy if exists "self_insert_suscriptores" on suscriptores;
create policy "self_insert_suscriptores" on suscriptores for insert
  to authenticated
  with check (email = (auth.jwt() ->> 'email'));

drop policy if exists "admin_select_suscriptores" on suscriptores;
create policy "admin_select_suscriptores" on suscriptores for select
  to authenticated using (is_admin());

drop policy if exists "admin_delete_suscriptores" on suscriptores;
create policy "admin_delete_suscriptores" on suscriptores for delete
  to authenticated using (is_admin());

alter table niveles enable row level security;
alter table cursos enable row level security;
alter table noticias enable row level security;
alter table horarios enable row level security;

do $$
declare
  t text;
begin
  foreach t in array array['niveles', 'cursos', 'noticias', 'horarios'] loop
    execute format('drop policy if exists "public_select_%1$s" on %1$s', t);
    execute format('drop policy if exists "admin_insert_%1$s" on %1$s', t);
    execute format('drop policy if exists "admin_update_%1$s" on %1$s', t);
    execute format('drop policy if exists "admin_delete_%1$s" on %1$s', t);

    execute format('create policy "public_select_%1$s" on %1$s for select using (true)', t);
    execute format('create policy "admin_insert_%1$s" on %1$s for insert to authenticated with check (is_admin())', t);
    execute format('create policy "admin_update_%1$s" on %1$s for update to authenticated using (is_admin()) with check (is_admin())', t);
    execute format('create policy "admin_delete_%1$s" on %1$s for delete to authenticated using (is_admin())', t);
  end loop;
end $$;

insert into niveles (id, name, range, short, image, tagline, intro, focus, benefits, experiences, support, projects, profile, grados, orden)
values
(
  'inicial', 'Inicial', '3, 4 y 5 años', '3 a 5 años', 'science-project.png',
  'Explorar, sentir y crecer con alegría.',
  'Acompañamos los primeros descubrimientos con afecto, juego y experiencias que fortalecen la autonomía, el lenguaje y la seguridad emocional.',
  'Aprendizaje activo y significativo a través del juego, la curiosidad, el movimiento y los vínculos seguros.',
  '["Desarrollo integral y socioemocional","Curiosidad y pensamiento temprano","Autonomía y hábitos positivos","Ambientes seguros y afectivos"]',
  '["Rincones de exploración y juego simbólico","Psicomotricidad, música y expresión artística","Primeros proyectos de ciencia y naturaleza"]',
  'Comunicación cercana, entrevistas de seguimiento y orientaciones para acompañar cada etapa del desarrollo.',
  '["Huerto escolar","Pequeños científicos","Mi mundo de colores"]',
  'Curioso, seguro, empático y feliz de aprender descubriendo el mundo.',
  '[{"nombre":"3 años","enfoque":"Adaptación, juego y comunicación"},{"nombre":"4 años","enfoque":"Autonomía, imaginación y convivencia"},{"nombre":"5 años","enfoque":"Preparación integral para Primaria"}]',
  1
),
(
  'primaria', 'Primaria', '1.º a 6.º grado', '1.° a 6.° grado', 'hero-classroom.png',
  'Indagar, crear y comprender el mundo.',
  'Consolidamos bases académicas sólidas mientras cada estudiante aprende a preguntar, argumentar, colaborar y comunicar sus ideas.',
  'Aprendizaje basado en proyectos, pensamiento crítico y desarrollo progresivo de competencias.',
  '["Comprensión y razonamiento","Creatividad e innovación","Trabajo colaborativo","Inglés comunicativo"]',
  '["Proyectos interdisciplinarios y laboratorios","Lectura, escritura y matemática aplicada","Arte, deporte y ciudadanía activa"]',
  'Tutoría, retroalimentación permanente y comunicación con las familias para acompañar hábitos y progreso.',
  '["Feria de ciencias","Emprende Max","Cine y literatura"]',
  'Inquisitivo, perseverante, colaborador y capaz de transformar preguntas en soluciones.',
  '[{"nombre":"1.º grado","enfoque":"Descubrir cómo aprendemos"},{"nombre":"2.º grado","enfoque":"Consolidar lectura y pensamiento numérico"},{"nombre":"3.º grado","enfoque":"Investigar y comunicar ideas"},{"nombre":"4.º grado","enfoque":"Relacionar conocimientos y resolver retos"},{"nombre":"5.º grado","enfoque":"Argumentar y trabajar con autonomía"},{"nombre":"6.º grado","enfoque":"Integrar saberes y preparar la transición"}]',
  2
),
(
  'secundaria', 'Secundaria', '1.º a 5.º año', '1.° a 5.° año', 'science-project.png',
  'Liderar, decidir y transformar el futuro.',
  'Profundizamos el pensamiento crítico, la investigación y la autonomía para construir un proyecto de vida con propósito.',
  'Aprendizaje profundo mediante metodologías activas, proyectos, debate, investigación y orientación vocacional.',
  '["Visión global y pensamiento ético","Liderazgo y toma de decisiones","Investigación y tecnología","Preparación para estudios superiores"]',
  '["Laboratorios, programación y debate","Proyectos de emprendimiento e impacto social","Orientación vocacional y participación estudiantil"]',
  'Tutoría individual, orientación vocacional y acompañamiento socioemocional en coordinación con la familia.',
  '["Modelo de Naciones Unidas","Innovación tecnológica","Proyecto de impacto social"]',
  'Autónomo, responsable, solidario y preparado para liderar con propósito.',
  '[{"nombre":"1.º año","enfoque":"Adaptación y pensamiento analítico"},{"nombre":"2.º año","enfoque":"Investigación y colaboración"},{"nombre":"3.º año","enfoque":"Autonomía y proyectos"},{"nombre":"4.º año","enfoque":"Profundización y orientación"},{"nombre":"5.º año","enfoque":"Liderazgo y preparación para el futuro"}]',
  3
)
on conflict (id) do update set
  name = excluded.name, range = excluded.range, short = excluded.short, image = excluded.image,
  tagline = excluded.tagline, intro = excluded.intro, focus = excluded.focus,
  benefits = excluded.benefits, experiences = excluded.experiences, support = excluded.support,
  projects = excluded.projects, profile = excluded.profile, grados = excluded.grados, orden = excluded.orden;

insert into cursos (nivel_id, nombre, descripcion, orden)
select * from (values
  ('inicial', 'Personal Social', 'Construimos identidad, autonomía, convivencia y seguridad emocional.', 1),
  ('inicial', 'Psicomotricidad', 'Desarrollamos coordinación, expresión corporal y confianza mediante el movimiento.', 2),
  ('inicial', 'Comunicación', 'Fortalecemos lenguaje oral, escucha, acercamiento a la lectura y expresión creativa.', 3),
  ('inicial', 'Matemática', 'Descubrimos cantidades, patrones, formas y relaciones espaciales jugando.', 4),
  ('inicial', 'Ciencia y Tecnología', 'Exploramos la naturaleza y formulamos explicaciones desde la curiosidad.', 5),
  ('inicial', 'Arte y Creatividad', 'Expresamos ideas y emociones con música, movimiento y lenguajes visuales.', 6),

  ('primaria', 'Comunicación', 'Comprendemos y producimos textos orales y escritos en situaciones diversas.', 1),
  ('primaria', 'Matemática', 'Desarrollamos razonamiento lógico y resolvemos problemas vinculados con la realidad.', 2),
  ('primaria', 'Ciencia y Tecnología', 'Indagamos fenómenos y diseñamos soluciones mediante el pensamiento científico.', 3),
  ('primaria', 'Personal Social', 'Fortalecemos identidad, ciudadanía, historia, geografía y cuidado del ambiente.', 4),
  ('primaria', 'Inglés', 'Desarrollamos comunicación progresiva en inglés para relacionarnos con el mundo.', 5),
  ('primaria', 'Arte y Cultura', 'Creamos y apreciamos manifestaciones artísticas y culturales.', 6),
  ('primaria', 'Educación Física', 'Fortalecemos motricidad, vida saludable y colaboración mediante el deporte.', 7),
  ('primaria', 'Tutoría', 'Acompañamos bienestar, convivencia, hábitos de estudio y toma de decisiones.', 8),
  ('primaria', 'Formación en Valores', 'Reflexionamos sobre ética, servicio, respeto y sentido de comunidad.', 9),

  ('secundaria', 'Comunicación', 'Argumentamos, interpretamos y producimos discursos y textos complejos.', 1),
  ('secundaria', 'Matemática', 'Modelamos situaciones y resolvemos problemas de cantidad, cambio, forma y datos.', 2),
  ('secundaria', 'Ciencia y Tecnología', 'Investigamos fenómenos y construimos soluciones tecnológicas.', 3),
  ('secundaria', 'Ciencias Sociales', 'Interpretamos procesos históricos y gestionamos responsablemente el territorio.', 4),
  ('secundaria', 'Ciudadanía y Cívica', 'Construimos identidad, convivencia democrática y pensamiento ético.', 5),
  ('secundaria', 'Inglés', 'Comunicamos ideas y comprendemos contenidos en una lengua extranjera.', 6),
  ('secundaria', 'Educación para el Trabajo', 'Diseñamos proyectos de emprendimiento económico y social.', 7),
  ('secundaria', 'Arte y Cultura', 'Creamos proyectos y analizamos expresiones culturales con mirada crítica.', 8),
  ('secundaria', 'Educación Física', 'Consolidamos hábitos saludables, autonomía corporal y trabajo en equipo.', 9),
  ('secundaria', 'Tutoría y Orientación', 'Acompañamos bienestar, proyecto de vida y elección vocacional.', 10)
) as v(nivel_id, nombre, descripcion, orden)
where not exists (select 1 from cursos limit 1);

insert into noticias (titulo, resumen, imagen, fecha, orden)
select * from (values
  ('Feria de Ciencias 2026', 'Nuestros estudiantes convierten preguntas en proyectos que impactan su entorno.', 'science-project.png', current_date, 1),
  ('Talleres y clubes abiertos', 'Arte, robótica, lectura y deporte para descubrir nuevos talentos.', 'hero-classroom.png', current_date, 2),
  ('Encuentro con familias', 'Un espacio para dialogar y fortalecer nuestra comunidad educativa.', 'campus.png', current_date, 3)
) as v(titulo, resumen, imagen, fecha, orden)
where not exists (select 1 from noticias limit 1);

insert into horarios (nivel_id, dia, hora, actividad, orden)
select * from (values
  ('inicial', 'Lunes a Viernes', '8:00 a.m. – 1:00 p.m.', 'Clases', 1),
  ('primaria', 'Lunes a Viernes', '8:00 a.m. – 2:30 p.m.', 'Clases', 2),
  ('secundaria', 'Lunes a Viernes', '7:30 a.m. – 3:00 p.m.', 'Clases', 3),
  (null, 'Sábados', '9:00 a.m. – 12:00 p.m.', 'Tutorías y simulacros UNCP', 4)
) as v(nivel_id, dia, hora, actividad, orden)
where not exists (select 1 from horarios limit 1);
