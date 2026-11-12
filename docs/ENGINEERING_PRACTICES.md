# Prácticas de ingeniería

- TypeScript estricto para contratos de dominio y API.
- Validación de entradas con esquemas reutilizables.
- Servicios pequeños con una responsabilidad clara.
- Firebase Emulator para pruebas de integración.
- Mocks para evitar dependencia de Firebase de producción en CI.
- Tests unitarios para reglas de puntaje y autorización.
- Lint, typecheck y build antes de integrar cambios.
- CI ejecuta tests de servicios y lint/build de backend y frontend en Node 22.
- Logs estructurados con servicio, operación y correlation ID.
- Secrets únicamente en el proveedor de despliegue.
- Commits pequeños y cambios revisables.
- Documentación actualizada junto con cada cambio de contrato.
- Migraciones y cambios de reglas Firebase revisados por separado.

## Estrategia de cambios

1. Reproducir el problema.
2. Añadir o ajustar una prueba.
3. Implementar el cambio mínimo.
4. Ejecutar validaciones locales.
5. Probar el flujo completo.
6. Documentar y publicar.
