FROM node:22-alpine

# Aumenta el límite de memoria disponible para node
ENV NODE_OPTIONS="--max-old-space-size=2048"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Compila antes del CMD para evitar hacerlo en producción
RUN npm run build

EXPOSE 5006

CMD ["node", "dist/app.js"]
