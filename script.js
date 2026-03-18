const grid = document.getElementById("grid");
const size = 20; // 20x20 grid
let power = 5;
const pixels = [];

// Initialize grid
for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.classList.add("pixel");
    div.dataset.index = i;
    div.addEventListener("click", () => capturePixel(div));
    grid.appendChild(div);
    pixels.push(div);
}

// Capture pixel
function capturePixel(pixel) {
    if (pixel.classList.contains("player")) return;
    if (power <= 0) return alert("Not enough power!");
    power--;
    pixel.classList.remove("enemy");
    pixel.classList.add("player");
    updatePower();
}

// Update power display
function updatePower() {
    document.getElementById("power").innerText = "Power: " + power;
}

// Auto-gain power every 5 seconds
setInterval(() => {
    power++;
    updatePower();
}, 5000);

// Enemy AI: randomly capture pixels every 7 seconds
setInterval(() => {
    const freePixels = pixels.filter(p => !p.classList.contains("player"));
    if (freePixels.length === 0) return;
    const p = freePixels[Math.floor(Math.random() * freePixels.length)];
    p.classList.add("enemy");
}, 7000);

// Initialize power display
updatePower();
