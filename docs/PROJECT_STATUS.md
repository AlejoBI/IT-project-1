# Estado del proyecto

## Línea base 2026-11-12

- El sistema fue verificado manualmente por el equipo y funciona en deploy.
- El repositorio y la arquitectura existente fueron identificados.
- Se creó el roadmap de mejora.
- Se crearon plantillas de variables y documentación técnica inicial.
- Node `v24.13.0`, npm `11.6.2`, Docker `29.6.2` y Docker Compose `v5.3.1`.
- `docker compose config` pasa usando las plantillas `.env.example`.
- Compose incluye healthchecks para Gateway, frontend y los siete servicios;
  valida `/health` o `/ready` según corresponda.
- Build y stack Docker validados: los 9 contenedores llegaron a estado
  `healthy`; el Gateway requirió usar `127.0.0.1` en su healthcheck para evitar
  resolución IPv6 de `localhost` en Alpine.
- El build fue repetido después de cambiar los Dockerfiles a `npm ci` y las
  nueve imágenes volvieron a construirse correctamente.
- `npm audit fix` sin `--force` se aplicó a los ocho proyectos: eliminó los
  avisos críticos y bajos reportados inicialmente. Persisten 5 avisos altos en
  los proyectos con Firebase y 2 moderados en notificaciones; requieren
  actualizar Firebase/Zod o dependencias mayores con pruebas de regresión.
- El frontend ahora carga páginas y generación PDF bajo demanda. El bundle
  inicial dejó de concentrar la página de auditorías y el PDF; el chunk PDF de
  1.5 MB solo se solicita al descargar un reporte.
- Los siete servicios compilan; sus suites pasan: 73 pruebas y 7 smoke tests.
- Frontend: `npm run build` y `npm run lint` pasan.
- Los scripts de lint backend fueron corregidos para funcionar en Windows.
- Validación runtime directa completada: los siete servicios respondieron `200`
  en `/health` y `/ready` usando solo variables de ejemplo; los procesos se
  cerraron después de la prueba y no se conservaron archivos `.env`.
- La verificación quedó automatizada en `test-runtime-services.ps1`.
- El Gateway valida TLS hacia upstreams, limita `/api/auth/`, restringe CORS a
  orígenes conocidos y propaga un identificador de correlación.
- La configuración del Gateway fue probada en un contenedor aislado: `/health`
  devuelve `200`, el preflight autorizado devuelve `204` y ambos incluyen
  `X-Request-ID`.
- La matriz detallada está en [FUNCTIONALITY_MATRIX.md](FUNCTIONALITY_MATRIX.md).

## Hallazgos pendientes de resolver

- `docker compose config` falla si falta el `.env` de un servicio.
- El frontend local no tiene sus dependencias instaladas en el entorno actual.
- Una prueba de `compliance-service` inicializa Firebase con configuración
  inexistente y falla antes de ejecutar el controlador.
- Los servicios de formularios y auditorías solo tienen smoke tests; no deben
  considerarse cubiertos funcionalmente.
- La suite completa todavía requiere ejecución integrada del stack y Firebase
  Emulator para validar contratos entre servicios.
- Las imágenes Docker reportan vulnerabilidades npm; queda pendiente
  clasificarlas y actualizar dependencias gradualmente. Sus instalaciones ya
  usan `npm ci` para respetar los lockfiles.
- El script de tests instala dependencias automáticamente y reporta varias
  vulnerabilidades npm que deben clasificarse antes de actualizar.
- El Gateway contiene URLs de Render hardcodeadas.

## Próximo objetivo

Completar la Fase 0 del roadmap y dejar todos los comandos de validación
reproducibles sin Firebase de producción.
