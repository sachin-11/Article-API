FROM node:18 as build
WORKDIR /usr/app
COPY package.json .
RUN npm install
EXPOSE 5000
COPY . .
CMD ["node", "server.js"]