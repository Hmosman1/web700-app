/*********************************************************************************
* WEB700 – Assignment 4
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Hafsa Osman Student ID:168312239  Date: 14/06/2024
*
********************************************************************************/

// Step 1: Import the 'fs' module
const fs = require('fs');

// Step 2: Define the Data class
class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

// Step 3: Declare the dataCollection variable
let dataCollection = null;

// Step 4: Implement the initialize function
function initialize() {
    return new Promise((resolve, reject) => {
        // Read students.json file
        fs.readFile('./data/students.json', 'utf8', (err, studentsData) => {
            if (err) {
                reject("unable to read students.json");
                return;
            }
            let studentDataFromFile = JSON.parse(studentsData);

            // Read courses.json file
            fs.readFile('./data/courses.json', 'utf8', (err, courseData) => {
                if (err) {
                    reject("unable to read courses.json");
                    return;
                }
                let courseDataFromFile = JSON.parse(courseData);

                // Create a new Data instance with the read data
                dataCollection = new Data(studentDataFromFile, courseDataFromFile);
                resolve();
            });
        });
    });
}

// Step 5: Implement the getAllStudents function
function getAllStudents() {
    return new Promise((resolve, reject) => {
        if (dataCollection && dataCollection.students.length > 0) {
            resolve(dataCollection.students);
        } else {
            reject("no results returned");
        }
    });
}

// Step 6: Implement the getTAs function
function getTAs() {
    return new Promise((resolve, reject) => {
        if (dataCollection) {
            let TAs = dataCollection.students.filter(student => student.TA === true);
            if (TAs.length > 0) {
                resolve(TAs);
            } else {
                reject("no results returned");
            }
        } else {
            reject("no results returned");
        }
    });
}

// Step 7: Implement the getCourses function
function getCourses() {
    return new Promise((resolve, reject) => {
        if (dataCollection && dataCollection.courses.length > 0) {
            resolve(dataCollection.courses);
        } else {
            reject("no results returned");
        }
    });
}

// Step 9: Implement the addStudent function
function addStudent(student) {
    return new Promise((resolve, reject) => {
        if (!dataCollection) {
            reject("data not initialized");
            return;
        }

        // Add the new student to the students array
        dataCollection.students.push(student);

        // Save the updated students array back to the students.json file
        fs.writeFile('./data/students.json', JSON.stringify(dataCollection.students, null, 2), 'utf8', (err) => {
            if (err) {
                reject("unable to write to students.json");
                return;
            }
            resolve();
        });
    });
}

// Step 8: Export the functions
module.exports = {
    initialize,
    getAllStudents,
    getTAs,
    getCourses,
    addStudent // Export the addStudent function
};
