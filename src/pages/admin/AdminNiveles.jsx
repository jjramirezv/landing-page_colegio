import { useEffect, useState } from "react";
import { Check, Plus, Save, Trash2 } from "lucide-react";
import {
  fetchCursos,
  fetchNiveles,
  saveCurso,
  saveNivel,
  deleteCurso,
} from "../../lib/contentApi";

const textFields = [
  ["name", "Nombre del nivel"],
  ["range", "Rango de edad/grado (texto largo, ej. “1.º a 6.º grado”)"],
  ["short", "Rango corto (ej. “1.° a 6.° grado”)"],
  ["tagline", "Frase destacada (se muestra grande sobre la foto)"],
  ["focus", "Enfoque pedagógico"],
  ["intro", "Descripción del nivel"],
  ["support", "Acompañamiento familiar"],
  ["profile", "Perfil del estudiante"],
];

const listFields = [
  ["benefits", "Lo que desarrollamos (uno por línea)"],
  ["experiences", "Así se vive el aprendizaje (uno por línea)"],
  ["projects", "Proyectos destacados (uno por línea)"],
];

function toForm(nivel) {
  return {
    ...nivel,
    benefits: (nivel.benefits || []).join("\n"),
    experiences: (nivel.experiences || []).join("\n"),
    projects: (nivel.projects || []).join("\n"),
  };
}

