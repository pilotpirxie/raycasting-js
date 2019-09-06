const SCREEN_WIDTH = 320;
const SCREEN_HEIGHT = 240;

const MAP_WIDTH = MAP[0].length;
const MAP_HEIGHT = MAP.length;
const WALL_SIZE = Math.min(SCREEN_HEIGHT/MAP_HEIGHT, SCREEN_WIDTH/MAP_WIDTH);

const RESOLUTION = 20;
const FOV_ANGLE = 60;
const RAY_STEP_ANGLE = FOV_ANGLE/RESOLUTION;
const MAX_RAY_LENGTH = 300;
const RAY_STEP_LENGTH = WALL_SIZE/8;
const ROTATE_SPEED_ANGLE = 4;


let playerX = 10;
let playerY = 10;
let playerAngle = 0;

let directionX = 10;
let directionY = 50;

let previousFrameTime = 0;
let fps;
