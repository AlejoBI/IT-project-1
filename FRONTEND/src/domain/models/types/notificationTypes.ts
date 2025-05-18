export type Notification = {
  to: string;
  subject: string;
  htmlContent: string;
  textContent: string;
}

export enum EmailTemplateType {
  WELCOME = "WELCOME",
  INFO_NOTICE = "INFO_NOTICE",
  WARNING = "WARNING",
  SECTION_COMPLETED = "SECTION_COMPLETED",
  FORM_COMPLETED = "FORM_COMPLETED",
}

// Props comunes a todos los correos
export interface BaseEmailProps {
  subject: string;
  appName: string;
  currentName: string;
  buttonText: string;
  buttonUrl: string;
}

// Plantillas con props extendidas
export type EmailTemplateWelcome = BaseEmailProps;

export type EmailTemplateInfo = BaseEmailProps;

export type EmailTemplateWarning = BaseEmailProps;

export interface EmailTemplateSectionCompleted extends BaseEmailProps {
  sectionTitle: string;
  formTitle: string;
}

export interface EmailTemplateFormCompleted extends BaseEmailProps {
  formTitle: string;
}

export type EmailTemplate =
  | EmailTemplateWelcome
  | EmailTemplateInfo
  | EmailTemplateWarning
  | EmailTemplateSectionCompleted
  | EmailTemplateFormCompleted;
