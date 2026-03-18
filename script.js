let player = null;
let day = 0;
let countries = {};

// Load map
fetch("map.geojson")
.then(res => res.json())
.then(data => drawMap(data))
.catch(err => console.error("Map load error:", err));

function drawMap(data) {
    const svg = document.getElementById("map");

    data.features.forEach(feature => {
        const name = feature.properties.name || feature.properties.ADMIN || "Unknown";

        countries[name] = 0;

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", geoToPath(feature.geometry));
        path.setAttribute("class", "country");
        path.dataset.name = name;

        path.onclick = () => selectCountry(name);

        svg.appendChild(path);
    });

    console.log("Countries loaded:", Object.keys(countries).length);
}

// Convert GeoJSON to SVG
function geoToPath(geometry) {
    let path = "";
    const draw = coords => {
        coords.forEach(ring => {
            ring.forEach((c,i) => {
                const x = (c[0]+180)*5;
                const y = (90-c[1])*5;
                path += (i===0?"M":"L")+x+" "+y;
            });
            path += "Z";
        });
    }

    if(geometry.type==="Polygon") draw(geometry.coordinates);
    if(geometry.type==="MultiPolygon") geometry.coordinates.forEach(draw);

    return path;
}

// Select a country to start ruling
function selectCountry(name) {
    if(!player) {
        player = name;
        countries[player] = 10;
        document.getElementById("info").innerText = "You rule " + player;
        updateMap();
        startDays();
    } else {
        // Attack another country
        if(name !== player) {
            const success = Math.random() < 0.5;
            if(success) {
                alert(`You won the war against ${name}!`);
                countries[player] += 1;
            } else {
                alert(`You lost the war against ${name}!`);
            }
            updateMap();
        }
    }
}

// Day system
function startDays() {
    setInterval(() => {
        day++;
        document.getElementById("stats").innerText = "Day: " + day;
        triggerEvent();
    }, 15000);
}

// Random simple events
function triggerEvent() {
    const events = [
        `Peaceful day in ${player}`,
        `You gained a new resource in ${player}`,
        `A neighboring country is weak!`
    ];
    const e = events[Math.floor(Math.random()*events.length)];
    console.log(`Day ${day}: ${e}`);
}

// Update map colors
function updateMap() {
    document.querySelectorAll(".country").forEach(el=>{
        const name = el.dataset.name;
        el.classList.remove("player","enemy");
        if(name===player) el.classList.add("player");
        else el.classList.add("enemy");
    });
}
