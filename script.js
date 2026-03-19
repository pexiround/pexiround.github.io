const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

// Player
let player = {
    x: 100,
    y: 100,
    size: 20,
    speed: 3,
    hp: 100
};

// Enemy
let enemy = {
    x: 300,
    y: 200,
    size: 20,
    hp: 50
};

// Controls
let keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// Game loop
function update() {

    // Movement
    if(keys["w"]) player.y -= player.speed;
    if(keys["s"]) player.y += player.speed;
    if(keys["a"]) player.x -= player.speed;
    if(keys["d"]) player.x += player.speed;

    // Enemy follows player
    if(player.x < enemy.x) enemy.x -= 1;
    if(player.x > enemy.x) enemy.x += 1;
    if(player.y < enemy.y) enemy.y -= 1;
    if(player.y > enemy.y) enemy.y += 1;
}

// Attack
document.addEventListener("keydown", e => {
    if(e.key === " ") {
        let dx = player.x - enemy.x;
        let dy = player.y - enemy.y;
        let dist = Math.sqrt(dx*dx + dy*dy);

        if(dist < 40) {
            enemy.hp -= 10;
            console.log("Hit! Enemy HP:", enemy.hp);
        }
    }
});

// Draw
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Player
    ctx.fillStyle = "lime";
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Enemy
    ctx.fillStyle = "red";
    ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);

    // HP text
    ctx.fillStyle = "white";
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
