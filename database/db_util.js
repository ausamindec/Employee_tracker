const db_connection = require("./db_connection");

class databaseQueryUtil {
  constructor(db_connection) {
    this.db_connection = db_connection;
  }
  //Employee (get, add, update)
  getAllEmployees() {
    return this.db_connection.query("SELECT * FROM employee");
  }
  createEmployee(employee) {
    return this.db_connection.query("INSERT INTO employee SET ?", employee);
  }

  // Removing data queries
  removeEmployee(id) {
    return this.db_connection.query("DELETE FROM employee WHERE id = ?", id);
  }
  removeRole(id) {
    return this.db_connection.query("DELETE FROM role WHERE id = ?", id);
  }
  removeDepartment(id) {
    return this.db_connection.query("DELETE FROM department WHERE id = ?", id);
  }

  updateEmployee() {
    return this.db_connection.query(
      "UPDATE employee SET role_id = role_id WHERE first_name = name"
    );
  }

  //Role. (get, add)
  viewAllRoles() {
    return this.db_connection.query(
      "SELECT id, title, salary, department_id AS role FROM role"
    );
  }

  addRole(newRole) {
    return this.db_connection.query("INSERT INTO role SET ?", newRole);
  }

  //Department (get, add)
  viewAllDepartments() {
    return this.db_connection.query("SELECT * FROM department");
  }

  createDepartment(department) {
    return this.db_connection.query("INSERT INTO department SET ?", department);
  }

  updateEmployeeRole(employeeId, newRoleId) {
    console.log("inside query");
    return this.db_connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [newRoleId, employeeId]
    );
  }
}

module.exports = new databaseQueryUtil(db_connection);
