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
    Category: Number,
    Cost: Number,
    Mode: String,
    Date: String,
    Location: String,
    Facilities: String,
    Thumbnail: String,
    organizer: String,
    Description: String
});
const Courses = mongoose.model("courses", courseSchema, 'courses');

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
const Volunteer = mongoose.model("volunteer", volunteerSchema, 'Volunteers');

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

// Define a route using app.get
app.get('/advanced_courses', async (req, res) => {
    try {
      const advanced_courses = await Courses.find({ Category: 1 });
      res.render('courses', { advanced_courses }); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/basic_courses', async (req, res) => {
    try {
      const basic_courses = await Courses.find({ Category: { $in: [3, 2] } });
      res.render('basic_courses', { basic_courses }); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.get('/volunteer', async (req, res) => {
    try {
      const Volunteering = await Volunteer.find();
      res.render('volunteer', { Volunteering }); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/courses/:courseId', (req, res) => {
    const courseId = req.params.courseId;
    
    Courses.findOne({ _id: courseId })
      .then(course => {
        if (!course) {
          return res.status(404).send('Course not found');
        }
        // Render the course description page with EJS and pass the course data
        res.render('course-description', { course });
      })
      .catch(err => {
        // Handle errors here
        res.status(500).send('Error fetching course details');
      });
  });
  
  

app.listen(2000, function() {
    console.log("Server started on port 2000");
}); 

