const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const {defaultQ, addDeptQ, addRoleQ, addEmpQ, updateEmpQ} = require('./questions/questions');

const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'trackerDB',
    password: ''
});

function initialize() {
    inquirer.prompt(defaultQ)
    .then(response => {
        response = response.userChoice;
        switch(response) {
            case 'View Departments':
                displayDept();
                break;
            case 'View Roles':
                displayRoles();
                break;
            case 'View Employees':
                displayEmp();
                break;
            case 'Add Department':
                additionalDept();
                break;
            case 'Add Role':
                additionalRole();
                break;
            case 'Add Employee':
                additionalEmp();
                break;
            case 'Update Employee Role':
                updateEmpRole();
                break;
            case 'Exit':
                console.log("Thanks for visiting!");
                break;
            default:
                break;
        }
    })
    .catch(error => {
        if(error) {
            console.log('ERROR!', error);
        }
    })
};

initialize();

