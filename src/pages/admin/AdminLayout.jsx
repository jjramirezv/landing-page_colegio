import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { CalendarClock, GraduationCap, LogOut, Megaphone, ShieldAlert, Users } from "lucide-react";
import { Brand } from "../../components/SiteChrome";
import { useAuth } from "../../lib/AuthContext";

const links = [
  { to: "/admin/niveles", label: "Niveles y cursos", icon: GraduationCap },
  { to: "/admin/noticias", label: "Noticias", icon: Megaphone },
  { to: "/admin/horarios", label: "Horarios", icon: CalendarClock },
  { to: "/admin/suscriptores", label: "Suscriptores", icon: Users },
];

export default function AdminLayout() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="grid min-h-screen place-items-center text-sm text-slate-500">Cargando…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 p-6">
        <div className="max-w-sm rounded-2xl border border-emerald-950/10 bg-white p-8 text-center shadow-sm">
          <ShieldAlert className="mx-auto text-red-500" size={32} />
          <h1 className="font-display mt-4 text-xl text-emerald-950">
            Cuenta no autorizada
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            <span className="break-all font-semibold">{user.email}</span> inició
            sesión correctamente, pero no está en la lista de administradores
            del colegio.
          </p>
          <button
            onClick={signOut}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-800"
          >
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen bg-slate-50 lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-emerald-950/10 bg-emerald-950 p-6 text-white lg:border-b-0 lg:border-r">
        <Brand inverse />
        <nav className="mt-10 grid gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive ? "bg-white/15 text-white" : "text-emerald-100/70 hover:bg-white/5"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={signOut}
          className="mt-10 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-emerald-100/70 hover:bg-white/5"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
        
      </aside>
      <main className="p-6 sm:p-10">
        <Outlet />
      </main>
    </div>
  );
}
