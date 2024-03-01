document.addEventListener("DOMContentLoaded", function () {
  const employeeList = document.getElementById("employee-list");
  const filterButtons = document.querySelectorAll(".filter-btn");

  function displayEmployees(entitiesList) {
    let displayMenu = entitiesList
      .map(function (entity) {
        return `<tr>
                    <td>${entity.text}</td>
                    <td>${entity.label}</td>
                </tr>`;
      })
      .join("");

    employeeList.innerHTML = displayMenu;
  }

  // Call displayEmployees with initial entities list
  displayEmployees(entitiesListFromDjango);

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const position = this.dataset.id;
      console.log("Filter clicked:", position); // Log for debugging
      filterEmployees(position);
    });
  });

  function filterEmployees(position) {
    let filteredEntities;
    if (position === "all") {
      filteredEntities = entitiesListFromDjango;
    } else {
      filteredEntities = entitiesListFromDjango.filter(function (entity) {
        return entity.label === position;
      });
    }

    displayEmployees(filteredEntities);
  }
});
