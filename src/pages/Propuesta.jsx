import { useEffect } from "react";
import {
  Award,
  BookOpen,
  GraduationCap,
  Handshake,
  Lightbulb,
  MessageCircle,
  Monitor,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Check,
  ArrowRight,
} from "lucide-react";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

const differences = [
  {
    icon: BookOpen,
    title: "Material alineado al examen UNCP",
    us: "Clases y cuadernillos elaborados según el temario oficial del examen de admisión de la UNCP.",
    others: "Material genérico, sin relación directa con el examen de ingreso.",
  },
  {
    icon: Target,
    title: "Simulacros mensuales",
    us: "Simulacros tipo UNCP desde 3.º de Secundaria, con retroalimentación de puntaje.",
    others: "Simulacros ocasionales o inexistentes.",
  },
  {
    icon: GraduationCap,
    title: "Docentes especializados",
    us: "Profesores que conocen el banco de preguntas y los criterios de evaluación de la UNCP.",
    others: "Docentes sin formación específica en el examen de admisión.",
  },
  {
    icon: TrendingUp,
    title: "Seguimiento de puntaje",
    us: "Reportes individuales de avance y ranking simulado, grado a grado.",
    others: "Sin métricas de preparación preuniversitaria.",
  },
  {
    icon: Handshake,
    title: "Convenio académico",
    us: "Visitas guiadas y charlas vocacionales dentro del campus de la UNCP.",
    others: "Sin vínculo formal con la universidad.",
  },
];

const accreditations = [
  {
    icon: ShieldCheck,
    title: "Colegio acreditado ante el Ministerio de Educación",
    text: "Cumplimos los estándares de gestión pedagógica e infraestructura exigidos por el Minedu.",
  },
  {
    icon: Award,
    title: "Convenio “Ruta UNCP”",
    text: "Programa oficial de preparación preuniversitaria en articulación con la Universidad Nacional del Centro del Perú.",
  },
  {
    icon: Star,
    title: "Reconocimiento regional",
    text: "Entre los colegios de Junín con mejor desempeño de sus egresados en el examen de admisión UNCP.",
  },
];

const model = [
  {
    icon: Lightbulb,
    title: "Aprendizaje activo",
    text: "Clases basadas en retos y proyectos que conectan la teoría con la práctica desde Inicial.",
  },
  {
    icon: Target,
    title: "Entrenamiento UNCP",
    text: "Banco de preguntas, simulacros cronometrados y análisis de resultados desde Secundaria.",
  },
  {
    icon: Users,
    title: "Tutoría y acompañamiento",
    text: "Seguimiento académico y vocacional personalizado, grado a grado.",
  },
];

const testimonials = [
  {
    quote:
      "Mi hija ingresó a la UNCP en Ingeniería de Sistemas gracias a los simulacros mensuales y el seguimiento de sus profesores.",
    name: "Rocío M.",
    role: "Madre de egresada",
  },
  {
    quote:
      "Los cuadernillos de Max Planck son prácticamente iguales al examen real. Llegué a rendir con mucha más confianza.",
    name: "Diego H.",
    role: "Egresado de Secundaria",
  },
  {
    quote:
      "Ningún otro colegio de la zona ofrece un convenio real con la universidad. Eso marcó la diferencia en la preparación de mi hijo.",
    name: "Patricia L.",
    role: "Madre de familia",
  },
];

const allies = [
  "Universidad Nacional del Centro del Perú (UNCP)",
  "Red de Colegios de Junín",
  "Instituto de Idiomas Max Planck",
  "Asociación Deportiva Escolar Regional",
];

const virtualServices = [
  {
    icon: Monitor,
    title: "Campus virtual",
    text: "Tareas, notas, comunicados y horarios en un solo lugar.",
  },
  {
    icon: BookOpen,
    title: "Biblioteca digital",
    text: "Banco de simulacros UNCP y material de estudio en línea.",
  },
  {
    icon: MessageCircle,
    title: "Tutoría en línea",
    text: "Asesoría académica y vocacional por videollamada.",
  },
];

