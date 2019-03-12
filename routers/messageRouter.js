const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const mongoose = require("mongoose");

//test
router.get('/', (req, res) => {
  res.send('Message router works!');
});


//Post a message - /api/message, please note that the body of the request doesn't contain the date field and this field should be inserted to MongoDB automatically.  for the response, please refer to the client-side coding tasks.

const current_date = new Date();

router.post('/', (req, res) => {
  const message = new Message({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    date: current_date
  });
  message
    .save()
    .then(result => {
      // console.log(result);
      const newMessage = {
        createdMessage: {
          name: result.name,
          eamil: result.eamil,
          message: result.message,
          date: result.date
        }
      };
      io.sockets.emit("new message", newMessage);
      res.status(201).json({
        message: "submit a message successfully",
        newMessage
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// export router
module.exports = router;