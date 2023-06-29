console.log(`

███████ ███    ███ ██████  ██       ██████  ██    ██ ███████ ███████     ████████ ██████   █████   ██████ ██   ██ ███████ ██████  
██      ████  ████ ██   ██ ██      ██    ██  ██  ██  ██      ██             ██    ██   ██ ██   ██ ██      ██  ██  ██      ██   ██ 
█████   ██ ████ ██ ██████  ██      ██    ██   ████   █████   █████          ██    ██████  ███████ ██      █████   █████   ██████  
██      ██  ██  ██ ██      ██      ██    ██    ██    ██      ██             ██    ██   ██ ██   ██ ██      ██  ██  ██      ██   ██ 
███████ ██      ██ ██      ███████  ██████     ██    ███████ ███████        ██    ██   ██ ██   ██  ██████ ██   ██ ███████ ██   ██ 
                                                                                                                                  
                                                                                                                                  
`);

const express = require('express');
const inquirer = require('inquirer');
const { displayAllDepartments, displayAllRole, displayAllEmployee } = require('./views');
const { getAllDepartments, getAllRoles, addDepartment, addRole, addEmployee, updateEmployeeRole, getAllEmployee } = require('./database');

function showMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'option',
                message: 'Choose an option:',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                ],
            },
        ])
        .then((answers) => {
            const { option } = answers;
            switch (option) {
                case 'View all departments':
                    displayAllDepartments(showMenu);
                    break;
                case 'View all roles':
                    displayAllRole(showMenu);
                    break;
                case 'View all employees':
                    displayAllEmployee(showMenu);
                    break;
                case 'Add a department':
                    addDepartmentPrompt();
                    break;
                case 'Add a role':
                    addRolePrompt();
                    break;
                case 'Add an employee':
                    addEmployeePrompt();
                    break;
                case 'Update an employee role':
                    updateEmployeeRolePrompt();
                    break;
                default:
                    console.log('Invalid option.');
            }
        })
        .catch((err) => {
            console.error('Error:', err);
        });
}

function addDepartmentPrompt() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the department:',
            },
        ])
        .then((answers) => {
            const { departmentName } = answers;
            addDepartment(departmentName)
                .then(() => {
                    console.log('Department added successfully!');
                    showMenu();
                })
                .catch((err) => {
                    console.error('Error adding department:', err);
                    showMenu();
                });
        })
        .catch((err) => {
            console.error('Error:', err);
        });
}

function addRolePrompt() {
    getAllDepartments()
        .then((departments) => {
            const departmentChoices = departments.map((department) => ({
                name: department.name_department,
                value: department.id,
            }));
            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'roleName',
                        message: 'Enter the name of the role:',
                    },
                    {
                        type: 'input',
                        name: 'roleSalary',
                        message: 'Enter the salary of the role:',
                    },
                    {
                        type: 'list',
                        name: 'roleDepartment',
                        choices: departmentChoices,
                    },
                ])
                .then((answers) => {
                    const { roleName, roleSalary, roleDepartment } = answers;
                    addRole(roleName, roleSalary, roleDepartment)
                        .then(() => {
                            console.log('Role added successfully!');
                            showMenu();
                        })
                        .catch((err) => {
                            console.error('Error adding role:', err);
                            showMenu();
                        });
                })
                .catch((err) => {
                    console.error('Error:', err);
                });
        });
}

function addEmployeePrompt() {
    getAllRoles()
        .then((roles) => {
            const roleChoices = roles.map((role) => ({
                name: role.title_role,
                value: role.id,
            }));
            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'Enter the employee first name:',
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'Enter the employee last name:',
                    },
                    {
                        type: 'list',
                        name: 'roleID',
                        message: 'Select the employee role:',
                        choices: roleChoices,
                    },
                    {
                        type: 'input',
                        name: 'managerId',
                        message: "Enter the employee's manager ID:",
                    }
                ])
                .then((answers) => {
                    const { firstName, lastName, roleId, managerId } = answers;
                    addEmployee(firstName, lastName, roleId, managerId)
                        .then(() => {
                            console.log('Employee added successfully!');
                            showMenu();
                        })
                        .catch((err) => {
                            console.error('Error adding employee:', err);
                            showMenu();
                        });
                })
                .catch((err) => {
                    console.error('Error:', err);
                });
        });
}

function updateEmployeeRolePrompt() {
    getAllEmployee()
        .then((employees) => {
            const employeeChoices = employees.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            }));
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'employeeId',
                        message: 'Select the employee:',
                        choices: employeeChoices,
                    },
                    {
                        type: 'input',
                        name: 'newRoleId',
                        message: 'Enter the new role ID:',
                    },
                ])
                .then((answers) => {
                    const { employeeId, newRoleId } = answers;
                    updateEmployeeRole(newRoleId, employeeId)
                        .then(() => {
                            console.log('Employee role updated successfully!');
                            showMenu();
                        })
                        .catch((err) => {
                            console.error('Error updating employee role:', err);
                            showMenu();
                        });
                })
                .catch((err) => {
                    console.error('Error:', err);
                });
        });
}

showMenu();