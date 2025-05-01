import React, { useEffect } from "react";
import { SectionScoresChart } from "./SectionScoresChart";
import { fetchRegulationsAction } from "../../../application/store/regulations/regulationsActions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useRegulation } from "../../hooks/useRegulation";

const ReportsContainer = () => {
  const dispatch = useAppDispatch();

  const { regulations, loading } = useRegulation();

  useEffect(() => {
    dispatch(fetchRegulationsAction());
  }, [dispatch]);

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-3xl font-bold mb-6">Reportes de Cumplimiento</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-1">Resultados por Normativa</h2>
        <p className="text-sm text-gray-600 mb-4">
          Visualiza el nivel de cumplimiento por sección según cada estándar.
        </p>

        {loading ? (
          <p>Cargando estándares...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {regulations?.map((regulation) => (
              <div key={regulation.id} className="rounded-2xl shadow">
                <SectionScoresChart standard={regulation.name} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ReportsContainer;
