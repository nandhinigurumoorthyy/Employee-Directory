<#if employee?? == false>
  <#assign employee = {
    "id": 1,
    "firstName": "Alice",
    "lastName": "Johnson",
    "email": "alice@example.com",
    "department": "Engineering",
    "role": "Frontend Developer"
  }>
</#if>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${employee?? ? "Edit Employee" : "Add Employee"}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="styles/style.css" />
</head>
<body>
  <main class="form-container">
    <h2>${employee?? ? "Edit Employee" : "Add New Employee"}</h2>

    <form id="employeeForm" onsubmit="return validateForm(event)">
      <input type="hidden" id="empId" name="id" value="${employee?if_exists.id!''}" />

      <label for="firstName">First Name*</label>
      <input type="text" id="firstName" name="firstName" value="${employee?if_exists.firstName!''}" required />

      <label for="lastName">Last Name*</label>
      <input type="text" id="lastName" name="lastName" value="${employee?if_exists.lastName!''}" required />

      <label for="email">Email*</label>
      <input type="email" id="email" name="email" value="${employee?if_exists.email!''}" required />

      <label for="department">Department*</label>
      <input type="text" id="department" name="department" value="${employee?if_exists.department!''}" required />

      <label for="role">Role*</label>
      <input type="text" id="role" name="role" value="${employee?if_exists.role!''}" required />

      <div class="form-buttons">
        <button type="submit">${employee?? ? "Update" : "Add"} Employee</button>
        <a href="index.html"><button type="button">Cancel</button></a>
      </div>
    </form>

    <div id="formError" class="error-message"></div>
  </main>

  <script src="scripts/form-handler.js"></script>
</body>
</html>
