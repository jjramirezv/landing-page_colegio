import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CircleCheck, Lock, Mail, TriangleAlert } from "lucide-react";
import { Brand } from "../../components/SiteChrome";
import { useAuth } from "../../lib/AuthContext";
import { isSupabaseConfigured } from "../../lib/supabase";

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 48 48" width="18" height="18" {...props}>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5Z"/>
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6.9 29.6 5 24 5c-7.6 0-14.1 4.3-17.4 10.7Z"/>
      <path fill="#4CAF50" d="M24 44c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.4c-2 1.5-4.6 2.5-7.6 2.5-5.2 0-9.7-3.3-11.3-8l-6.6 5.1C9.8 39.6 16.3 44 24 44Z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.6 5.4C41.9 35.6 44 30.2 44 24c0-1.3-.1-2.7-.4-3.5Z"/>
    </svg>
  );
}

export default function Login() {
  const { user, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const location = useLocation();
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmSent, setConfirmSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to={location.state?.from || "/admin"} replace />;
  }

  async function handleGoogle() {
    setError("");
    setLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error);
      setLoading(false);
    }
    // En éxito, Supabase redirige a Google y luego de vuelta a /admin.
  }

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "signup") {
      const { error, needsConfirmation } = await signUpWithEmail(email, password);
      setLoading(false);
      if (error) return setError(error);
      if (needsConfirmation) return setConfirmSent(true);
      return; // ya quedó con sesión (confirmación desactivada)
    }

    const { error } = await signInWithEmail(email, password);
    setLoading(false);
    if (error) setError(error);
  }

  if (confirmSent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-emerald-950/10 bg-white p-8 text-center shadow-sm sm:p-10">
          <CircleCheck className="mx-auto text-emerald-600" size={32} />
          <h1 className="font-display mt-4 text-xl text-emerald-950">
            Revisa tu correo
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Te enviamos un enlace de confirmación a{" "}
            <span className="font-semibold text-emerald-950">{email}</span>.
            Ábrelo para activar tu cuenta.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-2xl border border-emerald-950/10 bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="flex justify-center">
          <Brand />
        </div>
        <h1 className="font-display mt-8 text-2xl text-emerald-950">
          {mode === "signup" ? "Crear cuenta" : "Iniciar sesión"}
        </h1>

        {!isSupabaseConfigured && (
          <p className="mt-6 flex items-start gap-2 rounded-xl bg-amber-50 p-4 text-left text-sm text-amber-800">
            <TriangleAlert size={16} className="mt-0.5 shrink-0" />
            El panel todavía no está conectado a una base de datos. Configura
            las credenciales de Supabase para activarlo.
          </p>
        )}

        {error && (
          <p className="mt-6 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-left text-sm font-medium text-red-600">
            <TriangleAlert size={16} className="shrink-0" /> {error}
          </p>
        )}

        <button
          onClick={handleGoogle}
          disabled={loading || !isSupabaseConfigured}
          className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full border border-emerald-950/15 bg-white py-3.5 text-sm font-bold text-emerald-950 shadow-sm transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <GoogleIcon />
          Continuar con Google
        </button>

        <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          <span className="h-px flex-1 bg-emerald-950/10" />
          o con tu correo
          <span className="h-px flex-1 bg-emerald-950/10" />
        </div>

        <form onSubmit={handleEmailSubmit} className="grid gap-3 text-left">
          <div className="flex items-center gap-2 rounded-xl border border-emerald-950/15 px-4 py-3">
            <Mail size={16} className="text-slate-400" />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu-correo@gmail.com"
              className="w-full text-sm outline-none"
            />
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-emerald-950/15 px-4 py-3">
            <Lock size={16} className="text-slate-400" />
            <input
              required
              minLength={6}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-sm outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !isSupabaseConfigured}
            className="mt-1 inline-flex items-center justify-center rounded-full bg-emerald-900 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Un momento…"
              : mode === "signup"
                ? "Crear cuenta"
                : "Iniciar sesión"}
          </button>
        </form>

        <button
          onClick={() => {
            setMode(mode === "signup" ? "signin" : "signup");
            setError("");
          }}
          className="mt-5 text-xs font-semibold text-emerald-700 hover:text-emerald-900"
        >
          {mode === "signup"
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? Créala"}
        </button>
      </div>
    </div>
  );
}
