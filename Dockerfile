# syntax=docker/dockerfile:1
# Build the site with bun; Coolify's nginx wrapper serves /app/dist (publish_directory=/dist).
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock ./
COPY patches ./patches
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM alpine:3 AS output
WORKDIR /app
COPY --from=build /app/dist ./dist
