const inquirer = require("inquirer");
const db_util = require("./database/db_util.js");
const db_query_util = require("./database/db_util.js");

init();

function init() {
  inquirer
    .prompt({
      message: "What would you wanna do?",
      name: "option",
      type: "list",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Departments",
        "View Roles",
        "View Employees",
        "Update Employee Role",
        "Delete Employee",
        "Delete Role",
        "Delete Department",
        "Quit",
      ],
    })
    .then((answer) => {
      console.log(answer);

      if (answer.option == "View Employees") {
        return viewAllEmployees();
      } else if (answer.option == "View Roles") {
        return viewAllRoles();
      } else if (answer.option == "View Departments") {
        return viewAllDepartments();
      } else if (answer.option == "Add Employee") {
        return addEmployee();
      } else if (answer.option == "Add Role") {
        return addRole();
      } else if (answer.option == "Add Department") {
        return addDepartment();
      } else if (answer.option == "Update Employee Role") {
        return updateEmployee();
      } else if (answer.option == "Delete Employee") {
        return deleteRole();
      } else if (answer.option == "Delete Department") {
        return deleteDepartment();
      } else if (answer.option == "Update Employee Role") {
        return updateEmployee();
      } else {
        return quit();
      }
    });
}

let viewAllEmployees = async () => {
  const employees = await db_query_util.getAllEmployees();
  console.table(employees);
  init();
};

let viewAllRoles = async () => {
  const role = await db_query_util.viewAllRoles();
  console.table(role);
  init();
};

/**
 * This function is an asynchronous function that calls the viewAllDepartments function from the
 * db_query_util file, which returns a promise that resolves to an array of objects.
 *
 * The function then logs the array of objects to the console using the console.table method.
 *
 * Finally, the function calls the init function to restart the application
 */
let viewAllDepartments = async () => {
  const departments = await db_query_util.viewAllDepartments();
  console.table(departments);
  init();
};

let addDepartment = async () => {
  const department = await inquirer.prompt({
    type: "input",
    message: "Please enter the name of department?",
    name: "name",
  });
  await db_query_util.createDepartment(department);
  init();
};

let addEmployee = async () => {
  const rolesOptions = await db_util.viewAllRoles();
  const managerOptions = await db_util.getAllEmployees();

  const employeeToAdd = await inquirer.prompt([
    {
      type: "input",
      message: "Enter the first name of the employee?",
      name: "first_name",
    },
    {
      type: "input",
      message: "Enter the last name of the employee?",
      name: "last_name",
    },
  ]);

  var roleChoicesList = rolesOptions.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await inquirer.prompt({
    type: "list",
    name: "roleId",
    message: "Enter the employees role?",
    choices: roleChoicesList,
  });

  const managerChoicesList = managerOptions.map(
    ({ first_name, last_name, id }) => ({
      name: first_name + last_name,
      value: id,
    })
  );
  if (managerChoicesList && managerChoicesList.length > 0) {
    const { managerId } = await inquirer.prompt({
      type: "list",
      name: "managerId",
      message: "Please select this new employees manager:",
      choices: managerChoicesList,
    });
    employeeToAdd.manager_id = managerId;
  }

  employeeToAdd.role_id = roleId;

  await db_util.createEmployee(employeeToAdd);

  init();
};
let addRole = async () => {
  const departments = await db_query_util.viewAllDepartments();
  const departmentsList = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const roleToAdd = await inquirer.prompt([
    {
      type: "input",
      message: "Please enter the name of the role?",
      name: "title",
    },
    {
      type: "input",
      message: "Enter the salary amount for this role?",
      name: "salary",
    },
    {
      type: "list",
      message: "What is the department id number?",
      name: "department_id",
      choices: departmentsList,
    },
  ]);

  await db_query_util.addRole(roleToAdd);
  init();
};
let updateEmployee = async () => {
  const employeeOptions = await db_util.getAllEmployees();

  const rolesOptions = await db_util.viewAllRoles();
  console.log(rolesOptions);

  const employeeOptionsToChooseFrom = employeeOptions.map(
    ({ id, first_name, last_name }) => ({
      name: first_name + last_name,
      value: id,
    })
  );

  const rolesOptionsToChooseFrom = rolesOptions.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { employeeId } = await inquirer.prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Select the employee whose role you wish to change:",
      choices: employeeOptionsToChooseFrom,
    },
  ]);

  const { roleId } = await inquirer.prompt([
    {
      type: "list",
      name: "roleId",
      message: "What new role would you like to assign to this employee?",
      choices: rolesOptionsToChooseFrom,
    },
  ]);

  await db_util.updateEmployeeRole(employeeId, roleId);
  init();
};

let deleteEmployee = async () => {
  const employeeOptions = await db_util.getAllEmployees();

  const employeeOptionsToChooseFrom = employeeOptions.map(
    ({ id, first_name, last_name }) => ({
      name: first_name + last_name,
      value: id,
    })
  );

  const { employeeId } = await inquirer.prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee would you like to delete?",
      choices: employeeOptionsToChooseFrom,
    },
  ]);
  await db_util.removeEmployee(employeeId);
  init();
};

let deleteRole = async () => {
  const rolesOptions = await db_util.viewAllRoles();

  const rolesOptionsToChooseFrom = rolesOptions.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await inquirer.prompt([
    {
      type: "list",
      name: "roleId",
      message: "Which role would you like to delete?",
      choices: rolesOptionsToChooseFrom,
    },
  ]);

  await db_util.removeRole(roleId);
  init();
};

let deleteDepartment = async () => {
  const departmentOptions = await db_util.viewAllDepartments();

  const departmentOptionsToChooseFrom = departmentOptions.map(
    ({ id, name }) => ({ name: name, value: id })
  );

  const { departmentId } = await inquirer.prompt({
    type: "list",
    name: "departmentId",
    message: "Which department would you like to delete?",
    choices: departmentOptionsToChooseFrom,
  });
  await db_util.removeDepartment(departmentId);
  init();
};
function quit() {
  process.exit();
}
