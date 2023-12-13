const mysql = require("mysql");

const SabzlearnShopDB = mysql.createConnection({
  host: "dashboard-db",
  port: "3306",
  user: "root",
  password: "PBZXsJUVy3sL82iZDZwp0ZRr",
  database: "flamboyant_agnesi",
});

SabzlearnShopDB.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports = SabzlearnShopDB;
