const grid = document.getElementById("grid");
const size = 30; // 30x30 grid
const numAIs = 3;
let pixels = [];
let playerPixels = [];
let aiPixels = [[],[],[]];
let nextPixelTimer = 5;

// Generate random land map (~30% land)
const landMap = [];
for(let i=0;i<size;i++){
    landMap[i] = [];
    for(let j=0;j<size;j++){
        landMap[i][j] = Math.random()<0.3?1:0;
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
        div.addEventListener("click", ()=> claimPixel(div));
        grid.appendChild(div);
        pixels.push(div);
    }
}

// Get neighbors
function getNeighbors(i,j){
    const neighbors = [];
    [[0,1],[1,0],[0,-1],[-1,0]].forEach(([di,dj])=>{
        const ni=i+di, nj=j+dj;
        if(ni>=0 && ni<size && nj>=0 && nj<size) neighbors.push(ni*size+nj);
    });
    return neighbors;
}

// Spawn 5 connected pixels for player or AI
function spawnTerritory(array, className){
    let count=0;
    while(count<5){
        const idx = Math.floor(Math.random()*pixels.length);
        const p = pixels[idx];
        const i=parseInt(p.dataset.i), j=parseInt(p.dataset.j);
        if(!p.classList.contains("land") || array.includes(idx)) continue;
        if(array.length===0){
            p.classList.add(className);
            array.push(idx);
            count++;
        } else {
            // must be adjacent to existing
            let adj = getNeighbors(i,j).some(n=>array.includes(n));
            if(adj){
                p.classList.add(className);
                array.push(idx);
                count++;
            }
        }
    }
}

// Spawn player and AI territories
spawnTerritory(playerPixels,"player");
for(let k=0;k<numAIs;k++) spawnTerritory(aiPixels[k],"ai"+(k+1));

// Claim pixel (adjacency-only, no teleport)
function claimPixel(p){
    if(!p.classList.contains("land")) return;
    const i=parseInt(p.dataset.i), j=parseInt(p.dataset.j);
    const idx=i*size+j;

    // BFS to check if pixel is adjacent to main territory
    const visited = new Set();
    const queue = [...playerPixels];
    let canClaim = false;

    while(queue.length>0){
        const current = queue.shift();
        const ci = Math.floor(current/size);
        const cj = current%size;
        if(Math.abs(ci-i)+Math.abs(cj-j)===1){ canClaim=true; break; }
        getNeighbors(ci,cj).forEach(n=>{
            if(!visited.has(n) && playerPixels.includes(n)){
                visited.add(n);
                queue.push(n);
            }
        });
    }

    if(!canClaim) return;
    p.classList.remove("land");
    p.classList.add("player");
    playerPixels.push(idx);
}

// Player pixel timer
setInterval(()=>{
    if(nextPixelTimer>0){
        nextPixelTimer--;
        document.getElementById("timer").innerText="Next pixel in: "+nextPixelTimer+"s";
    } else {
        // Automatically place pixel if possible
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

// AI expansion
setInterval(()=>{
    aiPixels.forEach((arr,classIdx)=>{
        const className="ai"+(classIdx+1);
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
