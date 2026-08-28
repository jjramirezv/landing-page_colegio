import { useEffect, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { deleteHorario, fetchHorarios, fetchNiveles, saveHorario } from "../../lib/contentApi";

export default function AdminHorarios() {
  const [horarios, setHorarios] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  async function reload() {
    setHorarios(await fetchHorarios());
  }

  useEffect(() => {
    Promise.all([fetchHorarios(), fetchNiveles()]).then(([h, n]) => {
      setHorarios(h);
      setNiveles(n);
      setLoading(false);
    });
  }, []);

  function updateLocal(id, key, value) {
    setHorarios((prev) => prev.map((h) => (h.id === id ? { ...h, [key]: value } : h)));
  }

  async function handleSave(horario) {
    setStatus("Guardando…");
    try {
      await saveHorario(horario);
      setStatus("Guardado.");
      await reload();
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  }

  function handleAdd() {
    setHorarios((prev) => [
      ...prev,
      { id: `tmp-${Date.now()}`, nivel_id: null, dia: "", hora: "", actividad: "Clases", orden: prev.length + 1 },
    ]);
  }

  async function handleDelete(id) {
    if (String(id).startsWith("tmp-")) {
      setHorarios((prev) => prev.filter((h) => h.id !== id));
      return;
    }
    if (!confirm("¿Eliminar este horario?")) return;
    await deleteHorario(id);
    await reload();
  }

  if (loading) return <p className="text-sm text-slate-500">Cargando horarios…</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-emerald-950">Horarios</h1>
          <p className="mt-1 text-sm text-slate-500">
            Se muestran en la página de Niveles. Deja el nivel en “Todo el
            colegio” para horarios generales.
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-800"
        >
          <Plus size={16} /> Nuevo horario
        </button>
      </div>

      {status && <p className="mt-3 text-sm text-slate-500">{status}</p>}

      <div className="mt-6 grid gap-3">
        {horarios.map((h) => (
          <div
            key={h.id}
            className="grid gap-3 rounded-2xl border border-emerald-950/10 bg-white p-5 sm:grid-cols-[1fr_1fr_1.4fr_1fr_auto] sm:items-end"
          >
            <label className="grid gap-1.5 text-xs font-semibold text-emerald-950">
              Nivel
              <select
                value={h.nivel_id || ""}
                onChange={(e) => updateLocal(h.id, "nivel_id", e.target.value || null)}
                className="rounded-lg border border-emerald-950/15 px-3 py-2 text-sm outline-none focus:border-emerald-600"
              >
                <option value="">Todo el colegio</option>
                {niveles.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5 text-xs font-semibold text-emerald-950">
              Día
              <input
                value={h.dia}
                onChange={(e) => updateLocal(h.id, "dia", e.target.value)}
                placeholder="Lunes a Viernes"
                className="rounded-lg border border-emerald-950/15 px-3 py-2 text-sm outline-none focus:border-emerald-600"
              />
            </label>
            <label className="grid gap-1.5 text-xs font-semibold text-emerald-950">
              Horario
              <input
                value={h.hora}
                onChange={(e) => updateLocal(h.id, "hora", e.target.value)}
                placeholder="8:00 a.m. – 1:00 p.m."
                className="rounded-lg border border-emerald-950/15 px-3 py-2 text-sm outline-none focus:border-emerald-600"
              />
            </label>
            <label className="grid gap-1.5 text-xs font-semibold text-emerald-950">
              Actividad
              <input
                value={h.actividad}
                onChange={(e) => updateLocal(h.id, "actividad", e.target.value)}
                placeholder="Clases"
                className="rounded-lg border border-emerald-950/15 px-3 py-2 text-sm outline-none focus:border-emerald-600"
              />
            </label>
            <div className="flex gap-2 justify-self-end">
              <button
                onClick={() => handleSave(h)}
                aria-label="Guardar"
                className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              >
                <Save size={16} />
              </button>
              <button
                onClick={() => handleDelete(h.id)}
                aria-label="Eliminar"
                className="grid size-9 place-items-center rounded-lg text-red-500 hover:bg-red-50"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
