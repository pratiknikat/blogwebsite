FROM node:18.17.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install && \
    npm cache clean --force

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
