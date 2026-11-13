import React, { useEffect, useState } from "react";
import api from "../../../infrastructure/api/axios";

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

  return (
    <section className="mb-6 rounded-xl border p-5" aria-labelledby="system-health-title">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id="system-health-title" className="text-xl font-semibold">Salud técnica de microservicios</h2>
        {health && <span className={health.overall === "healthy" ? "text-emerald-600" : "text-amber-600"}>{health.overall === "healthy" ? "Operativo" : "Revisar"}</span>}
      </div>
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      {!health && !error && <p className="text-sm text-gray-500">Consultando servicios...</p>}
      {health && <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {health.services.map((service) => <div key={service.service} className="rounded border p-3 text-sm"><p className="font-medium capitalize">{service.service}</p><p className={service.status === "healthy" ? "text-emerald-600" : "text-amber-600"}>{service.status}</p><p className="text-gray-500">{service.latencyMs} ms</p></div>)}
      </div>}
    </section>
  );
};

export default SystemHealthPanel;
