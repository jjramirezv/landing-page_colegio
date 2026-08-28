import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, BriefcaseBusiness, Calculator, Check, ChevronDown, Dumbbell, FlaskConical, Globe2, HeartHandshake, Languages, MessageCircle, Palette, Users } from "lucide-react";
import { fetchCursos, fetchNivel, fetchNiveles } from "../lib/contentApi";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

const icons={"Comunicación":MessageCircle,"Matemática":Calculator,"Ciencia y Tecnología":FlaskConical,"Personal Social":Users,"Ciencias Sociales":Globe2,"Ciudadanía y Cívica":Users,"Inglés":Languages,"Arte y Cultura":Palette,"Arte y Creatividad":Palette,"Educación Física":Dumbbell,"Tutoría":HeartHandshake,"Tutoría y Orientación":HeartHandshake,"Formación en Valores":HeartHandshake,"Educación para el Trabajo":BriefcaseBusiness,"Psicomotricidad":Dumbbell};
const accents={inicial:{main:"bg-emerald-600",text:"text-emerald-700",soft:"bg-emerald-50"},primaria:{main:"bg-amber-400",text:"text-amber-700",soft:"bg-amber-50"},secundaria:{main:"bg-blue-800",text:"text-blue-800",soft:"bg-blue-50"}};

