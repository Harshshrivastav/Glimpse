const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const requireLogin = require("../middleware/requireLogin");

// Get user profile
router.get('/profile', requireLogin, (req, res) => {
  User.findById(req.user._id)
    .select("-password")
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
