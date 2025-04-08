# Dockerfile para a aplicação web3 com Node.js e Next.js

# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie apenas os arquivos de dependências para o contêiner
COPY .env package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Execute o build da aplicação
RUN npm run build

# Exponha a porta 3000 para o servidor de produção
EXPOSE 3000

# Comando para iniciar o servidor de produção
CMD ["npm", "run", "dev"]