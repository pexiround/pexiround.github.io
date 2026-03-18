let player = null;
let day = 0;
let countries = {};
let stats = { military: 0, resources: 0 };

// Load GeoJSON
fetch("map.geojson")
.then(res => res.json())
.then(data => drawMap(data))
.catch(err => console.error("Map load error:", err));

// Draw map
function drawMap(data) {
    const svg = document.getElementById("map");

    data.features.forEach(feature => {
        const name =
            feature.properties.name ||
            feature.properties.ADMIN ||
            feature.properties.NAME ||
            "Unknown";

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

// Convert GeoJSON → SVG
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

// Select a country to play
function selectCountry(name) {
    if(!player) {
        player = name;
        countries[player] = 10;
        stats = { ...countryStats[name] } || { military: 5, resources: 5 };
        document.getElementById("info").innerText = "You rule " + player;
        updateStats();
        updateMap();
        startDays();
    }
}

// Advance “day” every 15 sec
function startDays() {
    setInterval(() => {
        day++;
        document.getElementById("info").innerText = `Day ${day} - Your country: ${player}`;
        triggerEvent();
        updateStats();
    }, 15000);
}

// Trigger random event (simplified)
function triggerEvent() {
    const choices = ["attack", "peace", "resource"];
    const choice = choices[Math.floor(Math.random()*choices.length)];

    if(choice==="attack") {
        const target = prompt(`Do you want to attack a country? Type name or cancel`);
        if(target && countries[target] !== undefined && target !== player) {
            const success = Math.random() < (stats.military/20);
            if(success) {
                alert(`You won the war against ${target}!`);
                countries[player] += 1;
            } else {
                alert(`You lost the war against ${target}!`);
                stats.military = Math.max(0, stats.military-2);
            }
        }
    } else if(choice==="resource") {
        stats.resources += Math.floor(Math.random()*3)+1;
        alert(`You gained some resources!`);
    } else {
        alert(`Peaceful day in ${player}.`);
    }

    updateMap();
}

// Update map colors
function updateMap() {
    document.querySelectorAll(".country").forEach(el=>{
        const name = el.dataset.name;
        el.classList.remove("player","enemy");
        if(name===player) el.classList.add("player");
        else if(countries[name]>0) el.classList.add("enemy");
    });
}

// Update stats display
function updateStats() {
    document.getElementById("stats").innerText = 
        `Day: ${day} | Military: ${stats.military} | Resources: ${stats.resources}`;
}
