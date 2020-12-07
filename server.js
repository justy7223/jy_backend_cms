// Required packages & Libraries
const Inquirer = require("inquirer");
const DB = require("./utils/Database.js");
const Employee = require("./lib/Employee.js");
const Role = require("./lib/Role.js");
const Department = require("./lib/Department.js");

// Global Variables
let employee = new Employee(DB);


// This function manages the flow of the application
function init(){

    start();
}
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
    ).then((data) =>{
        switch(data.action){
            case "View All Employees":
                viewAllEmployees();
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

// This function will display a list of all employees
function viewAllEmployees(){
    let employees = employee.selectEmployees();
    
}

// // This function retrieves the employee data
// function gatherInformation() {
    
//     let prompts = preparePrompts(nextEmployee);

//     let p1 = inquirer.prompt(prompts).then((data) => {
//         // Store results in employee object
//         let lastEmployee = employees[employees.length - 1];
//         lastEmployee.setProperties(data);

//         // prepare for next round
//         nextEmployee = data.nextRole.toLowerCase();
//         if (nextEmployee !== "done") {
//             gatherInformation();
//         } else {
//             console.log(`Writing ${employees.length-1} employees data to file ${OUTPUT_PATH}`);
//             console.log(employees);
//             writeHTML(render(employees));
//         }
//     }).catch((error) => {
//         console.log(`Error:${error}`)
//     });
// }

// // This function will prepare the array of prompt objects based on role given
// function preparePrompts(role) {
//     let prompts = [];
//     let questions = [];
//     let employee;
//     switch (role.toLowerCase()) {
//         case "manager":
//             employee = new Manager();
//             break;
//         case "intern":
//             employee = new Intern();
//             break;
//         case "engineer":
//             employee = new Engineer();
//             break;
//         default:
//             console.log(`Unrecognized role (${role})`);
//             return;
//     }
//     // Store with all employees
//     employees.push(employee);
//     // Get role specific questions
//     questions = employee.getQuestions();
//     // Prepare prompts for role specific items
//     questions.forEach((q) => {
//         prompts.push({
//             name: q[0],
//             type: "input",
//             message: q[1]
//         });
//     });
//     // Add Universal prompt
//     prompts.push({
//         name: "nextRole",
//         type: "list",
//         message: "Which type of team member would you like to add:",
//         choices: ["Manager", "Engineer", "Intern", "Done"]
//     });

//     return prompts;
// }

// // This function will write the given data to the file location given
// function writeHTML(data){
//     // Check if path exists
//     if(!fs.existsSync(OUTPUT_DIR)){
//         fs.mkdirSync(OUTPUT_DIR, {recursive: true});
//     }
//     fs.writeFile(OUTPUT_PATH, data, (err) => {
//         if (err) {
//             console.log(`Error:${err}`);
//         } else {
//             console.log(`Successfully generated ${OUTPUT_PATH}!`);
//         }
    
//     console.log(employee.logHeader());
//     console.log(employees);
// }

// // This function retrieves the employee data
// function gatherInformation() {
    
//     let prompts = preparePrompts(nextEmployee);

//     let p1 = inquirer.prompt(prompts).then((data) => {
//         // Store results in employee object
//         let lastEmployee = employees[employees.length - 1];
//         lastEmployee.setProperties(data);

//         // prepare for next round
//         nextEmployee = data.nextRole.toLowerCase();
//         if (nextEmployee !== "done") {
//             gatherInformation();
//         } else {
//             console.log(`Writing ${employees.length-1} employees data to file ${OUTPUT_PATH}`);
//             console.log(employees);
//             writeHTML(render(employees));
//         }
//     }).catch((error) => {
//         console.log(`Error:${error}`)
//     });
// }

// // This function will prepare the array of prompt objects based on role given
// function preparePrompts(role) {
//     let prompts = [];
//     let questions = [];
//     let employee;
//     switch (role.toLowerCase()) {
//         case "manager":
//             employee = new Manager();
//             break;
//         case "intern":
//             employee = new Intern();
//             break;
//         case "engineer":
//             employee = new Engineer();
//             break;
//         default:
//             console.log(`Unrecognized role (${role})`);
//             return;
//     }
//     // Store with all employees
//     employees.push(employee);
//     // Get role specific questions
//     questions = employee.getQuestions();
//     // Prepare prompts for role specific items
//     questions.forEach((q) => {
//         prompts.push({
//             name: q[0],
//             type: "input",
//             message: q[1]
//         });
//     });
//     // Add Universal prompt
//     prompts.push({
//         name: "nextRole",
//         type: "list",
//         message: "Which type of team member would you like to add:",
//         choices: ["Manager", "Engineer", "Intern", "Done"]
//     });

//     return prompts;
// }

// // This function will write the given data to the file location given
// function writeHTML(data){
//     // Check if path exists
//     if(!fs.existsSync(OUTPUT_DIR)){
//         fs.mkdirSync(OUTPUT_DIR, {recursive: true});
//     }
//     fs.writeFile(OUTPUT_PATH, data, (err) => {
//         if (err) {
//             console.log(`Error:${err}`);
//         } else {
//             console.log(`Successfully generated ${OUTPUT_PATH}!`);
//         }
//     });
// }

init();
