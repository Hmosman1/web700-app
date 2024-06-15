/*********************************************************************************
* WEB700 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Hafsa Osman Student ID:168312239  Date: 14/06/2024

********************************************************************************/

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require('path');
var app = express();

var collegeData = require('./modules/collegeData');

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get("/about", function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get("/htmlDemo", function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'htmlDemo.html'));
});

app.get("/students", function (req, res) {
    if (req.query.course) {
        collegeData.getStudentsByCourse(req.query.course)
            .then(function (students) {
                res.json(students);
            })
            .catch(function (err) {
                res.json({ message: err });
            });
    } else {
        collegeData.getAllStudents()
            .then(function (students) {
                res.json(students);
            })
            .catch(function (err) {
                res.json({ message: "No results" });
            });
    }
});

app.get("/tas", function (req, res) {
    collegeData.getTAs()
        .then(function (tas) {
            res.json(tas);
        })
        .catch(function (err) {
            res.json({ message: "No results" });
        });
});

app.get('/courses', function (req, res) {
    collegeData.getCourses().then(function (data) {
        res.json(data);
    }).catch(function (err) {
        res.json({ message: err });
    });
});

app.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname, 'views', 'errorpage.html'));
});

collegeData.initialize()
    .then(function () {
        app.listen(HTTP_PORT, function () {
            console.log("Server listening on port " + HTTP_PORT);
        });
    })
    .catch(function (err) {
        console.log(err);
    });
