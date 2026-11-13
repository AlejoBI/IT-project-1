# Procesos funcionales

Este documento describe el uso normal de ISOlytics y la responsabilidad de cada
rol. La interfaz puede cambiar, pero los estados y reglas del proceso deben
mantenerse compatibles con los contratos de la [API](API.md).

## Roles

| Rol | Capacidades principales |
|---|---|
| `standard_user` | Consultar normativas disponibles, iniciar evaluaciones, guardar borradores, finalizarlas y consultar sus reportes. |
| `auditor` | Consultar evaluaciones disponibles para auditoría, crear o revisar auditorías y consultar reportes autorizados. |
| `admin` | Gestionar usuarios, normativas y formularios; además de las capacidades administrativas de auditoría y cumplimiento. |

Los roles se asignan mediante Firebase Admin y no desde el frontend. Un usuario
debe renovar su sesión después de un cambio de rol para recibir el nuevo token.

## Registro, acceso y recuperación

1. El usuario se registra o inicia sesión desde `/login`.
2. Firebase Authentication emite el ID token.
3. Axios adjunta `Authorization: Bearer <token>` a las solicitudes protegidas.
4. El usuario puede cerrar sesión o solicitar recuperación de contraseña desde
   `/recover-password`.
5. Las rutas públicas y protegidas se controlan en React, pero la autorización
   definitiva ocurre en el Gateway y los servicios.

## Evaluación y borradores

1. El usuario entra en **Autoevaluaciones** (`/self-assessments`) y selecciona
   una normativa.
2. El frontend obtiene el formulario vigente y busca un borrador con
   `GET /api/compliance/self-assessments/draft/:regulationId/:userId`.
3. Si no existe borrador, el backend responde `204 No Content`; esto es un
   estado normal, no un error.
4. La evaluación se responde por secciones en `/evaluation/:regulationId`.
5. Cada guardado usa `POST /api/compliance/self-assessments/save`. Si tiene
   éxito, el frontend vuelve a sincronizar el borrador desde backend.
6. El estado permanece `in_progress` hasta enviar la evaluación. Las respuestas
   se validan contra la pregunta, sección, formulario, versión y subpregunta
   reales.
7. Al finalizar se usa `POST /api/compliance/self-assessments/submit`; después
   se genera o actualiza el informe de cumplimiento.

Un fallo de guardado no debe enviar notificaciones. Las notificaciones solo se
intentan después de una operación exitosa.

## Reportes y acciones correctivas

1. En **Reportes** (`/reports`) el usuario consulta sus evaluaciones y reportes.
2. Puede filtrar por normativa, estado y fechas, revisar puntaje general,
   resultados por sección, brechas y comparación histórica.
3. Las acciones correctivas se crean, consultan y actualizan desde el reporte;
   cada cambio conserva historial.
4. Los reportes solo se muestran a usuarios autorizados y mantienen la versión
   del formulario utilizada para la evaluación.

## Auditoría y descarga PDF

1. Un usuario con permiso abre **Auditorías** (`/audits`) y selecciona una
   evaluación disponible.
2. El auditor puede consultar el formulario, registrar hallazgos y revisar el
   resultado mediante `/audit-form/:selfAssessmentId` y
   `/audit-report/:selfAssessmentId`.
3. El usuario puede consultar sus auditorías en `/audit-user`.
4. **Descargar PDF** obtiene la evaluación y sus auditorías autorizadas y
   genera el documento en el navegador. El módulo PDF se carga bajo demanda;
   no se almacenan credenciales ni el archivo en el backend.

## Gestión administrativa

- **Usuarios:** `/dashboard`; actualización de perfiles y roles según claims.
- **Normativas:** crear, editar, consultar y eliminar desde el módulo de
  normativas.
- **Formularios:** administrar formularios, secciones, preguntas, opciones y
  subpreguntas asociadas a una normativa.

Las operaciones administrativas requieren el rol correspondiente aunque el
usuario pueda ver la ruta en el navegador.

## Estados y errores esperados

| Situación | Comportamiento esperado |
|---|---|
| Token ausente, expirado o inválido | `401`; se solicita iniciar sesión nuevamente. |
| Recurso sin permiso | `403`; no se revela información del recurso. |
| Borrador inexistente | `204`; se inicia una evaluación nueva. |
| Datos inválidos o incompatibles | `400`/`422`; se conserva el formulario para corregirlos. |
| Límite temporal del Gateway | `429`; la respuesta debe conservar CORS y `X-Request-ID`. |
