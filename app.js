const express = require("express");
var path = require('path');
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'templates'));
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'html');

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
const Course = mongoose.model("Course", courseSchema);

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
const User = mongoose.model("User", userSchema);

// Building Database
const course1 = new Course({
    Title: "Basic Mountaineering Course",
    Category: "Bootcamp",
    Mode: "Offline",
    StartDatetime: Date.parse('2023-10-06'),
    EndDatetime: Date.parse('2023-10-29'),
    Location: "Manali",
    Cost: 13816,
    Facilities: ["Stay", "Apparels and Gears"],
    Thumbnail: "",
    Organiser: "Abvimas",
    Description: "We at ABVIMAS, offers multiple courses which are full of adventure and experience for lifetime. These courses are curated by mountaineer professionals and Government authorities. One of the finest course that we offer is named BASIC MOUNTAINEERING COURSE. Duration of this course is 26 Days in which all the activities related to course are completed. Eligible age for course is 16 Year to 45 Years."
});

const user1 = new User({
    Name: "Murtaza",
    Gender: "Male",
    Age: "22",
    Mobile: "7974638328",
    Email: "b20302@students.iitmandi.ac.in",
    PasswordSalt: "aa",
    Username: "muru",
    RegisterdCourse: "Basic Mountaineering Course"
});



app.get("/", function(req,res){
    res.render('index');
});

app.listen(2000, function() {
    console.log("Server started on port 2000");
});