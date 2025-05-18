import { generateEmailTemplate } from "./emailTemplates";
import { sendNotification } from "../../../application/store/notification/notificationActions";
import {
  EmailTemplate,
  EmailTemplateType,
} from "../../../domain/models/types/notificationTypes";
import { AppDispatch } from "../../../application/store/store";

interface SendEmailNotificationParams {
  to: string
  type: EmailTemplateType;
  plainTextContent: string;
  dispatch: AppDispatch;
  subject: string;
  appName: string;
  currentName: string;
  buttonText?: string;
  buttonUrl?: string;
  sectionTitle?: string;
  formTitle?: string;
}

export const sendEmailNotification = async ({
  to,
  type,
  dispatch,
  plainTextContent,
  subject,
  ...templateData
}: SendEmailNotificationParams) => {
  const htmlContent = generateEmailTemplate(type, {
    subject,
    ...templateData,
  } as EmailTemplate); // forzamos el cast para permitir tipos extendidos

  const payload = {
    to,
    subject,
    htmlContent,
    textContent: plainTextContent,
  };

  dispatch(sendNotification(payload));
};
