# Matriz de funcionalidades

Estados: **funciona** significa que existe implementación y evidencia local;
**parcial** significa que el flujo existe pero falta cobertura o validación;
**pendiente** significa que no se ha verificado o requiere trabajo explícito.

## Línea base ejecutable

| Área | Estado | Evidencia | Pendiente |
|---|---|---|---|
| Registro, login y logout | Parcial | `authController.test.ts` (6 pruebas) | Prueba integrada con Firebase Emulator y navegador. |
| Recuperación de contraseña | Parcial | Controlador y ruta `/api/auth/recover-password` | Verificar correo real y proveedor de email. |
| Gestión de usuarios | Funciona localmente | `userController.test.ts` (17 pruebas) | Autorización por rol y aislamiento por organización. |
| Regulaciones | Funciona localmente | `regulationController.test.ts` (11 pruebas) | Versionado, vigencia y permisos administrativos. |
| Formularios | Parcial | Controladores, rutas, versionado y build TypeScript | El servicio solo tiene smoke test; faltan pruebas CRUD. |
| Guardado de borrador | Parcial | Rutas `/self-assessments/draft` y controladores | Prueba de reanudación y expiración/versionado. |
| Evaluación y puntajes | Parcial | `selfAssessmentController.test.ts`, `formAnswerValidation.test.ts` y `calculateScores.ts` | Flujo de extremo a extremo, respuestas obligatorias y Firebase Emulator. |
| Reportes de cumplimiento | Funciona localmente | `complianceReportController.test.ts`, filtros frontend por regulación, estado y periodo | PDF, permisos de descarga, responsable y trazabilidad histórica. |
| Auditorías | Parcial | Rutas, controladores y 8 pruebas; permisos por rol y auditor autenticado | Falta integración con Firebase Emulator y flujo desplegado. |
| Notificaciones | Funciona localmente | `notificationController.test.ts` (4 pruebas) | Probar MailerSend sin secreto real y reintentos. |
| Servicios runtime | Funciona localmente | Los 7 servicios respondieron `200` en `/health` y `/ready` con configuración de ejemplo | Validar dependencias Firebase mediante Emulator. |
| API Gateway | Funciona como configuración | `nginx.conf`, `/health`, `docker compose config` | Prueba de contrato del proxy y readiness de dependencias. |
| Frontend | Funciona como build | `npm run build`, `npm run lint`, Axios con Bearer Firebase, rutas y PDF con code-splitting | Pruebas de componentes y prueba manual documentada. |
| Docker Compose | Funciona con `.env` local | Build, stack y 9 contenedores `healthy` con plantillas | Levantar stack completo con Firebase Emulator. |

## Servicios y calidad actual

| Servicio | Build | Tests | Lint | Observación |
|---|---|---|---|---|
| auth | OK | 6 pasan | OK, warnings | Cobertura de controlador 76.47 %. |
| users | OK | 17 pasan | OK, warnings | Mock de Firestore estabilizado. |
| compliance | OK | 32 pasan | OK, warnings | Incluye ownership, validación de respuestas, versionado y fórmula de puntajes. |
| notifications | OK | 4 pasan | OK, warnings | MailerSend requiere configuración para envío real. |
| regulations | OK | 11 pasan | OK, warnings | Cobertura de controlador 86.36 %. |
| evaluation forms | OK | 7 pasan | OK, warnings | Cubre reglas Zod de preguntas, opciones y formularios completos. |
| audits | OK | 8 pasan | OK, warnings | Cubre creación, actualización, duplicados, consulta y permisos por rol. |

## Flujos aún no declarados como verificados

Login real, recuperación real, evaluación completa, generación/descarga de PDF,
flujo de auditoría desplegado, reglas Firebase, aislamiento multiusuario,
rollback y levantamiento completo sin reinicios requieren evidencia manual o de
integración. No se marcan como completados solo porque el código compile.
