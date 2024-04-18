FROM node:21 as build-stage

WORKDIR /app

COPY ./package*.json /app/

RUN npm install

COPY ./ /app/

CMD npm run dev