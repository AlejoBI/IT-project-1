import React from "react";

interface EmailNotificationProps {
  to: string;
  subject: string;
  recipientName: string;
  appName: string;
  buttonText: string;
  buttonUrl: string;
  plainTextContent: string;
  onSuccess?: () => void;
}

const EmailNotificationSender: React.FC<EmailNotificationProps> = ({
  to,
  subject,
  recipientName,
  appName,
  buttonText,
  buttonUrl,
  plainTextContent,
}) => {
  const sendEmail = async () => {
    const htmlContent = `
            <!DOCTYPE html>
            <html lang="es">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>${subject}</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f4f4;
                        }
                        .email-container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            border-radius: 8px;
                            overflow: hidden;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            background-color: #007bff;
                            color: #ffffff;
                            text-align: center;
                            padding: 20px;
                        }
                        .content {
                            padding: 20px;
                            color: #333333;
                            line-height: 1.6;
                        }
                        .content h1 {
                            font-size: 24px;
                            margin-bottom: 10px;
                        }
                        .content p {
                            font-size: 16px;
                            margin-bottom: 20px;
                        }
                        .button-container {
                            text-align: center;
                            margin-top: 20px;
                        }
                        .button {
                            display: inline-block;
                            background-color: #007bff;
                            color: #ffffff;
                            text-decoration: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                            font-size: 16px;
                        }
                        .footer {
                            text-align: center;
                            padding: 10px;
                            background-color: #f4f4f4;
                            color: #777777;
                            font-size: 12px;
                        }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <div class="header">
                            <h1>${appName}</h1>
                        </div>
                        <div class="content">
                            <h1>Hola ${recipientName},</h1>
                            <p>Gracias por registrarte en <strong>${appName}</strong>.</p>
                            <p>Para comenzar, haz clic en el siguiente botón:</p>
                            <div class="button-container">
                                <a href="${buttonUrl}" class="button">${buttonText}</a>
                            </div>
                        </div>
                        <div class="footer">
                            <p>
                                &copy; ${new Date().getFullYear()} ${appName}. Todos los derechos
                                reservados.
                            </p>
                        </div>
                    </div>
                </body>
            </html>
        `;

    const payload = {
      to,
      subject,
      htmlContent,
      textContent: plainTextContent,
    };

    console.log("Payload to send:", payload);
  };

  return (
    <button
      onClick={sendEmail}
      className="px-4 py-2 bg-blue-600 text-white rounded-md"
    >
      Enviar notificación
    </button>
  );
};

export default EmailNotificationSender;
