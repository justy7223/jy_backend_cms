const Department = require("./Department.js");
const Role = require("./Role.js");

// Global Variables


class Employee {
    // class properties
    // id;
    // first_name;
    // last_name;
    // role_id
    // manager_id;

    // constructor
    constructor(connection, id = 0, firstName = "", lastName = "", roleId = 0, managerId = 0) {
        this.connection = connection;
        this.id = id;
        this.first_name = firstName;
        this.last_name = lastName;
        this.role_id = roleId;
        this.manager_id = managerId;
    }

    /***** Helper Functions ******/
    // This function will set this objects data
    setProperties(data) {
        Object.getOwnPropertyNames(this).forEach((property) => {
            if (property !== "connection") {
                this[property] = data[property];
            }
        });
    }

    // These function handle SQL DB interactions
    // This function will return a list of all employees
    printEmployees() {
        this.connection.query(
            "SELECT e.id, e.first_name, e.last_name,  r.title, d.name, r.salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name " +
            "FROM employee e " +
            "LEFT JOIN role r ON e.role_id = r.id " +
            "LEFT JOIN department d ON r.department_id = d.id " +
            "LEFT JOIN employee m ON e.manager_id = m.id ",
            function (err, res) {
                if (err) console.log(err);
                // Print employees
                console.log("\n");
                console.table(res);
            }
        );
    }
    // This function will return the employees who have the given manager
    // selectManagedEmployees(managedById) {
    //     this.connection.query("SELECT * FROM employee WHERE ?", { manager_id: managedById },
    //         function (err, res) {
    //             if (err) console.log(err);
    //             return res;
    //         }
    //     );
    // }
    // This function will return the role object for this employee
    // selectRole() {
    //     this.connection.query("SELECT * FROM role WHERE ?", { id: this.role_id },
    //         function (err, res) {
    //             if (err) console.log(err);
    //             return res;
    //         }
    //     );
    // }
    // This function will return the manager object for this employee
    // selectManager() {
    //     this.connection.query("SELECT * FROM employee WHERE ?", { id: this.manager_id },
    //         function (err, res) {
    //             if (err) console.log(err);
    //             return res;
    //         }
    //     );
    // }

    // This function will create an entry into the role table
    insertEmployee(firstName = this.first_name, lastName = this.last_name, roleId = this.role_id, managerId = this.manager_id) {
        this.connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [ firstName, lastName, roleId, managerId ],
            function (err, res) {
                if (err) console.log(err);
            }
        );
    }

    // This function will update the db for the current role
    updateEmployee(id = this.id, firstName = this.first_name, lastName = this.last_name, roleId = this.role_id, managerId = this.manager_id) {
        this.connection.query("UPDATE employee SET ? WHERE ?", [{ first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId }, { id: id }],
            function (err, res) {
                if (err) console.log(err);
            }
        );
    }

    // This function will delete the role from the db
    deleteEmployee() {
        this.connection.query("DELETE FROM employee WHERE ?", { id: this.id },
            function (err, res) {
                if (err) throw err;
            }
        );
    }
}

module.exports = Employee;