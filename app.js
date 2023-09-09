const express = require("express");
var path = require('path');
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

// app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');

mongoose.connect(process.env.DB_ADDRESS);

// Creating Schema 
const courseSchema = new mongoose.Schema({
    Title: String,
    Category: String,
    Mode: String,
    StartDatetime: Date,
    EndDatetime: Date,
    Location: String,
    Cost: Number,
    Facilities: [String],
    Thumbnail: String,
    Organiser: String,
    Description: String
});
const Course = mongoose.model("course", courseSchema);

const userSchema = new mongoose.Schema({
    Name: String,
    Gender: String,
    Age: Number,
    Mobile: Number,
    Email: String,
    PasswordSalt: String,
    PasswordHash: String,
    Username: String,
    RegisterdCourse: String
});
const User = mongoose.model("user", userSchema);

const volunteerSchema = new mongoose.Schema({
    Title: String,
    Location: String,
    Duration: String,
    Description: String,
    Image: String,
    Contact: Number,
    Date: String
})
const Volunteer = mongoose.model("volunteer", volunteerSchema);

const featuredSchema = new mongoose.Schema({
    Title: String,
    Image: String,
    Duration: String,
    Location: String
});
const FeaturedCourse = mongoose.model("FeaturedCourse", featuredSchema, "Featured_courses");

app.get("/", async function(req,res){
    res.render('index', {
        featured_courses: await FeaturedCourse.find({})
    });
});

app.listen(2000, function() {
    console.log("Server started on port 2000");
}); 