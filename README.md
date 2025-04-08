
# 🎵 Frontend - Tião Carreiro & Pardinho (Next.js + NextAuth + Docker)

Aplicação frontend desenvolvida em Next.js, integrada com autenticação via NextAuth e consumindo uma API Laravel. Projetada para exibir e sugerir músicas da dupla Tião Carreiro & Pardinho.

---

## 🚀 Como rodar o projeto com Docker

### 1. Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 2. Configuração

Clone o repositório:

```bash
git clone https://github.com/wesandradealves/neotask-ReactJS
cd seu-repositorio
```

Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
NEXT_PUBLIC_API_URL=http://localhost:8080
CHOKIDAR_USEPOLLING=true
```

**Observação:** Certifique-se que o backend (Laravel API) esteja rodando na porta `8080` e aceite requisições da origem do frontend (`http://localhost:3000`).

### 3. Subindo o projeto com Docker

Execute o comando abaixo para iniciar a aplicação:

```bash
docker compose up --build
```

A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## 🗂 Estrutura de pastas

```
app/
  ├── (home)/         # Página principal com listagem de músicas e sugestões
  ├── api/            # Rotas internas de API para NextAuth
  ├── layout.tsx      # Layout principal da aplicação
  ├── registry.tsx    # Registro de provedores globais
  ├── style.tsx       # Estilos globais
  └── template.tsx    # Template base
```

Outras pastas relevantes:

```
src/
  ├── components/     # Componentes reutilizáveis como Header, Spinner, Suggest etc.
  ├── context/        # Contextos globais (auth, spinner)
  ├── services/       # Serviços para consumir a API (auth, songs, suggestions, csrf)
  └── utils/          # Utilitários como storage helpers
```

---

## 📦 Dependências principais

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [NextAuth.js](https://next-auth.js.org/) para autenticação
- [Axios](https://axios-http.com/) para chamadas HTTP
- [Tailwind CSS](https://tailwindcss.com/) para estilização
- [Framer Motion](https://www.framer.com/motion/) para animações

---

## 🐳 Dockerfile

O projeto já inclui um `Dockerfile` com base em `node:18-alpine`, configurado para:

- Instalar dependências
- Rodar `next build`
- Rodar a aplicação com `next start`

---

## 📌 Comandos úteis

```bash
# Instalar dependências locais
npm install

# Rodar o projeto localmente (sem Docker)
npm run dev

# Rodar testes (se existirem)
npm run test

# Rodar o build de produção
npm run build
```

---

## ✍️ Autores

- [Wes](https://github.com/wesandradealves)
