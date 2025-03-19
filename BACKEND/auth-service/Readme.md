# **Auth Service**

El **Auth Service** es un microservicio diseñado para manejar la autenticación de usuarios en una aplicación basada en Firebase. Proporciona endpoints RESTful para registrar usuarios, iniciar sesión, cerrar sesión y validar tokens JWT.

---

## **Tabla de Contenidos**

1. [Descripción del Servicio](#descripción-del-servicio)
2. [Características Principales](#características-principales)
3. [Instalación](#instalación)
4. [Configuración](#configuración)
5. [Endpoints](#endpoints)
6. [Dependencias](#dependencias)
7. [Ejemplos de Uso](#ejemplos-de-uso)
8. [Contribución](#contribución)

---

## **Descripción del Servicio**

El **Auth Service** utiliza **Firebase Admin SDK** para interactuar con Firebase Authentication. Este microservicio gestiona:

- Registro de nuevos usuarios.
- Inicio de sesión con validación de credenciales.
- Generación y validación de tokens JWT.
- Cierre de sesión (opcionalmente invalidando tokens).

El servicio está diseñado para ser desplegado de manera independiente y puede integrarse fácilmente con otros microservicios o aplicaciones frontend.

---

## **Características Principales**

- **Registro de Usuarios**: Crea nuevos usuarios en Firebase Authentication.
- **Inicio de Sesión**: Valida credenciales y genera tokens JWT.
- **Cierre de Sesión**: Invalida tokens JWT (opcionalmente).
- **Seguridad**: Protege las rutas sensibles mediante middleware de autenticación basado en tokens JWT.
- **Escalabilidad**: Diseñado para funcionar como un microservicio independiente.

---

## **Instalación**

### **1. Clonar el Repositorio**

```bash
git clone https://github.com/tu-repositorio/auth-service.git
cd auth-service
```

### **2. Instalar Dependencias**

Asegúrate de tener Node.js y npm instalados. Luego, ejecuta:

```bash
npm install
```

### **3. Compilar TypeScript**

Este proyecto está escrito en TypeScript. Para compilarlo a JavaScript:

```bash
npm run build
```

---

## **Configuración**

### **1. Variables de Entorno**

Crea un archivo `.env` en la raíz del proyecto y configura las siguientes variables:

```env
PORT=5000
JWT_SECRET=tu_clave_secreta_para_jwt
FIREBASE_SERVICE_ACCOUNT_KEY_PATH=./serviceAccountKey.json
```

- **PORT**: Puerto en el que se ejecutará el servicio.
- **JWT_SECRET**: Clave secreta para firmar y verificar tokens JWT.
- **FIREBASE_SERVICE_ACCOUNT_KEY_PATH**: Ruta al archivo JSON de credenciales de Firebase Admin SDK.

### **2. Descargar el Archivo de Credenciales de Firebase**

Descarga el archivo `serviceAccountKey.json` desde la consola de Firebase y colócalo en la ruta especificada en la variable de entorno.

---

## **Endpoints**

### **1. Registro de Usuario**

- **URL**: `/api/auth/register`
- **Método**: `POST`
- **Descripción**: Registra un nuevo usuario en Firebase Authentication.
- **Cuerpo de la solicitud**:
  ```json
  {
    "email": "usuario@example.com",
    "password": "contraseña_segura"
  }
  ```
- **Respuesta exitosa**:
  ```json
  {
    "uid": "ID_ÚNICO_DEL_USUARIO",
    "email": "usuario@example.com",
    "token": "TOKEN_JWT_GENERADO"
  }
  ```

### **2. Inicio de Sesión**

- **URL**: `/api/auth/login`
- **Método**: `POST`
- **Descripción**: Inicia sesión con credenciales válidas y devuelve un token JWT.
- **Cuerpo de la solicitud**:
  ```json
  {
    "email": "usuario@example.com",
    "password": "contraseña_segura"
  }
  ```
- **Respuesta exitosa**:
  ```json
  {
    "uid": "ID_ÚNICO_DEL_USUARIO",
    "email": "usuario@example.com",
    "token": "TOKEN_JWT_GENERADO"
  }
  ```

### **3. Cerrar Sesión**

- **URL**: `/api/auth/logout`
- **Método**: `POST`
- **Descripción**: Invalida el token JWT (opcionalmente).
- **Encabezados**:
  ```json
  {
    "Authorization": "Bearer TOKEN_JWT"
  }
  ```
- **Respuesta exitosa**:
  ```json
  {
    "message": "Sesión cerrada exitosamente"
  }
  ```

---

## **Dependencias**

### **1. Dependencias Principales**

- **express**: Framework web para manejar solicitudes HTTP.
- **firebase-admin**: SDK de Firebase para interactuar con Firebase Authentication y Firestore.
- **jsonwebtoken**: Biblioteca para generar y verificar tokens JWT.
- **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).

### **2. Instalación de Dependencias**

```bash
npm install express firebase-admin jsonwebtoken cors
```

### **3. Dependencias de Desarrollo**

- **typescript**: Compilador de TypeScript.
- **ts-node**: Ejecución directa de archivos TypeScript.
- **nodemon**: Reinicio automático del servidor durante el desarrollo.

```bash
npm install -D typescript ts-node nodemon @types/express @types/node
```

---

## **Ejemplos de Uso**

### **1. Registro de Usuario**

```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"email": "usuario@example.com", "password": "contraseña_segura"}'
```

### **2. Inicio de Sesión**

```bash
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "usuario@example.com", "password": "contraseña_segura"}'
```

### **3. Cerrar Sesión**

```bash
curl -X POST http://localhost:5000/api/auth/logout \
-H "Authorization: Bearer TOKEN_JWT"
```

---

## **Contribución**

Si deseas contribuir a este proyecto:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m "Añadir nueva funcionalidad"`).
4. Sube los cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un pull request.

---

## **Licencia**

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

**¡Gracias por usar Auth Service!** 🚀

---

### **Notas Adicionales**

- Asegúrate de proteger adecuadamente el archivo `serviceAccountKey.json` y no subirlo a repositorios públicos.
- Si necesitas agregar más funcionalidades (como asignación de roles personalizados), puedes extender este servicio utilizando **Custom Claims** de Firebase.
