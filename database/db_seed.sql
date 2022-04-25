USE employee_data;

INSERT INTO department (name)
VALUES 
    ("Finance"),
    ("Insurance");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Accounts", 550000, 1),
    ("Banker", 23500, 1);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Amin", "Amin",1,NULL),
    ("Emika", "oliver",2,1);

