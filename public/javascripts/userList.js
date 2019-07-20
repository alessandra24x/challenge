document.addEventListener("DOMContentLoaded", () => {
  /**
   *
   * @type {HTMLInputElement}
   */
  const search = document.getElementById("search");
  /**
   *
   * @type {NodeListOf<Element>}
   */
  const del = document.querySelectorAll(".delete");

  /**
   *
   * @param {Event} event
   */
  const clickDeleteEvent = ({ target }) => {
    /**
     * @type {HTMLButtonElement}
     */
    const buttonElement = target;
    /**
     *
     * @type {HTMLTableCellElement}
     */
    const tableCell = buttonElement.parentNode;
    /**
     *
     * @type {HTMLTableRowElement}
     */
    const row = tableCell.parentNode;

    row.remove();
    fetch(`/user/${target.getAttribute("data-id")}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .catch(err => alert(err.message));
  };

  /**
   *
   * @param {HTMLTableRowElement} row
   * @param {string} searchTerm
   */
  const updateRow = (row, searchTerm) => {
    let show = false;
    const rowLength = row.cells.length;
    const rowSelectorString = `table > tbody > tr:nth-child(${row.rowIndex})`;

    for (let i = 0; i < rowLength; i++) {
      const cellText = row.cells.item(i).innerText.toLowerCase();

      if (cellText.indexOf(searchTerm.toLowerCase()) > -1) {
        show = true;
        break;
      }
    }

    show
      ? (document.querySelector(rowSelectorString).style.display = "")
      : (document.querySelector(rowSelectorString).style.display = "none");
  };

  /**
   *
   * @param {NodeListOf<HTMLTableRowElement>} tableRows
   * @param {string} searchTerm
   */
  const updateTable = (tableRows, searchTerm) => {
    tableRows.forEach(row => updateRow(row, searchTerm));
  };

  const typeInSearch = () => {
    /**
     * @type {NodeListOf<HTMLTableRowElement>}
     */
    const tableRows = document.querySelectorAll("tbody > tr");
    /**
     * @type {string}
     */
    const searchTerm = search.value;

    updateTable(tableRows, searchTerm);
  };

  del.forEach(el => {
    el.addEventListener("click", clickDeleteEvent);
  });
  search.addEventListener("keyup", typeInSearch);
});
