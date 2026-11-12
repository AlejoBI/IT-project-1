# ISOlytics

Plataforma web para evaluar cumplimiento normativo, guardar autoevaluaciones,
generar reportes y apoyar procesos de auditoría. ISOlytics es una herramienta
de apoyo y no sustituye una asesoría legal ni una certificación.

## Arquitectura vigente

- **Frontend:** React, TypeScript, Redux Toolkit, React Router y Tailwind CSS.
- **Gateway:** Nginx, único punto de entrada público.
- **Backend:** siete microservicios Node.js/TypeScript: autenticación, usuarios,
  cumplimiento, normativas, formularios, auditorías y notificaciones.
- **Persistencia:** Firebase Authentication y Firestore.
- **Orquestación local:** Docker Compose.

El diagrama y las responsabilidades verificadas están en
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). El plan de trabajo está en
[docs/ROADMAP.md](docs/ROADMAP.md).

## Documentación

- [Estado del proyecto](docs/PROJECT_STATUS.md)
- [Roadmap](docs/ROADMAP.md)
- [Arquitectura](docs/ARCHITECTURE.md)
- [Componentes](docs/COMPONENTS.md)
- [API](docs/API.md)
- [Seguridad](docs/SECURITY.md)
- [Modelo de cumplimiento](docs/COMPLIANCE_MODEL.md)
- [Variables de entorno](docs/ENVIRONMENTS.md)
- [Despliegue, rollback y restauración](docs/DEPLOYMENT.md)
- [Matriz de funcionalidades](docs/FUNCTIONALITY_MATRIX.md)
- [Prácticas de ingeniería](docs/ENGINEERING_PRACTICES.md)

## Requisitos

- Node.js 22 (referencia de CI y Docker).
- npm 11.
- Docker y Docker Compose.
- Proyecto Firebase de desarrollo para ejecutar los flujos reales.

## Ejecución local

### Frontend

```powershell
cd FRONTEND
npm ci
npm run build
npm run lint
npm run dev
```

### Servicios

Cada servicio contiene un `.env.example`. Copiarlo a `.env` solo localmente y
completar las variables de Firebase cuando se necesite acceder a datos reales.

```powershell
docker compose config
docker compose up --build
```

El frontend queda en `http://localhost:5173` y el Gateway en `http://localhost`.
Los servicios usan los puertos 5000–5006 y no deben exponerse directamente en
producción.

Para validar el runtime con configuración de ejemplo:

```powershell
powershell -ExecutionPolicy Bypass -File .\test-runtime-services.ps1
```

Para ejecutar las suites de backend:

```powershell
powershell -ExecutionPolicy Bypass -File .\test-all-services.ps1
```

## Variables y secretos

No guardar `.env`, claves privadas ni datos reales en Git. Consultar
[docs/ENVIRONMENTS.md](docs/ENVIRONMENTS.md) para los nombres exactos. Las
credenciales de producción deben configurarse en el proveedor de despliegue.

## Estado y contribución

El estado verificable está en `docs/PROJECT_STATUS.md` y la matriz funcional en
`docs/FUNCTIONALITY_MATRIX.md`. Antes de abrir un cambio:

1. Revisar el roadmap y el estado del árbol de Git.
2. Ejecutar las pruebas relacionadas.
3. Ejecutar lint, typecheck/build y `git diff --check`.
4. Documentar la evidencia y no marcar una tarea sin implementación y prueba.
