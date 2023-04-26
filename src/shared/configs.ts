export const DB_CONFIG = {
  MONGO_URL: process.env.MONGO_URL,
};

export const JWT_CONFIG = {
  SECRET: process.env.JWT_SECRET,
};

export const MAILER_CONFIG = {
  HOST: process.env.MAIL_HOST,
  PORT: +process.env.MAIL_PORT,
  USERNAME: process.env.MAIL_USERNAME,
  PASSWORD: process.env.MAIL_PASSWORD,
};
