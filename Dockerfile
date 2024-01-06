# Use an official Node.js image with a version >= 18.17.0
FROM node:18.17.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
