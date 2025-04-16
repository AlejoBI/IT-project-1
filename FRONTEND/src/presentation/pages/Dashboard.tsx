import React from "react";
import StatsOverview from "../components/dashboard/StatsOverview";
//import ComplianceProgressChart from "../components/dashboard/ComplianceProgressChart";
import PendingTasksList from "../components/dashboard/PendingTasksList";
import WeakControlsTable from "../components/dashboard/WeakControlsTable";
import ActivityFeed from "../components/dashboard/ActivityFeed";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6 p-4 min-h-screen">
      <StatsOverview />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/*<ComplianceProgressChart />*/}
        <PendingTasksList />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeakControlsTable />
        <ActivityFeed />
      </div>
    </div>
  );
};

export default DashboardPage;