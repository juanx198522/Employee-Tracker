const { getAllDepartments, getAllRoles, getAllEmployee } = require('./database');

function displayAllDepartments(showMenu) {
    getAllDepartments()
        .then((departments) => {
            console.table(departments);
            showMenu()
        })
        .catch((err) => {
            console.error('Error retrieving departments:', err);
            showMenu()
        });
}

function displayAllRole(showMenu) {
    getAllRoles()
        .then((role) => {
            console.table(role);
            showMenu()
        })
        .catch((err) => {
            console.error('Error retrieving roles:', err);
            showMenu()
        });
}

function displayAllEmployee(showMenu) {
    getAllEmployee()
        .then((role) => {
            console.table(role);
            showMenu()
        })
        .catch((err) => {
            console.error('Error retrieving employes:', err);
            showMenu()
        });
}
module.exports = { displayAllDepartments, displayAllRole, displayAllEmployee };