FROM node:20-alpine

WORKDIR /app
COPY package.json ./
COPY prisma/schema.prisma ./prisma/schema.prisma
RUN npm install --only=production @prisma/client
ENTRYPOINT ["tail", "-f", "/dev/null"]