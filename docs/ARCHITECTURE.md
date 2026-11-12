# Arquitectura de ISOlytics

```mermaid
flowchart LR
    UI[React + TypeScript] --> GW[Nginx API Gateway]
    GW --> AUTH[Auth service]
    GW --> USERS[User service]
    GW --> COMP[Compliance service]
    GW --> REG[Regulation service]
    GW --> FORM[Evaluation form service]
    GW --> AUDIT[Audit service]
    GW --> NOTIFY[Notification service]
    AUTH --> FB[(Firebase Auth + Firestore)]
    USERS --> FB
    COMP --> FB
    REG --> FB
    FORM --> FB
    AUDIT --> FB
```

## Responsabilidades

- **Frontend:** navegación, formularios, estado Redux, autenticación web y
  visualización de reportes.
- **API Gateway:** punto de entrada público y enrutamiento hacia servicios.
- **Auth:** registro, login, recuperación y validación de identidad.
- **Users:** perfiles, roles y datos relacionados con usuarios.
- **Regulation:** marcos, normas y requisitos evaluables.
- **Evaluation form:** formularios, secciones, preguntas y borradores.
- **Compliance:** respuestas, cálculo de puntajes e informes.
- **Audit:** auditorías y seguimiento por parte de evaluadores.
- **Notification:** notificaciones y correo opcional.
- **Firebase:** autenticación y persistencia compartida.

## Flujo principal

```mermaid
sequenceDiagram
    actor User as Usuario
    participant UI as Frontend
    participant GW as API Gateway
    participant Form as Evaluation service
    participant Comp as Compliance service
    participant DB as Firestore
    User->>UI: Inicia evaluación
    UI->>GW: Solicita formulario con token
    GW->>Form: Enruta solicitud
    Form->>DB: Lee versión del formulario
    DB-->>Form: Secciones y preguntas
    Form-->>UI: Formulario
    User->>UI: Guarda respuestas
    UI->>GW: Envía evaluación
    GW->>Comp: Enruta respuestas
    Comp->>DB: Guarda respuestas e informe
    Comp-->>UI: Puntajes y brechas
```

El Gateway mantiene las rutas públicas; los servicios no deben exponerse
directamente al navegador en producción.
