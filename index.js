const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const hasManager = false;

// Start asking for user input.
function main() {
    if (hasManager === false) {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: "Enter the Team Manager's name",
                    name: 'managerName',
                },
            ]).then((response) =>
                response.confirm === response.password
                    ? console.log('Success!')
                    : console.log('You forgot your password already?!')
            );
    }
}
