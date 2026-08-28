import { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "./supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  // undefined = todavía no se sabe si es admin (evita mostrar "no
  // autorizado" de más mientras se resuelve la consulta); true/false
  // = ya se sabe con certeza.
  const [isAdmin, setIsAdmin] = useState(undefined);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // La sesión de Google por sí sola no autoriza nada: solo un correo
  // presente en la tabla "admins" puede escribir (lo exige también RLS).
  useEffect(() => {
    if (!session?.user) {
      setIsAdmin(false);
      return;
    }

    let cancelled = false;
    setIsAdmin(undefined); // vuelve a "desconocido" mientras se revisa este usuario

    supabase
      .from("admins")
      .select("email")
      .eq("email", session.user.email)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        const admin = Boolean(data);
        setIsAdmin(admin);

        // Cuenta válida de Google pero sin permisos: se guarda para que
        // el colegio pueda usarla luego en envíos de correo.
        if (!admin) {
          const nombre =
            session.user.user_metadata?.full_name ||
            session.user.user_metadata?.name ||
            null;
          supabase
            .from("suscriptores")
            .upsert(
              { email: session.user.email, nombre },
              { onConflict: "email", ignoreDuplicates: true }
            )
            .then(() => {});
        }
      });

    return () => {
      cancelled = true;
    };
  }, [session]);

  async function signInWithGoogle() {
    if (!isSupabaseConfigured) {
      return { error: "El panel de administración no está configurado todavía." };
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/admin` },
    });
    return { error: error?.message };
  }

  async function signUpWithEmail(email, password) {
    if (!isSupabaseConfigured) {
      return { error: "El panel de administración no está configurado todavía." };
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    if (error) return { error: error.message };
    // Con "Confirm email" activo, signUp no entrega sesión hasta que la
    // persona haga clic en el enlace que le llega por correo.
    return { needsConfirmation: !data.session };
  }

  async function signInWithEmail(email, password) {
    if (!isSupabaseConfigured) {
      return { error: "El panel de administración no está configurado todavía." };
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message };
  }

  async function signOut() {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
  }

  const adminPending = Boolean(session?.user) && isAdmin === undefined;

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        isAdmin: Boolean(isAdmin),
        // Sigue "cargando" hasta que, si hay usuario, también se sepa
        // con certeza si es admin — así nunca se ve "no autorizado" de más.
        loading: loading || adminPending,
        signInWithGoogle,
        signUpWithEmail,
        signInWithEmail,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
