import { createContext, useContext, useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "./supabase";

const DEFAULT_IDENTITY = {
  displayName: "Colegio Max Planck",
  logoUrl: "",
};

const InstitutionIdentityContext = createContext(DEFAULT_IDENTITY);

function publicLogoUrl(path, version) {
  if (!path || !supabase) return "";
  const { data } = supabase.storage.from("institutional-assets").getPublicUrl(path);
  return version ? `${data.publicUrl}?v=${encodeURIComponent(version)}` : data.publicUrl;
}

export function InstitutionIdentityProvider({ children }) {
  const [identity, setIdentity] = useState(DEFAULT_IDENTITY);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;
    let mounted = true;
    supabase.rpc("obtener_marca_institucional").then(({ data, error }) => {
      if (!mounted || error || !data?.[0]) return;
      const row = data[0];
      setIdentity({
        displayName: row.nombre_publico || DEFAULT_IDENTITY.displayName,
        logoUrl: publicLogoUrl(row.logo_path, row.actualizado_en),
      });
    });
    return () => { mounted = false; };
  }, []);

  return <InstitutionIdentityContext.Provider value={identity}>{children}</InstitutionIdentityContext.Provider>;
}

export function useInstitutionIdentity() {
  return useContext(InstitutionIdentityContext);
}
