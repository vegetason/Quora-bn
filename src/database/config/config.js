require('dotenv').config();

const useSSL = process.env.DB_USE_SSL === 'true';

const sslConfig = useSSL ? {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  }
} : {};

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    dialectOptions: sslConfig,
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    dialectOptions: sslConfig,
  },
  production: {
    url: process.env.PROD_DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }, 
  },
};