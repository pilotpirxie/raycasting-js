function clearScreen() {
  ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  ctx.fillStyle = '#777';
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

function drawWalls() {
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      if (MAP[y][x] === 1) {
        ctx.strokeRect(WALL_SIZE * x, WALL_SIZE * y, WALL_SIZE, WALL_SIZE);
      }
    }
  }
}

function drawPlayer() {
  ctx.beginPath();
  ctx.arc(playerX * WALL_SIZE, playerY * WALL_SIZE, WALL_SIZE / 2, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawRay(relativeAngle) {
  let rayLength = 0;
  let distance = 0;
  let search = true;
  let rayPos;

  while (search) {
    rayLength += RAY_STEP_LENGTH;
    rayPos = calculateVectorCoordinates(rayLength, playerAngle + relativeAngle, playerX * WALL_SIZE, playerY * WALL_SIZE);

    for (let y = 0; y < MAP_HEIGHT; y++) {
      for (let x = 0; x < MAP_WIDTH; x++) {
        if (MAP[y][x] === 1) {
          let blockX = x * WALL_SIZE;
          let blockY = y * WALL_SIZE;

          if (rayPos.x >= blockX && rayPos.y >= blockY && rayPos.x <= blockX + WALL_SIZE && rayPos.y <= blockY + WALL_SIZE) {
            search = false;
            distance = Math.sqrt(Math.pow(rayPos.x - blockX, 2) + Math.pow(rayPos.y - blockY, 2));
          }
        }
      }
    }

    if (rayLength > MAX_RAY_LENGTH) {
      search = false;
    }
  }

  ctx.beginPath();
  ctx.moveTo(playerX * WALL_SIZE, playerY * WALL_SIZE);
  ctx.lineTo(rayPos.x, rayPos.y);
  ctx.stroke();
}

function drawPlayerFov() {
  const cameraPos = calculateVectorCoordinates(WALL_SIZE * 4, playerAngle, playerX * WALL_SIZE, playerY * WALL_SIZE);

  directionX = cameraPos.x;
  directionY = cameraPos.y;

  for (let i = 0; i < RESOLUTION / 2; i++) {
    drawRay(-RAY_STEP_ANGLE * i);
  }
  for (let i = 1; i < RESOLUTION / 2; i++) {
    drawRay(RAY_STEP_ANGLE * i);
  }
}

function showDebug() {
  // console.log(playerX, playerY, playerAngle, directionX, directionY, fps);
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

function rotatePlayer(degree) {
  playerAngle += degree;

  if (playerAngle < 0) {
    playerAngle = 360 + playerAngle;
  }

  if (playerAngle >= 360) {
    playerAngle = playerAngle - 360;
  }
}

window.requestAnimationFrame(animate);

window.addEventListener('keydown', event => {
  if (event.defaultPrevented) {
    return;
  }

  switch (event.key) {
    case 'Left':
    case 'ArrowLeft':
    case 'a':
      rotatePlayer(-ROTATE_SPEED_ANGLE);
      break;
    case 'Right':
    case 'ArrowRight':
    case 'd':
      rotatePlayer(ROTATE_SPEED_ANGLE);
      break;
  }
});
