const express = require("express");
const router = express.Router();
const Career = require("../models/career");
//const Candidate = require("../models/candidate");
const isLoggedIn = require("../functions/isLoggedin");
const upload = require("../functions/uploader");
const fs = require("fs");
//For client side:

//1) Get all careers - /api/career/all, for the response, please refer to the client-side coding tasks.
router.get("/all", (req, res) => {
  Career.find()
    .sort({ date: -1 })
    .then(careers => {
      const result = careers.map(career => {
        return {
          _id: career._id,
          title: career.title,
          type: career.type,
          description: career.description,
          images: career.images
        };
      });
      res.status(200).json(result);
    })
    .catch(err => console.log(err));
});

//2) Apply a career - /api/career/apply (method: Post), this action will add a candidate object to the candidates list of the appropriate career. for the response, please refer to the client-side coding tasks.
router.post("/apply/:id", upload.array("resumes"), (req, res) => {
  const filePaths = req.files.map(file =>
    file.path.replace(new RegExp("\\\\", "g"), "/")
  );
  const candidate = {
    name: req.body.name,
    email: req.body.email,
    resume: filePaths
  };
  Career.findById(req.params.id)
    .then(career => {
      career.candidates.push(candidate);
      career.save().then(result => {
        console.log("result: ", result);
        res.status(200).json({ code: 0, message: "apply a job successfully" });
      });
    })
    .catch(err => console.log(err));
  /* const candidate = new Candidate({
    name: req.body.name,
    email: req.body.email,
    resume: filePaths,
    careerId: req.body.careerId
  });
  candidate
    .save()
    .try(result => {
      io.to("admins").emit("new candidate", result);
      res.status(200).json({
        code: 0,
        message: "created candidate successfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });*/
});

//For Back-end management side:

//3) List all careers - /api/career/list (method: Get, authorization: isLoggedIn), this action will send the all careers including the candidates information to the owner side.
router.get("/list", (req, res) => {
  Career.find()
    .sort({ _id: -1 })
    .then(careers => res.status(200).json(careers))
    .catch(err => console.log(err));
});

//4) Update a career - /api/career/update (method: Post, authorization:  isLoggedIn), this action allows the owner update and save a career
/*router.patch("update/:id", isLoggedIn, (req, res) => {
  Career.update({ _id: req.params.id }, req.body)
    .then(result => res.status(200).json({
      message: "updated career successfully",
      result
    }))
    .catch(err =>
      res.status(500).json({
        error: err
      })
    );
});
*/
//5) Delete a career - /api/career/:careerId (method: Delete, authorization:  isLoggedIn), this action allows the owner delete a career
router.delete("/:id", (req, res) => {
  let imagePaths = [];

  Career.findByIdAndDelete(req.params.id)
    .then(result => {
      //get image file paths
      imagePaths = result.images;
      const candidates = result.candidates;
      //remove the related image files
      imagePaths.forEach(filePath => {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.log(err);
        }
      });
      //remove the candidate resumes
      candidates.forEach(candidate => {
        const resume = candidate.resume;
        resume.forEach(filePath => {
          try {
            fs.unlinkSync(filePath);
          } catch (err) {
            console.log(err);
          }
        });
      });
      res.status(200).json({ code: 0, message: result.title + " was removed" });
      io.sockets.emit("delete career", result);
    })
    .catch(err =>
      res.status(500).json({
        error: err
      })
    );
});

//6) Post a career - /api/career (method: Post, authorization:  isLoggedIn), this action allows the owner post a career
router.post("/", upload.array("images"), (req, res) => {
  const filePaths = req.files.map(file =>
    file.path.replace(new RegExp("\\\\", "g"), "/")
  );
  const career = new Career({
    title: req.body.title,
    description: req.body.description,
    images: filePaths,
    candidates: []
  });
  career
    .save()
    .then(result => {
      io.sockets.emit("new career", result);
      res.status(201).json({
        code: 0,
        message: "created career successfully"
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
