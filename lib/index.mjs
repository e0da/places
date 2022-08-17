const BOING = 1;
const MIN_SHIP_COUNT = 3;
const MAX_SHIP_COUNT = 12;
const SHIP_MIN_SCALE = 0.2;
const SHIP_MAX_SCALE = 0.5;

const SCREEN_WIDTH = 1280;
const SCREEN_HEIGHT = 720;

const SKY_WIDTH = 800;
const SKY_HEIGHT = 600;
const SKY_TILES = 3;
const SKY_SPEED = 10;
const SKY_OFFSET = 400;

const PARTICLE_SPEED = 20;
const PARTICLE_SPEED_FACTOR = 2.5;
const HIGH_VELOCITY = 500;
const START_VELOCITY_RATIO = 3;
const TURN_SPEED = 0.15;

const config = {
  type: Phaser.AUTO,
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.setBaseURL("./lib/assets/phaser-io/assets");
  this.load.image("sky", "skies/space3.png");
  this.load.image("ship", "sprites/ship.png");
  this.load.image("red", "particles/red.png");
  this.load.image("yellow", "particles/yellow.png");
  this.load.image("blue", "particles/blue.png");
  this.load.image("green", "particles/green.png");
  this.load.image("white", "particles/white.png");
}

function create() {
  this.shipCount = getShipCount();
  this.skyTiles = createSky(this);
  this.particles = addParticles(this);
  this.shipEmitters = createEmitters(this);
  this.ships = createShips(this);
  configureShips(this.ships, this.shipEmitters);

  this.physics.add.collider(this.ships, this.ships);
}

let tick = 0;

const updates = [scrollSky, updateShipsAndParticles];

function createEmitters({ shipCount, particles }) {
  const shipEmitters = [];
  for (let i = 0; i < shipCount; i++) {
    const color =
      Object.keys(particles)[
        Math.floor(Math.random() * Object.keys(particles).length)
      ];
    const particle = particles[color];
    shipEmitters[i] = particle.createEmitter({
      speed: Math.random() * PARTICLE_SPEED + PARTICLE_SPEED,
      scale: { start: 0, end: 0 },
      blendMode: "SCREEN",
    });
  }
  return shipEmitters;
}

function getShipCount() {
  let shipCount =
    Math.random() * (MAX_SHIP_COUNT - MIN_SHIP_COUNT) + MIN_SHIP_COUNT;
  return shipCount;
}

function createSky(game) {
  const skyTiles = [];
  for (let i = 0; i < SKY_TILES; i++) {
    skyTiles[i] = game.add.image(i * SKY_WIDTH, SKY_HEIGHT / 2, "sky");
  }
  return skyTiles;
}

function scrollSky({ skyTiles }) {
  skyTiles.forEach((tile) => {
    tile.x -= SKY_SPEED;
    if (tile.x < -SKY_WIDTH / 2) {
      tile.x = SCREEN_WIDTH + SKY_WIDTH / 2;
    }
  });
}

function update(time, delta) {
  updates.forEach((update) => {
    update(this, delta, time);
  });
}

function updateShipsAndParticles(game) {
  game.shipEmitters.forEach((emitter, i) => {
    const ship = game.ships[i];
    const velocity = ship.body.velocity.length();
    const angleVelocity = ship.body.velocity.angle();
    const target = (angleVelocity + Math.PI / 2) % (Math.PI * 2);
    let angleSprite = ship.rotation;
    if (angleSprite < 0) {
      angleSprite += Math.PI * 2;
    }
    angleSprite = Phaser.Math.Angle.RotateTo(angleSprite, target, TURN_SPEED);
    ship.setRotation(angleSprite);
    emitter.speed = velocity;
    const start = velocity / (HIGH_VELOCITY * START_VELOCITY_RATIO);
    const speed =
      PARTICLE_SPEED_FACTOR * PARTICLE_SPEED * (velocity / HIGH_VELOCITY);
    emitter.fromJSON({
      speed,
      scale: { start, end: 0 },
    });

    if (tick % 60 === 0) {
      // console.debug(ship.body.velocity.length());
      // console.debug(playerAngle, angle);
      // console.debug(ship.scale);
    }
  });
  ++tick;
}

function addParticles(game) {
  return {
    yellow: game.add.particles("yellow"),
    red: game.add.particles("red"),
    blue: game.add.particles("blue"),
    green: game.add.particles("green"),
    white: game.add.particles("white"),
  };
}

function createShips({ shipCount, physics }) {
  const ships = [];
  for (let i = 0; i < shipCount; i++) {
    ships[i] = physics.add.image(
      Math.random() * 800,
      Math.random() * 600,
      "ship"
    );
  }
  return ships;
}

function configureShips(ships, shipEmitters) {
  ships.forEach((ship, i) => {
    const shipScale =
      Math.random() * (SHIP_MAX_SCALE - SHIP_MIN_SCALE) + SHIP_MIN_SCALE;
    ship.setScale(shipScale);
    ship.setVelocity(Math.random() * 400 + 100, Math.random() * 400 + 100);
    ship.setBounce(BOING, BOING);
    ship.setCollideWorldBounds(true);
    shipEmitters[i].startFollow(ship);
  });
}
