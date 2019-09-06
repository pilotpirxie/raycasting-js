function clearScreen() {
  ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  const sky = ctx.createLinearGradient(0, 0, 0, SCREEN_HEIGHT);
  sky.addColorStop(0, "#00a7ee");
  sky.addColorStop(0.3, "#fff");

  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT/2);

  const grass = ctx.createLinearGradient(0, 0, 0, SCREEN_HEIGHT);
  grass.addColorStop(0.5, "#214603");
  grass.addColorStop(1, "#439307");

  ctx.fillStyle = grass;
  ctx.fillRect(0, SCREEN_HEIGHT/2, SCREEN_WIDTH, SCREEN_HEIGHT/2);
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
  drawRay(0);
}

function findIntersection(relativeAngle) {
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
            distance = Math.sqrt(Math.pow((playerX * WALL_SIZE) - blockX, 2) + Math.pow((playerY * WALL_SIZE) - blockY, 2));
            search = false;
          }
        }
      }
    }

    if (rayLength > MAX_RAY_LENGTH) {
      search = false;
    }
  }

  return {
    x: rayPos.x,
    y: rayPos.y,
    distance: distance
  }
}

function drawRay(relativeAngle) {
  const rayIntersection = findIntersection(relativeAngle);

  ctx.beginPath();
  ctx.moveTo(playerX * WALL_SIZE, playerY * WALL_SIZE);
  ctx.lineTo(rayIntersection.x, rayIntersection.y);
  ctx.stroke();

  return rayIntersection;
}

function drawPlayerFov() {
  rays = [];
  for (let i = RESOLUTION; i > 0; i--) {
    let ray = drawRay(-FOV_ANGLE/2 + (RAY_STEP_ANGLE * i));
    rays.push(ray);
  }
}

function drawScreen() {
  for (let i = 0; i < rays.length; i++) {
    let distance = rays[i].distance;
    let distanceInverse = SCREEN_HEIGHT - distance;
    ctx.fillStyle = `rgba(${distanceInverse}, ${distanceInverse}, ${distanceInverse}, 1)`;
    ctx.fillRect(STRIPE_WIDTH * i, distance/2, STRIPE_WIDTH, distanceInverse);
  }
}

function showDebug() {
  // console.log(playerX, playerY, playerAngle, directionX, directionY, fps);
}

function draw() {
  if (showMap) {
    clearScreen();
    drawScreen();
    drawWalls();
    drawPlayer();
    drawPlayerFov();
  } else {
    drawPlayerFov();
    clearScreen();
    drawScreen();
  }
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

function moveTowards(speed) {
  const playerNewPosition = calculateVectorCoordinates(speed, playerAngle, playerX * WALL_SIZE, playerY * WALL_SIZE);
  playerX = playerNewPosition.x / WALL_SIZE;
  playerY = playerNewPosition.y / WALL_SIZE;
}

function toggleMap() {
  showMap = !showMap;
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
      rotatePlayer(ROTATE_SPEED_ANGLE);
      break;
    case 'Right':
    case 'ArrowRight':
    case 'd':
      rotatePlayer(-ROTATE_SPEED_ANGLE);
      break;
    case 'Up':
    case 'ArrowUp':
    case 'w':
      moveTowards(PLAYER_STEP_LENGTH);
      break;
    case 'Down':
    case 'ArrowDown':
    case 's':
      moveTowards(-PLAYER_STEP_LENGTH);
      break;
    case 'm':
      toggleMap();
      break;
  }
});
