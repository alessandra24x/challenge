const search = document.getElementById("search");

search.addEventListener("keyup", event => {
  const tableRows = document.querySelectorAll("tbody > tr");
  const searchTerm = search.value;

  tableRows.forEach(row => {
    let show = false;
    const rowLength = row.cells.length; // cells = td, cuantas celdas tiene la fila ?

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
