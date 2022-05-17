import express from "express";
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/record").get(function (req, res) {
    let db_connect = dbo.getDb("employees");
    db_connect
        .collection("records")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

recordRoutes.route("/record/add").post(function (req, res) {
    let db_connect = dbo.getDb();
    let myObj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
    };
    db_connect.collection("records").insertOne(myObj, function (err, res) {
        if (err) throw err;
        response.json(res)
    });
});

recordRoutes.route("/update/:id").post(function (req, res) {
    let db_connect = dbo.getDb();
    let myQuery = { _id: ObjectId( req.params.id )};
    let newValues = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };
    db_connect
      .collection("records")
      .updateOne(myQuery, newValues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        res.json(res);
      });
  });

recordRoutes.route("/:id").delete((req, res) => {
    let db_connect = dbo.getDb();
    let myQuery = { _id: ObjectId( req .params.id )};
    db_connect.collection("records").deleteOne(myQuery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        res.json(obj);
    });
});

module.exports = recordRoutes;