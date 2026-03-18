const grid = document.getElementById("grid");
const size = 30; // grid size
const numPlayers = 3; // AI
let nextPixelTimer = 5; // seconds
let pixels = [];
let playerPixels = [];
let aiPixels = [[],[],[]];

// Generate random land continent
const landMap = [];
for(let i=0;i<size;i++){
    landMap[i] = [];
    for(let j=0;j<size;j++){
        landMap[i][j] = Math.random()<0.3?1:0; // 30% chance land
    }
}

// Create grid
for(let i=0;i<size;i++){
    for(let j=0;j<size;j++){
        const div = document.createElement("div");
        div.classList.add("pixel");
        if(landMap[i][j]) div.classList.add("land");
        div.dataset.i = i;
        div.dataset.j = j;
        div.onclick = ()=> claimPixel(div);
        grid.appendChild(div);
        pixels.push(div);
    }
}

// Helper: get neighbors of a pixel
function getNeighbors(i,j){
    const neighbors = [];
    const dirs = [[0,1],[1,0],[0,-1],[-1,0]]; // up,right,down,left
    dirs.forEach(d=>{
        const ni=i+d[0], nj=j+d[1];
        if(ni>=0 && ni<size && nj>=0 && nj<size){
            neighbors.push(ni*size+nj);
        }
    });
    return neighbors;
}

// Spawn starting pixels for player and AI
function spawnPlayer(playerArray, className){
    let count = 0;
    while(count<5){
        const idx = Math.floor(Math.random()*pixels.length);
        const p = pixels[idx];
        const i = parseInt(p.dataset.i), j = parseInt(p.dataset.j);
        if(!p.classList.contains("land")) continue; // must be land
        if(playerArray.length===0){
            p.classList.add(className);
            playerArray.push(idx);
            count++;
        } else {
            // must be adjacent to existing
            let adj = getNeighbors(i,j).some(n=>playerArray.includes(n));
            if(adj){
                p.classList.add(className);
                playerArray.push(idx);
                count++;
            }
        }
    }
}

spawnPlayer(playerPixels,"player");
spawnPlayer(aiPixels[0],"ai1");
spawnPlayer(aiPixels[1],"ai2");
spawnPlayer(aiPixels[2],"ai3");

// Claim pixel function (only adjacent to your land)
function claimPixel(p){
    if(!p.classList.contains("land")) return;
    const i=parseInt(p.dataset.i), j=parseInt(p.dataset.j);
    const idx=i*size+j;
    // must be adjacent to existing player pixels
    if(!getNeighbors(i,j).some(n=>playerPixels.includes(n))) return;
    p.classList.remove("land");
    p.classList.add("player");
    playerPixels.push(idx);
}

// Pixel timer
setInterval(()=>{
    if(nextPixelTimer>0){
        nextPixelTimer--;
        document.getElementById("timer").innerText="Next pixel in: "+nextPixelTimer+"s";
    } else {
        // give player 1 pixel automatically
        const possible = pixels.filter(p=>{
            const i=parseInt(p.dataset.i), j=parseInt(p.dataset.j);
            const idx=i*size+j;
            return p.classList.contains("land") && getNeighbors(i,j).some(n=>playerPixels.includes(n));
        });
        if(possible.length>0){
            const p = possible[Math.floor(Math.random()*possible.length)];
            p.classList.remove("land");
            p.classList.add("player");
            const idx=parseInt(p.dataset.i)*size+parseInt(p.dataset.j);
            playerPixels.push(idx);
        }
        nextPixelTimer=5;
    }
},1000);

// Simple AI expansion
setInterval(()=>{
    aiPixels.forEach((arr,classIdx)=>{
        const className="ai"+(classIdx+1);
        // pick random pixel adjacent to AI land
        const candidates=pixels.filter(p=>{
            const i=parseInt(p.dataset.i), j=parseInt(p.dataset.j);
            return p.classList.contains("land") && getNeighbors(i,j).some(n=>arr.includes(n));
        });
        if(candidates.length>0){
            const p=candidates[Math.floor(Math.random()*candidates.length)];
            p.classList.remove("land");
            p.classList.add(className);
            const idx=parseInt(p.dataset.i)*size+parseInt(p.dataset.j);
            arr.push(idx);
        }
    });
},3000);
