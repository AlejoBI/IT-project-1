# README - Proyecto de Medición de Cumplimiento Normativo

## Descripción del Proyecto

Este proyecto tiene como objetivo el desarrollo de una **herramienta de medición de cumplimiento normativo**. La herramienta está diseñada para ayudar a las organizaciones a evaluar y asegurar que sus procesos, políticas y actividades estén alineados con los marcos regulatorios, leyes y estándares aplicables. 

El cumplimiento normativo es un aspecto crítico para cualquier organización, ya que garantiza la conformidad legal, minimiza riesgos operativos y reputacionales, y fomenta una cultura de transparencia y responsabilidad. Esta herramienta busca simplificar y automatizar el proceso de evaluación, proporcionando análisis claros y accionables.

---

## Características Principales

1. **Evaluación Automatizada**:  
   La herramienta permite realizar evaluaciones automatizadas del cumplimiento normativo en función de los marcos regulatorios seleccionados. Esto incluye la comparación de políticas internas con requisitos legales externos.

2. **Generación de Informes**:  
   Se generan informes detallados que destacan áreas de cumplimiento y no cumplimiento, junto con recomendaciones para abordar las brechas identificadas.

3. **Interfaz Amigable**:  
   La interfaz de usuario está diseñada para ser intuitiva y fácil de usar, permitiendo que tanto equipos técnicos como no técnicos puedan interactuar con la herramienta sin dificultad.

4. **Base de Datos de Regulaciones**:  
   Incluye una base de datos actualizable con información sobre regulaciones clave, lo que facilita el acceso a los requisitos normativos más recientes.

---

## Tecnologías Utilizadas

- **Frontend**: React + TypeScript.
- **Backend**: Node.js + Express.
- **Base de Datos y Autenticación**: Firebase (Firestore para almacenamiento de datos, Firebase Authentication para autenticación de usuarios).
- **Herramientas de CI/CD**: GitHub Actions o Jenkins para implementaciones continuas.
- **Seguridad**: Implementación de cifrado de datos y autenticación robusta a través de Firebase.

---

## Instalación y Configuración

### Requisitos Previos
- Node.js instalado (versión 16.x o superior).
- npm o yarn instalado.
- Cuenta de Firebase configurada con Firestore y Authentication habilitados.
- Git para clonar el repositorio.

### Pasos para Ejecutar el Proyecto

1. **Clonar el Repositorio**:
   ```bash
   git clone https://github.com/tu-repositorio/cumplimiento-normativo.git
   cd cumplimiento-normativo
   ```

2. **Instalar Dependencias**:
   ```bash
   # Para el frontend (React + TypeScript)
   cd frontend
   npm install

   # Para el backend (Node.js + Express)
   cd ../backend
   npm install
   ```

