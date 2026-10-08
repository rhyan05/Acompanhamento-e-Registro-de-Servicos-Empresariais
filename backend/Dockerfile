# ---------- build ----------
FROM node:22-bookworm-slim AS build
WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ---------- runtime ----------
FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --omit=dev

COPY prisma ./prisma
RUN npx prisma generate

COPY --from=build /app/dist ./dist
RUN mkdir -p /app/uploads

EXPOSE 3001

# aplica o schema (cria o banco no volume na 1a vez), semeia apenas uma vez
# e inicia o servidor. O marcador /data/.seeded evita duplicar dados no restart.
CMD ["sh", "-c", "npx prisma db push --skip-generate && if [ ! -f /data/.seeded ]; then node dist/database/seed.js && touch /data/.seeded; fi && exec node dist/index.js"]
