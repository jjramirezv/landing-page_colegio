import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, CalendarClock, Check, FlaskConical, HeartHandshake, Palette, Route, Users } from "lucide-react";
import { fetchHorarios, fetchNiveles } from "../lib/contentApi";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

const themes=[
  {bg:"bg-emerald-600",soft:"bg-emerald-50",text:"text-emerald-700",icon:Palette,hoverSoft:"hover:bg-emerald-50"},
  {bg:"bg-amber-400",soft:"bg-amber-50",text:"text-amber-700",icon:BookOpen,hoverSoft:"hover:bg-amber-50"},
  {bg:"bg-blue-800",soft:"bg-blue-50",text:"text-blue-800",icon:FlaskConical,hoverSoft:"hover:bg-blue-50"},
];

function initialLevel(levels){
  if(typeof window==="undefined") return levels[0].id;
  const fromHash=window.location.hash.replace("#","").toLowerCase();
  return levels.some(l=>l.id===fromHash)?fromHash:levels[0].id;
}

export default function Niveles(){
  const [levels,setLevels]=useState([]);
  const [horarios,setHorarios]=useState([]);
  const [active,setActive]=useState("");

  useEffect(()=>{
    fetchNiveles().then((data)=>{
      setLevels(data);
      setActive(initialLevel(data));
    });
    fetchHorarios().then(setHorarios);
  },[]);

  function selectLevel(id){
    setActive(id);
    if(typeof window!=="undefined") window.history.replaceState(null,"",`#${id}`);
  }

  if(!levels.length || !active){
    return <div className="bg-white"><SiteHeader active="Niveles"/><main><p className="mx-auto max-w-[1380px] px-6 py-24 text-sm text-slate-500">Cargando niveles…</p></main><SiteFooter/></div>;
  }

  const i=levels.findIndex(l=>l.id===active);
  const level=levels[i],theme=themes[i],Icon=theme.icon;

  return <div className="bg-white"><SiteHeader active="Niveles"/><main>
  <section className="relative overflow-hidden bg-emerald-950 text-white"><div className="absolute inset-0 notebook-grid-dark opacity-50"/><div className="relative mx-auto grid min-h-[460px] max-w-[1380px] lg:grid-cols-[.9fr_1.1fr]"><div className="reveal-up flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-20"><h1 className="font-display text-5xl leading-[1] sm:text-6xl">Una educación que evoluciona con cada etapa.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-emerald-100/75">Acompañamos el crecimiento académico, emocional y social con una propuesta coherente, exigente y humana.</p><a href="#etapas" className="action-light mt-8 self-start">Explorar los niveles <ArrowRight size={18}/></a></div><div className="relative min-h-[320px]"><img src="/images/science-project.png" alt="Estudiantes aprendiendo ciencia" className="h-full w-full object-cover"/><div className="absolute bottom-0 left-0 h-20 w-20 bg-amber-400 sm:h-28 sm:w-28"/></div></div></section>

  <section id="etapas" className="scroll-mt-24 bg-slate-50 py-16">
    <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-bold uppercase tracking-[.22em] text-emerald-700">Propuesta educativa</span>
          <h2 className="font-display mt-2 text-3xl text-emerald-950 sm:text-4xl">Elige un nivel para conocerlo</h2>
        </div>
        <p className="max-w-sm text-sm text-slate-500">Una trayectoria formativa conectada, desde los primeros descubrimientos hasta la preparación para el futuro.</p>
      </div>

      <div role="tablist" aria-label="Niveles educativos" className="mt-8 grid gap-3 sm:grid-cols-3">
        {levels.map((lvl,n)=>{const t=themes[n],LIcon=t.icon,isActive=active===lvl.id;return (
          <button
            key={lvl.id}
            role="tab"
            aria-selected={isActive}
            onClick={()=>selectLevel(lvl.id)}
            className={`group flex items-center gap-4 rounded-2xl border p-5 text-left transition duration-300 ${isActive?`${t.bg} border-transparent text-white shadow-xl`:`border-emerald-950/10 bg-white text-emerald-950 hover:-translate-y-0.5 hover:shadow-md ${t.hoverSoft}`}`}
          >
            <span className={`grid size-12 shrink-0 place-items-center rounded-full ${isActive?"bg-white/20 text-white":`text-white ${t.bg}`}`}><LIcon size={22}/></span>
            <span>
              <strong className="font-display block text-lg">{lvl.name}</strong>
              <small className={isActive?"text-white/75":"text-slate-500"}>{lvl.short}</small>
            </span>
            <ArrowRight size={18} className={`ml-auto transition group-hover:translate-x-1 ${isActive?"text-white":t.text}`}/>
          </button>
        )})}
      </div>

      <div key={level.id} role="tabpanel" className="level-switch mt-6">
        <div className="grid overflow-hidden rounded-[2rem] shadow-[0_24px_70px_rgba(3,55,43,.12)] lg:grid-cols-[.72fr_1.28fr] my-10">
          <div className={`relative min-h-[340px] overflow-hidden ${theme.bg}`}>
            <img src={`/images/${level.image}`} alt={`Nivel ${level.name}`} className="h-full w-full object-cover opacity-90"/>
            <div className={`absolute inset-x-0 bottom-0 p-8 text-white ${i===1?"bg-amber-400 text-emerald-950":"bg-gradient-to-t from-emerald-950 via-emerald-950/85 to-transparent"}`}>
              <Icon size={28}/>
              <p className="mt-4 text-sm font-black uppercase tracking-[.2em]">Nivel {level.name} · {level.range}</p>
              <h3 className="font-display mt-2 text-3xl sm:text-4xl">{level.tagline}</h3>
              <a href={`/niveles/${level.id}/cursos`} className={`mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition hover:gap-4 ${i===1?"bg-emerald-950 text-white":"bg-white text-emerald-950"}`}>Ver cursos por grado <ArrowRight size={17}/></a>
            </div>
          </div>
          <div className="bg-white p-7 sm:p-10">
            <p className={`font-bold ${theme.text}`}>Sobre este nivel</p>
            <p className="mt-3 text-lg leading-8 text-slate-700">{level.focus} {level.intro}</p>

            <div className="mt-8 border-t border-emerald-950/10 pt-7">
              <h4 className="font-display text-xl text-emerald-950">Lo que desarrollamos</h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {level.benefits.map(b=>(
                  <span key={b} className={`inline-flex items-center gap-2 rounded-full ${theme.soft} px-4 py-2 text-sm font-semibold text-emerald-950`}>
                    <Check size={14} className={theme.text}/>{b}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-7 border-t border-emerald-950/10 pt-7">
              <h4 className="font-display text-xl text-emerald-950">Así se vive el aprendizaje</h4>
              <div className="mt-4 grid gap-2.5">
                {level.experiences.map(x=>(
                  <p key={x} className="flex gap-3 text-sm leading-6 text-slate-600"><FlaskConical size={16} className={`mt-0.5 shrink-0 ${theme.text}`}/>{x}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3 ">
          <article className={`${theme.soft} rounded-2xl p-7`}>
            <HeartHandshake className={theme.text}/>
            <h4 className="font-display mt-5 text-xl text-emerald-950">Acompañamiento familiar</h4>
            <p className="mt-3 text-sm leading-7 text-slate-600">{level.support}</p>
          </article>
          <article className="rounded-2xl border border-emerald-950/10 p-7">
            <Route className={theme.text}/>
            <h4 className="font-display mt-5 text-xl text-emerald-950">Proyectos destacados</h4>
            <p className="mt-3 text-sm leading-7 text-slate-600">{level.projects.join(" · ")}</p>
          </article>
          <article className="rounded-2xl bg-emerald-950 p-7 text-white">
            <Users className="text-amber-400"/>
            <h4 className="font-display mt-5 text-xl">Perfil del estudiante</h4>
            <p className="mt-3 text-sm leading-7 text-emerald-100/70">{level.profile}</p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <section className="bg-slate-50 py-16">
    <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
      <span className="text-xs font-bold uppercase tracking-[.22em] text-emerald-700">Organización semanal</span>
      <h2 className="font-display mt-2 text-3xl text-emerald-950 sm:text-4xl">Horarios</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {horarios.map((h)=>{
          const nivelNombre = levels.find(l=>l.id===h.nivel_id)?.name;
          return (
            <article key={h.id} className="rounded-2xl border border-emerald-950/10 bg-white p-6">
              <span className="grid size-10 place-items-center rounded-full bg-emerald-800 text-white">
                <CalendarClock size={17}/>
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-[.16em] text-emerald-700">
                {nivelNombre || "Todo el colegio"}
              </p>
              <h3 className="font-display mt-1 text-lg text-emerald-950">{h.dia}</h3>
              <p className="mt-1 text-sm font-semibold text-slate-600">{h.hora}</p>
              <p className="mt-2 text-sm text-slate-500">{h.actividad}</p>
            </article>
          );
        })}
      </div>
    </div>
  </section>
</main><SiteFooter/></div>;
}
