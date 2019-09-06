const SCREEN_WIDTH = 320;
const SCREEN_HEIGHT = 240;

const MAP_WIDTH = MAP[0].length;
const MAP_HEIGHT = MAP.length;
const WALL_SIZE = Math.min(SCREEN_HEIGHT/MAP_HEIGHT, SCREEN_WIDTH/MAP_WIDTH);

const RESOLUTION = 20;
const STRIPE_WIDTH = SCREEN_WIDTH/RESOLUTION;
const FOV_ANGLE = 45;
const RAY_STEP_ANGLE = FOV_ANGLE/RESOLUTION;
const MAX_RAY_LENGTH = 300;
const RAY_STEP_LENGTH = WALL_SIZE/8;
const ROTATE_SPEED_ANGLE = 2;
const PLAYER_STEP_LENGTH = 2;

let playerX = 10;
let playerY = 10;
let playerAngle = 0;

let showMap = false;

let previousFrameTime = 0;
let fps;

let rays = [];
