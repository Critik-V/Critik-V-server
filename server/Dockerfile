# server/Dockerfile
FROM node:21

# Crée un répertoire de travail dans le conteneur
WORKDIR /app

# Installe pnpm globalement
RUN npm install -g pnpm


# Copie des fichiers nécessaires dans le conteneur
COPY . .

# Exécution du script de génération du fichier .env
RUN chmod +x generate-env.sh
RUN ./generate-env.sh


# Installation des dépendances avec pnpm
RUN pnpm install


# Exécution de la commande de compilation
RUN pnpm run compile


# Exécution de la commande de migration
RUN pnpm run migrate


# Exposition du port utilisé par le serveur
EXPOSE 5000

# Commande pour démarrer le serveur
CMD ["pnpm", "start"]