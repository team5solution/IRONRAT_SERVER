const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const isLoggedIn = require("../functions/isLoggedin");
const mongoose = require("mongoose");
const upload = require("../functions/uploader");

/* Get all product infromation*/

router.get("/all", (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .then(products => res.json(products));
});

router.post("/", isLoggedIn, upload.array("images"), (req, res) => {
  //console.log("reg: ", req);
  var filePaths = req.files.map(file =>
    file.path.replace(new RegExp("\\\\", "g"), "/")
  );
  // console.log(filePaths);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    images: filePaths
  });
  product
    .save()
    .then(result => {
      // console.log(result);
      const newProduct = {
        createdProduct: {
          name: result.name,
          type: result.type,
          description: result.description,
          images: result.images
        }
      };
      io.sockets.emit("new product", newProduct);
      res.status(201).json({
        message: "created product successfully",
        newProduct
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