export default function Propuesta() {
  useEffect(() => {
    if (!window.location.hash) return;
    const el = document.querySelector(window.location.hash);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="bg-white">
      <SiteHeader active="Propuesta" />
      <main>
        <section className="relative overflow-hidden bg-emerald-950 text-white">
          <div className="absolute inset-0 notebook-grid-dark opacity-50" />
          <div className="relative mx-auto max-w-[1380px] px-6 py-20 sm:px-12 lg:px-20">
            <div className="reveal-up max-w-2xl">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-400 px-4 py-1.5 text-xs font-black uppercase tracking-[.18em] text-emerald-950">
                Propuesta educativa
              </span>
              <h1 className="font-display mt-5 text-4xl leading-[1.05] sm:text-6xl">
                La propuesta que conecta tu colegio con el ingreso a la UNCP.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-emerald-100/75">
                Un plan curricular exigente, acompañado de principio a fin por
                una preparación real para el examen de admisión de la
                Universidad Nacional del Centro del Perú.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#diferencia" className="action-light">
                  Ver diferenciales <ArrowRight size={18} />
                </a>
                <a
                  href="#modelo-pedagogico"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-emerald-950"
                >
                  Modelo pedagógico
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="diferencia" className="scroll-mt-24 mx-auto max-w-[1380px] px-6 py-24 lg:px-10">
          <span className="section-label">Por qué elegir Max Planck</span>
          <h2 className="section-title max-w-xl">
            La diferencia se nota antes del examen
          </h2>
          <p className="body-copy max-w-2xl">
            Mientras muchos colegios trabajan un plan de estudios genérico, en
            Max Planck integramos, desde Secundaria, contenidos y práctica
            orientados al examen de admisión de la UNCP — sin descuidar la
            formación integral.
          </p>

          <div className="mt-12 border-t border-emerald-950/10">
            {differences.map(({ icon: Icon, title, us, others }) => (
              <div
                key={title}
                className="grid gap-6 border-b border-emerald-950/10 py-8 lg:grid-cols-[.9fr_1.1fr_1.1fr] lg:items-center"
              >
                <div className="flex items-center gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-emerald-800 text-white">
                    <Icon size={20} />
                  </span>
                  <h3 className="font-display text-lg text-emerald-950">
                    {title}
                  </h3>
                </div>
                <p className="flex items-start gap-3 rounded-xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
                  <Check size={17} className="mt-0.5 shrink-0 text-emerald-700" />
                  <span>
                    <strong className="mr-1">Max Planck:</strong>
                    {us}
                  </span>
                </p>
                <p className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-500">
                  <X size={17} className="mt-0.5 shrink-0 text-slate-400" />
                  <span>
                    <strong className="mr-1 text-slate-600">
                      Colegio tradicional:
                    </strong>
                    {others}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="acreditacion" className="scroll-mt-24 bg-emerald-50/60 py-24">
          <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
            <span className="section-label">Acreditación</span>
            <h2 className="section-title max-w-lg">
              Respaldo institucional y académico
            </h2>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {accreditations.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-emerald-950/10 bg-white p-7"
                >
                  <span className="grid size-11 place-items-center rounded-full bg-emerald-800 text-white">
                    <Icon size={20} />
                  </span>
                  <h3 className="font-display mt-5 text-lg text-emerald-950">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="modelo-pedagogico" className="scroll-mt-24 mx-auto max-w-[1380px] px-6 py-24 lg:px-10">
          <span className="section-label">Modelo pedagógico</span>
          <h2 className="section-title max-w-xl">
            Un modelo que prepara para el aula y para el examen
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {model.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-2xl bg-emerald-950 p-7 text-white"
              >
                <Icon className="text-amber-400" size={26} />
                <h3 className="font-display mt-5 text-xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-emerald-100/70">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="testimonios" className="scroll-mt-24 bg-emerald-50/60 py-24">
          <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
            <span className="section-label">Testimonios</span>
            <h2 className="section-title max-w-lg">
              Familias que ya viven la diferencia
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map(({ quote, name, role }) => (
                <blockquote
                  key={name}
                  className="m-0 rounded-2xl bg-white p-7 shadow-sm"
                >
                  <span className="font-display text-4xl text-emerald-600">
                    &ldquo;
                  </span>
                  <p className="font-display -mt-2 text-lg leading-7 text-emerald-950">
                    {quote}
                  </p>
                  <footer className="mt-5 text-sm">
                    <strong className="text-emerald-900">{name}</strong>
                    <span className="ml-2 text-slate-400">{role}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section id="aliados" className="scroll-mt-24 mx-auto max-w-[1380px] px-6 py-24 lg:px-10">
          <span className="section-label">Aliados</span>
          <h2 className="section-title max-w-lg">
            Instituciones que respaldan nuestra propuesta
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {allies.map((name) => (
              <p
                key={name}
                className="flex items-center gap-3 rounded-xl border border-emerald-950/10 p-5 text-sm font-bold text-emerald-950"
              >
                <Handshake size={18} className="shrink-0 text-emerald-700" />
                {name}
              </p>
            ))}
          </div>
        </section>

        <section id="servicios-virtuales" className="scroll-mt-24 bg-emerald-950 py-24 text-white">
          <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-[.22em] text-emerald-300">
                  Servicios virtuales
                </span>
                <h2 className="font-display mt-3 max-w-xl text-3xl sm:text-4xl">
                  Acompañamos el aprendizaje también en línea
                </h2>
              </div>
              <a href="/campus" className="action-light w-fit shrink-0">
                Explorar el campus virtual <ArrowRight size={18} />
              </a>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {virtualServices.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-white/15 bg-white/5 p-7"
                >
                  <Icon className="text-amber-400" size={24} />
                  <h3 className="font-display mt-4 text-lg">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-emerald-100/70">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
