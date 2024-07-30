require("dotenv").config();

const express = require('express');
const app = express();
const PORT = process.env.PORT||5000;
const mongoose = require('mongoose');
const path = require('path');

// Other middleware and configurations (e.g., body-parser, cors, etc.)

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// connect to mongoDB Data base

// if connected print connection message
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo');
});

// if error print error
mongoose.connection.on('error',(err)=>{
    console.log('error to mongo',err);
});

// importing model from ./model/user 
require('./models/user')
require('./models/post')

// parsing json to object
app.use(express.json());

// managing routes on auth 
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/profile'))



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

