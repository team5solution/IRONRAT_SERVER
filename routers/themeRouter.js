const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/all", (req, res) => {
  const rawdata = fs.readFileSync("theme.json");
  const theme = JSON.parse(rawdata);
  res.status(200).json(theme);
});

//save theme
router.post("/", (req, res) => {
  const data = JSON.stringify(req.body);
  io.sockets.emit("update theme", req.body);
  fs.writeFileSync("theme.json", data);
  res.status(200).json({ code: 0, message: "save theme successfully" });
});
module.exports = router;
