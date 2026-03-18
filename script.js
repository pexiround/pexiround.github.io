let player = null;
let countries = {};
let power = 0;

// LOAD MAP
fetch("map.geojson")
.then(res => res.json())
.then(data => drawMap(data))
.catch(err => console.error("Map load error:", err));

// DRAW MAP
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

        path.onclick = () => handleClick(name);

        svg.appendChild(path);
    });

    console.log("Loaded countries:", Object.keys(countries).length);
}

// GEOJSON → SVG
function geoToPath(geometry) {
    let path = "";

    const draw = coords => {
        coords.forEach(ring => {
            ring.forEach((c, i) => {
                const x = (c[0] + 180) * 5;
                const y = (90 - c[1]) * 5;
                path += (i === 0 ? "M" : "L") + x + " " + y;
            });
            path += "Z";
        });
    };

    if (geometry.type === "Polygon") draw(geometry.coordinates);
    if (geometry.type === "MultiPolygon") {
        geometry.coordinates.forEach(draw);
    }

    return path;
}

// CLICK SYSTEM
function handleClick(name) {

    // choose country
    if (!player) {
        player = name;
        countries[player] = 10;

        document.getElementById("info").innerText = "You are " + player;

        startGame();
        updateMap();
        return;
    }

    // attack
    if (name !== player && power > 0) {
        power--;

        countries[name] -= 1;
        countries[player] += 1;

        if (countries[name] < 0) countries[name] = 0;

        updateMap();
        updatePower();
    }
}

// AUTO POWER
function startGame() {
    setInterval(() => {
        power++;
        updatePower();
    }, 15000);
}

// UPDATE POWER UI
function updatePower() {
    document.getElementById("power").innerText = "Power: " + power;
}

// UPDATE MAP COLORS
function updateMap() {
    document.querySelectorAll(".country").forEach(el => {
        const name = el.dataset.name;

        el.classList.remove("player","enemy");

        if (name === player) {
            el.classList.add("player");
        } else {
            el.classList.add("enemy");
        }

        el.title = name + " (" + countries[name] + ")";
    });
}
