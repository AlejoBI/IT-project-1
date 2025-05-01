import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useSectionScores } from "../../hooks/useSectionScores";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Props {
  standard: string;
}

export const SectionScoresChart = ({ standard }: Props) => {
  const { data, loading } = useSectionScores(standard);

  if (loading) return <p>Cargando datos...</p>;

  const chartData = {
    labels: data.map((d) => d.section),
    datasets: [
      {
        label: "Cumplimiento (%)",
        data: data.map((d) => d.score),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-semibold mb-2">{standard}</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};
