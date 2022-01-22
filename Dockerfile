FROM node:16

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "./src/bin/server.js"]