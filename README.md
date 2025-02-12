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
|   |-- assets/          # Recursos varios y estilos
│   ├── components/      # Componentes reutilizables
|   |-- config/          # Configuracion firebase
│   ├── hooks/           # Custom Hooks
│   ├── pages/           # Páginas principales
|   |-- routes/          # Router del sistema
│   ├── store/           # Configuración de Redux
│   ├── main.tsx         # Punto de entrada de la aplicación
├── .env                 # Variables de entorno
├── package.json         # Configuración de dependencias
├── README.md            # Documentación del proyecto
|-- tailwind.config.js   # Configuracion de tailwind
|-- vercel.json          # Configuraicon de vercel para desplegue
```

## Uso de Redux

La gestión del estado global se realiza con Redux Toolkit. Cada funcionalidad está separada en la carpeta `features/`, con su respectivo **slice** para manejar acciones y reducers.

Ejemplo de un slice de Redux:

```ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
```

## Autenticación con Firebase

Para manejar la autenticación con Firebase, se usa el servicio de autenticación con correo y Google.

Ejemplo de autenticación con Google:

```ts
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
```

## Estilos con Tailwind CSS

Los estilos se gestionan con Tailwind, permitiendo clases utilitarias para una maquetación rápida.
Ejemplo de un componente estilizado:

```tsx
const Button = () => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Click me
    </button>
  );
};
```

## Contribución

Si deseas contribuir, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature-nueva`).
3. Realiza los cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Sube los cambios (`git push origin feature-nueva`).
5. Abre un Pull Request.
