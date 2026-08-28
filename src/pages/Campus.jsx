import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  ClipboardList,
  FolderOpen,
  Laptop,
  Mail,
  MessageCircle,
  Monitor,
  Phone,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

const features = [
  {
    icon: BookOpen,
    title: "Cursos",
    text: "Contenidos, guías y material de cada área, organizados por nivel y grado.",
  },
  {
    icon: ClipboardList,
    title: "Tareas",
    text: "Entrega de trabajos en línea con fecha límite y retroalimentación del docente.",
  },
  {
    icon: CalendarDays,
    title: "Agenda",
    text: "Horarios, evaluaciones y actividades escolares en un solo calendario.",
  },
  {
    icon: Award,
    title: "Notas",
    text: "Seguimiento del rendimiento académico actualizado durante todo el bimestre.",
  },
  {
    icon: FolderOpen,
    title: "Recursos",
    text: "Biblioteca digital, simulacros UNCP y material de apoyo descargable.",
  },
  {
    icon: MessageCircle,
    title: "Mensajes",
    text: "Comunicación directa entre familias, docentes y tutoría escolar.",
  },
];

const steps = [
  {
    title: "Matricúlate",
    text: "Al confirmar la matrícula, el colegio registra al estudiante en el campus.",
  },
  {
    title: "Recibe tus credenciales",
    text: "Enviamos usuario y contraseña al correo registrado por la familia.",
  },
  {
    title: "Ingresa desde cualquier dispositivo",
    text: "Accede desde el computador, tablet o celular, dentro o fuera del colegio.",
  },
  {
    title: "Escríbenos si necesitas ayuda",
    text: "Nuestro equipo de soporte resuelve cualquier problema de acceso.",
  },
];

