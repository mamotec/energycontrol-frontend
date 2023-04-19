# Basisimage
FROM node:latest AS build

# Arbeitsverzeichnis
WORKDIR /app

# Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Quellcode kopieren und bauen
COPY . .
RUN npm run build --prod

# Basisimage für die Anwendung
FROM nginx:1.21-alpine

# HTML-, CSS- und JavaScript-Dateien in NGINX-Standardverzeichnis kopieren
COPY --from=build /app/dist/energycontrol-frontend /usr/share/nginx/html

# Port für die Anwendung freigeben
EXPOSE 80

# Startbefehl für NGINX
CMD ["nginx", "-g", "daemon off;"]
