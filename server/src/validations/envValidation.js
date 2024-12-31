import Joi from "joi";
const envSchema = Joi.object()
  .keys({
    PORT: Joi.number().required().default(6000).description("port number"),
    DB_CONNECTION_URL: Joi.string()
      .required()
      .default("mongodb://localhost:27017/tmms")
      .description("mongodb url"),
    NODE_ENV: Joi.string().default("production").required(),
    LOG_FILE_PATH: Joi.string()
      .required()
      .default("D:/projects/TMMS/server/app.log"),
    SECRET_KEY: Joi.string().required(),
    ACESS_TOKEN_EXPIRES_IN_MINUTES: Joi.number().required(),
    REFRESH_TOKEN_EXPIRES_IN_DAYS: Joi.number().required(),
    RESET_PASSWORD_TOKEN_EXPIRES_IN_MINUTE: Joi.number().required(),
    EMAIL_VERIFICATION_TOKEN_EXPIRES_IN_SECONDS: Joi.number().required(),
    OTP_EXPIRES_IN_MINUTES: Joi.number().required(),
    EMAIL_HOST: Joi.string().required(),
    EMAIL_PORT: Joi.number().required(),
    EMAIL_SECURE: Joi.boolean().required(),
    EMAIL_FROM: Joi.string().required(),
    USER_EMAIL: Joi.string().required(),
    USER_PASSWORD: Joi.string().required(),
    APP_NAME: Joi.string().required(),
    SERVER_URL: Joi.string().required(),
  })
  .unknown();
export { envSchema };
