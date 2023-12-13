const express = require("express");
const SabzLearnShopDB = require("./../db/SabzLearnShop");

const offsRouter = express.Router();

// routes

offsRouter.get("/", (req, res) => {
  let selectAllOffsQuery = `SELECT offs.id, offs.code, offs.date, offs.isActive, offs.percent, admins.firstname as adminID, products.title as productID FROM offs INNER JOIN admins ON admins.id = offs.adminID INNER JOIN products ON products.id = offs.productID`;

  SabzLearnShopDB.query(selectAllOffsQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

offsRouter.delete("/:offID", (req, res) => {
  let offID = req.params.offID;
  let deleteOffQuery = `DELETE FROM offs WHERE id = ${offID}`;

  SabzLearnShopDB.query(deleteOffQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

offsRouter.put("/active-off/:offID/:isActive", (req, res) => {
  let offID = req.params.offID;
  let isActive = req.params.isActive;
  let activeOffQuery = `UPDATE offs SET isActive=${isActive} WHERE id = ${offID}`;

  SabzLearnShopDB.query(activeOffQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = offsRouter;