3. **Configurar Firebase**:
   - Cree un proyecto en [Firebase Console](https://console.firebase.google.com/).
   - Configure Firestore y Authentication según sea necesario.
   - Descargue el archivo `firebase-config.json` desde la consola de Firebase y colóquelo en las siguientes ubicaciones:
     - `frontend/src/firebaseConfig.json`
     - `backend/firebaseConfig.json`

4. **Configurar Variables de Entorno**:
   Cree archivos `.env` en las carpetas `frontend` y `backend` con las siguientes variables:

   **Frontend** (`frontend/.env`):
   ```
   VITE_FIREBASE_APIKEY=clave_api_firebase
   VITE_FIREBASE_AUTHDOMAIN=dominio_autenticacion_firebase
   VITE_FIREBASE_PROJECTID=id_proyecto_firebase
   VITE_FIREBASE_STORAGEBUCKET=bucket_almacenamiento_firebase
   VITE_FIREBASE_MESSAGING_SENDERID=id_mensajeria_firebase
   VITE_FIREBASE_APPID=id_aplicacion_firebase
   ```

   **Backend** (`backend/.env`):
   ```
   FIREBASE_API_KEY=clave_api_firebase
   FIREBASE_AUTH_DOMAIN=dominio_autenticacion_firebase
   FIREBASE_PROJECT_ID=id_proyecto_firebase
   FIREBASE_STORAGE_BUCKET=bucket_almacenamiento_firebase
   FIREBASE_MESSAGING_SENDER_ID=id_mensajeria_firebase
   FIREBASE_APP_ID=id_aplicacion_firebase
   PORT=5000
   ```

5. **Ejecutar la Aplicación**:
   - Backend:
     ```bash
     cd backend
     npm start
     ```
   - Frontend:
     ```bash
     cd frontend
     npm start
     ```

---

## Contribuciones

¡Las contribuciones son bienvenidas! Si desea contribuir al proyecto, siga estos pasos:

1. Fork el repositorio.
2. Cree una rama para su nueva funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realice sus cambios y asegúrese de que todas las pruebas pasen.
4. Envíe un Pull Request describiendo sus cambios.

---

Gracias por utilizar nuestra herramienta de medición de cumplimiento normativo. ¡Esperamos que sea útil para su organización! 🚀

---

### **1. Estructura General del Proyecto**

El proyecto estará organizado con los siguientes servicios:

```
/services
├── auth-service
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   └── services
│   └── Dockerfile
├── compliance-serv
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   └── services
│   └── Dockerfile
├── notification-serv
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   └── services
│   └── Dockerfile
├── regulation-service
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   └── services
│   └── Dockerfile
└── evaluation-form-service
    ├── src
    │   ├── controllers
    │   ├── models
    │   └── services
    └── Dockerfile
```

---

### **2. Descripción Detallada de Cada Servicio**

#### **1. `auth-service`**
- **Responsabilidad**: Manejo de autenticación, autorización y gestión de usuarios.
- **Entidades Principales**:
  - `User`: Información básica del usuario (correo electrónico, rol, estado activo/inactivo).
  - `UserProfile`: Datos adicionales del usuario (nombre completo, información personal).
- **Funcionalidades**:
  - Registro y autenticación de usuarios.
  - Validación de roles y permisos.
  - Actualización de perfiles de usuario.
- **Estructura Interna**:
  ```
  /auth-service
  ├── src
  │   ├── controllers
  │   │   ├── authController.ts       // Maneja login, registro, etc.
  │   │   └── profileController.ts    // Maneja actualización de perfiles
  │   ├── models
  │   │   ├── User.ts                 // Modelo de Usuario
  │   │   └── UserProfile.ts          // Modelo de Perfil de Usuario
  │   ├── services
  │   │   ├── authService.ts          // Lógica de negocio (autenticación)
  │   │   └── profileService.ts       // Lógica de negocio (perfiles)
  │   └── routes
  │       ├── authRoutes.ts           // Rutas para autenticación
  │       └── profileRoutes.ts        // Rutas para perfiles
  └── Dockerfile                      // Configuración para contenerización
  ```

---

#### **2. `compliance-serv`**
- **Responsabilidad**: Gestión de cumplimiento normativo, autoevaluaciones, auditorías e informes.
- **Entidades Principales**:
  - `ComplianceReport`: Informes de cumplimiento generados por el sistema.
  - `SelfAssessment`: Evaluaciones realizadas por los usuarios sobre sí mismos.
  - `Audit`: Auditorías realizadas por evaluadores externos.
- **Funcionalidades**:
  - Generación de informes de cumplimiento.
  - Creación y gestión de autoevaluaciones.
  - Creación y gestión de auditorías.
  - Asociación de informes con evaluaciones y auditorías.
- **Estructura Interna**:
  ```
  /compliance-serv
  ├── src
  │   ├── controllers
  │   │   ├── complianceController.ts  // Maneja informes de cumplimiento
  │   │   ├── selfAssessmentController.ts // Maneja autoevaluaciones
  │   │   └── auditController.ts       // Maneja auditorías
  │   ├── models
  │   │   ├── ComplianceReport.ts      // Modelo de Informe de Cumplimiento
  │   │   ├── SelfAssessment.ts        // Modelo de Autoevaluación
  │   │   └── Audit.ts                 // Modelo de Auditoría
  │   ├── services
  │   │   ├── complianceService.ts     // Lógica de negocio (informes)
  │   │   ├── selfAssessmentService.ts // Lógica de negocio (autoevaluaciones)
  │   │   └── auditService.ts          // Lógica de negocio (auditorías)
  │   └── routes
  │       ├── complianceRoutes.ts      // Rutas para informes
  │       ├── selfAssessmentRoutes.ts  // Rutas para autoevaluaciones
  │       └── auditRoutes.ts           // Rutas para auditorías
  └── Dockerfile                      // Configuración para contenerización
  ```

---

#### **3. `notification-serv`**
- **Responsabilidad**: Envío de notificaciones a los usuarios.
- **Entidades Principales**:
  - `Notification`: Mensajes enviados a los usuarios (correos electrónicos, mensajes push, etc.).
- **Funcionalidades**:
  - Envío de correos electrónicos o mensajes push.
  - Registro de notificaciones enviadas.
  - Personalización de mensajes según el destinatario.
- **Estructura Interna**:
  ```
  /notification-serv
  ├── src
  │   ├── controllers
  │   │   └── notificationController.ts // Maneja envío de notificaciones
  │   ├── models
  │   │   └── Notification.ts          // Modelo de Notificación
  │   ├── services
  │   │   └── notificationService.ts   // Lógica de negocio (envío de notificaciones)
  │   └── routes
  │       └── notificationRoutes.ts    // Rutas para notificaciones
  └── Dockerfile                      // Configuración para contenerización
  ```

---

#### **4. `regulation-service`**
- **Responsabilidad**: Gestión de normativas.
- **Entidades Principales**:
  - `Regulation`: Normativas aplicables (ISO 9001, ISO 27001, etc.).
- **Funcionalidades**:
  - CRUD para normativas.
  - Consulta de normativas por código ISO, nombre o versión.
  - Búsqueda de normativas relacionadas con cumplimientos o auditorías.
- **Estructura Interna**:
  ```
  /regulation-service
  ├── src
  │   ├── controllers
  │   │   └── regulationController.ts // Maneja operaciones de normativas
  │   ├── models
  │   │   └── Regulation.ts          // Modelo de Normativa
  │   ├── services
  │   │   └── regulationService.ts   // Lógica de negocio (gestión de normativas)
  │   └── routes
  │       └── regulationRoutes.ts    // Rutas para normativas
  └── Dockerfile                      // Configuración para contenerización
  ```

---

#### **5. `evaluation-form-service`**
- **Responsabilidad**: Gestión de formularios de evaluación, secciones y preguntas.
- **Entidades Principales**:
  - `EvaluationForm`: Formularios de evaluación asociados a normativas.
  - `FormSection`: Secciones dentro de un formulario.
  - `Question`: Preguntas dentro de una sección.
- **Funcionalidades**:
  - CRUD para formularios de evaluación.
  - Gestión de secciones y preguntas.
  - Asociación de formularios con normativas (mediante `regulationId`).
- **Estructura Interna**:
  ```
  /evaluation-form-service
  ├── src
  │   ├── controllers
  │   │   ├── evaluationFormController.ts // Maneja formularios de evaluación
  │   │   ├── sectionController.ts        // Maneja secciones
  │   │   └── questionController.ts       // Maneja preguntas
  │   ├── models
  │   │   ├── EvaluationForm.ts          // Modelo de Formulario de Evaluación
  │   │   ├── FormSection.ts             // Modelo de Sección
  │   │   └── Question.ts                // Modelo de Pregunta
  │   ├── services
  │   │   ├── evaluationFormService.ts   // Lógica de negocio (formularios)
  │   │   ├── sectionService.ts          // Lógica de negocio (secciones)
  │   │   └── questionService.ts         // Lógica de negocio (preguntas)
  │   └── routes
  │       ├── evaluationFormRoutes.ts    // Rutas para formularios
  │       ├── sectionRoutes.ts           // Rutas para secciones
  │       └── questionRoutes.ts          // Rutas para preguntas
  └── Dockerfile                         // Configuración para contenerización
  ```

---

### **3. Diagrama de Interacción entre Servicios**

Aquí tienes un resumen de cómo interactúan los servicios:

1. **`auth-service`**:
   - Proporciona autenticación y autorización para todos los servicios.
   - Es consultado por otros servicios para validar usuarios y roles.

2. **`regulation-service`**:
   - Provee datos de normativas a `evaluation-form-service` y `compliance-serv`.

3. **`evaluation-form-service`**:
   - Provee formularios de evaluación a `compliance-serv` para generar autoevaluaciones y auditorías.

4. **`compliance-serv`**:
   - Usa datos de `regulation-service` y `evaluation-form-service` para generar informes de cumplimiento.
   - Notifica eventos importantes a `notification-serv`.

5. **`notification-serv`**:
   - Recibe solicitudes de otros servicios para enviar notificaciones a los usuarios.

---

### **4. Beneficios de Esta Arquitectura**

1. **Modularidad**:
   - Cada servicio tiene una responsabilidad clara y bien definida.
   - Facilita el desarrollo, pruebas y mantenimiento.

2. **Escalabilidad**:
   - Puedes escalar servicios individuales según la carga de trabajo.

3. **Reutilización**:
   - Los servicios pueden ser reutilizados por otros proyectos o sistemas.

4. **Resiliencia**:
   - Si un servicio falla, los demás pueden seguir funcionando (dependiendo de las interdependencias).

---

### **Conclusión**

Esta estructura modular y bien organizada permite gestionar eficientemente todas las funcionalidades del sistema. Cada servicio tiene una responsabilidad específica, lo que facilita el desarrollo y mantenimiento. Además, esta arquitectura es escalable y flexible para futuras mejoras.
