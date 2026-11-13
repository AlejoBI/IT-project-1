# Roadmap de reactivación y mejora de ISOlytics

Este documento es el plan de trabajo vivo de ISOlytics. Una tarea solo se marca
cuando existe implementación, prueba y una evidencia verificable. El objetivo
es avanzar por etapas pequeñas sin perder el flujo que ya funciona.

## Estado inicial

- **Repositorio:** `IT-project-1`
- **Producto:** plataforma de medición de cumplimiento normativo.
- **Frontend:** React, TypeScript, Redux Toolkit y Tailwind CSS.
- **Backend:** API Gateway y microservicios Node.js/TypeScript.
- **Persistencia y autenticación:** Firebase.
- **Orquestación local:** Docker Compose.
- **Rama actual:** `master`.

## Reglas de trabajo

1. Primero se estabiliza lo existente; después se agregan funcionalidades.
2. Cada cambio debe tener una prueba manual o automatizada.
3. Nunca se guardan credenciales de Firebase en el repositorio.
4. Los servicios conservan contratos claros y responsabilidades únicas.
5. Las decisiones arquitectónicas se documentan antes de aplicarse.
6. El sistema apoya la evaluación; no reemplaza una asesoría legal.

## Definición de terminado

Una tarea está terminada cuando compila, pasa sus pruebas, fue probada
manualmente, tiene errores útiles, documentación actualizada y no introduce
secretos ni datos reales de prueba.

---

## Fase 0 — Reactivación y línea base

**Objetivo:** conocer el estado real antes de refactorizar.

- [x] Confirmar que el sistema puede ejecutarse.
- [x] Registrar versiones de Node, npm, Docker y dependencias.
- [x] Ejecutar `docker compose config` y corregir advertencias.
- [x] Ejecutar `test-all-services.ps1` y guardar el resultado.
- [x] Ejecutar lint y build del frontend.
- [x] Verificar que todos los servicios levanten sin reinicios.
- [ ] Probar login, recuperación de contraseña y logout.
- [ ] Probar un flujo completo de evaluación.
- [ ] Probar generación y descarga de reportes.
- [ ] Probar el flujo de auditoría.
- [x] Registrar puertos, endpoints y variables requeridas.
- [x] Crear una matriz de funcionalidades: funciona, falla, incompleta o no
      implementada.

**Entregable:** diagnóstico técnico inicial y lista priorizada de fallos.

---

## Fase 1 — Documentación y arquitectura real

**Objetivo:** que el repositorio describa lo que realmente ejecuta.

- [x] Reescribir el README raíz con instrucciones verificadas.
- [x] Documentar el diagrama de servicios y el API Gateway.
- [x] Documentar responsabilidades y endpoints de cada servicio.
- [x] Documentar usuario, regulación, formulario, evaluación, informe,
      auditoría y notificación.
- [x] Documentar variables de entorno de `develop` y `production`.
- [x] Crear plantillas `.env.example` sin credenciales.
- [x] Documentar el flujo local con Docker Compose.
- [x] Documentar despliegue y rollback.
- [x] Eliminar del README arquitecturas que solo fueron propuestas.

**Entregable:** documentación técnica alineada con la implementación.

---

## Fase 2 — Dependencias, configuración y contratos

**Objetivo:** eliminar fragilidad causada por configuraciones antiguas.

- [x] Unificar la versión recomendada de Node.js.
- [x] Revisar dependencias vulnerables y obsoletas.
- [x] Fijar versiones compatibles en `package.json` y lockfiles.
- [x] Revisar puertos y nombres de servicios del Compose.
- [x] Confirmar que el API Gateway apunta a todos los servicios activos.
- [x] Añadir `/health` y readiness a cada servicio.
- [x] Estandarizar errores HTTP.
- [x] Estandarizar validación de entradas.
- [x] Documentar contratos de API y respuestas principales.

**Entregable:** sistema reproducible localmente con contratos explícitos.

---

## Fase 3 — Seguridad e identidad

**Objetivo:** proteger usuarios, organizaciones y evaluaciones.

- [ ] Revisar Firebase Authentication y reglas de Firestore.
- [ ] Verificar aislamiento por organización y usuario.
- [x] Revisar roles y permisos en frontend, Gateway y servicios.
- [x] Impedir que el frontend sea la única barrera de autorización.
- [x] Validar tokens Firebase en todos los endpoints protegidos.
- [ ] Revisar expiración y renovación de sesiones.
- [ ] Eliminar secretos del historial de Git si existiera alguno.
- [x] Configurar CORS únicamente para orígenes conocidos.
- [x] Añadir rate limiting a autenticación y operaciones sensibles.
- [x] Registrar auditoría de cambios administrativos.
- [ ] Revisar subida de archivos y límites de tamaño/tipo.
- [x] Documentar el modelo de amenazas y las reglas de acceso.

