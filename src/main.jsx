import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Nosotros from "./pages/Nosotros";
import Niveles from "./pages/Niveles";
import CursosNivel from "./pages/CursosNivel";
import Admision from "./pages/Admision";
import Propuesta from "./pages/Propuesta";
import Campus from "./pages/Campus";
import Home from "./pages/Home";
import Login from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminNiveles from "./pages/admin/AdminNiveles";
import AdminNoticias from "./pages/admin/AdminNoticias";
import AdminHorarios from "./pages/admin/AdminHorarios";
import AdminSuscriptores from "./pages/admin/AdminSuscriptores";
import { AuthProvider } from "./lib/AuthContext";
import { InstitutionIdentityProvider } from "./lib/InstitutionIdentityContext";
import "./styles.css";

function App() {
  return (
    <InstitutionIdentityProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/niveles" element={<Niveles />} />
            <Route path="/niveles/:nivel/cursos" element={<CursosNivel />} />
            <Route path="/admision" element={<Admision />} />
            <Route path="/propuesta" element={<Propuesta />} />
            <Route path="/campus" element={<Campus />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="niveles" replace />} />
              <Route path="niveles" element={<AdminNiveles />} />
              <Route path="noticias" element={<AdminNoticias />} />
              <Route path="horarios" element={<AdminHorarios />} />
              <Route path="suscriptores" element={<AdminSuscriptores />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </InstitutionIdentityProvider>
  );
}

createRoot(document.getElementById("root")).render(<App />);
