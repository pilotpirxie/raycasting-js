const WIDTH = 320;
const HEIGHT = 240;
const RESOLUTION = 20;
const ANGLE = 60;
const RAY_STEP = ANGLE/RESOLUTION;

const MAP_WIDTH = MAP[0].length;
const MAP_HEIGHT = MAP.length;
const WALL_SIZE = Math.min(HEIGHT/MAP_HEIGHT, WIDTH/MAP_WIDTH);

let playerX = 10;
let playerY = 10;

let cameraX = 10;
let cameraY = 50;

let mouseX = 0;
let mouseY = 0;

let previousFrameTime = 0;
let fps;