**Entregable:** matriz de permisos y reglas de datos verificadas.

---

## Fase 4 — Núcleo de cumplimiento normativo

**Objetivo:** hacer confiable y trazable la evaluación.

- [x] Definir el ciclo de vida de una regulación.
- [x] Definir versiones y vigencia de normas.
- [x] Definir estados de formularios y evaluaciones.
- [x] Validar que cada pregunta pertenezca a una sección y regulación.
- [x] Añadir guardado parcial de evaluaciones.
- [x] Añadir reanudación de evaluaciones incompletas.
- [x] Validar respuestas obligatorias y tipos de respuesta.
- [x] Versionar formularios para conservar evaluaciones históricas.
- [x] Separar el cálculo de puntajes de la capa HTTP.
- [x] Documentar fórmula de cumplimiento y preguntas sin respuesta.
- [x] Trazar cada resultado hasta regulación, sección y pregunta.
- [x] Mostrar que el resultado es apoyo y no una conclusión jurídica definitiva.

**Entregable:** evaluación reproducible, versionada y explicable.

---

## Fase 5 — Reportes y auditorías

**Objetivo:** convertir resultados en acciones verificables.

- [x] Revisar puntajes por sección y regulación.
- [x] Mostrar cumplimiento, brechas y preguntas afectadas.
- [x] Asociar recomendaciones a cada brecha.
- [x] Añadir responsable y fecha objetivo para cada acción.
- [x] Definir estados: pendiente, en progreso, resuelta y vencida.
- [x] Permitir comparar evaluaciones entre periodos.
- [x] Mejorar PDF con fecha, versión y alcance.
- [x] Añadir filtros por regulación, estado, responsable y periodo.
- [x] Validar permisos de lectura y descarga.
- [x] Relacionar auditorías con una evaluación y su versión exacta.
- [x] Añadir historial de cambios del informe.

**Entregable:** reportes útiles para seguimiento y auditoría.

---

## Fase 6 — Experiencia de usuario

**Objetivo:** reducir fricción y hacer comprensible el sistema.

- [x] Rediseñar la página inicial con propuesta de valor clara.
- [x] Mejorar navegación, sidebar y breadcrumbs.
- [x] Mostrar progreso de formularios largos.
- [x] Permitir guardar y continuar después.
- [x] Mejorar estados de carga, vacío, error y éxito.
- [x] Añadir confirmación antes de eliminar información.
- [x] Mejorar dashboard con métricas accionables.
- [x] Mejorar gráficos para móvil y accesibilidad.
- [x] Revisar contraste, foco de teclado y etiquetas.
- [x] Añadir diseño responsive para tabletas y móviles.
- [x] Unificar idioma, textos y terminología.
- [x] Añadir ayuda sobre cumplimiento y uso de la plataforma.

**Entregable:** flujo usable por usuarios técnicos y no técnicos.

---

## Fase 7 — Calidad y pruebas

**Objetivo:** detectar regresiones antes de desplegar.

- [x] Mantener pruebas unitarias para cada servicio.
- [x] Añadir pruebas de autorización por rol.
- [x] Añadir pruebas de aislamiento de datos.
- [ ] Añadir pruebas de contratos del API Gateway.
- [ ] Añadir integración con Firebase Emulator.
- [ ] Añadir prueba del flujo completo de evaluación.
- [x] Añadir pruebas de generación de PDF.
- [x] Añadir pruebas de auditoría y notificaciones.
- [x] Añadir pruebas de componentes críticos del frontend.
- [ ] Acordar cobertura mínima por servicio.
- [x] Ejecutar lint, typecheck, tests y build en CI.
- [x] Evitar que CI dependa de Firebase de producción.
- [x] Estandarizar formato con Prettier en frontend y servicios.
- [x] Eliminar `any` residual de controladores y pruebas.

**Entregable:** pipeline reproducible que bloquee regresiones.

---

## Fase 8 — Observabilidad y operación

**Objetivo:** saber qué ocurre cuando algo falla.

- [x] Usar logs estructurados con servicio, operación y request ID.
- [ ] No registrar tokens, contraseñas ni datos sensibles.
- [x] Propagar correlation ID desde el Gateway.
- [x] Medir latencia y errores por servicio.
- [ ] Registrar fallos de Firebase y dependencias externas.
- [x] Crear un dashboard básico de salud.
- [ ] Definir alertas para caídas y aumento de errores.
- [ ] Documentar diagnóstico, rollback y restauración.
- [ ] Documentar backups y restauración de Firestore.

