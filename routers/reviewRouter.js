const express = require("express");
const router = express.Router();
const Review = require("../models/review");

//test
// router.get('/', (req, res) => {
//   res.send('Review router works!');
// });



//1) Get all reviews API - /api/review/all, for the response, please refer to the client-side coding tasks.

router.get("/all", (req, res) => {
  Review.find()
    .sort({ date: -1 })
    .then(reviews => res.json(reviews));
});

//2) Post a review - /api/review, for the response, please refer to the client-side coding tasks.

router.post("/", (req, res) => {
  const review = new Review ({
    name: req.body.name,
    rating: req.body.rating,
    comment: req.body.comment
  });

  review
    .save()
    .then(result => {
      //console.log(result);
      const newReview = {
        createdReview: {
          name: result.name,
          rating: result.rating,
          comment: result.comment
        }
      };
      io.sockets.emit("new review", newReview);
      res.status(201).json({
        message: "submit a review successfully",
        review
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// export router
module.exports = router;