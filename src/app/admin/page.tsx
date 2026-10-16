"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, 
  KeyRound, 
  Users, 
  UserCheck, 
  UserX, 
  Utensils, 
  Music, 
  Download, 
  Search, 
  RefreshCw, 
  MessageCircle, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Sparkles,
  ArrowRight,
  LogOut,
  ChevronDown
} from "lucide-react";
import { RSVPSubmission } from "@/lib/rsvpStorage";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [submissions, setSubmissions] = useState<RSVPSubmission[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "yes" | "no" | "dietary" | "music">("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Auto-login from sessionStorage if already entered in this tab
  useEffect(() => {
    const savedPass = sessionStorage.getItem("admin_auth_pass");
    if (savedPass) {
      setPassword(savedPass);
      fetchSubmissions(savedPass);
    }
  }, []);

  const fetchSubmissions = async (passToUse?: string) => {
    const key = passToUse || password;
    if (!key) return;

    setIsLoading(true);
    setAuthError("");

    try {
      const res = await fetch(`/api/rsvp?password=${encodeURIComponent(key)}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("admin_auth_pass", key);
        setSubmissions(data.data || []);
      } else {
        setIsAuthenticated(false);
        setAuthError(data.error || "Contraseña incorrecta");
      }
    } catch (e) {
      setAuthError("Error de conexión al cargar respuestas");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSubmissions(password);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth_pass");
    setIsAuthenticated(false);
    setPassword("");
    setSubmissions([]);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Seguro que quieres eliminar la respuesta de "${name}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/rsvp?id=${encodeURIComponent(id)}&password=${encodeURIComponent(password)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSubmissions((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert("No se pudo eliminar la respuesta");
      }
    } catch (e) {
      alert("Error al intentar eliminar");
    } finally {
      setDeletingId(null);
    }
  };

  // Metrics computation
  const stats = useMemo(() => {
    const totalResponses = submissions.length;
    const confirmedYes = submissions.filter((s) => s.attendance === "yes");
    const confirmedNo = submissions.filter((s) => s.attendance === "no");
    
    // Count companions
    let totalCompanions = 0;
    confirmedYes.forEach((s) => {
      if (s.companion && s.companion.trim().length > 0) {
        totalCompanions += 1;
      }
    });

    const totalAttendees = confirmedYes.length + totalCompanions;

    const dietaryCount = submissions.filter(
      (s) => (s.dietary && s.dietary.some((d) => !d.includes("Cero restricciones") && !d.includes("Como de todo"))) ||
             (s.otherDietary && s.otherDietary.trim().length > 0)
    ).length;

    const songsCount = submissions.filter(
      (s) => (s.songTitle && s.songTitle.trim().length > 0) || (s.songArtist && s.songArtist.trim().length > 0)
    ).length;

    return {
      totalResponses,
      confirmedYes: confirmedYes.length,
      confirmedNo: confirmedNo.length,
      totalCompanions,
      totalAttendees,
      dietaryCount,
      songsCount,
    };
  }, [submissions]);

  // Filtering
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((item) => {
      // 1. Text Search
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        (item.companion && item.companion.toLowerCase().includes(q)) ||
        (item.message && item.message.toLowerCase().includes(q)) ||
        (item.songTitle && item.songTitle.toLowerCase().includes(q)) ||
        (item.guestRole && item.guestRole.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      // 2. Type Filter
      if (filterType === "yes") return item.attendance === "yes";
      if (filterType === "no") return item.attendance === "no";
      if (filterType === "dietary") {
        return (
          (item.dietary && item.dietary.some((d) => !d.includes("Cero restricciones") && !d.includes("Como de todo"))) ||
          (item.otherDietary && item.otherDietary.trim().length > 0)
        );
      }
      if (filterType === "music") {
        return Boolean(item.songTitle || item.songArtist);
      }

      return true;
    });
  }, [submissions, searchQuery, filterType]);

  // Export to Excel-ready CSV
  const exportToCSV = () => {
    if (submissions.length === 0) {
      alert("No hay respuestas para exportar");
      return;
    }

    const headers = [
      "Fecha",
      "Nombre",
      "Teléfono",
      "Asistencia",
      "Acompañante",
      "Restricciones Alimentarias",
      "Otras Alergias",
      "Rol Honorífico",
      "Canción DJ",
      "Artista",
      "Mensaje para los novios",
    ];

    const rows = submissions.map((s) => [
      new Date(s.submittedAt).toLocaleDateString("es-ES") + " " + new Date(s.submittedAt).toLocaleTimeString("es-ES"),
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.phone.replace(/"/g, '""')}"`,
      s.attendance === "yes" ? "SÍ ASISTE" : "NO ASISTE",
      s.companion ? `"${s.companion.replace(/"/g, '""')}"` : "",
      s.dietary ? `"${s.dietary.join(", ").replace(/"/g, '""')}"` : "",
      s.otherDietary ? `"${s.otherDietary.replace(/"/g, '""')}"` : "",
      s.guestRole ? `"${s.guestRole.replace(/"/g, '""')}"` : "",
      s.songTitle ? `"${s.songTitle.replace(/"/g, '""')}"` : "",
      s.songArtist ? `"${s.songArtist.replace(/"/g, '""')}"` : "",
      s.message ? `"${s.message.replace(/"/g, '""')}"` : "",
    ]);

    const csvContent = "\uFEFF" + [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `boda_lucas_josefina_respuestas_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 1. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex items-center justify-center p-4 selection:bg-[#dfb15b] selection:text-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-7 sm:p-9 rounded-3xl bg-[#141417] border border-[#27272a] shadow-2xl text-center space-y-6"
        >
          {/* Lock Icon & Monogram */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-[#dfb15b]/10 border border-[#dfb15b]/30 flex items-center justify-center shadow-lg">
              <Lock className="w-6 h-6 text-[#dfb15b]" />
            </div>
            <h1 className="font-serif-editorial text-4xl text-white italic pt-2">
              Lucas & Josefina
            </h1>
            <span className="font-mono-swiss text-[11px] uppercase tracking-widest text-zinc-400">
              Panel Privado de Gestión RSVP
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="block font-mono-swiss text-xs uppercase tracking-wider text-zinc-400">
                Contraseña de acceso
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introduce la contraseña..."
                  required
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#3f3f46] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#dfb15b] transition-colors"
                />
              </div>
            </div>

            {authError && (
              <p className="font-mono-swiss text-xs text-red-400 bg-red-950/40 p-2.5 rounded-xl border border-red-800/40">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#c28835] via-[#dfb15b] to-[#c28835] text-black font-mono-swiss text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-all shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Comprobando acceso...</span>
              ) : (
                <>
                  <span>Entrar al Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="font-mono-swiss text-[10px] text-zinc-500">
            Contraseña por defecto: <code className="text-[#dfb15b]">boda2027</code>
          </p>
        </motion.div>
      </div>
    );
  }

  // 2. MAIN ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] p-4 sm:p-8 selection:bg-[#dfb15b] selection:text-black">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Bar Navigation */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#27272a]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-editorial text-3xl sm:text-4xl text-white italic">
                Lucas & Josefina
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#dfb15b]/10 border border-[#dfb15b]/30 font-mono-swiss text-[10px] text-[#dfb15b] uppercase tracking-widest">
                Admin
              </span>
            </div>
            <p className="font-mono-swiss text-xs text-zinc-400 mt-1">
              Control de asistencia para la boda del 6 de febrero de 2027
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => fetchSubmissions()}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#dfb15b]/40 text-xs font-mono-swiss text-zinc-300 transition-colors cursor-pointer"
              title="Refrescar lista"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#dfb15b] ${isLoading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refrescar</span>
            </button>

            <button
              onClick={exportToCSV}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono-swiss font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Excel (CSV)</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-900/40 bg-red-950/20 hover:bg-red-950/40 text-red-300 text-xs font-mono-swiss transition-colors cursor-pointer"
              title="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* METRICS OVERVIEW CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5">
          {/* Card 1: Total Asistentes Confirmados */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#141417] border border-[#27272a] space-y-1">
            <span className="font-mono-swiss text-[10px] uppercase tracking-wider text-zinc-400 block">
              Total Personas (SÍ)
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif-editorial text-4xl sm:text-5xl text-[#dfb15b]">
                {stats.totalAttendees}
              </span>
              <span className="font-mono-swiss text-xs text-zinc-400">
                ({stats.confirmedYes} titulares + {stats.totalCompanions} acomp.)
              </span>
            </div>
          </div>

          {/* Card 2: No Asisten */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#141417] border border-[#27272a] space-y-1">
            <span className="font-mono-swiss text-[10px] uppercase tracking-wider text-zinc-400 block">
              No pueden venir
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif-editorial text-4xl sm:text-5xl text-zinc-400">
                {stats.confirmedNo}
              </span>
              <span className="font-mono-swiss text-xs text-zinc-500">invitados</span>
            </div>
          </div>

          {/* Card 3: Menús Especiales */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#141417] border border-[#27272a] space-y-1">
            <span className="font-mono-swiss text-[10px] uppercase tracking-wider text-zinc-400 block">
              Alergias / Menús Especiales
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif-editorial text-4xl sm:text-5xl text-amber-400">
                {stats.dietaryCount}
              </span>
              <span className="font-mono-swiss text-xs text-zinc-400">para catering</span>
            </div>
          </div>

          {/* Card 4: Canciones DJ */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#141417] border border-[#27272a] space-y-1">
            <span className="font-mono-swiss text-[10px] uppercase tracking-wider text-zinc-400 block">
              Temazos para Veneno
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif-editorial text-4xl sm:text-5xl text-emerald-400">
                {stats.songsCount}
              </span>
              <span className="font-mono-swiss text-xs text-zinc-400">peticiones</span>
            </div>
          </div>
        </div>

        {/* SEARCH AND FILTERS TOOLBAR */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-[#141417] border border-[#27272a]">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, teléfono, rol o canción..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-[#27272a] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#dfb15b] transition-colors"
            />
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterType("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-swiss transition-colors cursor-pointer shrink-0 ${
                filterType === "all" ? "bg-[#dfb15b] text-black font-semibold" : "bg-black/30 text-zinc-400 hover:text-white"
              }`}
            >
              Todos ({submissions.length})
            </button>
            <button
              onClick={() => setFilterType("yes")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-swiss transition-colors cursor-pointer shrink-0 ${
                filterType === "yes" ? "bg-emerald-500 text-black font-semibold" : "bg-black/30 text-zinc-400 hover:text-emerald-400"
              }`}
            >
              Vienen ({stats.confirmedYes})
            </button>
            <button
              onClick={() => setFilterType("no")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-swiss transition-colors cursor-pointer shrink-0 ${
                filterType === "no" ? "bg-zinc-300 text-black font-semibold" : "bg-black/30 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              No vienen ({stats.confirmedNo})
            </button>
            <button
              onClick={() => setFilterType("dietary")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-swiss transition-colors cursor-pointer shrink-0 ${
                filterType === "dietary" ? "bg-amber-500 text-black font-semibold" : "bg-black/30 text-zinc-400 hover:text-amber-400"
              }`}
            >
              Alergias ({stats.dietaryCount})
            </button>
            <button
              onClick={() => setFilterType("music")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-swiss transition-colors cursor-pointer shrink-0 ${
                filterType === "music" ? "bg-purple-500 text-black font-semibold" : "bg-black/30 text-zinc-400 hover:text-purple-400"
              }`}
            >
              Música ({stats.songsCount})
            </button>
          </div>
        </div>

        {/* SUBMISSIONS LIST / TABLE */}
        {filteredSubmissions.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#141417] border border-[#27272a] space-y-2">
            <Users className="w-8 h-8 text-zinc-500 mx-auto" />
            <h3 className="font-serif-editorial text-2xl text-white italic">
              {submissions.length === 0 ? "Todavía no hay respuestas" : "No hay resultados para este filtro"}
            </h3>
            <p className="font-mono-swiss text-xs text-zinc-400 max-w-sm mx-auto">
              {submissions.length === 0
                ? "En cuanto los invitados completen el formulario RSVP en la web, aparecerán aquí automáticamente."
                : "Prueba a cambiar o borrar el término de búsqueda."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSubmissions.map((s) => {
              const isYes = s.attendance === "yes";
              const cleanPhone = s.phone.replace(/[^0-9]/g, "");

              return (
                <div
                  key={s.id}
                  className="p-5 rounded-2xl bg-[#141417] border border-[#27272a] hover:border-[#3f3f46] transition-all space-y-4"
                >
                  {/* Top Row: Name, Status, Companion & WhatsApp Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h4 className="font-serif-editorial text-2xl text-white italic">
                          {s.name}
                        </h4>

                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono-swiss text-[11px] font-bold border ${
                            isYes
                              ? "bg-emerald-950/80 text-emerald-300 border-emerald-600/40"
                              : "bg-red-950/80 text-red-300 border-red-600/40"
                          }`}
                        >
                          {isYes ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <XCircle className="w-3 h-3 text-red-400" />}
                          <span>{isYes ? "CONFIRMADO (SÍ)" : "NO ASISTE"}</span>
                        </span>

                        {s.guestRole && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#dfb15b]/10 border border-[#dfb15b]/30 font-mono-swiss text-[11px] text-[#dfb15b]">
                            {s.guestRole}
                          </span>
                        )}
                      </div>

                      {s.companion && (
                        <p className="font-sans-ui text-xs text-zinc-300">
                          + Acompañante: <strong className="text-white font-medium">{s.companion}</strong>
                        </p>
                      )}
                    </div>

                    {/* Actions: WhatsApp + Delete */}
                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <a
                        href={`https://wa.me/${cleanPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-mono-swiss transition-all cursor-pointer"
                        title="Abrir WhatsApp con este invitado"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{s.phone}</span>
                      </a>

                      <button
                        onClick={() => handleDelete(s.id, s.name)}
                        disabled={deletingId === s.id}
                        className="p-2 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-950/20 transition-colors cursor-pointer"
                        title="Eliminar respuesta"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Middle Row: Dietary + Music Request */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#27272a] text-xs">
                    {/* Dietary */}
                    <div className="space-y-1">
                      <span className="font-mono-swiss text-[10px] uppercase text-zinc-400 flex items-center gap-1">
                        <Utensils className="w-3 h-3 text-amber-400" />
                        <span>Restricciones alimentarias:</span>
                      </span>
                      <p className="text-zinc-200">
                        {s.dietary && s.dietary.length > 0 ? s.dietary.join(", ") : "Cero restricciones"}
                        {s.otherDietary && <span className="text-amber-300 block font-light">Nota: {s.otherDietary}</span>}
                      </p>
                    </div>

                    {/* Music */}
                    <div className="space-y-1">
                      <span className="font-mono-swiss text-[10px] uppercase text-zinc-400 flex items-center gap-1">
                        <Music className="w-3 h-3 text-purple-400" />
                        <span>Canción para la fiesta:</span>
                      </span>
                      <p className="text-zinc-200">
                        {s.songTitle || s.songArtist ? (
                          <span className="text-purple-300 font-medium">
                            &ldquo;{s.songTitle}&rdquo; {s.songArtist ? `— ${s.songArtist}` : ""}
                          </span>
                        ) : (
                          <span className="text-zinc-500 italic">No especificó canción</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Message to couple if present */}
                  {s.message && (
                    <div className="p-3 rounded-xl bg-black/40 border border-[#27272a] text-xs font-light italic text-zinc-300">
                      &ldquo;{s.message}&rdquo;
                    </div>
                  )}

                  {/* Timestamp */}
                  <div className="text-right">
                    <span className="font-mono-swiss text-[10px] text-zinc-500">
                      Recibido el {new Date(s.submittedAt).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
