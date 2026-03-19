const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Bigger + correct canvas
canvas.width = 800;
canvas.height = 500;

// Player
let player = {
    x: 200,
    y: 200,
    size: 30,
    speed: 4,
    hp: 100
};

// Enemy
let enemy = {
    x: 500,
    y: 250,
    size: 30,
    hp: 50
};

// Controls
let keys = {};

document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

// Attack
document.addEventListener("keydown", e => {
    if(e.code === "Space") {
        let dx = player.x - enemy.x;
        let dy = player.y - enemy.y;
        let dist = Math.sqrt(dx*dx + dy*dy);

        if(dist < 60) {
            enemy.hp -= 10;
            console.log("Hit! Enemy HP:", enemy.hp);
        }
    }
});

// Update
function update() {

    if(keys["w"]) player.y -= player.speed;
    if(keys["s"]) player.y += player.speed;
    if(keys["a"]) player.x -= player.speed;
    if(keys["d"]) player.x += player.speed;

    // Enemy follows player
    if(player.x < enemy.x) enemy.x -= 1.5;
    if(player.x > enemy.x) enemy.x += 1.5;
    if(player.y < enemy.y) enemy.y -= 1.5;
    if(player.y > enemy.y) enemy.y += 1.5;
}

// Draw
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Background
    ctx.fillStyle = "#2d2d2d";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Player
    ctx.fillStyle = "lime";
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Enemy
    ctx.fillStyle = "red";
    ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);

    // UI text
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Player HP: " + player.hp, 10, 20);
    ctx.fillText("Enemy HP: " + enemy.hp, 10, 40);
}

// Loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
