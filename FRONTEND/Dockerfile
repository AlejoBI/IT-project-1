# Etapa 1: Build
FROM node:22-alpine AS builder

# Crear directorio de trabajo   
WORKDIR /app

# Copiar dependencias y archivos necesarios
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY postcss.config.js ./
COPY tailwind.config.js ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa 2: Producción (servidor con Vite Preview)
FROM node:22-alpine AS production

WORKDIR /app

# Instalar Vite globalmente (solo para preview)
RUN npm install -g vite

# Copiar archivos construidos desde la etapa anterior
COPY --from=builder /app/dist ./dist

# Servir la app con vite preview
EXPOSE 5173
CMD ["vite", "preview", "--port", "5173", "--host"]
