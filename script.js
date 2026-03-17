let player = null;
let power = 0;

// 🌍 FULL COUNTRY LIST
let allCountries = [
"Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria",
"Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
"Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia",
"Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica",
"Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","DR Congo","Ecuador",
"Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon",
"Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti",
"Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast","Jamaica",
"Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia",
"Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta",
"Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro",
"Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria",
"North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru",
"Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia",
"Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia",
"Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa",
"South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan",
"Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey",
"Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay",
"Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];

// game state
let countries = {};

// 🔹 choose country
function choose(country) {
    player = country;

    document.getElementById("select").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("yourCountry").innerText = "You are " + country;

    // initialize all countries
    allCountries.forEach(c => {
        countries[c] = 0;
    });

    countries[player] = 100;

    render();
}

// 🔹 gain power
function gainPower() {
    power++;
    updateUI();
}

// 🔹 attack system
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

    render(); // 🔥 important fix
}

// 🔹 render countries
function render(list = allCountries) {
    const div = document.getElementById("countries");
    div.innerHTML = "";

    list.forEach(c => {
        div.innerHTML += `
            <div class="country">
                <h3>${c}</h3>
                <p>${countries[c] || 0}%</p>
                <button onclick="attack('${c}')">Attack</button>
            </div>
        `;
    });

    updateUI();
}

// 🔹 update UI
function updateUI() {
    document.getElementById("power").innerText = power;
}

// 🔹 search system
function searchCountries() {
    const input = document.getElementById("search").value.toLowerCase();

    const filtered = allCountries.filter(c =>
        c.toLowerCase().includes(input)
    );

    render(filtered);
}
