# Variables de entorno

## Regla general

Los archivos `.env` reales no se versionan. Cada servicio tiene un `.env.example`
con los nombres exactos que consume su código. En producción, las variables se
configuran en el proveedor de despliegue.

La versión recomendada de Node.js es la 22, alineada con las imágenes Docker y
la CI (`.nvmrc`). npm 11 y Node 24 también compilan la línea base local, pero no
son la referencia reproducible del proyecto.

## Frontend

El frontend usa variables `VITE_*` durante el build:

```env
VITE_API_URL=https://api-gateway.example.com
VITE_FIREBASE_APIKEY=...
VITE_FIREBASE_AUTHDOMAIN=...
VITE_FIREBASE_PROJECTID=...
VITE_FIREBASE_STORAGEBUCKET=...
VITE_FIREBASE_MESSAGINGSENDERID=...
VITE_FIREBASE_APPID=...
```

`VITE_FIREBASE_MEASUREMENTID` está documentada por compatibilidad, pero el
código actual no la consume. La configuración web de Firebase no es un secreto
por sí misma; la protección real está en Authentication y las reglas de
Firestore.

## Servicios backend

Todos los servicios que usan Firebase necesitan:

```env
FIREBASE_APIKEY=...
FIREBASE_AUTHDOMAIN=...
FIREBASE_PROJECTID=...
FIREBASE_STORAGEBUCKET=...
FIREBASE_MESSAGINGSENDERID=...
FIREBASE_APPID=...
```

Cada servicio agrega su puerto:

| Servicio | Variable | Local |
|---|---|---:|
| Auth | `AUTH_PORT` | 5000 |
| Users | `USERS_PORT` | 5001 |
| Compliance | `COMPLIANCE_PORT` | 5002 |
| Notifications | `NOTIFICATION_PORT` | 5003 |
| Regulations | `REGULATION_PORT` | 5004 |
| Evaluation forms | `EVALUATION_FORM_PORT` | 5005 |
| Audits | `AUDIT_PORT` | 5006 |

Los servicios protegidos que validan tokens con Firebase Admin requieren además
`FIREBASE_ADMIN_PROJECT_ID`, `FIREBASE_ADMIN_CLIENT_EMAIL` y
`FIREBASE_ADMIN_PRIVATE_KEY`. La clave privada debe venir del gestor de secretos
del proveedor; nunca se guarda en `.env.example`, Git o logs.

Notifications admite además:

```env
MAILERSEND_API_KEY=...
EMAIL_FROM=correo@dominio.com
```

Son opcionales para levantar el sistema, pero necesarias para enviar correos
reales.

## Develop y production

- **Develop:** Firebase de desarrollo, API Gateway de staging, orígenes de
  preview y datos de prueba.
- **Production:** Firebase de producción, dominios reales, CORS restringido,
  secretos administrados por el proveedor y backups.

Nunca se debe reutilizar el proyecto Firebase de producción para pruebas que
puedan alterar regulaciones, usuarios o evaluaciones reales.
