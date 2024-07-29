const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../key")
const requireLogin = require("../middleware/requireLogin")


// Testing 
router.get('/protected',requireLogin,(req,res)=>{
    res.send('hello user')
})

// Signup
router.post("/signup", (req, res) => {
    // check if field are empty return 422 status
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        return res.status(422).json({ error: "please add all the fields" });
    }

    //check database for same email
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "email is already in use" });
            }

            // hash password
            bcrypt
                .hash(password, 12)
                .then((hashedpassword) => {
                    // create new user
                    const user = new User({
                        email: email,
                        password: hashedpassword,
                        name: name,
                    });

                    // save user
                    user
                        .save()
                        .then((user) => {
                            res.json({ message: "sucessfully saved User" });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
});


// Signin
router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "please add all the fields" });
    }

    // check if user exist
    User.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Email or Password" })
            }

            // compare password
            bcrypt.compare(password, savedUser.password)
                .then((doMatch) => {
                    if (doMatch) {
                        // res.json({ message: "sucessfully signed in" })
                        // instead of sending response directly we will send jwt token to user so that he can access authenticated resources with the help of it.
                        const token = jwt.sign({_id:savedUser._id},JWT_SECRET);
                        res.json({token})
                    }
                    else{
                        return res.status(422).json({ error: "Invalid Email or Password" })
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        });
});


// exporting routes
module.exports = router;
