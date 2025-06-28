FROM node:20-alpine AS build
WORKDIR /api
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run generate
RUN npm run build


FROM node:20-alpine AS production
ENV NODE_ENV=production
WORKDIR /api
COPY --from=build /api/dist ./dist
COPY --from=build /api/package*.json ./
RUN npm ci --only=production
COPY --from=build /api/node_modules/.prisma ./node_modules/.prisma
CMD [ "node", "dist/server.js" ]