function clearScreen() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = '#777';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function drawWalls() {
    let i = 0;
    for (let y = 0; y < MAP_HEIGHT; y++) {
        for (let x = 0; x < MAP_WIDTH; x++) {
            i++;
            setTimeout(() => {
                if (MAP[y][x] === 1) {
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                    ctx.strokeRect(WALL_SIZE * x, WALL_SIZE * y, WALL_SIZE, WALL_SIZE);
                    console.log(x, y, WALL_SIZE * x, WALL_SIZE * y, WALL_SIZE * (x+1), WALL_SIZE * (y+1));
                }
            }, i * 5);
        }
    }
}

function draw() {
    clearScreen();
    drawWalls();
}

function animate() {
    draw();
}

window.requestAnimationFrame(animate);
