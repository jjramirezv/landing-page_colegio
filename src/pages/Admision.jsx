import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  FileText,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Users,
} from "lucide-react";
import { fetchNiveles } from "../lib/contentApi";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

const emptyForm = { nombre: "", celular: "", correo: "", colegio: "", nivel: "", grado: "" };
const fieldClass =
  "rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-normal text-white placeholder:text-white/50 outline-none transition focus:border-amber-400 focus:bg-white/15";

const steps = [
  {
    icon: ClipboardList,
    title: "Postula",
    text: "Completa el formulario de postulación con los datos del estudiante y la familia.",
  },
  {
    icon: Users,
    title: "Entrevista familiar",
    text: "Un encuentro cercano con nuestro equipo para conocerse y resolver dudas.",
  },
  {
    icon: FileText,
    title: "Evaluación del estudiante",
    text: "Evaluación acorde a la edad, en un ambiente cálido y sin presión.",
  },
  {
    icon: GraduationCap,
    title: "Resultados y matrícula",
    text: "Comunicamos los resultados y acompañamos el proceso de matrícula.",
  },
];

const calendar = [
  ["Agosto - Octubre 2026", "Postulaciones abiertas"],
  ["Septiembre - Noviembre 2026", "Entrevistas y evaluaciones"],
  ["Diciembre 2026", "Publicación de resultados"],
  ["Enero 2027", "Matrícula y bienvenida"],
];

const requirementGroups = {
  inicial: {
    label: "Inicial",
    items: [
      "Certificado de nacimiento",
      "Carné de vacunas al día",
      "Ficha de matrícula completa",
      "2 fotos tamaño carné",
    ],
  },
  escolar: {
    label: "Primaria y Secundaria",
    items: [
      "Certificado de estudios del año anterior",
      "Informe de personalidad o concentración de notas",
      "Certificado de nacimiento",
      "Ficha de matrícula completa",
    ],
  },
};

const faqs = [
  [
    "¿Cuándo debo postular?",
    "Recomendamos postular entre agosto y octubre para el año escolar siguiente, aunque evaluamos cupos disponibles durante todo el año según el nivel.",
  ],
  [
    "¿En qué consiste la evaluación de ingreso?",
    "Una evaluación acorde a la edad del estudiante, junto a una entrevista familiar, en un ambiente cálido y sin presión.",
  ],
  [
    "¿Aceptan matrícula durante el año escolar?",
    "Sí, sujeto a la disponibilidad de cupos por nivel y grado. Contáctanos para conocer las vacantes vigentes.",
  ],
  [
    "¿Los hermanos de estudiantes actuales tienen prioridad?",
    "Sí, las familias con hijos ya matriculados tienen prioridad dentro del proceso de admisión.",
  ],
  [
    "¿Puedo agendar una visita antes de postular?",
    "Por supuesto. Organizamos visitas guiadas para conocer nuestras instalaciones, salas y equipo docente.",
  ],
];

