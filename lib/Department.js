class Department {
    // class properties
    // id;
    // name;

    // constructor
    constructor(connection, id = 0, name = "") {
        this.connection = connection;
        this.id = id;
        this.name = name;
    }

    // class functions
    getId() { return this.id; }
    getName() { return this.name; }
    
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
    // This function will populate based on department_id given
    selectDepartment(selectId) {
        this.connection.query("SELECT * FROM department WHERE ?", { id: selectId },
            function (err, res) {
                if (err) console.log(err);
                this.setProperties(res[0]);
            }
        );
    }
    // This function will print a list of all departments
    printDepartments(){
        this.connection.query(
            "SELECT d.id, d.name " +
            "FROM department d ",
            function (err, res) {
                if (err) console.log(err);
                // Print departments
                console.log("\n");
                console.table(res);
            }
        );
    }
    // This function will create an entry into the department table
    insertDepartment(departmentName = this.name){
        this.connection.query("INSERT INTO department (name) VALUES (?)", [departmentName] ,
            function (err, res) {
                if (err) console.log(err);
                return res;
            }
        );
    }

    // This function will update the db for the current department
    updateDepartment() {
        this.connection.query("UPDATE department SET ? WHERE ?", { name: this.name }, { id: this.id },
            function (err, res) {
                if (err) console.log(err);
                return res;
            }
        );
    }

    // This function will delete the department from the db
    deleteDepartment() {
        this.connection.query("DELETE FROM department WHERE ?", { id: this.id },
            function (err, res) {
                if (err) console.log(err);
                return res;
            }
        );
    }
}

module.exports = Department;