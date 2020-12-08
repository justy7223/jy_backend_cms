// Required packages & Libraries
const Inquirer = require("inquirer");
const DB = require("./utils/Database.js");
const MySQL = require("mysql2");
const Employee = require("./lib/Employee.js");
const Role = require("./lib/Role.js");
const Department = require("./lib/Department.js");

// Global Variables
let employee = new Employee(DB);
let role = new Role(DB);
let department = new Department(DB);


// This is the entry point of the user interface
function start() {
    let question = "What would you like to do?";
    let options = [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "Add Role",
        "Remove Role",
        "Update Role Department",
        "View All Departments",
        "Add Department",
        "Remove Department",
        "Exit"
    ];
    Inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: question,
            choices: options
        }
    ).then((data) => {
        switch (data.action) {
            case "View All Employees":
                employee.selectEmployees();
                start();
                break;
            case "View All Roles":
                role.printRoles();
                start();
                break;
            case "View All Departments":
                department.printDepartments();
                start();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Exit":
                console.log("Thank you for using our HR Employee Tracker. Have a great day.");
                break;
            default:
                console.log(`Action (${data.action}) is not supported.`);
                start();
                break;
        }
    });
}

// This function will handle adding a role
function addRole() {
    let departments = [];
    // First get the list of departments    
    DB.query("SELECT * FROM department",
        function (err, res) {
            if (err) console.log(err);
            for (let i = 0; i < res.length; i++){
                if(res[i].name){
                    departments.push(res[i].name);
                }
            }            
            
            // Get the role details
            let questions = [
                "What is the role title you would like to add?",
                "What is the role salary?",
                "What is the role department?"];
            Inquirer.prompt([
                {
                    name: "title",
                    type: "input",
                    message: questions[0]
                },
                {
                    name: "salary",
                    type:"number",
                    message:questions[1]
                },
                {
                    name:"department",
                    type:"list",
                    message: questions[2],
                    choices: departments
                }
            ]).then((data) => {
                // get the department to tie to 
                let departmentId = 0;
                for(let i=0; i<res.length; i++){
                    if(res[i].name === data.department){
                        departmentId = res[i].id;
                        break;                        
                    }
                }
                role.insertRole(data.title, data.salary, departmentId);
                start();
            });

        }
    );
}

// This function will handle adding a role
function addDepartment(){
    let question = "What department would you like to add?";
    Inquirer.prompt(
        {
            name: "department",
            type: "input",
            message: question            
        }
    ).then((data) => {
        department.insertDepartment(data.department);
        start();
    });
}

// This function will handle the add employee requests
function addEmployee(){
    let questions = [
        "What is employee's first name?",
        "What is employee's last name?",
        "What is employee's role?",
        "Who is employee's manager?"];
    
    let roles = role.selectRoles();
    let employees = employee.selectEmployees();
    let roleOptions = [];
    let managerOptions = [];
    for (let i=0; i< roles.length; i++){
        roleOptions.push(roles[i].title);
    }
    roleOptions.push("No Role (Free-Loader)");
    for (let i=0; i< employees.length; i++){
        managerOptions.push(employees[i].first_name+" "+employees[i].last_name);
    }
    managerOptions.push("No Manager");
   
    Inquirer.prompt(
        {
            name: "firstName",
            type: "input",
            message: questions[0]
        },
        {
            name: "lastName",
            type: "input",
            message: questions[1]
        },
        {
            name:"role",
            type:"list",
            message:question[2],
            choices:roleOptions
        },
        {
            name:"manager",
            type:"list",
            message:question[3],
            choices: managerOptions
        }
    ).then((data) => {
        console.log(data);
    });
}

start();
