const { getAllDepartments } = require('./database');
const { getAllRoles } = require('./database');
const { getAllEmployee } = require('./database');

function displayAllDepartments() {
    getAllDepartments()
        .then((departments) => {
            console.table(departments);
        })
        .catch((err) => {
            console.error('Error retrieving departments:', err);
        });
}

function displayAllRole() {
    getAllRoles()
        .then((role) => {
            console.table(role);
        })
        .catch((err) => {
            console.error('Error retrieving roles:', err);
        });
}

function displayAllEmployee() {
    getAllEmployee()
        .then((role) => {
            console.table(role);
        })
        .catch((err) => {
            console.error('Error retrieving employes:', err);
        });
}
module.exports = { displayAllDepartments, displayAllRole, displayAllEmployee };