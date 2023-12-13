const express = require("express");
const SabzLearnShopDB = require("./../db/SabzLearnShop");

const ordersRouter = express.Router();

// routes

ordersRouter.get("/", (req, res) => {
  let selectAllOrdersQuery = `SELECT orders.id, orders.date, orders.hour, orders.price, orders.off, orders.sale, orders.popularity, orders.count, orders.sale_count, orders.isActive, users.firsname as userID, products.title as productID FROM orders INNER JOIN users ON users.id = orders.userID INNER JOIN products ON products.id = orders.productID`;

  SabzLearnShopDB.query(selectAllOrdersQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

ordersRouter.delete("/:orderID", (req, res) => {
  let orderID = req.params.orderID;
  let deleteOrderQuery = `DELETE FROM orders WHERE id = ${orderID}`;

  SabzLearnShopDB.query(deleteOrderQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

ordersRouter.put("/active-order/:orderID/:isActive", (req, res) => {
  let orderID = req.params.orderID;
  let isActive = req.params.isActive;
  let activeOrderQuery = `UPDATE orders SET isActive=${isActive} WHERE id = ${orderID}`;

  SabzLearnShopDB.query(activeOrderQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = ordersRouter;
