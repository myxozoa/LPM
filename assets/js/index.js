const fs = require('fs');
const path = require('path');
const shell = require('electron').shell;
const exec = require('child_process').exec;
const mkdirp = require('mkdirp');

// Global Variables
let workDir, students, usernames, assignment, assignmentElement;
const folderNames = [];

// ########     BEGIN DATABASE FUNCTIONALITY     ########
// Ensure DB file exists if not Create it
let touchCommand = process.platform == 'win32' ? 'if not exist "assets\\db\\" mkdir assets\\db\\ && type nul >> .\\assets\\db\\settings.db' :
                                                 'mkdir -p assets/db/ && touch /assets/db/settings.db';

exec(touchCommand, (err) => {
    if (err) console.log(err);
});

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
    workDir = document.getElementById('workDir').value.trim();
    // Populate students global variable.
    students = Array.from(document.getElementsByClassName('studentName'));
    console.log('students data', students);
    students = students.filter((el) => {
        return el.value !== '';
    }).map(student => {
        folderNames.push(student.value.trim().split(" ").join("_"));
        return student.value.trim();
    });
    console.log('students data 2', students);

    // let newStudents = students.map(student => {
    //     return student.value.trim();
    // });
    // students = newStudents;
    // Populate assignment global variable.
    assignmentElement = document.getElementById('assignmentRepo');
    assignment = assignmentElement.value.trim();
    // Populate folder Names.
    // Populate usernames gloval variable
    usernames = Array.from(document.getElementsByClassName('studentUsername'));
    let newUsernames = usernames.map(username => {
        return username.value.trim();
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
    const studentElements = document.getElementsByClassName('studentName');
    const assignmentElement = document.getElementById('assignmentRepo');
    const usernameElements = document.getElementsByClassName('studentUsername');
    // Load workDir if available.
    db.find({ workDir: /./ }, (err, found) => {
        if (err) console.log('Error loading data', err);
        if (found.length > 0) {
            workDirElement.value = found[0].workDir;
        } else {
            console.warn('Work Directory not saved in database yet')
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
            console.warn('Students not saved in database yet')
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
            console.warn('Usernames not saved in database yet')
        }
    });
    // Load assignment if available.
    db.find({ assignment: /./ }, (err, found) => {
        if (err) console.log('Error loading data', err);
        if (found.length > 0) {
            assignmentElement.value = found[0].assignment;
        } else {
            console.warn('Work Directory not saved in database yet')
        }
    });
}
handleLoad();

const handleBatch = () => {
    gatherData();
    // ASSIGNMENT: "https://github.com/LambdaSchool/Preprocessing-Part-I"

    let re = /https:\/\/github.com\/LambdaSchool\/(.+)/g;
    const extractedAssignment = re.exec(assignment)[1];

    // Pattern https://github.com/designerexpert/Sprint-Challenge--UI-Responsive
    // Iterate over folderNames
    if (folderNames.length > 0) {
        folderNames.forEach((studentFolder, index) => {
            mkdirp(`${workDir}/${studentFolder}`, (error) => {
                console.log(studentFolder);
                console.log(students);
                console.log(folderNames);
                if (error) {
                    console.error('Failed to create folders', error);
                } else {
                    exec(`git clone https://github.com/${usernames[index]}/${extractedAssignment} ${workDir}/${studentFolder}/${extractedAssignment} || (cd ${workDir}/${studentFolder}/${extractedAssignment} && git pull)`, (err, stdout) => {
                        console.log(`${usernames[index]}:`, stdout);
                        if (err) {
                            console.error(err);
                        } else {
                            console.info('Successfully cloned/pulled from: ', usernames[index]);
                        }
                    });
                }
            });
        });
    } else {
        console.error('Please fill out at least one Student Name Field');
    }
}

const validInput = (element, errorTarget, message) => {
    if(element && (element.value !== '')) {
        errorTarget.classList.remove('error');
        return true;
    } else {
        errorTarget.classList.add('error');
        console.error('Error: ', message || '');
        return false;
    }
}

const handlePull = (event) => {
    gatherData();
    let re = /https:\/\/github.com\/.+\/(.+)/g;
    const repoName = re.exec(assignment);

    if(!validInput(repoName, assignmentElement, 'Repo name is missing or Invalid')) return;

    let extractedAssignment = repoName[1];
    // extract event element's parent's parent;
    // 2 parents deep because it is nested now
    const eventParent = event.path['1'].parentElement;

    const studentName = eventParent.querySelector('.studentName');

    if(!validInput(studentName, studentName, 'The students name has not been defined')) return;

    let studentFolder = studentName.value.split(" ").join("_");
    // const studentUsername = eventParent.querySelector(".studentUsername").value;

    exec(`cd ${workDir.trim()}\\${studentFolder.trim()}\\${extractedAssignment.trim()} && git pull`, (err) => {
        if (err) {
            console.error(err);
            eventParent.classList.add('error');
        } else {
            eventParent.classList.remove('error');
            console.info('Pull Successful');
        }
    });
}

const handleGh = (event) => {
    gatherData();
    // extract event element's parent's parent
    // 2 parents deep because it is nested now
    const eventParent = event.path['1'].parentElement;

    const currentUsername = eventParent.querySelector(".studentUsername");

    if(!validInput(currentUsername, currentUsername, 'The students username has not been defined')) return;

    shell.openExternal(`https://github.com/${currentUsername.value.trim()}?tab=repositories`);
}

const handlePR = (event) => {
    // https://github.com/LambdaSchool/Responsive-Web-Design/pulls/designerexpert
    gatherData();

    // extract event element's parent's parent;
    // 2 parents deep because it is nested now
    const eventParent = event.path['1'].parentElement;
    const currentUsername = eventParent.querySelector(".studentUsername");
    if(!validInput(currentUsername, currentUsername, 'The students username has not been defined')) return;
    if(!validInput(assignmentElement, assignmentElement, 'Repo name is missing or Invalid')) return;

    shell.openExternal(`${assignment.trim()}/pulls/${currentUsername.value.trim()}`);
}

const handleSandbox = (event) => {
    gatherData();

    let re = /https:\/\/github.com\/LambdaSchool\/(.+)/g;
    const extractedAssignment = re.exec(assignment)[1];
    const eventParent = event.path['1'].parentElement;
    const currentUsername = eventParent.querySelector(".studentUsername").value.trim();
    // Open Codesandbox on this pattern : https://codesandbox.io/s/github/username/assignment
    shell.openExternal(`https://codesandbox.io/s/github/${currentUsername}/${extractedAssignment.trim()}`);
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
