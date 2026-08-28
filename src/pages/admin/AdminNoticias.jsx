import { useEffect, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { deleteNoticia, fetchNoticias, saveNoticia } from "../../lib/contentApi";

const empty = { titulo: "", resumen: "", imagen: "science-project.png", fecha: "", orden: 0 };

export default function AdminNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  async function reload() {
    setNoticias(await fetchNoticias());
  }

  useEffect(() => {
    reload().then(() => setLoading(false));
  }, []);

  function updateLocal(id, key, value) {
    setNoticias((prev) => prev.map((n) => (n.id === id ? { ...n, [key]: value } : n)));
  }

  async function handleSave(noticia) {
    setStatus("Guardando…");
    try {
      await saveNoticia(noticia);
      setStatus("Guardado.");
      await reload();
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  }

  async function handleAdd() {
    setNoticias((prev) => [...prev, { ...empty, id: `tmp-${Date.now()}`, orden: prev.length + 1 }]);
  }

  async function handleDelete(id) {
    if (String(id).startsWith("tmp-")) {
      setNoticias((prev) => prev.filter((n) => n.id !== id));
      return;
    }
    if (!confirm("¿Eliminar esta noticia?")) return;
    await deleteNoticia(id);
    await reload();
  }

  if (loading) return <p className="text-sm text-slate-500">Cargando noticias…</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-emerald-950">Noticias</h1>
          <p className="mt-1 text-sm text-slate-500">
            Se muestran en la sección de actualidad de Inicio.
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-800"
        >
          <Plus size={16} /> Nueva noticia
        </button>
      </div>

      {status && <p className="mt-3 text-sm text-slate-500">{status}</p>}

      <div className="mt-6 grid gap-4">
        {noticias.map((n) => (
          <div key={n.id} className="grid gap-3 rounded-2xl border border-emerald-950/10 bg-white p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-semibold text-emerald-950">
                Título
                <input
                  value={n.titulo}
                  onChange={(e) => updateLocal(n.id, "titulo", e.target.value)}
                  className="rounded-lg border border-emerald-950/15 px-3 py-2 text-sm outline-none focus:border-emerald-600"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold text-emerald-950">
                Imagen (archivo en /public/images)
                <input
                  value={n.imagen}
                  onChange={(e) => updateLocal(n.id, "imagen", e.target.value)}
                  className="rounded-lg border border-emerald-950/15 px-3 py-2 text-sm outline-none focus:border-emerald-600"
                />
              </label>
            </div>
            <label className="grid gap-1.5 text-sm font-semibold text-emerald-950">
              Resumen
              <textarea
                rows={2}
                value={n.resumen}
                onChange={(e) => updateLocal(n.id, "resumen", e.target.value)}
                className="rounded-lg border border-emerald-950/15 px-3 py-2 text-sm outline-none focus:border-emerald-600"
              />
            </label>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleSave(n)}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800 hover:bg-emerald-100"
              >
                <Save size={15} /> Guardar
              </button>
              <button
                onClick={() => handleDelete(n.id)}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50"
              >
                <Trash2 size={15} /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
