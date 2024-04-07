# the path : server/Dockerfile
FROM node:21

# create directory of work in the container
WORKDIR /app

# install pnpm globally
RUN npm install -g pnpm

# copy the package.json file in the container
COPY package*.json .

# install requirement with pnpm
RUN pnpm install

# copy the neccesary files in the container
COPY . .

# generate the prism client
RUN pnpm run generate

# running the compilation 
RUN pnpm run compile

# delete the source code
RUN rm -rf src

# exposure port used by server
EXPOSE 5000

# running server
CMD ["pnpm", "start"]
