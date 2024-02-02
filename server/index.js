const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); 
const userRoute = require("./routes/userRoute");
const nodemailer = require("nodemailer");     
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/user',userRoute)

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log(error.message);
})

app.listen(port, (req,res) => console.log(`listening on port ${port}`));


