const fs = require('fs');
const path = require('path');
const shell = require('electron').shell;
const exec = require('child_process').exec;

// Global Variables
let workDir, students, usernames, assignment;
const folderNames = [];

// ########     BEGIN DATABASE FUNCTIONALITY     ########
const DataStore = require('nedb');
let dbpath = path.resolve('./assets/db/settings.db');
const db = new DataStore({ filename: dbpath, autoload: true });

// Setting unique Indexes
// db.ensureIndex({ fieldName: 'workDir', unique: true }, function (err) {
// });
// db.ensureIndex({ fieldName: 'students', unique: true }, function (err) {
// });
// db.ensureIndex({ fieldName: 'assignment', unique: true }, function (err) {
// });
// db.ensureIndex({ fieldName: 'usernames', unique: true }, function (err) {
// });
// ########     END OF DATABASE FUNCTIONALITY     ########

// Initialize Data
const gatherData = () => {
    // Populate workDir global variable.
    workDir = document.getElementById('workDir').value;
    // Populate students global variable.
    students = Array.from(document.getElementsByClassName('studentInput'));
    let newStudents = students.map(student => {
        return student.value;
    });
    students = newStudents;
    // Populate assignment global variable.
    assignment = document.getElementById('assignmentRepo').value;
    // Populate folder Names.
    students.forEach(student => {
        if (student === '') {
            return;
        } else {
            folderNames.push(student.split(" ").join("_"));
        }
    });
    // Populate usernames gloval variable
    usernames = Array.from(document.getElementsByClassName('studentUsername'));
    let newUsernames = usernames.map(username => {
        return username.value;
    });
    usernames = newUsernames;
};
gatherData();

const handleReset = () => {
    db.remove({}, { multi: true }, function (err, numRemoved) {
        db.loadDatabase(function (err) {
            // done
        });
    });
}


const handleSave = () => {
    gatherData();
    // Insert and or Update workDir
    db.find({ workDir: /./ }, (err, found) => {
        if (found.length > 0) {
            db.update({ _id: found[0]._id }, { workDir }, {}, (err, replaced) => {
                if (err) console.log(err);
                console.log('updated or replaced: ', replaced);
            });
        } else {
            db.insert({ workDir })
        }
    });
    // Insert and or Update students
    db.find({ students: /./ }, (err, found) => {
        if (found.length > 0) {
            db.update({ _id: found[0]._id }, { students }, {}, (err, replaced) => {
                if (err) console.log(err);
                console.log('updated or replaced: ', replaced);
            });
        } else {
            db.insert({ students })
        }
    });
    // Insert and or Update assignment
    db.find({ assignment: /./ }, (err, found) => {
        if (found.length > 0) {
            db.update({ _id: found[0]._id }, { assignment }, {}, (err, replaced) => {
                if (err) console.log(err);
                console.log('updated or replaced: ', replaced);
            });
        } else {
            db.insert({ assignment })
        }
    });
    // Insert and or Update usernames
    db.find({ usernames: /./ }, (err, found) => {
        if (found.length > 0) {
            db.update({ _id: found[0]._id }, { usernames }, {}, (err, replaced) => {
                if (err) console.log(err);
                console.log('updated or replaced: ', replaced);
            });
        } else {
            db.insert({ usernames })
        }
    });
}

