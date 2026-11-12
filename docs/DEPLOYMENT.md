# Despliegue

## Local

1. Instalar Node.js y Docker.
2. Instalar dependencias del frontend y de cada servicio.
3. Copiar cada `.env.example` a `.env` y completar Firebase.
4. Ejecutar:

```powershell
docker compose config
docker compose up --build
```

El frontend queda en `5173` y el Gateway en `80`.

Sin Docker, puede comprobarse el runtime compilado de los microservicios con:

```powershell
powershell -ExecutionPolicy Bypass -File .\test-runtime-services.ps1
```

El script usa únicamente `.env.example`, comprueba `/health` y `/ready`, y
elimina los archivos temporales al finalizar.

## Frontend

El build usa:

```text
Root directory: FRONTEND
Build command: npm run build
Output directory: dist
```

Variables de producción:

```env
VITE_API_URL=https://api-gateway.example.com
VITE_FIREBASE_APIKEY=...
VITE_FIREBASE_AUTHDOMAIN=...
VITE_FIREBASE_PROJECTID=...
VITE_FIREBASE_STORAGEBUCKET=...
VITE_FIREBASE_MESSAGINGSENDERID=...
VITE_FIREBASE_APPID=...
```

## Backend

El Gateway debe ser el único servicio público. Los servicios se despliegan con
variables de puerto y Firebase propias. Las URLs upstream del Gateway deben ser
configurables por entorno; no deben quedar hardcodeadas en una configuración de
producción compartida.

## Producción

- Usar Firebase separado de desarrollo.
- Configurar CORS con el dominio real del frontend.
- Configurar HTTPS.
- Usar secrets del proveedor, nunca archivos `.env` versionados.
- Activar healthchecks y logs.
- En Compose, los healthchecks locales consultan `/health` en el Gateway y
  `/ready` en microservicios y la raíz del frontend.
- Verificar permisos de Firestore antes de abrir el sistema.
- Probar rollback de frontend, Gateway y servicios.

## Limitaciones del despliegue actual

`docker-compose.deploy.yml` referencia imágenes Docker `v1` y el Gateway tiene
URLs Render escritas directamente en `nginx.conf`. Antes de reutilizarlo como
producción se debe reconstruir la configuración por entorno y publicar imágenes
con tags inmutables.

## Procedimiento de despliegue seguro

1. Ejecutar en CI lint, typecheck, pruebas y build de frontend y servicios.
2. Publicar cada imagen con un tag inmutable basado en el commit, por ejemplo
   `sha-<commit>`; no reutilizar `latest` ni `v1`.
3. Configurar las variables y secretos en el proveedor, sin copiar archivos
   `.env` al servidor.
4. Desplegar primero el Gateway y los servicios en staging, comprobar `/health`
   y `/ready`, y ejecutar una prueba de lectura y escritura con datos de prueba.
5. Publicar el frontend apuntando al Gateway de staging y comprobar login,
   evaluación, reporte y auditoría.
6. Promover exactamente los mismos tags a producción y comprobar healthchecks,
   CORS y HTTPS.

## Rollback

- Conservar el tag de la versión anterior y el manifiesto de variables asociado.
- Si falla el healthcheck o una prueba de humo, detener la promoción y volver a
  desplegar los tags anteriores del frontend, Gateway y servicios.
- No revertir reglas de Firestore automáticamente: revisar primero si el cambio
  es compatible hacia atrás y aplicar una migración explícita si corresponde.
- Registrar commit, hora, causa, servicios afectados y resultado del rollback.
- Después del rollback, comprobar `/health`, `/ready`, login, lectura de
  normativas y acceso a reportes.

## Restauración de datos

Las copias de Firestore deben configurarse en el proyecto de producción y
probarse periódicamente en un proyecto separado. Una restauración requiere
aprobación, ventana de mantenimiento, respaldo del estado actual y verificación
de reglas antes de volver a abrir el tráfico.
