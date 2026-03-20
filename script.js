const grid = document.getElementById("grid");
const createBtn = document.getElementById("create");
const clearBtn = document.getElementById("clear");
const colorPicker = document.getElementById("color");

createBtn.addEventListener("click", () => {
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);

    if (!rows || !cols) return;

    grid.innerHTML = "";

    // FIX: set both rows and columns
    grid.style.gridTemplateColumns = `repeat(${cols}, 25px)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 25px)`;

    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";

        cell.addEventListener("click", () => {
            cell.style.backgroundColor = colorPicker.value;
        });

        grid.appendChild(cell);
    }
});

// Clear grid
clearBtn.addEventListener("click", () => {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.style.backgroundColor = "white";
    });
});
