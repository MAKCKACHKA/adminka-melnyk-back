const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   port: dbConfig.PORT,
//   dialect: dbConfig.dialect,
//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle,
//   },
// });
sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);
console.log(dbConfig, sequelize);
//     "username": "root",
//     "password": null,
//     "database": "testdb",
//     "host": "localhost",
//     "dialect": "mariadb",
//     "charset": "utf8mb4"

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.news = require("./news.model.js")(sequelize, Sequelize);

module.exports = db;
