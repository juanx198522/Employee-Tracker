const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'employee_tracker_db',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

function getAllDepartments() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM department', (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
        });
    });
}

function getAllRoles() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM role', (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
        });
    });
}

function getAllEmployee() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM employee', (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
        });
    });
}

function addDepartment(departmentName) {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO department (name_department) VALUES (?)',
            [departmentName],
            (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            }
        );
    });
}

function addRole(roleName, roleSalary, roleDepartment) {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO role (title_role, salary_role, department_id) VALUES (?, ?, ?)',
            [roleName, roleSalary, roleDepartment],
            (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            }
        );
    });
}

function addEmployee(firstName, lastName, roleId, managerId) {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            [firstName, lastName, roleId, managerId],
            (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            }
        );
    });
}

module.exports = { getAllDepartments, getAllRoles, getAllEmployee, addDepartment, addRole, addEmployee };