# the path: server/Dockerfile
FROM node:21-alpine3.18

# create directory of work in the container
WORKDIR /app

# copy the package.json and package-lock.json files in the container
COPY package*.json ./
# copy the pnpm-lock.yaml file in the container
COPY pnpm-lock.yaml ./
# install pnpm globally
RUN npm install -g pnpm

# install requirements with pnpm
RUN pnpm install --frozen-lockfile

# copy the necessary files in the container
COPY . .

# generate the prisma client
RUN pnpm run generate

# running the compilation
RUN pnpm run compile

# delete the source code
RUN rm -rf src

# expose port used by server
EXPOSE 5000

# run the server
CMD ["pnpm", "start"]
