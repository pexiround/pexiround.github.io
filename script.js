let player = null;
let countries = {};
let geoData = null;

// 🔥 LOAD YOUR GEOJSON (map.geojson)
fetch("map.geojson")
.then(res => res.json())
.then(data => {
    geoData = data;
    drawMap();
})
.catch(err => console.error("GeoJSON load error:", err));

// 🔹 DRAW MAP
function drawMap() {
    const svg = document.getElementById("map");

    geoData.features.forEach(feature => {

        // 🔥 auto-detect name field
        const name =
            feature.properties.name ||
            feature.properties.ADMIN ||
            feature.properties.NAME ||
            feature.properties.Country ||
            "Unknown";

        countries[name] = 1;

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

        const d = geoToPath(feature.geometry);
        path.setAttribute("d", d);
        path.setAttribute("class", "country");
        path.dataset.name = name;

        path.addEventListener("click", () => selectCountry(name));

        svg.appendChild(path);
    });

    console.log("Map loaded with", Object.keys(countries).length, "countries");
}

// 🔹 GEOJSON → SVG PATH (handles Polygon + MultiPolygon)
function geoToPath(geometry) {
    let path = "";

    if (geometry.type === "Polygon") {
        path += drawPolygon(geometry.coordinates);
    }

    if (geometry.type === "MultiPolygon") {
        geometry.coordinates.forEach(polygon => {
            path += drawPolygon(polygon);
        });
    }

    return path;
}

function drawPolygon(coords) {
    let path = "";

    coords.forEach(ring => {
        ring.forEach((coord, i) => {
            const x = (coord[0] + 180) * 3;   // scale longitude
            const y = (90 - coord[1]) * 3;    // flip latitude

            path += (i === 0 ? "M" : "L") + x + " " + y;
        });
        path += "Z";
    });

    return path;
}

// 🔹 SELECT COUNTRY
function selectCountry(name) {
    if (player) return;

    player = name;
    countries[player] = 10;

    document.getElementById("info").innerText = "You are " + player;

    updateMap();
    startGame();
}

// 🔹 GAME LOOP (every 15s)
function startGame() {
    setInterval(() => {
        if (!player) return;

        countries[player] += 1;

        let possible = neighbors[player] || [];

        if (possible.length > 0) {
            let target = possible[Math.floor(Math.random() * possible.length)];

            if (countries[target] > 0) {
                countries[target] -= 1;
                countries[player] += 1;
            }
        }

        updateMap();
    }, 15000);
}

// 🔹 UPDATE COLORS
function updateMap() {
    document.querySelectorAll(".country").forEach(el => {
        const name = el.dataset.name;

        el.classList.remove("player","enemy","attackable");

        if (name === player) {
            el.classList.add("player");
        } else if ((neighbors[player] || []).includes(name)) {
            el.classList.add("attackable");
        } else {
            el.classList.add("enemy");
        }

        el.title = name + " (" + (countries[name] || 0) + ")";
    });
}
