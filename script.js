// game state
let countries = {};
let neighbors = {
    Sweden: ["Norway","Finland","Germany"],
    Norway: ["Sweden","Finland"],
    Finland: ["Sweden","Norway"],
    Germany: ["Sweden"],
    USA: []
};

let player = null;

// initialize country scores
for (let c in neighbors) countries[c] = 0;

// select player country
document.querySelectorAll(".country").forEach(el => {
    el.addEventListener("click", () => {
        player = el.id;
        countries[player] = 10; // starting points
        document.getElementById("info").innerText = "You chose: " + player;
        updateColors();
    });
});

// auto gain & attack every 15 seconds
setInterval(() => {
    if (!player) return;

    // gain 1 point
    countries[player] += 1;

    // attack random neighbor
    let neigh = neighbors[player];
    if (neigh.length > 0) {
        let target = neigh[Math.floor(Math.random() * neigh.length)];
        if (countries[target] > 0) {
            countries[target] -= 1;
            countries[player] += 1;
        }
    }

    updateColors();
}, 15000);

// update SVG colors based on points
function updateColors() {
    for (let c in countries) {
        let el = document.getElementById(c);
        if (!el) continue;
        let score = countries[c];
        let intensity = Math.min(255, 50 + score * 5);
        el.style.fill = player === c ? `rgb(50, ${intensity}, 50)` : `rgb(30, ${intensity}, 30)`;
    }
}
