# syntax=docker/dockerfile:1
# Self-contained: bun builds the site, nginx serves it. No railpack, no build-token.
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock ./
COPY patches ./patches
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM nginx:alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
