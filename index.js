//  Globals.
const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const genHtml = require("./util/generateHtml");
var hasManager = false;
const team = [];


// Start asking for user input.
function prompts() {
    if (hasManager === false) {
        inquirer.prompt([
            {
                type: 'input',
                message: "Enter the Manager's name",
                name: 'managerName',
            },
            {
                type: 'input',
                message: "Enter the Manager's employee ID.",
                name: 'managerId',
            },
            {
                type: 'input',
                message: "Enter the Manager's email address.",
                name: 'managerEmail',
            },
            {
                type: 'input',
                message: "Enter the Manager's office number.",
                name: 'managerOfficeNumber',
            },
        ]).then((response) => {
            hasManager = true;
            const manager = new Manager(response.managerName,
                response.managerId,
                response.managerEmail,
                response.managerOfficeNumber)
            team.push(manager);
            prompts();
        });
    } else {
        inquirer.prompt([
            {
                type: 'list',
                message: "Who would you like to add to the team?",
                name: 'addMembers',
                choices: ["Engineer", "Intern", "Finish", "Quit"],
            },
        ]).then((response) => {
            if (response.addMembers == "Engineer") {
                inquirer.prompt([
                    {
                        type: 'input',
                        message: "Enter the Engineer's name",
                        name: 'engineerName',
                    },
                    {
                        type: 'input',
                        message: "Enter the Engineer's employee ID.",
                        name: 'engineerId',
                    },
                    {
                        type: 'input',
                        message: "Enter the Engineer's email address.",
                        name: 'engineerEmail',
                    },
                    {
                        type: 'input',
                        message: "Enter the Engineer's GitHub username.",
                        name: 'engineerGithub',
                    },
                ]).then((response) => {
                    const engineer = new Engineer(response.engineerName,
                        response.engineerId,
                        response.engineerEmail,
                        response.engineerGithub)
                    team.push(engineer);
                    prompts();
                });
            } else if (response.addMembers == "Intern") {
                inquirer.prompt([
                    {
                        type: 'input',
                        message: "Enter the Intern's name",
                        name: 'internName',
                    },
                    {
                        type: 'input',
                        message: "Enter the Intern's employee ID.",
                        name: 'internId',
                    },
                    {
                        type: 'input',
                        message: "Enter the Intern's email address.",
                        name: 'internEmail',
                    },
                    {
                        type: 'input',
                        message: "Enter the Intern's school name.",
                        name: 'internSchool',
                    },
                ]).then((response) => {
                    const intern = new Intern(response.internName,
                        response.internId,
                        response.internEmail,
                        response.internSchool)
                    team.push(intern);
                    prompts();
                });
            } else if (response.addMembers == "Finish") {
                fs.writeFile("./dist/index.html", genHtml(team), function(err){
                    if(err){
                        console.log("Error writing file");
                    }
                })
            } else {
                return;
            }
        });
    }
}

prompts();
