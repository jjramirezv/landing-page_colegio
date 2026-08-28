import { useEffect, useState } from "react";
import { Mail, Trash2 } from "lucide-react";
import { deleteSuscriptor, fetchSuscriptores } from "../../lib/contentApi";

export default function AdminSuscriptores() {
  const [suscriptores, setSuscriptores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function reload() {
    try {
      setSuscriptores(await fetchSuscriptores());
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    reload().then(() => setLoading(false));
  }, []);

  async function handleDelete(email) {
    if (!confirm(`¿Quitar ${email} de la lista?`)) return;
    await deleteSuscriptor(email);
    await reload();
  }

  if (loading) return <p className="text-sm text-slate-500">Cargando…</p>;

  return (
    <div>
      <h1 className="font-display text-2xl text-emerald-950">Suscriptores</h1>
      <p className="mt-1 max-w-xl text-sm text-slate-500">
        Correos de personas que iniciaron sesión con Google pero no tienen
        acceso al panel — se guardan automáticamente aquí para que el
        colegio los use en futuros envíos de correo.
      </p>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-950/10 bg-white">
        {suscriptores.length === 0 ? (
          <p className="p-6 text-sm text-slate-400">
            Todavía no hay suscriptores registrados.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-emerald-50 text-xs font-bold uppercase tracking-wide text-emerald-800">
              <tr>
                <th className="px-5 py-3">Correo</th>
                <th className="px-5 py-3">Nombre</th>
                <th className="px-5 py-3">Registrado</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {suscriptores.map((s) => (
                <tr key={s.email} className="border-t border-emerald-950/10">
                  <td className="flex items-center gap-2 px-5 py-3 font-semibold text-emerald-950">
                    <Mail size={14} className="text-emerald-700" />
                    {s.email}
                  </td>
                  <td className="px-5 py-3 text-slate-600">{s.nombre || "—"}</td>
                  <td className="px-5 py-3 text-slate-500">
                    {new Date(s.created_at).toLocaleDateString("es-PE", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => handleDelete(s.email)}
                      aria-label="Quitar"
                      className="grid size-8 place-items-center rounded-lg text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