export default function Campus() {
  return (
    <div className="bg-white">
      <SiteHeader active="Campus" />
      <main>
        <section className="relative overflow-hidden bg-emerald-950 text-white">
          <div className="absolute inset-0 notebook-grid-dark opacity-50" />
          <div className="relative mx-auto grid max-w-[1380px] items-center gap-10 px-6 py-20 sm:px-12 lg:grid-cols-[1fr_.95fr] lg:px-20">
            <div className="reveal-up">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-400 px-4 py-1.5 text-xs font-black uppercase tracking-[.18em] text-emerald-950">
                <Laptop size={14} /> Campus Virtual
              </span>
              <h1 className="font-display mt-5 text-4xl leading-[1.05] sm:text-5xl">
                Toda la vida escolar, a un clic de distancia.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-emerald-100/75">
                Tareas, notas, comunicados y recursos en un entorno digital
                seguro para estudiantes, docentes y familias del Colegio Max
                Planck.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#funciones" className="action-light">
                  Ver funciones <ArrowRight size={18} />
                </a>
                <a
                  href="mailto:campus@colegiomaxplanck.edu.pe?subject=Solicito%20acceso%20al%20campus%20virtual"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-emerald-950"
                >
                  Solicitar acceso
                </a>
              </div>
            </div>

            <div className="notebook-grid-dark rounded-2xl border border-white/10 p-6 sm:p-8">
              <div className="overflow-hidden rounded-xl bg-white text-emerald-950 shadow-2xl">
                <div className="flex items-center justify-between border-b border-emerald-950/10 p-5">
                  <div>
                    <strong className="font-display text-lg">
                      Hola, estudiante
                    </strong>
                    <p className="text-xs text-slate-500">
                      Tu aprendizaje de hoy
                    </p>
                  </div>
                  <span className="size-3 rounded-full bg-emerald-500" />
                </div>
                <div className="grid grid-cols-3 gap-2 p-5">
                  {features.map(({ icon: Icon, title }) => (
                    <div
                      key={title}
                      className="flex flex-col items-center gap-1.5 bg-emerald-50 p-3 text-center"
                    >
                      <Icon size={16} className="text-emerald-700" />
                      <span className="text-[11px] font-bold">{title}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 border-t border-emerald-950/10 p-5">
                  <p className="flex items-center justify-between text-xs">
                    <span className="font-semibold">
                      Tarea: Simulacro UNCP N.º 4
                    </span>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 font-bold text-amber-700">
                      Pendiente
                    </span>
                  </p>
                  <p className="flex items-center justify-between text-xs">
                    <span className="font-semibold">
                      Comunicado: Reunión de padres
                    </span>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-bold text-emerald-700">
                      Nuevo
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="funciones" className="scroll-mt-24 mx-auto max-w-[1380px] px-6 py-24 lg:px-10">
          <span className="section-label">Qué encuentras dentro</span>
          <h2 className="section-title max-w-xl">
            Un solo lugar para acompañar el aprendizaje
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-2xl border border-emerald-950/10 p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
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
        </section>

        <section className="bg-emerald-50/60 py-24">
          <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
            <span className="section-label">Cómo acceder</span>
            <h2 className="section-title max-w-lg">
              De la matrícula a tu primer inicio de sesión
            </h2>
            <div className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <div className="absolute left-0 right-0 top-6 hidden border-t border-dashed border-emerald-300 lg:block" />
              {steps.map(({ title, text }, i) => (
                <article key={title} className="relative">
                  <span className="relative z-10 grid size-12 place-items-center rounded-full border border-emerald-200 bg-white font-bold text-emerald-800 shadow-sm">
                    {i + 1}
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

        <section className="mx-auto max-w-[1380px] px-6 py-24 lg:px-10">
          <span className="section-label">Requisitos técnicos</span>
          <h2 className="section-title max-w-lg">
            Lo que necesitas para ingresar
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl bg-emerald-950 p-7 text-white">
              <Monitor className="text-amber-400" size={24} />
              <h3 className="font-display mt-4 text-lg">
                Cualquier dispositivo
              </h3>
              <p className="mt-2 text-sm leading-6 text-emerald-100/70">
                Computador, tablet o celular, con un navegador actualizado
                (Chrome, Edge o Safari).
              </p>
            </article>
            <article className="rounded-2xl bg-emerald-950 p-7 text-white">
              <Wifi className="text-amber-400" size={24} />
              <h3 className="font-display mt-4 text-lg">
                Conexión a internet
              </h3>
              <p className="mt-2 text-sm leading-6 text-emerald-100/70">
                Recomendada para tareas, tutorías por videollamada y
                simulacros en línea.
              </p>
            </article>
            <article className="rounded-2xl bg-emerald-950 p-7 text-white">
              <ShieldCheck className="text-amber-400" size={24} />
              <h3 className="font-display mt-4 text-lg">Acceso seguro</h3>
              <p className="mt-2 text-sm leading-6 text-emerald-100/70">
                Usuario y contraseña personales, exclusivos para cada
                estudiante y apoderado.
              </p>
            </article>
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-6 pb-24 lg:px-10">
          <div className="grid gap-8 rounded-[2rem] border border-emerald-950/10 bg-emerald-50/60 p-8 sm:p-12 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:p-14">
            <div>
              <h2 className="font-display text-3xl text-emerald-950 sm:text-4xl">
                ¿Necesitas ayuda para ingresar?
              </h2>
              <p className="mt-3 max-w-md text-slate-600">
                Si eres familia matriculada y no recuerdas tus credenciales, o
                aún no las recibes, escríbenos y te ayudamos a recuperar el
                acceso.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <p className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
                  <Mail size={16} className="text-emerald-700" />
                  campus@colegiomaxplanck.edu.pe
                </p>
                <p className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
                  <Phone size={16} className="text-emerald-700" />
                  +51 964 123 456
                </p>
              </div>
            </div>
            <a
              href="mailto:campus@colegiomaxplanck.edu.pe?subject=Necesito%20ayuda%20con%20mi%20acceso%20al%20campus"
              className="action-primary w-fit lg:justify-self-end"
            >
              Escribir a soporte <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
