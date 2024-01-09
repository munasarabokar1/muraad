require("dotenv").config();

const mysql = require("mysql");

const connection = mysql.createPool({
  connectionLimit: 100, //important
  host: process.env.HOST,
  database: process.env.DB,
  user: process.env.USER,
  password: process.env.PASS,
  debug: false,
  multipleStatements: true,
});
console.log("working");

module.exports = connection;