const handleLoad = () => {
    const workDirElement = document.getElementById('workDir');
    const studentElements = document.getElementsByClassName('studentInput');
    const assignmentElement = document.getElementById('assignmentRepo');
    const usernameElements = document.getElementsByClassName('studentUsername');
    // Load workDir if available.
    db.find({ workDir: /./ }, (err, found) => {
        if (err) console.log('Error loading data', err);
        if (found.length > 0) {
            workDirElement.value = found[0].workDir;
        } else {
            console.log('Work Directory not saved in database yet')
        }
    });
    // Load students list if available.
    db.find({ students: /./ }, (err, found) => {
        if (err) console.log('Error loading data', err);
        if (found.length > 0) {
            // For the first array found iterate over the students
            // update the field values for each
            found[0].students.forEach((item, index) => {
                studentElements[index].value = item;
            })
        } else {
            console.log('Students not saved in database yet')
        }
    });
    // Load usernames list if available.
    db.find({ usernames: /./ }, (err, found) => {
        if (err) console.log('Error loading data', err);
        if (found.length > 0) {
            // For the first array found iterate over the usernames
            // update the field values for each
            found[0].usernames.forEach((item, index) => {
                usernameElements[index].value = item;
            })
        } else {
            console.log('Usernames not saved in database yet')
        }
    });
    // Load assignment if available.
    db.find({ assignment: /./ }, (err, found) => {
        if (err) console.log('Error loading data', err);
        if (found.length > 0) {
            assignmentElement.value = found[0].assignment;
        } else {
            console.log('Work Directory not saved in database yet')
        }
    });
}
handleLoad();

const handleBatch = () => {
    gatherData();
    // ASSIGNMENT: "https://github.com/LambdaSchool/Preprocessing-Part-I"
    console.log("HandleBatch Firing!");

    let re = /https:\/\/github.com\/LambdaSchool\/(.+)/g;
    const extractedAssignment = re.exec(assignment)[1];

    // Pattern https://github.com/designerexpert/Sprint-Challenge--UI-Responsive
    // Iterate over folderNames
    if (folderNames.length > 0) {
        folderNames.forEach((studentFolder, index) => {
            fs.mkdir(`${workDir}/${studentFolder}`, (error) => {
                if (error) {
                    console.log('Failed to create folders', error);
                } else {
                    exec(`git clone https://github.com/${usernames[index]}/${extractedAssignment} ${workDir}/${studentFolder}/${extractedAssignment}`, (err) => {
                        if (err) console.log(err);
                    });
                }
            });
        });
    } else {
        console.error('Please fill out at least one Student Name Field');
    }
}

const handleClone = (event) => {
    gatherData();
    let re = /https:\/\/github.com\/LambdaSchool\/(.+)/g;
    const extractedAssignment = re.exec(assignment)[1];

    const eventParent = event.path['1'];

    const studentFolder = eventParent.querySelector(".studentInput").value.split(" ").join("_");
    const studentUsername = eventParent.querySelector(".studentUsername").value;

    exec(`cd ${workDir}\\${studentFolder}\\${extractedAssignment} && git stash && git pull`, (err) => {
        if (err) console.log(err);
    });
}

const handleGh = (event) => {
    gatherData();
    // extract event element's parent;
    const eventParent = event.path['1'];
    const currentUsername = eventParent.querySelector(".studentUsername").value;
    shell.openExternal(`https://github.com/${currentUsername}?tab=repositories`);
}

const handlePR = (event) => {
    // https://github.com/LambdaSchool/Responsive-Web-Design/pulls/designerexpert
    gatherData();

    // extract event element's parent;
    const eventParent = event.path['1'];
    const currentUsername = eventParent.querySelector(".studentUsername").value;
    shell.openExternal(`${assignment}/pulls/${currentUsername}`);
}

const handleForms = (formName) => {
    switch (formName) {
        case 'studentStandUp':
            shell.openExternal(`https://airtable.com/shr8ZYuNjevMLRsxI`);
            break;
        case 'studentSprint':
            shell.openExternal(`https://airtable.com/shruSVU97eR6CHE5A`);
            break;
        case 'attendance':
            shell.openExternal(`https://airtable.com/shrEawWXvMldYbm5Q`);
            break;
        case 'pmDaily':
            shell.openExternal(`https://airtable.com/shripCmauVlvxNrAT`);
            break;
        case 'pmSprint':
            shell.openExternal(`https://airtable.com/shr6wexWV3RM4ITJP`);
            break;

        default:
            break;
    }
}
