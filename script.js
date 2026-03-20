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

                updateFaviconPreview();
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

// 🔧 Convert grid → canvas
function getCanvas(size) {
    const cells = document.getElementsByClassName("cell");
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = size;
    canvas.height = size;

    const pixelW = size / cols;
    const pixelH = size / rows;

    let index = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {

            let color = cells[index].style.backgroundColor;
            if (!color) color = "white";

            ctx.fillStyle = color;
            ctx.fillRect(c * pixelW, r * pixelH, pixelW, pixelH);

            index++;
        }
    }

    return canvas;
}

// 🟢 Download PNG
function downloadPNG() {
    const canvas = getCanvas(64);

    const link = document.createElement("a");
    link.download = "favicon.png";
    link.href = canvas.toDataURL();
    link.click();
}

// 🔥 Download REAL ICO
async function downloadICO() {
    const sizes = [16, 32, 64];
    let images = [];

    for (let size of sizes) {
        const canvas = getCanvas(size);
        const blob = await new Promise(resolve => canvas.toBlob(resolve));
        images.push(blob);
    }

    const icoBlob = await ico.encode(images);

    const link = document.createElement("a");
    link.download = "favicon.ico";
    link.href = URL.createObjectURL(icoBlob);
    link.click();
}

// 👀 Live favicon preview
function updateFaviconPreview() {
    const canvas = getCanvas(32);
    const url = canvas.toDataURL();

    let link = document.querySelector("link[rel='icon']");
    if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
    }

    link.href = url;
}
