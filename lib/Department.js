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
    // This function will populate based on role_id given
    selectDepartment(selectId) {
        this.connection.query("SELECT * FROM department WHERE ?", { id: selectId },
            function (err, res) {
                if (err) throw err;
                return res;
            }
        );
    }

    // This function will create an entry into the role table
    insertDepartment() {
        this.connection.query("INSERT INTO department SET (?)", { name: this.name },
            function (err, res) {
                if (err) throw err;
                return res;
            }
        );
    }

    // This function will update the db for the current role
    updateDepartment() {
        this.connection.query("UPDATE department SET ? WHERE ?", { name: this.name }, { id: this.id },
            function (err, res) {
                if (err) throw err;
                return res;
            }
        );
    }

    // This function will delete the role from the db
    deleteDepartment() {
        this.connection.query("DELETE FROM department WHERE ?", { id: this.id },
            function (err, res) {
                if (err) throw err;
                return res;
            }
        );
    }
}

module.exports = Department;