require('dotenv').config();
const pg = require('pg');

const getDatabaseConfig = () => {
  const dbUrlEnv = process.env.DATABASE_URL ? 'DATABASE_URL' : (process.env.POSTGRES_URL ? 'POSTGRES_URL' : null);

  const commonConfig = {
    dialect: 'postgres',
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  };

  if (dbUrlEnv) {
    commonConfig.use_env_variable = dbUrlEnv;
  }

  return commonConfig;
};

const commonConfig = getDatabaseConfig();

module.exports = {
  development: {
    ...commonConfig,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    logging: console.log,
  },
  test: {
    ...commonConfig,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    logging: false,
  },
  production: {
    ...commonConfig,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    logging: false,
  },
};
