# Etapa de desarrollo
FROM node:19-alpine3.15 as dev
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
CMD [ "npm", "run", "start:dev" ]

# Etapa de instalación de dependencias de desarrollo
FROM node:19-alpine3.15 as dev-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Etapa de construcción
FROM node:19-alpine3.15 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
# RUN npm test # Descomenta esta línea si deseas ejecutar pruebas durante la construcción
RUN npm run build

# Etapa de instalación de dependencias de producción
FROM node:19-alpine3.15 as prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --only=production

# Etapa de producción
FROM node:19-alpine3.15 as prod
EXPOSE 3000
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD [ "node", "dist/main.js" ]
