import React from "react";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS } from "../../shared/constants";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mb-6">
    <div className={`${LIGHT_MODE_COLORS.BACKGROUND_COMPONENT} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} shadow-md rounded-2xl p-6 transition-all duration-300`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white border-b pb-2">
        {title}
      </h2>
      <div className="text-gray-700 dark:text-gray-300 text-base leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  </section>
);

const PrivacyPolicies = () => {
  return (
    <div className="min-h-screen px-6 py-12 md:px-20 transition-all duration-300">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Política de Privacidad
        </h1>

        <p className="mb-10 text-lg text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Esta Política de Privacidad describe cómo ByteForge recopila, utiliza
          y protege la información personal que usted proporciona cuando utiliza
          nuestra plataforma.
        </p>

        <div className="space-y-6">
          <Section title="1. Información que recopilamos">
            <ul className="list-disc list-inside space-y-1">
              <li>
                Datos de identificación: nombre completo, dirección de correo
                electrónico, número de teléfono.
              </li>
              <li>
                Datos de cuenta: nombre de usuario, contraseña encriptada.
              </li>
              <li>
                Información técnica: dirección IP, tipo de navegador, sistema
                operativo, fecha y hora de acceso.
              </li>
              <li>
                Información de uso: páginas visitadas, clics, tiempo de
                permanencia.
              </li>
              <li>Cookies y tecnologías similares.</li>
            </ul>
          </Section>

          <Section title="2. Finalidad del tratamiento de datos">
            <p>Utilizamos los datos personales recopilados para:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Gestionar su cuenta y autenticación.</li>
              <li>Proporcionar acceso seguro a nuestros servicios.</li>
              <li>
                Mejorar la funcionalidad y la experiencia del usuario en la
                plataforma.
              </li>
              <li>
                Enviar notificaciones importantes, actualizaciones o cambios de
                servicio.
              </li>
              <li>Ofrecer soporte técnico y atención al cliente.</li>
              <li>Cumplir con obligaciones legales y regulatorias.</li>
            </ul>
          </Section>

          <Section title="3. Base legal para el tratamiento de datos">
            <p>Procesamos sus datos personales basándonos en:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Su consentimiento explícito al registrarse o utilizar nuestros
                servicios.
              </li>
              <li>La necesidad de ejecutar un contrato con usted.</li>
              <li>
                Intereses legítimos, como mejorar la seguridad y funcionalidad.
              </li>
              <li>Cumplimiento de obligaciones legales.</li>
            </ul>
          </Section>

          <Section title="4. Compartición de datos">
            <p>
              No compartimos su información personal con terceros, salvo en los
              siguientes casos:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Proveedores de servicios bajo acuerdos de confidencialidad.
              </li>
              <li>Obligaciones legales o requerimientos judiciales.</li>
              <li>Prevención de fraudes o amenazas a la seguridad.</li>
            </ul>
          </Section>

          <Section title="5. Seguridad de los datos">
            <p>
              Implementamos medidas técnicas y organizativas para proteger sus
              datos, incluyendo:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Encriptación SSL/TLS en la transmisión de datos.</li>
              <li>Acceso restringido a la información.</li>
              <li>Backups regulares y auditorías de seguridad.</li>
            </ul>
          </Section>

          <Section title="6. Conservación de datos">
            <p>
              Conservamos sus datos personales durante el tiempo necesario para
              cumplir los fines descritos en esta política, salvo que la ley
              requiera un período mayor.
            </p>
          </Section>

          <Section title="7. Derechos del usuario">
            <p>Usted tiene derecho a:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Acceder a sus datos personales.</li>
              <li>Rectificar datos incorrectos o desactualizados.</li>
              <li>Solicitar la eliminación de sus datos.</li>
              <li>Oponerse o limitar ciertos tratamientos de datos.</li>
              <li>Retirar su consentimiento en cualquier momento.</li>
            </ul>
            <p>
              Puede ejercer estos derechos contactándonos a través del correo:
              <span className="block font-medium text-blue-600 dark:text-blue-400">
                privacidad@byteforge.dev
              </span>
            </p>
          </Section>

          <Section title="8. Uso de cookies">
            <p>
              Utilizamos cookies para personalizar la experiencia del usuario y
              analizar patrones de uso. Puede modificar sus preferencias de
              cookies en la configuración de su navegador.
            </p>
          </Section>

          <Section title="9. Cambios a esta política">
            <p>
              Podemos actualizar esta Política de Privacidad ocasionalmente.
              Notificaremos cualquier cambio importante en nuestra plataforma o
              por correo electrónico si corresponde.
            </p>
          </Section>
        </div>

        <p className="mt-12 text-sm text-center text-gray-500 dark:text-gray-400">
          Última actualización: 25 de mayo de 2025
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicies;
