import {
  EmailTemplateWelcome,
  EmailTemplateInfo,
  EmailTemplateWarning,
  EmailTemplateSectionCompleted,
  EmailTemplateFormCompleted,
} from "../../../domain/models/types/notificationTypes";

export const welcomeTemplate = (template: EmailTemplateWelcome): string => `
  <div style="font-family: 'Segoe UI', sans-serif; background-color: #f4f6f8; padding: 40px;">
    <table width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);">
      <tr>
        <td style="background: linear-gradient(90deg, #4CAF50, #81C784); color: white; padding: 24px 32px;">
          <h1 style="margin: 0; font-size: 24px;">👋 ¡Bienvenido(a) a ${
            template.appName
          }!</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 32px;">
          <p style="font-size: 16px; color: #333;">Hola <strong>${
            template.currentName
          }</strong>,</p>
          <p style="font-size: 16px; color: #333;">Nos alegra mucho que te unas a <strong>${
            template.appName
          }</strong>. ¡Estamos felices de tenerte con nosotros!</p>
          <p style="text-align: center; margin: 24px 0;">
            <a href="${
              template.buttonUrl
            }" style="background-color: #4CAF50; color: white; padding: 14px 24px; border-radius: 6px; font-size: 16px; text-decoration: none;">${
  template.buttonText
}</a>
          </p>
          <p style="font-size: 14px; color: #555;">¡Esperamos que disfrutes tu experiencia con nosotros!</p>
        </td>
      </tr>
      <tr>
        <td style="background-color: #f0f3f6; padding: 16px 32px; text-align: center; font-size: 12px; color: #888;">
          © ${new Date().getFullYear()} ${
  template.appName
}. Todos los derechos reservados.
        </td>
      </tr>
    </table>
  </div>
`;

export const infoNoticeTemplate = (template: EmailTemplateInfo): string => `
  <div style="font-family: 'Segoe UI', sans-serif; background-color: #eef3f9; padding: 40px;">
    <table width="100%" style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
      <tr>
        <td style="background: linear-gradient(90deg, #2196F3, #64B5F6); color: white; padding: 24px 32px;">
          <h1 style="margin: 0; font-size: 22px;">📢 ${template.subject}</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 32px;">
          <p style="font-size: 16px; color: #333;">Hola <strong>${
            template.currentName
          }</strong>,</p>
          <p style="font-size: 16px; color: #333;">Queremos informarte sobre algo importante en <strong>${
            template.appName
          }</strong>.</p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${
              template.buttonUrl
            }" style="background-color: #2196F3; color: white; padding: 14px 24px; font-size: 16px; text-decoration: none; border-radius: 6px;">${
  template.buttonText
}</a>
          </div>
          <p style="font-size: 14px; color: #555;">Gracias por tu atención,<br/>El equipo de ${
            template.appName
          }</p>
        </td>
      </tr>
      <tr>
        <td style="background-color: #e3eaf3; padding: 16px 32px; text-align: center; font-size: 12px; color: #888;">
          © ${new Date().getFullYear()} ${template.appName}
        </td>
      </tr>
    </table>
  </div>
`;

export const warningTemplate = (template: EmailTemplateWarning): string => `
  <div style="font-family: 'Segoe UI', sans-serif; background-color: #fcebea; padding: 40px;">
    <table width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
      <tr>
        <td style="background: linear-gradient(90deg, #f44336, #e57373); color: white; padding: 24px 32px;">
          <h1 style="margin: 0; font-size: 22px;">⚠️ ${template.subject}</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 32px;">
          <p style="font-size: 16px; color: #333;">Hola <strong>${
            template.currentName
          }</strong>,</p>
          <p style="font-size: 16px; color: #333;">Este es un mensaje importante de advertencia desde <strong>${
            template.appName
          }</strong>.</p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${
              template.buttonUrl
            }" style="background-color: #f44336; color: white; padding: 14px 24px; font-size: 16px; text-decoration: none; border-radius: 6px;">${
  template.buttonText
}</a>
          </div>
          <p style="font-size: 14px; color: #555;">Gracias,<br/>El equipo de ${
            template.appName
          }</p>
        </td>
      </tr>
      <tr>
        <td style="background-color: #fbe9e7; padding: 16px 32px; text-align: center; font-size: 12px; color: #888;">
          © ${new Date().getFullYear()} ${template.appName}
        </td>
      </tr>
    </table>
  </div>
`;

