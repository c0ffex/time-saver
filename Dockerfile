# Use Node.js 20.11.1 como a imagem base
FROM node:20.11.1 AS builder

# Crie o diretório da aplicação
WORKDIR /app

# Copie package.json e package-lock.json para garantir que ambos sejam usados
COPY package*.json ./
COPY prisma ./prisma/

# Instale as dependências da aplicação
RUN npm install

# Copie o restante dos arquivos da aplicação para o diretório de trabalho
COPY . .


# Construa a aplicação
RUN npm run build

# Use Node.js 20.11.1 para o runtime
FROM node:20.11.1

# Copie node_modules e arquivos de package do estágio de builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Exponha a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação em modo de produção
CMD [ "npm", "run", "start:dev" ]