export default function CursosNivel(){
  const {nivel}=useParams();
  const [level,setLevel]=useState(undefined);
  const [allLevels,setAllLevels]=useState([]);
  const [courses,setCourses]=useState([]);
  const [grade,setGrade]=useState(0);
  const [open,setOpen]=useState(0);

  useEffect(()=>{
    fetchNivel(nivel).then(setLevel);
    fetchNiveles().then(setAllLevels);
    fetchCursos(nivel).then(setCourses);
    setGrade(0);
    setOpen(0);
  },[nivel]);

  if(level===undefined) return <div className="bg-slate-50"><SiteHeader active="Niveles"/><main><p className="mx-auto max-w-[1380px] px-6 py-24 text-sm text-slate-500">Cargando…</p></main><SiteFooter/></div>;
  if(!level) return <Navigate to="/niveles" replace/>;

  const accent=accents[nivel];
  const grados=level.grados||[];

  return <div className="bg-slate-50"><SiteHeader active="Niveles"/><main>
  <section className="border-b border-emerald-950/10 bg-white"><div className="mx-auto max-w-[1380px] px-6 py-10 lg:px-10"><a href="/niveles" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700"><ArrowLeft size={17}/> Volver a Niveles</a><div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-end"><div className="flex items-center gap-5"><span className={`grid size-16 place-items-center rounded-2xl text-white shadow-lg ${accent.main}`}><BookOpen size={30}/></span><div><p className={`font-bold ${accent.text}`}>Nivel {level.name}</p><h1 className="font-display mt-1 text-5xl text-emerald-950">{grados[grade]?.nombre}</h1><p className="mt-2 text-slate-600">{grados[grade]?.enfoque}</p></div></div><div className="max-w-sm border-l-4 border-amber-400 bg-amber-50 p-5"><strong className="text-emerald-950">Propuesta curricular referencial</strong><p className="mt-1 text-sm leading-6 text-slate-600">Las áreas y su organización pueden ajustarse al proyecto educativo institucional.</p></div></div></div></section>
  <div className="mx-auto grid max-w-[1380px] grid-cols-[minmax(0,1fr)] gap-6 px-6 py-10 lg:grid-cols-[250px_minmax(0,1fr)_260px] lg:px-10"><aside className="h-fit border border-emerald-950/10 bg-white p-5 lg:sticky lg:top-28"><h2 className="font-display text-xl text-emerald-950">Cambiar de nivel</h2><nav className="mt-5 grid gap-2">{allLevels.map(item=><a key={item.id} href={`/niveles/${item.id}/cursos`} className={`flex items-center justify-between px-4 py-4 text-sm font-bold transition ${item.id===nivel?"bg-emerald-950 text-white":"hover:bg-emerald-50 text-emerald-950"}`}><span>{item.name}<small className="mt-1 block font-normal opacity-70">{item.short}</small></span><ArrowRight size={16}/></a>)}</nav><div className="notebook-grid mt-8 p-5"><FlaskConical className="text-emerald-700"/><p className="font-display mt-5 text-lg text-emerald-950">Mentes científicas, corazones comprometidos.</p></div></aside>
    <section>
      <div className="overflow-x-auto border border-emerald-950/10 bg-white">
        <div className="flex min-w-max">{grados.map((item,i)=><button key={item.nombre} onClick={()=>{setGrade(i);setOpen(0)}} aria-pressed={grade===i} className={`min-w-28 border-r px-5 py-5 text-center transition ${grade===i?`${accent.main} ${nivel==="primaria"?"text-emerald-950":"text-white"}`:"text-emerald-950 hover:bg-emerald-50"}`}>
          <strong className="font-display block text-lg">{item.nombre.split(" ")[0]}</strong>
          <small>{item.nombre.split(" ").slice(1).join(" ")}</small></button>)}
        </div>
      </div>
      <div className="mt-8"><h2 className="font-display text-3xl text-emerald-950">Áreas de aprendizaje</h2><p className="mt-2 text-slate-600">Conoce lo que desarrollamos en {grados[grade]?.nombre} de {level.name}.</p><div className="mt-6 border-t border-emerald-950/10">{courses.map((curso,i)=>{const Icon=icons[curso.nombre]||BookOpen,isOpen=open===i;return <article key={curso.id} className="border-b border-emerald-950/10 bg-white"><button onClick={()=>setOpen(isOpen?-1:i)} aria-expanded={isOpen} className="flex w-full items-center gap-4 p-5 text-left transition hover:bg-emerald-50"><span className={`grid size-11 shrink-0 place-items-center rounded-full text-white ${i%3===0?"bg-emerald-600":i%3===1?"bg-blue-800":"bg-amber-400 text-emerald-950"}`}><Icon size={21}/></span><strong className="font-display text-lg text-emerald-950">{curso.nombre}</strong><p className="ml-4 hidden flex-1 text-sm text-slate-500 md:block">{curso.descripcion}</p><ChevronDown className={`ml-auto text-emerald-700 transition ${isOpen?"rotate-180":""}`}/></button>{isOpen?<div className={`${accent.soft} px-5 pb-6 pt-1 sm:pl-20`}><p className="leading-7 text-slate-700 md:hidden">{curso.descripcion}</p><div className="mt-4 grid gap-3 sm:grid-cols-2"><p className="flex gap-3 text-sm font-semibold text-emerald-950"><Check size={17} className={accent.text}/>Enfoque del grado: {grados[grade]?.enfoque}</p><p className="flex gap-3 text-sm font-semibold text-emerald-950"><Check size={17} className={accent.text}/>Aprendizaje aplicado mediante retos y proyectos.</p></div></div>:null}</article>})}</div></div>
    </section>
    <aside className="h-fit lg:sticky lg:top-28"><div className="bg-emerald-950 p-7 text-white"><h2 className="font-display text-2xl">Tu camino en {level.name}</h2><div className="mt-7 border-l border-emerald-300/50 pl-5">{grados.map((item,i)=><button key={item.nombre} onClick={()=>setGrade(i)} className={`relative block w-full py-3 text-left text-sm font-bold ${grade===i?"text-amber-300":"text-emerald-100/70"}`}><span className={`absolute -left-[26px] top-4 size-3 rounded-full ring-4 ring-emerald-950 ${grade===i?"bg-amber-400":"bg-white"}`}/>{item.nombre}{grade===i?<small className="ml-2 rounded-full bg-amber-400 px-2 py-1 text-emerald-950">Actual</small>:null}</button>)}</div></div><div className="mt-5 bg-blue-800 p-7 text-white"><h3 className="font-display text-2xl">¿Listos para comenzar?</h3><p className="mt-3 text-sm leading-6 text-blue-100">Conoce el proceso de admisión y agenda una visita.</p><a href="/admision" className="mt-6 flex items-center justify-between bg-amber-400 px-5 py-4 font-bold text-emerald-950">Quiero postular <ArrowRight size={18}/></a></div></aside>
  </div>
</main><SiteFooter/></div>;
}
