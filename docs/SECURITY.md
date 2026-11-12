# Seguridad

## Identidad y autorización

Firebase Authentication identifica al usuario. Las reglas de Firestore y los
middlewares del backend deben validar que el usuario autenticado pueda acceder
al recurso solicitado. Ocultar una pantalla en React no es autorización.

## Datos

- Separar proyectos Firebase de develop y production.
- Validar propietario, organización y rol en cada operación sensible.
- Versionar regulaciones y formularios para conservar trazabilidad histórica.
- No incluir tokens, contraseñas ni datos completos de evaluaciones en logs.
- No subir `.env`, credenciales de Firebase ni claves de MailerSend.

## API Gateway

Solo el Gateway debe ser público. Los servicios internos deben comunicarse por
la red privada del despliegue y no publicar sus puertos innecesariamente.

El Gateway limita los intentos contra `/api/auth/` y genera/propaga
`X-Request-ID`. Los logs y sistemas de soporte deben usar ese identificador sin
registrar tokens ni contraseñas.

Las conexiones HTTPS del Gateway hacia los upstreams validan ahora los
certificados contra las autoridades de confianza del contenedor. No se debe
volver a usar `proxy_ssl_verify off` en ningún entorno.

## Archivos y reportes

Las cargas deben validar extensión, tamaño y contenido. Los reportes solo deben
ser descargables por usuarios autorizados y deben indicar versión, fecha y
alcance de la evaluación.

## Limitaciones

ISOlytics ofrece apoyo para evaluar cumplimiento. No debe presentarse como
dictamen legal automático ni sustituir la revisión de un profesional.

## Dependencias

Se ejecutó `npm audit fix` sin `--force` en frontend y microservicios. La
auditoría posterior no reporta vulnerabilidades críticas ni bajas. Persisten
avisos altos asociados principalmente a la cadena Firebase/gRPC y la versión
actual de Zod; la actualización mayor de esas dependencias debe tratarse como
una tarea separada, con pruebas de compatibilidad y revisión de lockfiles.
