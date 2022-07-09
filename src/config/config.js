import dotenv from 'dotenv'

dotenv.config({path: '../.env'})

const aqvConfig = {
  appConfig: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
  },
  dbConfig: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
  },
};

export default aqvConfig;
