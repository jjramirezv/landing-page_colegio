import { useState } from "react";
import { ArrowUpRight, LogIn, Mail, MapPin, Menu, Phone, User, X } from "lucide-react";
import { useInstitutionIdentity } from "../lib/InstitutionIdentityContext";

const links = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Niveles", href: "/niveles" },
  { label: "Admisión", href: "/admision" },
  {
    label: "Propuesta",
    href: "/propuesta",
    children: [
      { label: "Acreditación", href: "/propuesta#acreditacion" },
      { label: "Modelo Pedagógico", href: "/propuesta#modelo-pedagogico" },
      { label: "Testimonios", href: "/propuesta#testimonios" },
      { label: "Aliados", href: "/propuesta#aliados" },
      { label: "Servicios Virtuales", href: "/propuesta#servicios-virtuales" },
    ],
  },
  { label: "Campus", href: "/campus" },
];

export function Brand({ inverse = false }) {
  const identity = useInstitutionIdentity();
  const schoolName = (identity.displayName || "Colegio Max Planck").replace(/^colegio\s+/i, "").trim() || "Max Planck";
  const hasLogo = Boolean(identity.logoUrl);
  return (
    <a
      href="/"
      className={`flex items-center gap-3 ${inverse ? "text-white" : "text-emerald-950"}`}
    >
      <span
        className={`grid size-11 place-items-center text-xs font-black ${hasLogo ? "border-0" : `border ${inverse ? "border-white/30" : "border-emerald-900/20"}`}`}
      >
        {hasLogo ? <img className="h-full w-full object-contain" src={identity.logoUrl} alt="Logo institucional" /> : "MP"}
      </span>
      <span>
        <span className="block text-[8px] font-bold tracking-[.28em]">
          COLEGIO
        </span>
        <strong className="block max-w-[190px] truncate font-display text-lg">{schoolName.toUpperCase()}</strong>
      </span>
    </a>
  );
}
export function SiteHeader({ active = "" }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1380px] items-center justify-between px-5 lg:px-10">
        <Brand />
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((item) => (
            <div key={item.label} className="group relative py-7">
              <a
                href={item.href}
                className={`text-xs font-bold ${active === item.label ? "text-emerald-800" : "text-slate-600 hover:text-emerald-800"}`}
              >
                {item.label}
              </a>
              {item.children && (
                <div className="invisible absolute left-1/2 top-full z-40 w-56 -translate-x-1/2 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="overflow-hidden rounded-xl border border-emerald-950/10 bg-white p-2 shadow-xl">
                    {item.children.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-emerald-900 hover:bg-emerald-50"
                      >
                        {c.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <a
            href="/login"
            aria-label="Iniciar sesión como administrador"
            title="Iniciar sesión"
            className="grid size-10 place-items-center border border-emerald-900/15 text-emerald-800 transition hover:bg-emerald-50"
          >
            <User size={16} />
          </a>
          <a
            href="/admision#contacto"
            className="bg-emerald-900 px-6 py-3 text-xs font-bold text-white"
          >
            Admisiones 2027
          </a>
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="grid size-10 place-items-center border border-emerald-900/15 text-emerald-950 lg:hidden"
          aria-label="Abrir menú"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <nav className="absolute inset-x-0 top-20 grid gap-1 bg-white p-5 shadow-xl lg:hidden">
          {links.map((item) => (
            <div key={item.label}>
              <a href={item.href} className="block px-4 py-3 text-sm font-bold text-slate-700">
                {item.label}
              </a>
              {item.children && (
                <div className="ml-4 grid gap-0.5 border-l border-emerald-950/10 pl-4">
                  {item.children.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      className="block py-2 text-xs font-semibold text-emerald-700"
                    >
                      {c.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            href="/login"
            className="mt-2 flex items-center gap-2 border-t border-emerald-950/10 px-4 pt-4 text-sm font-bold text-emerald-700"
          >
            <LogIn size={16} /> Iniciar sesión
          </a>
        </nav>
      ) : null}
    </header>
  );
}
export function SiteFooter() {
  return (
    <footer className="bg-emerald-950 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Brand inverse />
          <p className="mt-5 max-w-xs text-sm leading-6 text-emerald-100/60">
            Ciencia, ética y humanidad para transformar el mundo.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">
            Enlaces
          </h3>
          {links.slice(0, 4).map((item) => (
            <a
              className="mt-3 block text-sm text-emerald-100/60"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="space-y-4 text-sm text-emerald-100/70">
          <p className="flex gap-3">
            <MapPin size={18} />
            Av. Mariscal Castilla 456, El Tambo, Huancayo
          </p>
          <p className="flex gap-3">
            <Phone size={18} />
            +51 964 123 456
          </p>
          <p className="flex gap-3">
            <Mail size={18} />
            info@colegiomaxplanck.edu.pe
          </p>
        </div>
      </div>
    </footer>
  );
}
export function Chapter({ n, label }) {
  return (
    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.22em] text-emerald-700">
      <span className="grid size-9 place-items-center rounded-full border border-amber-500/60 text-amber-700">
        {n}
      </span>
      {label}
    </div>
  );
}
export function TextLink({ children, href = "#" }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 border-b border-emerald-700 pb-1 text-sm font-bold text-emerald-800"
    >
      {children}
      <ArrowUpRight size={15} />
    </a>
  );
}
