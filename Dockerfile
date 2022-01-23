FROM node:16

WORKDIR /

COPY package*.json .

RUN npm install

COPY ./src .

EXPOSE 3000

# CMD ["node", "src/bin/server.js"]
CMD npm run start