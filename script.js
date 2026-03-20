function createGrid() {
    const grid = document.getElementById("grid");
    const rows = document.getElementById("rows").value;
    const cols = document.getElementById("cols").value;

    grid.innerHTML = "";

    for (let r = 0; r < rows; r++) {
        let rowDiv = document.createElement("div");

        for (let c = 0; c < cols; c++) {
            let cell = document.createElement("div");
            cell.className = "cell";

            cell.onclick = function () {
                let color = document.getElementById("color").value;
                cell.style.backgroundColor = color;
            };

            rowDiv.appendChild(cell);
        }

        grid.appendChild(rowDiv);
    }
}

function clearGrid() {
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = "white";
    }
}
