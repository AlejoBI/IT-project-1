import React from "react";

const StatsCard = ({
  title,
  value,
  description,
  color,
}: {
  title: string;
  value: number;
  description: string;
  color: string;
}) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-md ${color} text-white transition-transform duration-300 hover:scale-105`}
    >
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-sm mt-2">{description}</p>
    </div>
  );
};

export default StatsCard;