export default function Admision() {
  const [group, setGroup] = useState("inicial");
  const [open, setOpen] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [nivelOptions, setNivelOptions] = useState([]);
  const selectedNivel = nivelOptions.find((n) => n.id === form.nivel);

  useEffect(() => {
    fetchNiveles().then(setNivelOptions);
  }, []);

  useEffect(() => {
    if (!window.location.hash) return;
    const el = document.querySelector(window.location.hash);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  function updateField(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "nivel" ? { grado: "" } : {}),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const body = [
      `Nombres y apellidos del postulante: ${form.nombre}`,
      `Celular del apoderado: ${form.celular}`,
      `Correo electrónico: ${form.correo}`,
      `Colegio de procedencia: ${form.colegio || "-"}`,
      `Nivel de interés: ${selectedNivel?.name || "-"}`,
      `Grado: ${form.grado || "-"}`,
    ].join("\n");
    window.location.href = `mailto:admisiones@colegiomaxplanck.edu.pe?subject=${encodeURIComponent("Solicitud de información - Admisión 2027")}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="bg-white">
      <SiteHeader active="Admisión" />
      <main>
        <section className="relative overflow-hidden bg-emerald-950 text-white">
          <div className="absolute inset-0 notebook-grid-dark opacity-50" />
          <div className="relative mx-auto grid min-h-[480px] max-w-[1380px] lg:grid-cols-[1fr_.9fr]">
            <div className="reveal-up flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-20">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-400 px-4 py-1.5 text-xs font-black uppercase tracking-[.18em] text-emerald-950">
                <Sparkles size={14} /> Admisiones 2027 abiertas
              </span>
              <h1 className="font-display mt-5 text-5xl leading-[1.02] sm:text-6xl">
                Sé parte de nuestra comunidad.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-emerald-100/75">
                Un proceso cercano, claro y humano para acompañarte a elegir el
                colegio donde tu hijo o hija va a crecer.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contacto" className="action-light">
                  Iniciar postulación <ArrowRight size={18} />
                </a>
                <a
                  href="#requisitos"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-emerald-950"
                >
                  Ver requisitos
                </a>
              </div>
            </div>
            <div className="relative min-h-[320px]">
              <img
                src="/images/campus.png"
                alt="Familias visitando el Colegio Max Planck"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent lg:bg-gradient-to-l" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-6 py-24 lg:px-10">
          <span className="section-label">Cómo postular</span>
          <h2 className="section-title max-w-lg">
            Un proceso cercano, claro y simple
          </h2>
          <div className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-6 hidden border-t border-dashed border-emerald-300 lg:block" />
            {steps.map(({ icon: Icon, title, text }, i) => (
              <article key={title} className="relative">
                <span className="relative z-10 grid size-12 place-items-center rounded-full border border-emerald-200 bg-white font-bold text-emerald-800 shadow-sm">
                  <Icon size={20} />
                </span>
                <p className="mt-5 text-xs font-bold uppercase tracking-[.18em] text-emerald-700">
                  Paso 0{i + 1}
                </p>
                <h3 className="font-display mt-2 text-xl text-emerald-950">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-emerald-50/60 py-24">
          <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="section-label">Calendario</span>
                <h2 className="font-display mt-3 text-3xl text-emerald-950 sm:text-4xl">
                  Fechas del proceso de admisión
                </h2>
              </div>
              <p className="max-w-sm text-sm text-slate-500">
                Las fechas pueden variar según el nivel y la disponibilidad de
                cupos. Confírmalas siempre con nuestro equipo de admisión.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {calendar.map(([when, what], i) => (
                <article
                  key={what}
                  className="rounded-2xl border border-emerald-950/10 bg-white p-6"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-emerald-800 text-white">
                    <CalendarDays size={17} />
                  </span>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[.16em] text-emerald-700">
                    Etapa 0{i + 1}
                  </p>
                  <h3 className="font-display mt-1 text-lg text-emerald-950">
                    {what}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">{when}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-6 py-16 lg:px-10">
          <div className="grid overflow-hidden rounded-[2rem] shadow-[0_24px_70px_rgba(3,55,43,.12)] lg:grid-cols-2">
            <div className="bg-emerald-950 p-8 text-white sm:p-12 lg:p-14">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-400 px-4 py-1.5 text-xs font-black uppercase tracking-[.18em] text-emerald-950">
                Admisión 2027
              </span>
              <h2 className="font-display mt-5 text-3xl sm:text-4xl">
                Postula a Max Planck
              </h2>
              <p className="mt-3 max-w-md text-emerald-100/75">
                Completa tus datos y te contactamos con toda la información de
                vacantes y requisitos para el nivel que buscas.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
                <label className="grid gap-1.5 text-sm font-semibold">
                  Nombres y apellidos del postulante
                  <input
                    required
                    value={form.nombre}
                    onChange={(e) => updateField("nombre", e.target.value)}
                    placeholder="Nombres y apellidos"
                    className={fieldClass}
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-sm font-semibold">
                    Celular del apoderado
                    <input
                      required
                      type="tel"
                      value={form.celular}
                      onChange={(e) => updateField("celular", e.target.value)}
                      placeholder="+51 964 123 456"
                      className={fieldClass}
                    />
                  </label>
                  <label className="grid gap-1.5 text-sm font-semibold">
                    Correo electrónico
                    <input
                      required
                      type="email"
                      value={form.correo}
                      onChange={(e) => updateField("correo", e.target.value)}
                      placeholder="tu@correo.com"
                      className={fieldClass}
                    />
                  </label>
                </div>

                <label className="grid gap-1.5 text-sm font-semibold">
                  Colegio de procedencia
                  <input
                    value={form.colegio}
                    onChange={(e) => updateField("colegio", e.target.value)}
                    placeholder="Ingresa el nombre del colegio"
                    className={fieldClass}
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-sm font-semibold">
                    ¿Nivel de interés?
                    <select
                      required
                      value={form.nivel}
                      onChange={(e) => updateField("nivel", e.target.value)}
                      className={fieldClass}
                    >
                      <option value="" className="text-emerald-950">Selecciona un nivel</option>
                      {nivelOptions.map((n) => (
                        <option key={n.id} value={n.id} className="text-emerald-950">
                          {n.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-1.5 text-sm font-semibold">
                    Grado
                    <select
                      required
                      disabled={!selectedNivel}
                      value={form.grado}
                      onChange={(e) => updateField("grado", e.target.value)}
                      className={`${fieldClass} disabled:opacity-50`}
                    >
                      <option value="" className="text-emerald-950">
                        {selectedNivel ? "Selecciona un grado" : "Elige un nivel primero"}
                      </option>
                      {selectedNivel?.grados.map((g) => (
                        <option key={g.nombre} value={g.nombre} className="text-emerald-950">
                          {g.nombre}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 text-sm font-bold text-emerald-950 transition hover:-translate-y-0.5 hover:bg-amber-300"
                >
                  Enviar solicitud <ArrowRight size={17} />
                </button>
              </form>
            </div>
            <div className="relative min-h-[320px] lg:min-h-full">
              <img
                src="/images/hero-classroom.png"
                alt="Estudiantes del Colegio Max Planck en clase"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section id="requisitos" className="scroll-mt-24 bg-emerald-50/60 py-24">
          <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
            <span className="section-label">Documentación</span>
            <h2 className="section-title max-w-lg">
              Requisitos para postular
            </h2>

            <div className="mt-8 inline-flex rounded-full border border-emerald-950/10 bg-white p-1">
              {Object.entries(requirementGroups).map(([key, g]) => (
                <button
                  key={key}
                  onClick={() => setGroup(key)}
                  aria-pressed={group === key}
                  className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${group === key ? "bg-emerald-800 text-white" : "text-emerald-900 hover:bg-emerald-50"}`}
                >
                  {g.label}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {requirementGroups[group].items.map((item) => (
                <p
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-white p-4 text-sm font-medium text-emerald-950"
                >
                  <Check size={16} className="shrink-0 text-emerald-700" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-6 py-24 lg:px-10">
          <span className="section-label">Preguntas frecuentes</span>
          <h2 className="section-title max-w-lg">Resolvemos tus dudas</h2>
          <div className="mt-10 border-t border-emerald-950/10">
            {faqs.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <article key={q} className="border-b border-emerald-950/10">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 py-5 text-left"
                  >
                    <strong className="font-display flex-1 text-lg text-emerald-950">
                      {q}
                    </strong>
                    <ChevronDown
                      className={`shrink-0 text-emerald-700 transition ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <p className="max-w-2xl pb-6 leading-7 text-slate-600">
                      {a}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section id="contacto" className="scroll-mt-24 mx-auto max-w-[1380px] px-6 pb-24 lg:px-10">
          <div className="grid overflow-hidden rounded-[2rem] bg-emerald-950 text-white lg:grid-cols-[1.1fr_.9fr]">
            <div className="p-8 sm:p-12 lg:p-14">
              <HeartHandshake className="text-amber-400" size={30} />
              <h2 className="font-display mt-6 text-3xl sm:text-4xl">
                Hablemos de la admisión de tu hijo o hija.
              </h2>
              <p className="mt-4 max-w-md text-emerald-100/75">
                Escríbenos o agenda una visita presencial. Nuestro equipo de
                admisión te acompaña en cada paso del proceso.
              </p>
              <div className="mt-8 grid gap-3">
                <a
                  href="mailto:admisiones@colegiomaxplanck.edu.pe"
                  className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-4 text-sm break-all"
                >
                  <Mail size={18} className="shrink-0 text-amber-300" />
                  admisiones@colegiomaxplanck.edu.pe
                </a>
                <a
                  href="tel:+51964123456"
                  className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-4 text-sm"
                >
                  <Phone size={18} className="shrink-0 text-amber-300" />
                  +51 964 123 456
                </a>
                <p className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-4 text-sm">
                  <MapPin size={18} className="shrink-0 text-amber-300" />
                  Av. Mariscal Castilla 456, El Tambo, Huancayo
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center bg-amber-400 p-8 text-emerald-950 sm:p-12 lg:p-14">
              <p className="text-xs font-black uppercase tracking-[.2em]">
                Vacantes limitadas
              </p>
              <h3 className="font-display mt-3 text-3xl">
                Agenda una visita al colegio
              </h3>
              <p className="mt-3 text-sm leading-6 text-emerald-950/75">
                Conoce nuestras instalaciones, el equipo docente y resuelve
                todas tus dudas antes de postular.
              </p>
              <a
                href="mailto:admisiones@colegiomaxplanck.edu.pe?subject=Quiero%20agendar%20una%20visita"
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-900"
              >
                Solicitar visita <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