export const sectionCompletedTemplate = (
  template: EmailTemplateSectionCompleted
): string => `
  <div style="font-family: 'Segoe UI', sans-serif; background-color: #f3fdf6; padding: 40px;">
    <table width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
      <tr>
        <td style="background: linear-gradient(90deg, #43a047, #66bb6a); color: white; padding: 24px 32px;">
          <h1 style="margin: 0; font-size: 22px;">✅ Avance registrado</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 32px;">
          <p style="font-size: 16px; color: #333;">Hola <strong>${
            template.currentName
          }</strong>,</p>
          <p style="font-size: 16px; color: #333;">Has completado la sección <strong>"${
            template.sectionTitle
          }"</strong> del formulario <strong>"${
  template.formTitle
}"</strong>.</p>
          <p style="font-size: 16px; color: #333;">Haz clic en el botón para continuar con el resto del proceso:</p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${
              template.buttonUrl
            }" style="background-color: #43a047; color: white; padding: 14px 24px; font-size: 16px; text-decoration: none; border-radius: 6px;">${
  template.buttonText
}</a>
          </div>
          <p style="font-size: 14px; color: #555;">Gracias por tu compromiso,<br/>El equipo de ${
            template.appName
          }</p>
        </td>
      </tr>
      <tr>
        <td style="background-color: #e8f5e9; padding: 16px 32px; text-align: center; font-size: 12px; color: #888;">
          © ${new Date().getFullYear()} ${template.appName}
        </td>
      </tr>
    </table>
  </div>
`;

export const formCompletedTemplate = (template: EmailTemplateFormCompleted) => `
  <div style="font-family: 'Segoe UI', sans-serif; background-color: #f4f6f8; padding: 40px;">
    <table width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); overflow: hidden;">
      <tr>
        <td style="background: linear-gradient(90deg, #1A73E8, #4285F4); color: white; padding: 24px 32px;">
          <h1 style="margin: 0; font-size: 24px;">🎉 ¡Formulario completado!</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 32px;">
          <p style="font-size: 16px; color: #333333;">Hola <strong>${
            template.currentName
          }</strong>,</p>
          <p style="font-size: 16px; color: #333333; line-height: 1.6;">
            Has completado exitosamente el formulario de evaluación <strong>${
              template.formTitle
            }</strong> en <strong>${template.appName}</strong>.
          </p>
          <p style="font-size: 16px; color: #333333; line-height: 1.6;">
            A partir de ahora puedes acceder al reporte completo de tu autoevaluación, donde verás el porcentaje de cumplimiento por sección, observaciones clave y próximos pasos sugeridos.
          </p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="${
              template.buttonUrl
            }" target="_blank" style="background-color: #1A73E8; color: white; text-decoration: none; padding: 14px 24px; border-radius: 6px; font-size: 16px; display: inline-block;">
              ${template.buttonText}
            </a>
          </div>

          <p style="font-size: 14px; color: #555555;">
            Si tienes preguntas o deseas revisar otras normativas, puedes volver a la plataforma cuando quieras.
          </p>
          <p style="font-size: 14px; color: #555555;">Gracias por usar <strong>${
            template.appName
          }</strong>.</p>
        </td>
      </tr>
      <tr>
        <td style="background-color: #f0f3f6; padding: 16px 32px; text-align: center; font-size: 12px; color: #888;">
          © ${new Date().getFullYear()} ${
  template.appName
}. Todos los derechos reservados.
        </td>
      </tr>
    </table>
  </div>
`;
