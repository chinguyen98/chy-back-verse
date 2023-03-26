FROM node:18-alpine

WORKDIR /user/src/app

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]