let player = null;
let power = 0;

let countries = {
    Sweden: 33,
    USA: 33,
    Germany: 34
};

function choose(country) {
    player = country;
    document.getElementById("select").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("yourCountry").innerText = "You are " + country;
    render();
}

function gainPower() {
    power++;
    updateUI();
}

function attack(target) {
    if (power < 5) {
        alert("Not enough power!");
        return;
    }

    if (target === player) return;

    power -= 5;

    countries[player] += 1;
    countries[target] -= 1;

    if (countries[target] < 0) countries[target] = 0;

    updateUI();
}

function render() {
    const div = document.getElementById("countries");
    div.innerHTML = "";

    for (let c in countries) {
        div.innerHTML += `
            <div class="country">
                <h3>${c}</h3>
                <p>${countries[c]}%</p>
                <button onclick="attack('${c}')">Attack</button>
            </div>
        `;
    }

    updateUI();
}

function updateUI() {
    document.getElementById("power").innerText = power;
}
