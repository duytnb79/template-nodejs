FROM node:20-alpine
ENV NODE_ENV=development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run generate
CMD [ "npm", "run", "dev" ]
