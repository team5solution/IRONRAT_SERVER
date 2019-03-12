const express = require("express");
const router = express.Router();
const Review = require("../models/review");

//1) Get all reviews API - /api/review/all, for the response, please refer to the client-side coding tasks.

router.get("/all", (req, res) => {
  Review.find()
    .sort({ date: -1 })
    .then(reviews => res.json(reviews));
});

//2) Post a review - /api/review, for the response, please refer to the client-side coding tasks.