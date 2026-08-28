import { supabase, isSupabaseConfigured } from "./supabase";
import { levelsData, courseCatalog } from "../data/education";

function fallbackNiveles() {
  return Object.values(levelsData).map((lvl, i) => ({
    ...lvl,
    grados: lvl.grades.map((nombre, idx) => ({
      nombre,
      enfoque: lvl.id === "inicial"
        ? ["Adaptación, juego y comunicación", "Autonomía, imaginación y convivencia", "Preparación integral para Primaria"][idx]
        : lvl.id === "primaria"
          ? ["Descubrir cómo aprendemos", "Consolidar lectura y pensamiento numérico", "Investigar y comunicar ideas", "Relacionar conocimientos y resolver retos", "Argumentar y trabajar con autonomía", "Integrar saberes y preparar la transición"][idx]
          : ["Adaptación y pensamiento analítico", "Investigación y colaboración", "Autonomía y proyectos", "Profundización y orientación", "Liderazgo y preparación para el futuro"][idx],
    })),
    orden: i + 1,
  }));
}

function fallbackCursos(nivelId) {
  return (courseCatalog[nivelId] || []).map(([nombre, descripcion], i) => ({
    id: `${nivelId}-${i}`,
    nivel_id: nivelId,
    nombre,
    descripcion,
    orden: i + 1,
  }));
}

function fallbackNoticias() {
  return [
    { id: "n1", titulo: "Feria de Ciencias 2026", resumen: "Nuestros estudiantes convierten preguntas en proyectos que impactan su entorno.", imagen: "science-project.png", orden: 1 },
    { id: "n2", titulo: "Talleres y clubes abiertos", resumen: "Arte, robótica, lectura y deporte para descubrir nuevos talentos.", imagen: "hero-classroom.png", orden: 2 },
    { id: "n3", titulo: "Encuentro con familias", resumen: "Un espacio para dialogar y fortalecer nuestra comunidad educativa.", imagen: "campus.png", orden: 3 },
  ];
}

function fallbackHorarios() {
  return [
    { id: "h1", nivel_id: "inicial", dia: "Lunes a Viernes", hora: "8:00 a.m. – 1:00 p.m.", actividad: "Clases", orden: 1 },
    { id: "h2", nivel_id: "primaria", dia: "Lunes a Viernes", hora: "8:00 a.m. – 2:30 p.m.", actividad: "Clases", orden: 2 },
    { id: "h3", nivel_id: "secundaria", dia: "Lunes a Viernes", hora: "7:30 a.m. – 3:00 p.m.", actividad: "Clases", orden: 3 },
    { id: "h4", nivel_id: null, dia: "Sábados", hora: "9:00 a.m. – 12:00 p.m.", actividad: "Tutorías y simulacros UNCP", orden: 4 },
  ];
}

// ---- Lectura pública (con reserva a los datos estáticos del proyecto) ----

export async function fetchNiveles() {
  if (!isSupabaseConfigured) return fallbackNiveles();
  const { data, error } = await supabase.from("niveles").select("*").order("orden");
  if (error || !data?.length) return fallbackNiveles();
  return data;
}

export async function fetchNivel(id) {
  const niveles = await fetchNiveles();
  return niveles.find((n) => n.id === id) || null;
}

export async function fetchCursos(nivelId) {
  if (!isSupabaseConfigured) return fallbackCursos(nivelId);
  const { data, error } = await supabase
    .from("cursos")
    .select("*")
    .eq("nivel_id", nivelId)
    .order("orden");
  if (error || !data?.length) return fallbackCursos(nivelId);
  return data;
}

export async function fetchNoticias() {
  if (!isSupabaseConfigured) return fallbackNoticias();
  const { data, error } = await supabase.from("noticias").select("*").order("orden");
  if (error || !data?.length) return fallbackNoticias();
  return data;
}

export async function fetchHorarios() {
  if (!isSupabaseConfigured) return fallbackHorarios();
  const { data, error } = await supabase.from("horarios").select("*").order("orden");
  if (error || !data?.length) return fallbackHorarios();
  return data;
}

// Solo visible/legible para administradores (política RLS "admin_select_suscriptores").
export async function fetchSuscriptores() {
  requireSupabase();
  const { data, error } = await supabase
    .from("suscriptores")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

// ---- Escritura — requiere Supabase configurado y sesión de admin ----
// (la política RLS es la que realmente lo exige; esto solo da un mensaje claro).

function requireSupabase() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "El panel de administración no está conectado a una base de datos todavía."
    );
  }
}

export async function saveNivel(nivel) {
  requireSupabase();
  const { error } = await supabase.from("niveles").upsert(nivel);
  if (error) throw error;
}

export async function saveCurso(curso) {
  requireSupabase();
  const { error } = await supabase.from("cursos").upsert(curso);
  if (error) throw error;
}

export async function deleteCurso(id) {
  requireSupabase();
  const { error } = await supabase.from("cursos").delete().eq("id", id);
  if (error) throw error;
}

export async function saveNoticia(noticia) {
  requireSupabase();
  const { error } = await supabase.from("noticias").upsert(noticia);
  if (error) throw error;
}

export async function deleteNoticia(id) {
  requireSupabase();
  const { error } = await supabase.from("noticias").delete().eq("id", id);
  if (error) throw error;
}

export async function saveHorario(horario) {
  requireSupabase();
  const { error } = await supabase.from("horarios").upsert(horario);
  if (error) throw error;
}

export async function deleteHorario(id) {
  requireSupabase();
  const { error } = await supabase.from("horarios").delete().eq("id", id);
  if (error) throw error;
}

export async function deleteSuscriptor(email) {
  requireSupabase();
  const { error } = await supabase.from("suscriptores").delete().eq("email", email);
  if (error) throw error;
}
