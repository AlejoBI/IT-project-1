import {
  welcomeTemplate,
  infoNoticeTemplate,
  warningTemplate,
  sectionCompletedTemplate,
  formCompletedTemplate,
} from "./notificationHTMLs";

import {
  EmailTemplate,
  EmailTemplateType,
  EmailTemplateWelcome,
  EmailTemplateInfo,
  EmailTemplateWarning,
  EmailTemplateSectionCompleted,
  EmailTemplateFormCompleted,
} from "../../../domain/models/types/notificationTypes";

export const generateEmailTemplate = (
  type: EmailTemplateType,
  template: EmailTemplate
): string => {
  switch (type) {
    case EmailTemplateType.WELCOME:
      return welcomeTemplate(template as EmailTemplateWelcome);

    case EmailTemplateType.INFO_NOTICE:
      return infoNoticeTemplate(template as EmailTemplateInfo);

    case EmailTemplateType.WARNING:
      return warningTemplate(template as EmailTemplateWarning);

    case EmailTemplateType.SECTION_COMPLETED:
      return sectionCompletedTemplate(
        template as EmailTemplateSectionCompleted
      );
    case EmailTemplateType.FORM_COMPLETED:
      return formCompletedTemplate(template as EmailTemplateFormCompleted);

    default:
      throw new Error(`Unsupported email type: ${type}`);
  }
};
