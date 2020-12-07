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

        this.role = null;
        if(this.role_id > 0){
            this.role = new Role(this.connection);
            this.role.selectRole(this.role_id);
        }
        this.manager = null;
        if(this.manager_id > 0){
            this.manager = new Employee(this.connection);
            this.manager.selectRole(this.manager_id);
        }
    }

    // class functions
    getId() { return this.id; }
    getFirstName() { return this.first_name; }
    getLastName() { return this.last_name; }
    getRoleId() { return this.role_id; }
    getManagerId() { return this.manager_id; }
    
    /***** Helper Functions ******/
    // This function will set this objects data
    setProperties(data){
        Object.getOwnPropertyNames(this).forEach((property) => {            
            if(property !== "connection"){
                this[property] = data[property];
            }
        });
    }

    // These function handle SQL DB interactions
    // This function will populate based on role_id given
    selectEmployee(selectId) {
        this.connection.query(
            "SELECT e.id, e.first_name, e.last_name,  r.title, d.name, r.salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name "+
            "FROM employee e "+
            "LEFT JOIN role r ON e.role_id = r.id "+
            "LEFT JOIN department d ON r.department_id = d.id "+
            "LEFT JOIN employee m ON e.manager_id = m.id "+
            "WHERE e.?", { id: selectId },
            function (err, res) {
                if (err) throw err;
                return res;
            }
        );
    }
    // This function will return a list of all employees
    selectEmployees(){
        this.connection.query(
            "SELECT e.id, e.first_name, e.last_name,  r.title, d.name, r.salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name "+
            "FROM employee e "+
            "LEFT JOIN role r ON e.role_id = r.id "+
            "LEFT JOIN department d ON r.department_id = d.id "+
            "LEFT JOIN employee m ON e.manager_id = m.id ",
            function (err, res) {
                if (err) throw err;
                logHeader();
                for(let i=0; i<res.length; i++){
                    logEmployee(res[i]);
                }
                return res;
            }
        );
    }
    // This function will return the employees who have the given manager
    selectManagedEmployees(managedById){
        this.connection.query("SELECT * FROM employee WHERE ?", { manager_id: managedById },
            function (err, res) {
                if (err) throw err;
                return res;
            }
        );
    }
    // This function will return the role object for this employee
    selectRole(){
        this.connection.query("SELECT * FROM role WHERE ?", { id: this.role_id },
            function (err, res) {
                if (err) throw err;
                return res;
            }
        );
    }
    // This function will return the manager object for this employee
    selectManager(){
        this.connection.query("SELECT * FROM employee WHERE ?", { id: this.manager_id },
            function (err, res) {
                if (err) throw err;
                return res;
            }
        );
    }

    // This function will create an entry into the role table
    insertEmployee() {
        this.connection.query("INSERT INTO employee SET (?, ?, ?, ?)", { first_name: this.first_name, last_name: this.last_name, role_id: this.role_id, manager_id: this.manager_id },
            function (err, res) {
                if (err) throw err;
                return res;
            }
        );
    }

    // This function will update the db for the current role
    updateEmployee() {
        this.connection.query("UPDATE employee SET ? WHERE ?", { first_name: this.first_name, last_name: this.last_name, role_id: this.role_id, manager_id: this.manager_id }, { id: this.id },
            function (err, res) {
                if (err) throw err;
                return res;
            }
        );
    }

    // This function will delete the role from the db
    deleteEmployee() {
        this.connection.query("DELETE FROM employee WHERE ?", { id: this.id },
            function (err, res) {
                if (err) throw err;
                return res;
            }
        );
    }

    // This function will print the employee in a nice table-like format
    logHeader(){
        return `| id   | first_name   | last_name   | title   | department   | salary   | manager   |\n`+
               `  --     ----------     ---------     -----     ----------     ------     -------    `;
    }
    logEmployee(data){
        // Get Department
        return `| ${data.id}   | ${data.first_name}   | ${data.last_name}   | ${data.title}   | ${data.salary}   | ${data.name}   | ${data.manager_first_name} ${data.manager_last_name}   |`;
    }
}

module.exports = Employee;