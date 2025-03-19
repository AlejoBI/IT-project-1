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
