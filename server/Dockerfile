# the path : server/Dockerfile
FROM node:21

# create directory of work in the container
WORKDIR /app

# install pnpm globally
RUN npm install -g pnpm


# copy the neccesary files in the container
COPY . .

# running file generation .env 
RUN chmod +x /app/scripts_server/generate-env.sh
RUN /app/scripts_server/generate-env.sh


# install requirement with pnpm
RUN pnpm install


# running the compilation 
RUN pnpm run compile


# running the migration
RUN pnpm run migrate


# exposure port used by server
EXPOSE 5000

# running server
CMD ["pnpm", "start"]