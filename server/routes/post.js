const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const requireLogin = require("../middleware/requireLogin");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set the destination for uploaded files



// Create post with image upload
router.post('/createpost', requireLogin, upload.single('image'), (req, res) => {
    const { title, body } = req.body;
    const image = req.file ? req.file.path : 'no photo'; // Use file path or a default

    if (!title || !body || !image) {
        return res.status(422).json({ error: "Please add all the fields" });
    }

    req.user.password = undefined;
    const post = new Post({
        title,
        body,
        image,
        postedBy: req.user
    });

    post.save().then(result => {
        res.json({ post: result });
    })
    .catch(err => {
        console.log(err);
    });
});


router.get('/allpost', requireLogin, (req, res) => {
    Post.find()
      .populate("postedBy", "_id name")
      .then(posts => {
        res.json(posts);
      })
      .catch(err => {
        console.log(err);
      });
  });

// Get myposts
router.get('/myposts',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
        .populate("postedBy","_id name")
        .then(mypost=>{
            res.json({mypost})
        })
        .catch(err=>{
            console.log(err);
        });
});


module.exports = router;