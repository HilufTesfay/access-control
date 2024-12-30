import { config } from "dotenv";
import { envSchema } from "../validations/index.js";

const envPath = "D:/projects/access-control/server/.env";
config({ path: envPath });

const { value: env, error } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);
if (error) {
}
export const envConfig = {
  port: env.PORT || 6000,
  dataBaseUrl: env.DB_CONNECTION_URL,
  env: env.NODE_ENV,
  logPath: env.LOG_FILE_PATH,
  token: {
    secretKey: env.SECRET_KEY,
    acessTokenExp: env.ACESS_TOKEN_EXPIRES_IN_MINUTES,
    refreshTokenExp: env.REFRESH_TOKEN_EXPIRES_IN_DAYS,
    resetPasswordToknExp: env.RESET_PASSWORD_TOKEN_EXPIRES_IN_MINUTES,
    emailVerificationTokenEXp: env.EMAIL_VERIFICATION_TOKEN_EXPIRES_IN_SECONDS,
  },
  email: {
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    secure: env.EMAIL_SECURE,
    from: env.EMAIL_FROM,
    user: env.USER_EMAIL,
    password: env.USER_PASSWORD,
    appName: env.APP_NAME,
  },
  serverUrl: env.SERVER_URL,
};
