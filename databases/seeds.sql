INSERT INTO department (name)
VALUE ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role (title, salary, department_id)
VALUE ('Sales Lead', 100000, 1),
      ('Salesperson', 60000, 1),
      ('Lead Engineer', 200000, 2),
      ('Software Engineer', 150000, 2),
      ('Account Manager', 175000, 3),
      ('Accountant', 120000, 3),
      ('Legal Team', 300000, 4),
      ('Lawyer', 400000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Devin', 'Smith', 1, null),
      ('Giannis', 'Tsipikas', 2, 1),
      ('Dimitri', 'Medvedev', 3, null),
      ('Sasha', 'Taylor', 4, 3),
      ('Roger', 'Zverev', 5, null),
      ('Kristina', 'Thompson', 6, 5),
      ('Madison', 'Blossom', 7, null),
      ('Hansi', 'Muller', 8, 7);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;