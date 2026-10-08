# Organizador de Tarefas

Sistema de organização de tarefas e fluxos de trabalho por operações e equipes.
Monorepo com **backend** (Express + Prisma + SQLite) e **frontend** (React + Vite + Tailwind).

```
.
├── backend/              # API REST (Express, Prisma, SQLite, JWT)
│   ├── prisma/           # schema e banco SQLite (dev.db)
│   ├── src/              # código-fonte (rotas, services, database)
│   └── Dockerfile
├── Organizador_Tarefa/   # SPA (React 19, Vite, Tailwind v4)
│   ├── src/
│   ├── Dockerfile
│   └── nginx.conf
└── docker-compose.yml
```

## Pré-requisitos

- **Node.js 22+** e npm — para rodar localmente sem Docker.
- **Docker Desktop** (com `docker compose`) — para rodar via containers.

Contas de demonstração (criadas pelo seed): `admin@aurora.com` e `admin@beta.com`, senha `123456`.

---

## Rodando localmente (sem Docker)

### 1. Backend

```bash
cd backend
npm install

# cria/atualiza o banco SQLite (prisma/dev.db) a partir do schema
npx prisma generate
npm run db:push

# (opcional) popula dados de demonstração
npm run db:seed

# inicia a API em http://localhost:3001 (hot reload)
npm run dev
```

As variáveis ficam em `backend/.env`:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="troque-este-segredo"
PORT=3001
```

### 2. Frontend

Em outro terminal:

```bash
cd Organizador_Tarefa
npm install
npm run dev
```

Acesse **http://localhost:5173**. O Vite faz proxy de `/api` e `/uploads` para
`http://localhost:3001` (configurado em `vite.config.ts`), então backend e frontend
precisam estar rodando ao mesmo tempo.

### Build de produção (local)

```bash
cd Organizador_Tarefa && npm run build     # gera dist/
cd ../backend && npm run build             # gera dist/
```

---

## Rodando com Docker (recomendado)

O `docker-compose.yml` sobe **dois serviços**:

- `web` — Nginx servindo o build do frontend em **http://localhost:8080** e fazendo
  proxy de `/api` e `/uploads` para o backend.
- `backend` — API Express na porta interna `3001` (não exposta ao host).

Persistência em volumes nomeados:

- `db-data` → banco SQLite em `/data/prod.db`
- `uploads-data` → arquivos enviados em `/app/uploads`

### Subir tudo

```bash
docker compose up --build
```

Acesse **http://localhost:8080**.

Na **primeira subida**, o container do backend automaticamente:

1. aplica o schema no banco (`prisma db push`);
2. executa o seed uma única vez (marcador `/data/.seeded`) — então reiniciar o
   container **não** duplica dados.

### Definir o segredo JWT

O padrão é um valor de exemplo. Para produção, informe um segredo próprio:

```bash
# Linux/macOS
JWT_SECRET="um-segredo-forte" docker compose up --build
```

```powershell
# Windows (PowerShell)
$env:JWT_SECRET="um-segredo-forte"; docker compose up --build
```

Ou crie um arquivo `.env` na raiz (lido automaticamente pelo Compose):

```env
JWT_SECRET=um-segredo-forte
```

### Comandos úteis

```bash
docker compose up -d --build     # sobe em segundo plano
docker compose logs -f backend   # acompanha logs da API
docker compose ps                # status dos serviços
docker compose down              # para e remove os containers (mantém volumes)
docker compose down -v           # para e APAGA os volumes (zera banco e uploads)
docker compose build --no-cache  # rebuild forçado (após mudar dependências)
```

Para rodar o seed manualmente (sem apagar o banco):

```bash
docker compose exec backend node dist/database/seed.js
```

---

## Portas

| Ambiente        | Frontend                  | Backend                  |
| --------------- | ------------------------- | ------------------------ |
| Local (dev)     | http://localhost:5173     | http://localhost:3001    |
| Docker          | http://localhost:8080     | interno (`backend:3001`) |

## Scripts disponíveis

**Backend**

| Script          | Descrição                                   |
| --------------- | ------------------------------------------- |
| `npm run dev`   | API com hot reload (`tsx watch`)            |
| `npm run build` | Compila TypeScript para `dist/`             |
| `npm start`     | Roda a API compilada (`dist/index.js`)      |
| `npm run db:push` | Aplica o schema no banco                  |
| `npm run db:seed` | Popula dados de demonstração              |
| `npm test`      | Testes dos cálculos de métricas             |

**Frontend**

| Script            | Descrição                          |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento (Vite) |
| `npm run build`   | Build de produção (`dist/`)        |
| `npm run preview` | Pré-visualiza o build              |
| `npm run lint`    | ESLint                             |
