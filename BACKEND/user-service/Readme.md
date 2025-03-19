# User Service

El microservicio **`user-service`** es responsable de gestionar los perfiles de usuario en Firestore. Permite crear, obtener y actualizar información de usuario, como nombre, correo electrónico, rol y fechas de creación/actualización. Este servicio está diseñado para trabajar en conjunto con otros microservicios (como `auth-service`) en una arquitectura basada en microservicios.

---

## **Tabla de Contenidos**

1. [Descripción del Servicio](#descripción-del-servicio)
2. [Endpoints](#endpoints)
3. [Configuración](#configuración)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Instalación y Ejecución](#instalación-y-ejecución)
6. [Pruebas Locales](#pruebas-locales)
7. [Variables de Entorno](#variables-de-entorno)
8. [Contribuciones](#contribuciones)

---

## **Descripción del Servicio**

Este microservicio gestiona los perfiles de usuario en Firestore. Proporciona las siguientes funcionalidades:

- **Crear perfil de usuario**: Almacena información básica del usuario (nombre, correo electrónico, rol, etc.) en Firestore.
- **Obtener perfil de usuario**: Recupera los datos de un usuario específico mediante su `uid`.
- **Actualizar perfil de usuario**: Permite modificar los datos de un usuario existente.

Este servicio se integra con Firebase Authentication a través del microservicio `auth-service`, que maneja la autenticación y generación de tokens JWT.

---

## **Endpoints**

### **1. Crear Perfil de Usuario**

Crea un nuevo perfil de usuario en Firestore.

- **URL**: `/api/v1/users`
- **Método**: `POST`
- **Body**:
  ```json
  {
    "uid": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  }
  ```
- **Respuesta Exitosa**:
  ```json
  {
    "message": "Perfil de usuario creado exitosamente"
  }
  ```

---

### **2. Obtener Perfil de Usuario**

Recupera los datos de un usuario específico.

- **URL**: `/api/v1/users/:uid`
- **Método**: `GET`
- **Respuesta Exitosa**:
  ```json
  {
    "uid": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
  ```

---

### **3. Actualizar Perfil de Usuario**

Actualiza los datos de un usuario existente.

- **URL**: `/api/v1/users/:uid`
- **Método**: `PUT`
- **Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "role": "string"
  }
  ```
- **Respuesta Exitosa**:
  ```json
  {
    "message": "Perfil de usuario actualizado exitosamente"
  }
  ```

---

## **Configuración**

### **1. Dependencias**

Este microservicio utiliza las siguientes dependencias principales:

- **Express**: Framework para manejar las solicitudes HTTP.
- **Firebase Admin SDK**: Para interactuar con Firestore.
- **Axios**: Para realizar solicitudes HTTP entre microservicios.
- **dotenv**: Para cargar variables de entorno desde un archivo `.env`.

Instala las dependencias con:

```bash
npm install
```

---

### **2. Variables de Entorno**

El servicio requiere las siguientes variables de entorno. Asegúrate de configurarlas en un archivo `.env` en la raíz del proyecto:

```env
PORT=5001
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=tu-proyecto-id
FIREBASE_PRIVATE_KEY_ID=tu-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_CLAVE_PRIVADA\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=tu-cliente-email@proyecto.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=tu-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/tu-cliente-email%40proyecto.iam.gserviceaccount.com
FIREBASE_UNIVERSE_DOMAIN=googleapis.com
```

---

## **Estructura del Proyecto**

La estructura del proyecto es la siguiente:

```
/user-service/
│
├── src/
│   ├── controllers/
│   │   └── userController.ts
│   ├── services/
│   │   └── userService.ts
│   ├── utils/
│   │   └── firebaseAdmin.ts
│   ├── app.ts
│   └── server.ts
│
├── .env
├── Dockerfile
├── package.json
└── tsconfig.json
```

---

## **Instalación y Ejecución**

### **1. Instalación**

Clona el repositorio y navega al directorio del servicio:

```bash
git clone https://github.com/tu-repositorio/backend.git
cd backend/user-service
```

Instala las dependencias:

```bash
npm install
```

Compila el código TypeScript:

```bash
npm run build
```

### **2. Ejecución Local**

Para ejecutar el servicio localmente:

```bash
npm start
```

El servicio estará disponible en `http://localhost:5001`.

### **3. Ejecución con Docker**

Construye y levanta el contenedor con Docker Compose:

```bash
docker-compose up --build
```

---

## **Pruebas Locales**

Para probar los endpoints, puedes usar herramientas como **Postman** o **Thunder Client**. Aquí tienes ejemplos de solicitudes:

### **1. Crear Perfil de Usuario**

```bash
curl -X POST http://localhost:5001/api/v1/users \
-H "Content-Type: application/json" \
-d '{
  "uid": "12345",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "standard_user"
}'
```

### **2. Obtener Perfil de Usuario**

```bash
curl -X GET http://localhost:5001/api/v1/users/12345
```

### **3. Actualizar Perfil de Usuario**

```bash
curl -X PUT http://localhost:5001/api/v1/users/12345 \
-H "Content-Type: application/json" \
-d '{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "role": "admin"
}'
```

---

## **Variables de Entorno**

Asegúrate de configurar las siguientes variables de entorno en un archivo `.env`:

```env
PORT=5001
FIREBASE_SERVICE_ACCOUNT_KEY_PATH=./serviceAccountKey.json
```

---

## **Contribuciones**

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m "Añade nueva funcionalidad"`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.
