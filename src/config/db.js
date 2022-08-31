require("dotenv").config();
const { DB_USERNAME, DB_PASSWORD, DB_HOSTNAME, DB_NAME, DB_DIALECT } =
  process.env;

module.exports = {
    development: {
      username: process.env.DB_USER_DEV,
      password: process.env.DB_PASS_DEV,
      database: process.env.DB_NAME_DEV,
      host: process.env.DB_HOST_DEV,
      port: process.env.DB_PORT_DEV,
      dialect: process.env.DB_DIALECT_DEV,
      logging: false,
    },
    test: {
      username: process.env.DB_USER_DEV,
      password: process.env.DB_PASS_DEV,
      database: process.env.DB_NAME_DEV,
      host: process.env.DB_HOST_DEV,
      port: process.env.DB_PORT_DEV,
      dialect: process.env.DB_DIALECT_DEV,
      logging: false,
    },
    production: {
      username: process.env.DB_USER_DEV,
      password: process.env.DB_PASS_DEV,
      database: process.env.DB_NAME_DEV,
      host: process.env.DB_HOST_DEV,
      port: process.env.DB_PORT_DEV,
      dialect: process.env.DB_DIALECT_DEV,
      logging: false,
    }
  }