const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
// const { Hash } = require("crypto");
// const { timeStamp } = require("console");

// Connecting mongoose
mongoose.connect("mongodb://localhost:27017/HST");

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
    Thumbnail: Blob,
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
    Facilities: ["Stay", "Food", "Apparels and Gears"],
    Thumbnail: Blob,
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
    // PasswordHash: String,
    Username: "muru",
    RegisterdCourse: "Basic Mountaineering Course"
});



app.get("/", function(req,res){
    res.sendFile(__dirname + "/FrontEnd/index.html");
});

app.listen(2000, function() {
    console.log("Server started on port 2000");
});
