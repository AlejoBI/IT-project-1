# Proyecto

## Descripción

Este proyecto es una aplicación desarrollada con **React**, utilizando **TypeScript** para un desarrollo más seguro y estructurado. La gestión del estado se maneja con **Redux**, lo que permite un flujo de datos centralizado y predecible. Para la autenticación y almacenamiento de datos, se utiliza **Firebase**. El diseño está construido con **Tailwind CSS**, lo que facilita un desarrollo rápido y moderno.

## Tecnologías Utilizadas

- **React**: Librería de JavaScript para construir interfaces de usuario.
- **TypeScript**: Superset de JavaScript que aporta tipado estático y mejoras en el desarrollo.
- **Redux**: Biblioteca para manejar el estado global de la aplicación.
- **Firebase**: Plataforma para autenticación y base de datos en tiempo real.
- **Tailwind CSS**: Framework de estilos para una maquetación rápida y eficiente.

## Instalación y Configuración

### Prerrequisitos

Asegúrate de tener instalado **Node.js** y **npm** o **yarn** en tu sistema.

### Pasos para instalar

1. Clonar el repositorio:
   ```sh
   git clone https://github.com/usuario/repositorio.git
   ```
2. Acceder al directorio del proyecto:
   ```sh
   cd nombre-del-proyecto
   ```
3. Instalar las dependencias:
   ```sh
   npm install
   # o si usas yarn
   yarn install
   ```
4. Configurar las variables de entorno:

   - Crea un archivo `.env` en la raíz del proyecto.
   - Agrega las credenciales necesarias de Firebase y otras configuraciones.

5. Iniciar el servidor de desarrollo:
   ```sh
   npm run dev
   # o si usas yarn
   yarn dev
   ```

## Estructura del Proyecto

```
/
├── src/
│   ├── application/
│   │   └── store/
│   │       ├── audits/
│   │       ├── auth/
│   │       ├── compliance/
│   │       ├── evaluationForm/
│   │       ├── notification/
│   │       ├── regulations/
│   │       ├── users/
│   │       └── store.ts
│   ├── assets/
│   ├── domain/
│   │   └── models/
│   │       ├── schemas/
│   │       └── types/
│   ├── infrastructure/
│   │   ├── api/
│   │   └── middlewares/
│   ├── presentation/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── routes/
│   ├── shared/
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env
├── README.md

```

---

## Explicación de la Arquitectura

### 1. `application/`
Contiene la lógica de negocio de la aplicación y la configuración del store de Redux. Aquí se gestionan los diferentes slices y acciones relacionadas con el estado global.

