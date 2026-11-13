import React, { useCallback, useEffect, useState } from "react";
import { ComplianceReport, ReportAction, ReportChange } from "../../../domain/models/types/complianceTypes";
import {
  createReportActionApi,
  getReportActionsApi,
  getReportActionHistoryApi,
  updateReportActionApi,
} from "../../../infrastructure/api/reportActionsApi";
import { DARK_GRADIENTS, DARK_MODE_COLORS, GRADIENTS, LIGHT_MODE_COLORS, UI_COLORS } from "../../../shared/constants";

const ReportActions = ({ reports }: { reports: ComplianceReport[] }) => {
  const [actions, setActions] = useState<ReportAction[]>([]);
  const [title, setTitle] = useState("");
  const [responsible, setResponsible] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [responsibleFilter, setResponsibleFilter] = useState("");
  const [history, setHistory] = useState<ReportChange[]>([]);

  const loadActions = useCallback(async () => {
    try {
      const results = await Promise.all(reports.map((report) => getReportActionsApi(report.id)));
      setActions(results.flat());
      const historyResults = await Promise.all(reports.map((report) => getReportActionHistoryApi(report.id)));
      setHistory(historyResults.flat());
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudieron cargar las acciones.");
    }
  }, [reports]);

  useEffect(() => {
    if (reports.length > 0) void loadActions();
    else {
      setActions([]);
      setHistory([]);
    }
  }, [loadActions, reports]);

  const filteredActions = actions.filter((action) =>
    !responsibleFilter || (action.responsible ?? "Sin responsable").toLowerCase().includes(responsibleFilter.toLowerCase())
  );

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    const report = reports[0];
    if (!report || title.trim().length < 3) return;
    try {
      await createReportActionApi(report.id, {
        title: title.trim(),
        responsible: responsible.trim() || undefined,
        dueDate: dueDate ? new Date(`${dueDate}T23:59:59.000Z`).toISOString() : undefined,
      });
      setTitle("");
      setResponsible("");
      setDueDate("");
      await loadActions();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudo crear la acción.");
    }
  };

  const handleStatus = async (action: ReportAction, status: ReportAction["status"]) => {
    try {
      await updateReportActionApi(action.reportId, action.id, { status });
      await loadActions();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudo actualizar la acción.");
    }
  };

  return (
    <section className={`mb-8 rounded-xl border p-6 shadow-sm ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} ${UI_COLORS.BORDER}`} aria-labelledby="report-actions-title">
      <h2 id="report-actions-title" className={`mb-4 text-xl font-semibold ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`}>Acciones correctivas</h2>
      {error && <p role="alert" className={`mb-3 rounded-lg p-3 text-sm ${UI_COLORS.DANGER} ${UI_COLORS.DANGER_SURFACE}`}>{error}</p>}
      <form onSubmit={handleCreate} className="mb-5 grid gap-3 md:grid-cols-4">
        <input aria-label="Acción a realizar" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Acción a realizar" className={`rounded-lg border p-2 ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${UI_COLORS.BORDER} ${UI_COLORS.FOCUS} md:col-span-2`} />
        <input aria-label="Responsable" value={responsible} onChange={(event) => setResponsible(event.target.value)} placeholder="Responsable" className={`rounded-lg border p-2 ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${UI_COLORS.BORDER} ${UI_COLORS.FOCUS}`} />
        <input aria-label="Fecha objetivo" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} className={`rounded-lg border p-2 ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${UI_COLORS.BORDER} ${UI_COLORS.FOCUS}`} />
        <button type="submit" className={`rounded-lg px-4 py-2 font-semibold text-white transition-colors ${GRADIENTS.BUTTON_BG} ${DARK_GRADIENTS.BUTTON_BG} ${LIGHT_MODE_COLORS.BUTTON_HOVER_BG} md:col-span-4`}>Añadir acción</button>
      </form>
      <label className="mb-4 block text-sm font-medium">
        Filtrar por responsable
        <input aria-label="Filtrar por responsable" value={responsibleFilter} onChange={(event) => setResponsibleFilter(event.target.value)} placeholder="Todos los responsables" className={`mt-1 w-full rounded-lg border p-2 ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${UI_COLORS.BORDER} ${UI_COLORS.FOCUS}`} />
      </label>
      {filteredActions.length === 0 ? (
          <p className={`text-sm ${UI_COLORS.MUTED}`}>No hay acciones correctivas registradas.</p>
      ) : (
        <ul className="space-y-3">
          {filteredActions.map((action) => (
            <li key={action.id} className={`flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between ${UI_COLORS.BORDER}`}>
              <div>
                <p className={`${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} font-medium`}>{action.title}</p>
                <p className={`text-sm ${UI_COLORS.MUTED}`}>{action.responsible || "Sin responsable"}{action.dueDate ? ` · vence ${new Date(action.dueDate).toLocaleDateString()}` : ""}</p>
              </div>
              <select aria-label={`Estado de ${action.title}`} value={action.status} onChange={(event) => void handleStatus(action, event.target.value as ReportAction["status"])} className={`rounded-lg border p-2 text-sm ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${UI_COLORS.BORDER} ${UI_COLORS.FOCUS}`}>
                <option value="pendiente">Pendiente</option>
                <option value="en_progreso">En progreso</option>
                <option value="resuelta">Resuelta</option>
                <option value="vencida">Vencida</option>
              </select>
            </li>
          ))}
        </ul>
      )}
      {history.length > 0 && (
        <details className={`mt-6 rounded-lg border p-3 ${UI_COLORS.BORDER}`}>
          <summary className="cursor-pointer font-medium">Historial de cambios ({history.length})</summary>
          <ul className={`mt-3 space-y-2 text-sm ${UI_COLORS.MUTED}`}>
            {history.map((change) => (
              <li key={change.id}>
                {new Date(change.changedAt).toLocaleString()} · {change.type === "created" ? "Creada" : "Actualizada"} · {change.changedFields.join(", ") || "sin detalle"}
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
};

export default ReportActions;
