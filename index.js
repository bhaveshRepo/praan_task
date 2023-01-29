require("dotenv").config();

const mongoose = require('mongoose')
const multer = require('multer');
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require('./routes/authRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const { isAuthenticated } = require('./middleware')
const cors = require('cors')
const dataRoutes = require('./routes/dataRoutes')
const app = express();


//mongo atlas connection string 
mongoose
  .connect('mongodb+srv://bhavesh:bhavesh@cluster0.yaz0vv4.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log(`DB connected successfully `);
  })
  .catch(() => {
    console.log("Check your connection");
  });

// multer to acces form data fields , acts as a middleware between routes
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

var uploads = multer({ storage: storage });

app.use(cors()) // To allow cross origin access .
app.use(cookieParser()); // store and access cookies 
app.use(express.json()); //parse data into request body .

app.use('/auth', uploads.none(), authRoutes);
app.use('/data', isAuthenticated, uploads.none(), dataRoutes);
app.use('/file', isAuthenticated, uploads.single('csvFile'), uploadRoutes)

// Port
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`server is running at : ${port}`);
});
