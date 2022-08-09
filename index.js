const inquirer = require("inquirer");
const fs = require("fs");
const jest = require("jest");

const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const distDir = path.resolve(__dirname, "dist");
const outputPath = path.join(distDir, "index.html");

const render = require("./src/page-template.js");

//Team and ID placeholder arrays
const teamArr = [];
const idArr = [];

//Validate input function
function validateInput(value) {
    if (value != "") {
        return true;
    } else {
        return  "Please enter a response.";
    }
}

//Start Application
function initApp() {
    function addManager() {
        console.log("Start building your team profile.");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "Enter your manager's name.",
                validate: validateInput,
            },
            {
                type: "input",
                name: "managerId",
                message: "Enter your manager's ID.",
                validate: function (value) {
                    if (!/^[0-9]*$/.test(value)) {
                        return "Please enter a number greater than 0.";
                    } else {
                        return true;
                    }
                },
            },
            {
                type: "input",
                name: "managerEmail",
                message: "Enter your manager's email.",
                validate: function (value) {
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                        return true;
                    } else {
                        return "Please enter valid email address.";
                    }
                },
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "Enter your manager's office number.",
                validate: function (value) {
                    if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value)) {
                        return "Please enter a a valid phone number.";
                    } else {
                        return true;
                    }
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamArr.push(manager);
            idArr.push(answers.managerId);
            addTeam();
        });

    }

    function addTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "What would you like to add to your team?",
                choices: ["Engineer", "Intern", "I'm done adding team members."]
            }
        ]).then(userChoice => {
            switch (userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    generateHTML();
            }
        });
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "Enter your engineer's name.",
                validate: validateInput,
            },
            {
                type: "input",
                name: "engineerId",
                message: "Enter your engineer's ID.",
                validate: validateInput,
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "Enter your engineer's email.",
                validate: validateInput,
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "Enter your engineer's Github username.",
                validate: validateInput,
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamArr.push(engineer);
            idArr.push(answers.engineerId);
            addTeam();
        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "Enter your intern's name.",
                validate: validateInput,
            },
            {
                type: "input",
                name: "internId",
                message: "Enter your intern's ID.",
                validate: validateInput,
            },
            {
                type: "input",
                name: "internEmail",
                message: "Enter your intern's email.",
                validate: validateInput,
            },
            {
                type: "input",
                name: "internSchool",
                message: "Enter your intern's school.",
                validate: validateInput,
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamArr.push(intern);
            idArr.push(answers.internId);
            addTeam();
        });
    }

    function generateHTML() {
        if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir);
        }
        console.log("Generating Team Profile...");
        fs.writeFileSync(outputPath, render(teamArr), "utf8");

    }

    addManager();
}

initApp();