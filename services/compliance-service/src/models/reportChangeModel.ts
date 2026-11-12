export interface ReportChange {
  id?: string;
  reportId: string;
  actionId: string;
  type: "created" | "updated";
  changedFields: string[];
  changedAt: Date;
}
