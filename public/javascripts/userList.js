document.addEventListener("DOMContentLoaded", function(event) {
  const search = document.getElementById("search");
  const del = document.querySelectorAll(".delete");

  del.forEach(el => {
    el.addEventListener("click", event => {
      const tg = event.target;
      tg.parentNode.parentNode.remove();
      fetch(`/user/${event.target.getAttribute("data-id")}`, {
        method: "DELETE"
      })
        .then(response => response.json())
        .catch(err => alert(err.message));
    });
  });

  search.addEventListener("keyup", event => {
    const tableRows = document.querySelectorAll("tbody > tr");
    const searchTerm = search.value;

    tableRows.forEach(row => {
      let show = false;

      // cells = td, cuantas celdas tiene la fila ?
      const rowLength = row.cells.length;

      for (let i = 0; i < rowLength; i++) {
        // Iteramos por cada celda, accediendo al contenido con item(indice)
        // Check if property value contains search
        const cellText = row.cells.item(i).innerText.toLowerCase();

        if (cellText.indexOf(searchTerm.toLowerCase()) > -1) {
          show = true;
          break;
        }
      }

      show
        ? (document.querySelector(
            `table > tbody > tr:nth-child(${row.rowIndex})`
          ).style.display = "")
        : (document.querySelector(
            `table > tbody > tr:nth-child(${row.rowIndex})`
          ).style.display = "none");
    });
  });
});