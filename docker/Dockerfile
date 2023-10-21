# Basisimage für den Build
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

# NGINX-Konfigurationsdatei kopieren
COPY docker/default.conf /etc/nginx/nginx.conf

# SSL-Zertifikate kopieren (Stelle sicher, dass die Zertifikate vorhanden sind)
COPY docker/nginx.crt /etc/nginx/ssl/nginx.crt
COPY docker/nginx.key /etc/nginx/ssl/nginx.key

# HTML-, CSS- und JavaScript-Dateien in NGINX-Standardverzeichnis kopieren
COPY --from=build /app/dist/energycontrol-frontend /usr/share/nginx/html

# Ports für die Anwendung freigeben
EXPOSE 80 443
