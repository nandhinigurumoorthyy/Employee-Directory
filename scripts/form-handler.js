document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("employeeForm");
  const urlParams = new URLSearchParams(window.location.search);
  const editingId = urlParams.get("id");

  // Load existing employees
  let employees = JSON.parse(localStorage.getItem("employeesData") || "[]");

const title = document.getElementById("formTitle");
title.textContent = editingId ? "Edit Employee" : "Add Employee";

  // If editing, pre-fill fields
  if (editingId) {
    const employee = employees.find(emp => emp.id == editingId);
    if (employee) {
      form.firstName.value = employee.firstName;
      form.lastName.value = employee.lastName;
      form.email.value = employee.email;
      form.department.value = employee.department;
      form.role.value = employee.role;
    }
  }



  form.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const newEmployee = {
      id: editingId ? parseInt(editingId) : Date.now(), 
      firstName: form.firstName.value.trim(),
      lastName: form.lastName.value.trim(),
      email: form.email.value.trim(),
      department: form.department.value,
      role: form.role.value
    };

    // Validation
    if (!newEmployee.firstName || !newEmployee.lastName || !newEmployee.email || !newEmployee.department || !newEmployee.role) {
      alert("Please fill all fields.");
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmployee.email)) {
      alert("Invalid email format.");
      return;
    }

    if (editingId) {
      const index = employees.findIndex(emp => emp.id == editingId);
      if (index !== -1) {
        employees[index] = newEmployee;
      }
    } else {
      employees.push(newEmployee);
    }

    localStorage.setItem("employeesData", JSON.stringify(employees));
    window.location.href = "index.html";
  });
});
