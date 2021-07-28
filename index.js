const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const consTable = require('console.table');
const {defaultQ, addDeptQ, addRoleQ, addEmpQ, updateEmpQ} = require('./questions/questions');

const connect = mysql2.createConnection({
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

function displayEmp() {
    var queryStr = `SELECT emp.id, emp.first_name, emp.last_name, role.title AS title, department.name AS department, role.salary AS salary, (SELECT CONCAT(first_name, ' ', last_name) FROM employee WHERE id = emp.manager_id) AS manager FROM employee emp INNER JOIN role ON emp.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY emp.id;`
    connect.promise().query(queryStr)
        .then(emp => {
            console.log('\nDISPLAYING ALL EMPLOYEES:');
            console.log(emp[0]);
            initialize();
        })
        .catch(error => {
            console.log('ERROR!', error);
        })
}

function additionalDept() {
    inquirer.prompt(addDeptQ)
        .then(response => {
            response = response.newDept;
            connect.query(`INSERT INTO department (name) VALUES ('${response}')`, function (error,result) {
                if(error) {
                    throw error;
                }
                console.log(`${response} has been added to the database!`)
                initialize();
            });
        })
}

function additionalRole() {
    connection.promise().query('SELECT * FROM department')
    .then(dept => {
      var deptTbl = dept[0];
      var index = 0;
      while(index < deptTbl.length) {
          addRoleQ[2].choices.push(deptTbl[i].name);
          index += 1;
      }
      inquirer.prompt(addRoleQ)
      .then(response => {
        var deptName = response.newDept;
        connection.promise().query(`SELECT * FROM department WHERE name = '${deptName}'`)
        .then(dept => {
          var deptId = dept[0][0].id;
          connection.query(`INSERT INTO role (title, salary, department_id) VALUE ('${answer.roleName}', ${Number(answer.roleSalary)}, ${deptId})`, error => {
            if(error) {
                throw error;
            }
            console.log(`${response} has been added to the database!`);
            initialize();
          })
        })
        .catch(error => {
          console.log('ERROR!', error)
        })
      })
      .catch(error => {
        console.log('ERROR!', error)
      })
    })
    .catch(error => {
      console.log('ERROR!', error)
    })
}

function additionalEmp() {
    connection.promise().query('SELECT * FROM role')
    .then(role => {
      var roleTbl = role[0]
      var index = 0;
      while(index < roleTbl.length) {
        addEmpQ[2].choices.push({
            name: roleTbl[i].title,
            value: roleTbl[i].id
        });
        index += 1;
      }
      connection.promise().query('SELECT * FROM employee WHERE manager_id IS NULL')
      .then(role2 => {
        var managers = role2[0];
        var index2 = 0;
        while(index2 < managers.length) {
            addEmpQ[3].choices.push({
                'name': manager[i].first_name + ' ' + manager[i].last_name, 
                value: manager[i].id 
            })
        }
        inquirer.prompt(addEmpQ)
        .then(response => {
          const {newEmployeeFirstName, newEmployeeLastName, newEmployeeRole, newEmployeeManagerRole} = response;
          var value = [newEmployeeFirstName, newEmployeeLastName, newEmployeeRole, newEmployeeManagerRole];
          var query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
          connection.promise().query(query, value)
          .then(response2 => {
            console.log(`${response2} has been added to the database!`)
            initialize();
          })
        })
      })
    })
}

function updateEmpRole() {
    connection.promise().query('SELECT * FROM employee')
    .then(response => {
      var employees = response[0];
      var index = 0;
      while(index < employees.length) {
        updateEmpQ[0].choices.push({
            'name': employees[i].first_name + ' ' + employees[i].last_name, 
            value: employees[i].id 
        })
        index += 1;
      }
      connection.promise().query('SELECT * FROM role')
      .then(response2 => {
        var roles2 = response2[0];
        var index2 = 0;
        while(index2 < roles2.length){
            updateEmpQ[1].choices.push({
                'name': roles2[i].title, 
                value: roles2[i].id
            })
            index += 1;
        }
        inquirer.prompt(updateEmpQ)
        .then(answers => {
          console.log('Answers:', answers)
          connection.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.newRole, answers.empName])
          .then(response3 => {
            console.log(`${response3} has been updated to the database!`)
            initialize
          })
          .catch(error => {
            console.log('ERROR!', error)
          })
        })
      })
    })
}