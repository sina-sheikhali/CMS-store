const express = require("express");
const SabzLearnShopDB = require("./../db/SabzLearnShop");

const commentsRouter = express.Router();

// routes

commentsRouter.get("/", (req, res) => {
  let selectAllCommentsQuery = `SELECT comments.id, comments.isAccept , comments.body, comments.date, comments.hour, users.firsname as userID, products.title as productID FROM comments INNER JOIN users ON users.id = comments.userID INNER JOIN products ON products.id = comments.productID`;

  SabzLearnShopDB.query(selectAllCommentsQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.delete("/:commentID", (req, res) => {
  let commentID = req.params.commentID;

  let deleteCommentQuery = `DELETE FROM comments WHERE id = ${commentID}`;
  SabzLearnShopDB.query(deleteCommentQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.put("/:commentID", (req, res) => {
  let commentID = req.params.commentID;
  let editCommentQuery = `UPDATE comments SET body="${req.body.body}" WHERE id = ${commentID}`;

  SabzLearnShopDB.query(editCommentQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.post("/accept/:commentID", (req, res) => {
  let commentID = req.params.commentID;
  console.log(commentID);
  let editCommentQuery = `UPDATE comments SET isAccept = 1 WHERE id = ${commentID}`;

  SabzLearnShopDB.query(editCommentQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.post("/reject/:commentID", (req, res) => {
  let commentID = req.params.commentID;
  console.log(commentID);
  let editCommentQuery = `UPDATE comments SET isAccept = 0 WHERE id = ${commentID}`;

  SabzLearnShopDB.query(editCommentQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = commentsRouter;
