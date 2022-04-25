const mysql = require("mysql");
const util = require("util");

const db_connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_data",
});

db_connection.connect();

db_connection.query = util.promisify(db_connection.query);

module.exports = db_connection;