export default function AdminNiveles() {
  const [niveles, setNiveles] = useState([]);
  const [selected, setSelected] = useState("");
  const [form, setForm] = useState(null);
  const [grados, setGrados] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchNiveles().then((data) => {
      setNiveles(data);
      if (data[0]) setSelected(data[0].id);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const nivel = niveles.find((n) => n.id === selected);
    if (!nivel) return;
    setForm(toForm(nivel));
    setGrados(nivel.grados || []);
    fetchCursos(selected).then(setCursos);
  }, [selected, niveles]);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateGrado(i, key, value) {
    setGrados((prev) => prev.map((g, idx) => (idx === i ? { ...g, [key]: value } : g)));
  }

  async function handleSaveNivel(e) {
    e.preventDefault();
    setStatus("Guardando…");
    try {
      await saveNivel({
        ...form,
        benefits: form.benefits.split("\n").map((s) => s.trim()).filter(Boolean),
        experiences: form.experiences.split("\n").map((s) => s.trim()).filter(Boolean),
        projects: form.projects.split("\n").map((s) => s.trim()).filter(Boolean),
        grados,
      });
      setStatus("Cambios guardados.");
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  }

  async function handleAddCurso() {
    const nombre = prompt("Nombre del curso:");
    if (!nombre) return;
    await saveCurso({ nivel_id: selected, nombre, descripcion: "", orden: cursos.length + 1 });
    setCursos(await fetchCursos(selected));
  }

  async function handleUpdateCurso(curso) {
    await saveCurso(curso);
    setCursos(await fetchCursos(selected));
  }

  async function handleDeleteCurso(id) {
    if (!confirm("¿Eliminar este curso?")) return;
    await deleteCurso(id);
    setCursos(await fetchCursos(selected));
  }

  if (loading || !form) {
    return <p className="text-sm text-slate-500">Cargando niveles…</p>;
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-emerald-950">Niveles y cursos</h1>
      <p className="mt-1 text-sm text-slate-500">
        Edita el contenido que se muestra en las páginas Niveles, Propuesta y
        Cursos por grado.
      </p>

      <div className="mt-6 inline-flex rounded-full border border-emerald-950/10 bg-white p-1">
        {niveles.map((n) => (
          <button
            key={n.id}
            onClick={() => setSelected(n.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
              selected === n.id ? "bg-emerald-800 text-white" : "text-emerald-900 hover:bg-emerald-50"
            }`}
          >
            {n.name}
          </button>
        ))}
      </div>

      <form onSubmit={handleSaveNivel} className="mt-8 grid gap-8">
        <div className="grid gap-4 rounded-2xl border border-emerald-950/10 bg-white p-6 sm:grid-cols-2">
          {textFields.map(([key, label]) => (
            <label key={key} className="grid gap-1.5 text-sm font-semibold text-emerald-950">
              {label}
              <input
                value={form[key] || ""}
                onChange={(e) => updateField(key, e.target.value)}
                className="rounded-lg border border-emerald-950/15 px-3 py-2.5 text-sm font-normal outline-none focus:border-emerald-600"
              />
            </label>
          ))}
        </div>

        <div className="grid gap-4 rounded-2xl border border-emerald-950/10 bg-white p-6 sm:grid-cols-3">
          {listFields.map(([key, label]) => (
            <label key={key} className="grid gap-1.5 text-sm font-semibold text-emerald-950">
              {label}
              <textarea
                rows={5}
                value={form[key] || ""}
                onChange={(e) => updateField(key, e.target.value)}
                className="rounded-lg border border-emerald-950/15 px-3 py-2.5 text-sm font-normal outline-none focus:border-emerald-600"
              />
            </label>
          ))}
        </div>

        <div className="rounded-2xl border border-emerald-950/10 bg-white p-6">
          <h2 className="font-display text-lg text-emerald-950">Grados y su enfoque</h2>
          <div className="mt-4 grid gap-3">
            {grados.map((g, i) => (
              <div key={i} className="grid gap-2 sm:grid-cols-[160px_1fr]">
                <input
                  value={g.nombre}
                  onChange={(e) => updateGrado(i, "nombre", e.target.value)}
                  placeholder="Grado"
                  className="rounded-lg border border-emerald-950/15 px-3 py-2 text-sm outline-none focus:border-emerald-600"
                />
                <input
                  value={g.enfoque}
                  onChange={(e) => updateGrado(i, "enfoque", e.target.value)}
                  placeholder="Enfoque de este grado"
                  className="rounded-lg border border-emerald-950/15 px-3 py-2 text-sm outline-none focus:border-emerald-600"
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setGrados((prev) => [...prev, { nombre: "", enfoque: "" }])}
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-800"
          >
            <Plus size={16} /> Agregar grado
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
          >
            <Save size={16} /> Guardar cambios del nivel
          </button>
          {status && (
            <span className="flex items-center gap-1.5 text-sm text-slate-500">
              <Check size={14} /> {status}
            </span>
          )}
        </div>
      </form>

      <div className="mt-10 rounded-2xl border border-emerald-950/10 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg text-emerald-950">
            Cursos de {form.name}
          </h2>
          <button
            onClick={handleAddCurso}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800 hover:bg-emerald-100"
          >
            <Plus size={15} /> Agregar curso
          </button>
        </div>
        <div className="mt-5 grid gap-3">
          {cursos.map((curso) => (
            <div key={curso.id} className="grid gap-2 rounded-xl border border-emerald-950/10 p-4 sm:grid-cols-[1fr_2fr_auto]">
              <input
                defaultValue={curso.nombre}
                onBlur={(e) => handleUpdateCurso({ ...curso, nombre: e.target.value })}
                className="rounded-lg border border-emerald-950/15 px-3 py-2 text-sm font-bold outline-none focus:border-emerald-600"
              />
              <input
                defaultValue={curso.descripcion}
                onBlur={(e) => handleUpdateCurso({ ...curso, descripcion: e.target.value })}
                className="rounded-lg border border-emerald-950/15 px-3 py-2 text-sm outline-none focus:border-emerald-600"
              />
              <button
                onClick={() => handleDeleteCurso(curso.id)}
                aria-label="Eliminar curso"
                className="grid size-9 place-items-center rounded-lg text-red-500 hover:bg-red-50 justify-self-end"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {cursos.length === 0 && (
            <p className="text-sm text-slate-400">Este nivel todavía no tiene cursos.</p>
          )}
        </div>
      </div>
    </div>
  );
}
