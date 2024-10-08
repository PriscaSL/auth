# Étape 1 : Build du frontend
FROM node:18 AS build-frontend
WORKDIR /app/client
COPY client/package.json .
RUN npm install
COPY client/ .
RUN npm run build

# Étape 2 : Build du backend
FROM node:18 AS build-backend
WORKDIR /app/server
COPY server/package.json .
RUN npm install
COPY server/ .

# Copier le build du frontend dans le backend pour qu'il serve les fichiers statiques
COPY --from=build-frontend /app/client/build ./public

# Exposer le port pour le backend (8080)
EXPOSE 8080

# Lancer l'application backend (qui sert aussi le frontend en production)
CMD ["npm", "start"]
