# API y contratos

El frontend se comunica con el API Gateway, no directamente con los servicios.
El prefijo de cada dominio está definido en `services/api-gateway/nginx.conf`.

| Prefijo | Servicio |
|---|---|
| `/api/auth/` | Auth |
| `/api/users/` | Users |
| `/api/compliance/` | Compliance |
| `/api/notifications/` | Notifications |
| `/api/regulations/` | Regulations |
| `/api/evaluation/` | Evaluation forms |
| `/api/audit/` | Audits |

## Endpoints principales

| Base | Operaciones implementadas |
|---|---|
| `/api/auth` | `POST /register`, `/login`, `/logout`, `/recover-password` |
| `/api/users` | `GET /`, `/audit`, `/:uid`; `PUT /:uid`; `DELETE /:userId` |
| `/api/regulations` | `GET /`, `/:id`; `POST /`; `PUT /:id`; `DELETE /:id` |
| `/api/evaluation/forms` | `POST /`, `/full`; `GET /`, `/:regulationId`; `PUT /:formId`; `DELETE /:regulationId` |
| `/api/evaluation/sections` | `POST /`; `GET /:formId`; `PUT /:sectionId`; `DELETE /:sectionId` |
| `/api/evaluation/questions` | `POST /`; `GET /:sectionId`; `PUT /:questionId`; `DELETE /:questionId` |
| `/api/compliance/self-assessments` | `GET /draft/:regulationId/:userId`, `/:userId`, `/assessment/:selfAssessmentId`, `/for-audits/:userId`; `POST /save`, `/submit` |
| `/api/compliance/compliance-reports` | `POST /create`; `GET /:userId`; acciones `GET/POST /:reportId/actions`, `PATCH /:reportId/actions/:actionId`; historial `GET /:reportId/history` |
| `/api/audit` | `POST /create`; `GET /:selfAssessmentId`; `GET /events`, `/system-health` |
| `/api/notifications` | `POST /send` |

## Reglas de contrato

- Los endpoints protegidos reciben el token Firebase según la configuración del
  cliente Axios.
- Los errores deben devolver status HTTP adecuado y un mensaje no sensible.
- Un borrador inexistente devuelve `204 No Content`; no debe tratarse como una
  falla del flujo de evaluación.
- Las respuestas proxificadas incluyen `X-Request-ID` para diagnóstico.
- El Gateway agrega CORS únicamente para los orígenes permitidos y conserva los
  headers CORS también en respuestas de error, incluidos `429`.
- Las respuestas deben mantener nombres y tipos estables.
- Los controladores validan entradas antes de acceder a Firestore.
- Las acciones administrativas deben verificar rol en backend.

## Salud

El Gateway expone:

```text
GET /health
```

Los servicios deben incorporar endpoints propios de salud y el despliegue debe
usar readiness para no enviar tráfico a instancias que aún no están listas.

Todos los servicios exponen localmente `GET /health` y `GET /ready`. La
readiness actual confirma que el proceso HTTP está disponible; la comprobación
de dependencias externas queda pendiente para una integración con Firebase
Emulator.
