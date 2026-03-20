const grid = document.getElementById("grid");
const createBtn = document.getElementById("create");
const clearBtn = document.getElementById("clear");
const colorPicker = document.getElementById("color");

createBtn.onclick = () => {
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);

    grid.innerHTML = "";

    grid.style.gridTemplateColumns = `repeat(${cols}, 25px)`;

    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        cell.addEventListener("click", () => {
            cell.style.background = colorPicker.value;
        });

        grid.appendChild(cell);
    }
};

clearBtn.onclick = () => {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.style.background = "#222";
    });
};
