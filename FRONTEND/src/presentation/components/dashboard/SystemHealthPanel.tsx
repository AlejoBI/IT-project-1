import React, { useEffect, useState } from "react";
import api from "../../../infrastructure/api/axios";
import { DARK_MODE_COLORS, LIGHT_MODE_COLORS, UI_COLORS } from "../../../shared/constants";

interface HealthService { service: string; status: "healthy" | "degraded" | "unavailable"; latencyMs: number; }
interface HealthResponse { overall: string; checkedAt: string; services: HealthService[]; }

const SystemHealthPanel = () => {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void api.get<HealthResponse>("/api/audit/system-health")
      .then((response) => { if (active) setHealth(response.data); })
      .catch(() => { if (active) setError("No se pudo consultar la salud de los servicios."); });
    return () => { active = false; };
  }, []);

  const statusStyle = (status: HealthService["status"]) => status === "healthy"
    ? `${UI_COLORS.SUCCESS} ${UI_COLORS.SUCCESS_SURFACE}`
    : status === "degraded" ? `${UI_COLORS.WARNING} ${UI_COLORS.WARNING_SURFACE}` : `${UI_COLORS.DANGER} ${UI_COLORS.DANGER_SURFACE}`;

  return (
    <section className={`mb-6 rounded-xl border p-5 shadow-sm ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} ${UI_COLORS.BORDER}`} aria-labelledby="system-health-title">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id="system-health-title" className="text-xl font-semibold">Salud técnica de microservicios</h2>
        {health && <span className={`rounded-full px-3 py-1 text-sm font-semibold ${health.overall === "healthy" ? statusStyle("healthy") : statusStyle("degraded")}`}>{health.overall === "healthy" ? "Operativo" : "Revisar"}</span>}
      </div>
      {error && <p role="alert" className={`rounded-lg p-3 text-sm ${UI_COLORS.DANGER} ${UI_COLORS.DANGER_SURFACE}`}>{error}</p>}
      {!health && !error && <p className={`text-sm ${UI_COLORS.MUTED}`}>Consultando servicios...</p>}
      {health && <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {health.services.map((service) => <div key={service.service} className={`rounded-lg border p-3 text-sm ${UI_COLORS.BORDER}`}><p className={`${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} font-medium capitalize`}>{service.service}</p><p className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${statusStyle(service.status)}`}>{service.status}</p><p className={`mt-2 ${UI_COLORS.MUTED}`}>{service.latencyMs} ms</p></div>)}
      </div>}
    </section>
  );
};

export default SystemHealthPanel;
