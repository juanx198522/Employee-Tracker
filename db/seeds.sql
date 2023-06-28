USE employee_tracker_db;

INSERT INTO department (id, name_department)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Legal");

INSERT INTO role (id, title_role, salary_role, department_id)
VALUES (1, "Salesperson", 1000.00, 1),
       (2, "Lead Engineer", 2000.00, 2),
       (3, "Software Engineer", 3000.00, 2),
       (4, "Account Manager", 4000.00, 3),
       (5, "Accountant", 5000.00, 3),
       (6, "Legal Team Lead", 6000.00, 4),
       (7, "Lawyer", 7000.00, 4);
       
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
  (1, 'John', 'Doe', 1, NULL),
  (2, 'Jane', 'Smith', 2, 1),
  (3, 'Michael', 'Johnson', 3, NULL),
  (4, 'Emily', 'Williams', 4, 3),
  (5, 'David', 'Brown', 5, 3);