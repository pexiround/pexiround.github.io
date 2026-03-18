const grid = document.getElementById("grid");
const size = 20; // 20x20 pixels
let power = 0;

// Initialize grid
const pixels = [];
for(let i=0;i<size*size;i++){
    const div = document.createElement("div");
    div.classList.add("pixel");
    div.dataset.index = i;
    div.onclick = () => capturePixel(div);
    grid.appendChild(div);
    pixels.push(div);
}

// Capture pixel
function capturePixel(pixel){
    if(pixel.classList.contains("player")) return;
    if(power<=0) return alert("Not enough power!");
    power--;
    pixel.classList.remove("enemy");
    pixel.classList.add("player");
    updatePower();
}

// Auto-gain power
setInterval(()=>{
    power++;
    updatePower();
},5000);

// Enemy AI: randomly capture pixels
setInterval(()=>{
    const freePixels = pixels.filter(p => !p.classList.contains("player"));
    if(freePixels.length ===0) return;
    const p = freePixels[Math.floor(Math.random()*freePixels.length)];
    p.classList.remove("player");
    p.classList.add("enemy");
},7000);

function updatePower(){
    document.getElementById("power").innerText = "Power: "+power;
}
