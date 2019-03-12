const express = require("express");
const router = express.Router();
const Appoinment = require("../models/appointment");

//test
router.get('/', (req, res) => {
  res.send('Appoinment router works!');
});

//Post an appointment - /api/appointment (method: Post),  for the response, please refer to the client-side coding tasks.

// export router
module.exports = router;