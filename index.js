const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const consTable = require('console.table');
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

function displayDept() {
    connect.promise().query('SELECT * FROM DEPARTMENT')
        .then(dept => {
            console.log('\nDISPLAYING ALL DEPARTMENTS:');
            console.table(dept[0]);
            initialize();
        })
        .catch(error => {
            console.log('ERROR!', error);
        })
}


function displayRoles() {
    var queryStr = `SELECT role.id, role.title, department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id = department.id ORDER BY role.id;`
    connect.promise().query(queryStr)
        .then(role => {
            console.log('\nDISPLAYING ALL ROLES:');
            console.log(role[0]);
            initialize();
        })
        .catch(error => {
            console.log('ERROR!', error);
        })
}