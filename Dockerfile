FROM node:18-alpine

WORKDIR /user/src/app

COPY --chown=node:node . .

RUN rm -rf node_modules && yarn install --frozen-lockfile

EXPOSE 3000

CMD ["npm", "run", "start:dev"]