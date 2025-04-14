interface FileMetadata {
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
}

interface Answer {
  id: string;
  questionId: string;
  type: 'boolean' | 'text' | 'multiple_choice' | 'file' | 'number';
  value: boolean | string | number | string[];
  fileMetadata?: FileMetadata | null;
}

interface Question {
  id: string;
  sectionId: string;
  text: string;
  type: 'boolean' | 'text' | 'multiple_choice' | 'file' | 'number';
  options?: string[]; // Only for multiple_choice
  isRequired: boolean;
}

interface FormSection {
  id: string;
  formId: string;
  title: string;
  questions: Question[];
}

interface EvaluationForm {
  id: string;
  regulationId: string;
  name: string;
  description: string;
  sections: FormSection[];
}

interface SelfAssessment {
  id: string;
  userId: string;
  regulationId: string;
  formId: string;
  answers: Answer[];
  score: number;
  createdAt: Date;
}

interface Audit {
  id: string;
  auditorId: string;
  evaluatedUserId: string;
  regulationId: string;
  results: Answer[];
  score: number;
  status: 'pending' | 'in_review' | 'completed';
  createdAt: Date;
}

interface ComplianceReport {
  id: string;
  userId: string;
  regulationId: string;
  generatedBy: string;
  assessmentIds: string[]; // Array of assessment UIDs
  auditIds: string[];      // Array of audit UIDs
  finalScore: number;
  createdAt: Date;
}

interface Notification {
  id: string;
  recipientId: string;
  type: 'email' | 'in_app';
  title: string;
  message: string;
  sentAt: Date;
  status: 'pending' | 'sent' | 'failed';
}

interface PHVACycle {
  id: string;
  userId: string;
  regulationId: string;
  plan: string;
  doStage: string;
  check: string;
  act: string;
  createdAt: Date;
  updatedAt: Date;
}

// Classes with proper typing
class User {
  id: string;
  email: string;
  role: 'admin' | 'auditor' | 'standard_user';
  isActive: boolean;

  constructor(id: string, email: string, role: 'admin' | 'auditor' | 'standard_user', isActive: boolean = true) {
    this.id = id;
    this.email = email;
    this.role = role;
    this.isActive = isActive;
  }
}

class UserProfile {
  id: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, fullName: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.fullName = fullName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

class Regulation {
  id: string;
  isoCode: string;
  name: string;
  description: string;
  version: string;
  createdAt: Date;

  constructor(id: string, isoCode: string, name: string, description: string, version: string, createdAt: Date) {
    this.id = id;
    this.isoCode = isoCode;
    this.name = name;
    this.description = description;
    this.version = version;
    this.createdAt = createdAt;
  }
}
