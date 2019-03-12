const express = require("express");
const router = express.Router();
<<<<<<< HEAD
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
=======
const mongoose = require("mongoose");
const Message = require("../models/message");
const uuid = require("../functions/uuid");
const ADMIN = require("../config/admin").role;
const SMSNumber = require("../config/admin").SMSNumber;
const MailNode = require("../functions/mail");
router.get("/all", (req, res) => {
  Message.find()
    .sort({ date: -1 })
    .then(messages => {
      res.status(200).json(messages);
    });
});

router.post("/", (req, res) => {
  //console.log(req);
  const message = new Message({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    content: req.body.content
  });
  //save new message to database
  message.save().then(data => {
    const result = {
      name: data.name,
      email: data.email,
      content: data.content,
      date: data.date
    };
    //if onwer is online and logged in, send the message via socket.io
    if (ADMIN in global[uuid]) {
      global[uuid][ADMIN].emit("new message", result, function() {
        res
          .status(200)
          .json({ code: 0, message: "Message was sent to the owner" });
      });
    } else {
      const subject = "A Message From Client";
      const content =
        "Client Name: " +
        result.name +
        "\n" +
        "Client Email: " +
        "\n" +
        result.email +
        "\n" +
        " Mesage:" +
        result.content;
      MailNode(SMSNumber, subject, content, function() {
        res
          .status(200)
          .json({ code: 0, message: "A SMS was sent to the owner" });
      });
    }
  });
});
module.exports = router;
>>>>>>> c5fba3aff4b5c7092a0600c27c0d84a1b6971e91
