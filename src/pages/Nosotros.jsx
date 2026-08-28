import {
  Brain,
  HeartHandshake,
  Leaf,
  Scale,
  Sparkles,
  Users,
} from "lucide-react";
import {
  SiteFooter,
  SiteHeader,
  TextLink,
} from "../components/SiteChrome";

const values = [
  [Brain, "Curiosidad", "Preguntamos, exploramos y nos maravillamos."],
  [Scale, "Ética", "Actuamos con honestidad y responsabilidad."],
  [Users, "Respeto", "Valoramos a cada persona y su dignidad."],
  [
    Leaf,
    "Sostenibilidad",
    "Cuidamos nuestro entorno y pensamos a largo plazo.",
  ],
  [Sparkles, "Excelencia", "Buscamos calidad en lo que hacemos."],
  [
    HeartHandshake,
    "Servicio",
    "Ponemos nuestro talento al servicio de los demás.",
  ],
];
const history = [
  [
    "2006",
    "Nace el proyecto educativo con una visión de integrar ciencia, ética y humanidad.",
  ],
  [
    "2010",
    "Ampliamos niveles y consolidamos un modelo basado en indagación y pensamiento crítico.",
  ],
  [
    "2015",
    "Inauguramos nuevas instalaciones y laboratorios para impulsar la innovación.",
  ],
  [
    "2020+",
    "Fortalecemos nuestra comunidad e incorporamos tecnología y proyectos de impacto social.",
  ],
];
export default function Nosotros() {
  return (
    <div className="bg-white">
      <SiteHeader active="Nosotros" />
      <main>
        <section className="notebook-grid">
          <div className="mx-auto grid min-h-[650px] max-w-[1380px] lg:grid-cols-[.9fr_1.1fr]">
            <div className="reveal-up flex flex-col justify-center px-6 py-20 sm:px-10 lg:px-20">
              <h1 className="font-display text-5xl leading-[1.02] text-emerald-950 sm:text-6xl">
                Conocernos es comprender{" "}
                <span className="text-emerald-700">cómo educamos</span>
              </h1>
              <span className="mt-7 block h-1 w-12 bg-amber-500" />
              <p className="mt-7 max-w-lg text-lg leading-8 text-slate-600">
                Formamos mentes curiosas, éticas y compasivas. Integramos
                ciencia rigurosa, pensamiento crítico y sensibilidad humana para
                que cada estudiante descubra su propósito.
              </p>
            </div>
            <img
              src="/images/science-project.png"
              className="h-full min-h-[430px] w-full object-cover"
              alt="Estudiantes explorando la ciencia"
            />
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <p className="text-base font-bold text-emerald-700">Nuestro propósito</p>
          <h2 className="font-display mt-3 text-4xl text-emerald-950 sm:text-5xl">Lo que guía cada decisión educativa.</h2>
          <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1fr_1.2fr_1fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-700">
                Misión
              </p>
              <p className="mt-5 text-xl leading-8 text-emerald-950">
                Formar estudiantes que entiendan el mundo a través de la ciencia
                y lo transformen con ética, empatía y responsabilidad social.
              </p>
            </div>
            <div className="border-x border-amber-500/50 px-8 text-center">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-700">
                Nuestro manifiesto
              </p>
              <h2 className="font-display mt-5 text-5xl leading-tight text-emerald-950">
                Ciencia,
                <br />
                <span className="text-emerald-700">ética y humanidad</span>
              </h2>
              <p className="mx-auto mt-7 max-w-md leading-7 text-slate-500">
                La educación debe unir el rigor del conocimiento con la nobleza
                del carácter.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-700">
                Visión
              </p>
              <p className="mt-5 text-xl leading-8 text-emerald-950">
                Ser una comunidad educativa referente por su excelencia
                académica, innovación pedagógica y compromiso con el bien común.
              </p>
            </div>
          </div>
        </section>
        <section className="border-y border-emerald-950/10">
          <div className="mx-auto grid max-w-[1380px] sm:grid-cols-2 lg:grid-cols-6">
            {values.map(([I, t, d]) => (
              <article
                className="group border-b border-emerald-950/10 p-7 transition duration-300 hover:bg-emerald-50 lg:border-b-0 lg:border-r"
                key={t}
              >
                <I className="text-emerald-700 transition group-hover:-translate-y-1" strokeWidth={1.5} />
                <h3 className="font-display mt-5 text-lg text-emerald-950">
                  {t}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{d}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="mx-auto max-w-[1380px] px-5 py-24 lg:px-10">
          <p className="text-base font-bold text-emerald-700">Nuestra historia</p>
          <h2 className="font-display mt-3 text-4xl text-emerald-950 sm:text-5xl">
            Una historia que sigue avanzando
          </h2>
          <div className="relative mt-12 grid border-y border-emerald-950/10 md:grid-cols-4 md:before:absolute md:before:left-0 md:before:right-0 md:before:top-[62px] md:before:h-px md:before:bg-emerald-200">
            {history.map(([y, t], i) => (
              <article
                className="group relative border-b border-emerald-950/10 py-8 md:border-b-0 md:border-r md:px-7"
                key={y}
              >
                <strong className="font-display text-2xl text-emerald-800">{y}</strong>
                <span className="relative z-10 mt-5 block size-3 rounded-full bg-amber-500 ring-8 ring-white transition group-hover:scale-125" />
                <p className="mt-8 text-base leading-7 text-slate-600">{t}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="mx-auto grid max-w-[1380px] items-center gap-12 px-5 pb-24 lg:grid-cols-[1.3fr_.7fr] lg:px-10">
          <img
            src="/images/campus.png"
            className="h-[480px] w-full object-cover"
            alt="Campus Max Planck"
          />
          <div>
            <p className="text-base font-bold text-emerald-700">Campus y vida escolar</p>
            <h2 className="font-display mt-3 text-4xl text-emerald-950 sm:text-5xl">
              Un entorno diseñado para aprender, crear y convivir.
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-y-6 border-y border-emerald-950/10 py-7">
              <p>
                <strong className="block text-3xl text-emerald-800">18</strong>
                <span className="text-sm text-slate-500">Aulas flexibles</span>
              </p>
              <p>
                <strong className="block text-3xl text-emerald-800">6</strong>
                <span className="text-sm text-slate-500">Laboratorios</span>
              </p>
              <p>
                <strong className="block text-3xl text-emerald-800">1</strong>
                <span className="text-sm text-slate-500">Biblioteca</span>
              </p>
              <p>
                <strong className="block text-3xl text-emerald-800">+20</strong>
                <span className="text-sm text-slate-500">Áreas verdes</span>
              </p>
            </div>
            <div className="mt-8">
              <TextLink href="/admision">
                Conoce el proceso de admisión
              </TextLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
