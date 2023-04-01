FROM node:18-alpine

WORKDIR /user/src/app

COPY . .

RUN yarn && \
    yarn cache clean

EXPOSE 3000

CMD ["npm", "run", "start:dev"]