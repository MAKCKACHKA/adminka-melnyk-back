const mysql = require("mysql2");
const dbConfig = require("./db.config.js");

// Open the connection to MySQL server
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.username,
  password: dbConfig.password,
});

// Run create database statement
connection.query(
  `CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`,
  function (err, results) {
    console.log(results);
    console.log(err);
  }
);

// Close the connection
connection.end();
