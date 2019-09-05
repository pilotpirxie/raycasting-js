function clearScreen() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = '#777';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function drawWalls() {
    for (let y = 0; y < MAP_HEIGHT; y++) {
        for (let x = 0; x < MAP_WIDTH; x++) {
            if (MAP[y][x] === 1) {
                ctx.strokeRect(WALL_SIZE * x, WALL_SIZE * y, WALL_SIZE, WALL_SIZE);
                // console.log(x, y, WALL_SIZE * x, WALL_SIZE * y, WALL_SIZE * (x+1), WALL_SIZE * (y+1));
            }
        }
    }
}

function drawPlayer() {
    ctx.beginPath();
    ctx.arc(playerX * WALL_SIZE, playerY * WALL_SIZE, WALL_SIZE/2, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawPlayerFov() {
    ctx.beginPath();
    ctx.moveTo(playerX * WALL_SIZE, playerY * WALL_SIZE);
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();
}

function showDebug() {
    console.log(mouseX, mouseY, fps);
}

function draw() {
    clearScreen();
    drawWalls();
    drawPlayer();
    drawPlayerFov();
    showDebug();
}

function animate(timestamp) {
    draw();

    let secondsPassed = (timestamp - previousFrameTime) / 1000;
    fps = Math.round(1 / secondsPassed);
    previousFrameTime = timestamp;

    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);

canvas.addEventListener('mousemove', event => {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
});