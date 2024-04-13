# Stage 1: install dependencies and build
FROM node:lts-alpine3.19 AS builder
WORKDIR /app
COPY package*.json ./
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ARG NEXT_PUBLIC_GMAPS_MAP_ID_LIGHT
ARG GMAPS_API_KEY
RUN npm install
COPY . .
RUN npm run build

# Stage 2: run
FROM node:lts-alpine3.19
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000

CMD ["npm", "start"]