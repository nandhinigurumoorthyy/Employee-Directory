if (!localStorage.getItem("employeesData")) {
  localStorage.setItem("employeesData", JSON.stringify(window.employeesData));
}
let employees = JSON.parse(localStorage.getItem("employeesData") || "[]");
let filteredEmployees = [...employees];
let currentIndex = 0;
let chunkSize = 10;
let isFetching = false;
let sortKey = "";
let searchTerm = "";
let currentPage = 0;



function applySearch(list) {
  if (!searchTerm) return list;
  return list.filter(emp =>
    emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

function renderCards() {
  const container = document.getElementById("employeeGrid");
  const noResultsEl = document.getElementById("noResults");
  const endMessage = document.getElementById("endOfListMessage");
  const list = applySearch(filteredEmployees);

if (sortKey && list[0]?.[sortKey]) {
  list.sort((a, b) =>
    a[sortKey].localeCompare(b[sortKey], undefined, { sensitivity: "base" })
  );
}

  // Reset the container every time
  container.innerHTML = "";
  currentIndex = 0;

  // If no items to display
  if (list.length === 0) {
    noResultsEl.style.display = "block";
     endMessage.style.display = "none";
    return;
  } else {
    noResultsEl.style.display = "none";
  }

  const slice = list.slice(currentIndex, currentIndex + chunkSize);
  slice.forEach(emp => {
    const card = document.createElement("div");
    card.classList.add("employee-card");
    card.innerHTML = `
      <strong>${emp.firstName} ${emp.lastName}</strong>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <div class="card-actions">
        <a href="form.html?id=${emp.id}"><button>Edit</button></a>
        <button onclick="deleteEmployee(${emp.id})">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });

  currentIndex += chunkSize;

    if (currentIndex >= list.length) {
    endMessage.style.display = "block";
  } else {
    endMessage.style.display = "none";
  }
}


function applyFilter() {
  const fname = document.getElementById("filterFirstName").value.trim().toLowerCase();
  const dept = document.getElementById("filterDepartment").value.trim().toLowerCase();
  const role = document.getElementById("filterRole").value.trim().toLowerCase();

  filteredEmployees = employees.filter(emp =>
    (!fname || emp.firstName.toLowerCase().includes(fname)) &&
    (!dept || emp.department.toLowerCase().includes(dept)) &&
    (!role || emp.role.toLowerCase().includes(role))
  );

  currentPage = 1;
    resetTable();
 renderCards();
  document.getElementById("filterSidebar").classList.add("hidden");
}

function openFilter() {
  document.getElementById("filterSidebar").classList.remove("hidden");
}

function closeFilter() {
location.reload();
  document.getElementById("filterSidebar").classList.add("hidden");
}

document.getElementById("sortSelect").addEventListener("change", (e) => {
  sortKey = e.target.value;
  currentIndex = 0;
  document.getElementById("employeeGrid").innerHTML = "";
  renderCards();
});


function resetTable() {
  currentIndex = 0;
  document.getElementById("employeeGrid").innerHTML = "";
}



document.getElementById("searchInput").addEventListener("input", (e) => {
  searchTerm = e.target.value;
  currentPage = 1;
   resetTable();
renderCards()
});

function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees = employees.filter(emp => emp.id !== id);
    filteredEmployees = [...employees];
    localStorage.setItem("employeesData", JSON.stringify(employees));
    location.reload();
  }
}


document.addEventListener("DOMContentLoaded", () => {
  filteredEmployees = [...employees];
renderCards()
});

document.getElementById("pageSizeSelect").addEventListener("change", (e) => {
  chunkSize = parseInt(e.target.value, 10);
  currentIndex = 0;
  renderCards();
});