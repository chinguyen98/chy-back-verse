const Config = {
  db: {
    mongoUrl: process.env.MONGO_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  },
  mailer: {
    host: process.env.MAIL_HOST,
    port: +process.env.MAIL_PORT,
    username: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
  },
  redis: {
    url: process.env.REDIS_URI,
    host: process.env.REDIS_HOSTNAME,
    port: process.env.REDIS_PORT,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASS,
  },
};

export default Config;
