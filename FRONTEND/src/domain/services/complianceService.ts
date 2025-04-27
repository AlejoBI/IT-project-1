import { complianceSchema, CompliancePayload} from "../models/schemas/complianceSchema";

export function validateComplianceData(data: unknown): {
  success: boolean;
  data?: CompliancePayload;
  errors?: string[];
} {
  const result = complianceSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map(
      (err) => `${err.path[0]}: ${err.message}`
    );
    return { success: false, errors };
  }
  return { success: true, data: result.data };
}