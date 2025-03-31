FROM node:22-alpine AS builder
WORKDIR /
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
COPY . .
EXPOSE 5000
CMD ["npm", "start"]