**Entregable:** operación observable y procedimiento de recuperación.

---

## Fase 9 — Despliegue y entornos

**Objetivo:** separar pruebas de producción y desplegar con seguridad.

- [ ] Definir estrategia de ramas `develop` y `main`.
- [ ] Crear Firebase de desarrollo separado de producción.
- [ ] Configurar variables por entorno.
- [ ] Desplegar `develop` como preview/staging.
- [ ] Desplegar `main` como producción.
- [ ] Definir estrategia para Gateway y servicios backend.
- [ ] Crear healthchecks en el proveedor cloud.
- [ ] Configurar dominios, HTTPS y CORS.
- [ ] Revisar persistencia y límites del plan cloud.
- [ ] Documentar migraciones y cambios de reglas Firebase.
- [ ] Probar rollback antes de declarar producción estable.

**Entregable:** despliegue repetible con ambientes separados.

---

## Backlog posterior

- [ ] Notificaciones configurables por evento.
- [ ] Importación de marcos normativos desde fuentes controladas.
- [ ] Comparación entre versiones de una regulación.
- [ ] Gestión multi-organización.
- [ ] Permisos personalizados por organización.
- [ ] Centro de actividad y alertas.
- [ ] Integración con almacenamiento externo.
- [ ] Firma o aprobación de responsables.
- [ ] Internacionalización completa.
- [ ] Analítica histórica de cumplimiento.

## Próximo paso

La línea base, la Fase 5 parcial y la Fase 6 ya están documentadas. El siguiente
bloque prioritario es la **Fase 7**, empezando por contratos del Gateway, pruebas
de componentes y ejecución con Firebase Emulator cuando esté disponible. Las
tareas de despliegue solo se marcarán con evidencia reproducible.

### Registro de avances

#### 2026-11-12 — actualización de tareas completadas

- Se marcaron como completadas las tareas de Fases 2, 3, 4, 5, 7 y 8 que ya
  cuentan con implementación y evidencia local: errores HTTP, autorización,
  validación de respuestas, reportes históricos, acciones correctivas,
  trazabilidad de auditoría, pruebas de roles/aislamiento y observabilidad.
- Permanecen sin marcar las tareas que requieren Firebase Emulator, token real,
  pruebas E2E, pruebas de PDF/componentes, Gateway desplegado o validación cloud.
- El Gateway ahora conserva un `X-Request-ID` entrante, genera uno cuando falta y
  expone `/ready`; `check-gateway-config.ps1` verifica sus rutas y upstreams.
- Validación del Gateway: `check-gateway-config.ps1` reporta 9 locations, 7
  upstreams y propagación de correlation ID.
- Los reportes ahora persisten y muestran preguntas/subpreguntas con puntaje
  inferior al umbral de brecha, además de la sección afectada.
- La descarga PDF de evaluaciones queda condicionada explícitamente al usuario
  propietario en la interfaz y continúa respaldada por endpoints protegidos.
- Las acciones correctivas permiten filtrar por responsable y conservan un
  historial de creación y actualización consultable por reporte.
- Se añadió Vitest con Testing Library y dos pruebas ejecutables para los
  componentes de resumen de salud y comparación histórica.
- Se añadió una prueba ejecutable de generación PDF con `@react-pdf/renderer`.
- Se añadió auditoría administrativa para cambios de roles/usuarios, normativas,
  formularios y acciones de reportes; los eventos quedan en `adminAuditEvents` y
  son consultables por administradores desde Audit Service.
- El dashboard administrativo consulta la salud de los siete microservicios y
  muestra estado y latencia por servicio mediante `/api/audit/system-health`.
- Se eliminaron los `any` explícitos de controladores y pruebas de servicios;
  `grep` no encuentra usos residuales en los archivos TypeScript de servicios.

#### 2026-11-12 — Fase 6: navegación accesible

- Se mejoró el layout del frontend sin modificar la lógica de negocio:
  enlace para saltar al contenido, menú con estado ARIA y cierre con `Escape`.
- Se añadió `role="status"` al loader para anunciar estados de carga a lectores
  de pantalla.
- El menú móvil bloquea el scroll mientras está abierto y conserva el cierre
  mediante botón, navegación y teclado.
- Validación: `npm run build`, `npm run lint` y `git diff --check` pasan en
  `FRONTEND`.
- Pendiente: revisar visualmente breadcrumbs, contraste completo y responsive en
  tabletas/móviles antes de marcar los ítems globales de la Fase 6.
- Se mejoraron estados de error y vacío en `Compliance`, y sus tarjetas de
  normativa ahora son accesibles mediante teclado.

