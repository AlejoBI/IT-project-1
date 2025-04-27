// Regulation types
export interface Regulation {
  id: string;
  name: string;
  description: string;
  version: string;
}

export interface RegulationPayload {
  id: string;
  name: string;
  description: string;
  version: string;
}

export interface RegulationUpdatePayload {
  name?: string;
  description?: string;
  version?: string;
}