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