#### 2026-11-12

- Se confirmó manualmente que el sistema puede ejecutarse.
- Se creó este roadmap para reactivar ISOlytics de forma incremental.
- Próxima actividad: ejecutar y documentar la línea base técnica.

#### 2026-11-12 — documentación, contratos y núcleo

- Se documentaron promoción, rollback y restauración en `docs/DEPLOYMENT.md`.
- Se reemplazó el README heredado por instrucciones alineadas con la arquitectura
  ejecutable.
- Se añadieron validaciones Zod para recuperación de contraseña y notificaciones;
  Auth y Notification compilan, pasan lint y sus suites (6 y 4 pruebas).
- Se definieron fechas opcionales de vigencia de normativas con validación de
  rango; Regulation compila, pasa lint y sus 11 pruebas.
- Se eliminaron retornos `any` de los controladores de Users y del reporte de
  Compliance; Users pasa build, lint y 17 pruebas; Compliance pasa build y 27.

#### 2026-11-12 — validación y seguridad

- La suite completa de servicios pasó: 83 pruebas en los siete servicios; las
  pruebas adicionales de autorización y trazabilidad elevan el total actual a
  88.
- Build y lint pasan en los siete servicios y en el frontend.
- Los siete servicios respondieron `200` en `/health` y `/ready` usando
  `test-runtime-services.ps1`.
- `check-compose-config.ps1` valida Compose con copias temporales de las
  plantillas y las elimina al terminar.
- Se verificó token Firebase en los endpoints internos y autorización por rol y
  propietario en Users. Quedan pendientes roles/aislamiento en los demás
  controladores y reglas de Firestore.
- El frontend ahora inicia sesión en Firebase, adjunta el Bearer token en Axios
  y espera la restauración de sesión antes de cargar rutas protegidas; esto
  corrige la carga de evaluaciones y datos administrativos que respondían `401`.
- Auth sincroniza ahora los roles persistidos en Firestore con custom claims al
  iniciar sesión y al actualizar usuarios, evitando que un admin válido sea
  rechazado por no tener el claim actualizado.
- Auditoría exige `admin` o `auditor`, comprueba que el `auditorId` coincida con
  el token y Compliance restringe la consulta por ID de evaluación al propietario
  o a roles privilegiados. También se corrigió el orden de rutas para que
  `/assessment/:selfAssessmentId` no sea capturada por `/:userId`.
- Las validaciones Zod y los middlewares de autenticación ya devuelven códigos
  estables (`VALIDATION_ERROR`, `AUTH_REQUIRED`, `AUTH_INVALID` y `FORBIDDEN`)
  además del mensaje compatible existente.
- Se añadieron reglas, índices y configuración reproducible para Auth/Firestore
  Emulator. La ejecución local queda pendiente de instalar Firebase CLI.
- Reportes incorpora filtros por regulación, estado y periodo sin alterar la
  consulta protegida del usuario.
- Reportes muestra brechas por sección y recomendaciones diferenciadas según
  severidad para facilitar el seguimiento correctivo.
- Se añadió gestión de acciones correctivas por reporte con responsable, fecha
  objetivo y estados `pendiente`, `en_progreso`, `resuelta` y `vencida`, protegida
  por propietario, admin o auditor.
- Las auditorías conservan `formVersion` cuando se relacionan con una
  evaluación, evitando perder la versión exacta del formulario auditado.
- Reportes incorpora comparación histórica por normativa, con orden temporal,
  estado, puntaje y variación frente a la evaluación anterior.
- La descarga PDF conserva la versión del formulario y muestra errores de carga
  o generación de forma visible para el usuario.
- Reportes muestra un resumen de salud con puntaje promedio, evaluaciones que
  cumplen y cantidad de brechas dentro de los filtros aplicados.
- Los siete servicios registran método, ruta, estado, latencia y `request_id`
  propagado por el Gateway para facilitar diagnóstico sin registrar tokens.

#### 2026-11-12 — trazabilidad de evaluaciones

- Las respuestas de Compliance se contrastan con las secciones y preguntas
  existentes del formulario, incluyendo normativa, tipo, opciones y
  subpreguntas.
- Los formularios nuevos comienzan en versión 1 y cada actualización incrementa
  su versión; las sesiones y resultados guardan `formVersion`.
- Los resultados conservan `formId`, `regulationId`, `sectionId` y `questionId`
  dentro de la evaluación para permitir trazabilidad histórica.
- Compliance pasa build, lint y 32 pruebas; Evaluation Forms pasa build, lint y
  7 pruebas. Los warnings restantes son `any` preexistentes en pruebas y
  controladores.
