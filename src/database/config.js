const { Sequelize } = require("sequelize");
require("dotenv").config();

const db = new Sequelize({
  dialect: process.env.DIALECT,
  database: process.env.DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: +process.env.DB_PORT,
  logging: false,
});

module.exports = { db };
