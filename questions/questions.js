const defaultQ = [
    {
        type: 'list',
        message: 'Welcome! Please select from the following options:',
        choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit'],
        name: 'userChoice'
    }
];

const addDeptQ = [
    {
      type: 'input',
      message: 'Please enter the name of the new department.',
      name: 'newDept'
    }
];

const addRoleQ = [
    {
      type: 'input',
      message: 'Enter the role name.',
      name: 'roleName'
    },
    {
      type: 'input',
      message: 'Enter the expected salary for the role.',
      name: 'roleSalary'
    },
    {
      type: 'list',
      message: 'Enter the department assigned for the role.',
      choices: [],
      name: 'deptName',
    }
]

const addEmpQ = [
    {
      type: 'input',
      message: `Enter the employee's first name.`,
      name: 'empFirst'
    },
    {
      type: 'input',
      message: `Enter the employee's last name`,
      name: 'empLast'
    },
    {
      type: 'list',
      message: "Enter the employee's role",
      name: 'empRole',
      choices: []
    },
    {
      type: 'list',
      message: "Enter the employee's manager",
      choices: [{name: 'None', value: null}],
      name: 'empManager',
    }
]