- **store/**: Slices y lógica de Redux para cada dominio (auth, users, audits, etc).

### 2. `domain/`
Define los modelos, tipos y esquemas que representan la lógica de negocio y las entidades principales de la aplicación.

- **models/**: Modelos y tipos TypeScript, organizados en `schemas/` y `types/`.

### 3. `infrastructure/`
Incluye la integración con servicios externos, APIs y middlewares.

- **api/**: Llamadas a servicios externos o APIs.
- **middlewares/**: Middlewares personalizados para Redux u otras integraciones.

### 4. `presentation/`
Contiene todo lo relacionado con la interfaz de usuario.

- **components/**: Componentes reutilizables.
- **hooks/**: Custom hooks para lógica de UI.
- **pages/**: Vistas principales de la aplicación.
- **routes/**: Definición de rutas y navegación.

### 5. `shared/`
Recursos compartidos como constantes, utilidades, helpers y estilos globales.

---

## Uso de Redux

La gestión del estado global se realiza con Redux Toolkit. Cada funcionalidad está separada en la carpeta correspondiente dentro de `application/store/`, con su respectivo **slice** para manejar acciones y reducers.

Ejemplo de un slice de Redux:

```ts
import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  logoutUser,
  recoverPasswordUser,
} from "./authActions";
import { AuthUser } from "../../../domain/models/types/authTypes";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  message?: string;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  message: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearNotification: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = undefined;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = undefined;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.message = undefined;
      state.isAuthenticated = false;
      state.user = null;
    });

    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = undefined;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload as string;
      state.message = undefined;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.message = undefined;
    });

    // Logout
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = undefined;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.message = undefined;
    });

    // Recover Password
    builder.addCase(recoverPasswordUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = undefined;
    });
    builder.addCase(recoverPasswordUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload as string;
    });
    builder.addCase(recoverPasswordUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.message = undefined;
    });
  },
});

export const { setUser, clearNotification } = authSlice.actions;
export default authSlice.reducer;
```

---

## Estilos con Tailwind CSS

Los estilos se gestionan con Tailwind, permitiendo clases utilitarias para una maquetación rápida.
Ejemplo de un componente estilizado:

```tsx
import React from "react";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`font-semibold px-6 py-3 mx-2 rounded-xl transition-all
                        ${LIGHT_MODE_COLORS.BUTTON_BG} 
                        ${LIGHT_MODE_COLORS.BUTTON_HOVER_BG} 
                        ${DARK_MODE_COLORS.BUTTON_BG} 
                        ${DARK_MODE_COLORS.BUTTON_HOVER_BG} 
                        ${ANIMATION_TIMINGS.TRANSITION_DURATION}
                        ${LIGHT_MODE_COLORS.TEXT_PRIMARY}
                        ${DARK_MODE_COLORS.TEXT_PRIMARY}
                        shadow-md`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
```

---

## Contribución

Si deseas contribuir, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature-nueva`).
3. Realiza los cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Sube los cambios (`git push origin feature-nueva`).
5. Abre un Pull Request.

# Redux Authentication con Firebase

Este proyecto implementa autenticación con **Redux Toolkit** y **Firebase**, siguiendo una estructura escalable. Aquí se explica cada parte del sistema.

---

## 🔥 1. Configuración del **Store** (`store.ts`)

El **store** es el estado global de Redux donde se combinan los diferentes slices.

```ts
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { authMiddleware } from "../../infrastructure/middlewares/authMiddleware";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/authSlice";
import usersReducer from "./users/usersSlice";
import complianceReducer from "./compliance/complianceSlice";
import regulationReducer from "./regulations/regulationsSlice";
import EvaluationFormReducer from "./evaluationForm/evaluationFormSlice";
import auditReducer from "./audits/auditSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  compliance: complianceReducer,
  regulation: regulationReducer,
  evaluationForm: EvaluationFormReducer,
  audit: auditReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authMiddleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

✅ **¿Qué hace esto?**

- `configureStore`: Crea el store global.
- `authReducer`: Se agrega al store para manejar el estado de autenticación.
- `combineReducers`: Une todos los reducers (auth, users, compliance, regulation, evaluationForm, audit) en un solo reducer raíz.
- `persistReducer` y `persistStore`: Permiten que el estado de ciertos slices (en este caso, solo `auth`) se guarde en el almacenamiento local del navegador y se recupere al recargar la página.
- `authMiddleware`: Middleware personalizado que se ejecuta en cada acción despachada, útil para lógica adicional como validación de tokens.
- `middleware: getDefaultMiddleware({ serializableCheck: false })`: Desactiva la verificación de serializabilidad para evitar advertencias con objetos no serializables (útil cuando se usa redux-persist).

---

✅ **Explicación**

- `reducers`: Define acciones síncronas como `logout`.
- `extraReducers`: Maneja acciones asincrónicas (`loginUser`, `registerUser`).
- `state.status`: Indica el estado de la autenticación.
- `state.error`: Almacena errores si algo falla.
- `persistConfig`: Configura qué parte del estado se persiste y en qué almacenamiento (localStorage por defecto).
- `RootState` y `AppDispatch`: Tipos TypeScript para el estado global y el dispatch, útiles para tipar correctamente los hooks de Redux en componentes.

---

## 🔹 2. Acciones Asíncronas (`authThunks`)

Maneja las peticiones a Firebase para login, registro y logout.

```ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const auth = getAuth();

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return {
        user: userCredential.user,
        token: await userCredential.user.getIdToken(),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return {
        user: userCredential.user,
        token: await userCredential.user.getIdToken(),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
```

✅ **Explicación**

- `createAsyncThunk`: Define una acción asíncrona que Redux manejará.
- `loginUser`: Hace login con Firebase y devuelve el usuario + token.
- `registerUser`: Registra un usuario en Firebase.
- `logoutUser`: Cierra sesión.

Este módulo define tres acciones asíncronas usando `createAsyncThunk` de Redux Toolkit para manejar la autenticación de usuarios con Firebase Authentication:

- `loginUser`: Recibe un objeto con `email` y `password`, intenta iniciar sesión usando `signInWithEmailAndPassword` de Firebase. Si tiene éxito, retorna el usuario autenticado y su token de sesión (`getIdToken`). Si ocurre un error, retorna el mensaje de error.
- `registerUser`: Recibe un objeto con `email` y `password`, intenta registrar un nuevo usuario usando `createUserWithEmailAndPassword` de Firebase. Si tiene éxito, retorna el usuario creado y su token de sesión. Si ocurre un error, retorna el mensaje de error.
- `logoutUser`: No recibe parámetros. Cierra la sesión del usuario autenticado usando `signOut` de Firebase. Si tiene éxito, retorna `null`. Si ocurre un error, retorna el mensaje de error.

Estas acciones permiten manejar el flujo de autenticación (login, registro y logout) de manera centralizada y controlada en una aplicación React/Redux, facilitando la gestión del estado global de autenticación y el manejo de errores.

---

## 🔹 3. Uso en Componentes React

### ✅ **LoginForm.tsx**

```tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { loginUser } from "../../../../application/store/auth/authActions";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../../shared/constants";
import Button from "../../UI/Button";
import Label from "../../UI/Label";

interface LoginFormProps {
  onSwitchToRegister: () => void; // Función para cambiar al formulario de registro
}

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onFormSubmit: SubmitHandler<LoginFormValues> = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl space-y-4 max-w-md mx-auto transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      {/* Campo de correo electrónico */}
      <div className="flex flex-col">
        <Label htmlFor="email" children="Correo Electrónico:" />
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "El correo electrónico es obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Dirección de correo electrónico no válida",
            },
          })}
          className={`p-3 border rounded-lg outline-none focus:ring-2 ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
        />
        {errors.email && (
          <p className={`text-red-500 dark:text-red-400 text-sm mt-1`}>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Campo de contraseña */}
      <div className="flex flex-col">
        <Label htmlFor="password" children="Contraseña:" />
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "La contraseña es obligatoria",
          })}
          className={`p-3 border rounded-lg outline-none focus:ring-2 ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
        />
        {errors.password && (
          <p className={`text-red-500 dark:text-red-400 text-sm mt-1`}>
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Botón de envío */}
      <div className="flex justify-center mt-4">
        <Button children="Iniciar Sesión" type="submit" />
      </div>

      {/* Enlace para cambiar al formulario de registro */}
      <p className="text-center text-sm">
        <span
          className={`${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${LIGHT_MODE_COLORS.TEXT_PRIMARY_HOVER} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY_HOVER}`}
        >
          ¿No tienes una cuenta?{" "}
        </span>
        <span
          className="text-indigo-500 dark:text-indigo-400 cursor-pointer hover:underline transition-colors"
          onClick={onSwitchToRegister}
        >
          Regístrate aquí
        </span>
        <br />
        <a
          href="/recover-password"
          className={`${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${LIGHT_MODE_COLORS.TEXT_PRIMARY_HOVER} ${DARK_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY_HOVER} hover:underline`}
        >
          Olvidaste tu contraseña?
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
```

✅ **Explicación**

- `useAppDispatch()`: Hook personalizado para obtener el `dispatch` tipado de Redux.
- `useForm()`: Hook de React Hook Form para gestionar el estado y validación del formulario.
- `register`: Registra los campos del formulario y aplica reglas de validación (por ejemplo, email requerido y formato válido, contraseña requerida).
- `handleSubmit`: Maneja el envío del formulario y ejecuta la función `onFormSubmit` solo si la validación es exitosa.
- `formState.errors`: Contiene los errores de validación para mostrar mensajes al usuario.
- `dispatch(loginUser(data))`: Envía la acción asíncrona de login a Redux, que a su vez interactúa con Firebase.
- El formulario incluye campos estilizados con Tailwind CSS y constantes de colores para soportar modo claro/oscuro.
- Se muestra retroalimentación inmediata de errores bajo cada campo.
- Incluye enlaces para cambiar al formulario de registro y para recuperar la contraseña, mejorando la experiencia de usuario.

Este componente encapsula la lógica de autenticación y validación de forma clara y reutilizable, integrando Redux y React Hook Form para un flujo robusto y escalable.

---

## 🚀 Conclusión

1. **Redux almacena el estado global de autenticación** y otros dominios clave de la aplicación, permitiendo un flujo de datos centralizado y predecible.
2. **`authSlice` gestiona los cambios de estado** (loading, success, error) y define las acciones y reducers necesarios para la autenticación.
3. **Las acciones asíncronas (`authThunks`) se encargan de la comunicación con Firebase**, facilitando el manejo de peticiones como login, registro y logout de manera desacoplada y reutilizable.
4. **Los componentes React interactúan con Redux usando `dispatch` y hooks personalizados**, lo que permite una integración sencilla y tipada entre la UI y la lógica de negocio.
5. **La estructura modular del proyecto** (application, domain, infrastructure, presentation, shared) favorece la escalabilidad, el mantenimiento y la colaboración en equipo.
6. **El uso de herramientas modernas como TypeScript, Redux Toolkit, Firebase y Tailwind CSS** garantiza un desarrollo robusto, seguro y con una experiencia de usuario moderna.

🔥 **Este patrón mantiene la app escalable, modular y fácil de mantener, permitiendo agregar nuevas funcionalidades y dominios sin afectar la estabilidad del sistema.**
