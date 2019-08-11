import Phaser, { Rectangle } from "phaser";
import CarPhysics, { InputState } from "./lib/CarPhysics";
import carImage from "./assets/car.svg";

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "matter",
    matter: {
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const noop = () => {};
let game = new Phaser.Game(config);
let carPhysics;
let car;
let cursors;
let prevTime = new Date();

function preload() {
  this.load.image("car", carImage);
}

function create() {
  this.matter.world.setBounds().disableGravity();
  carPhysics = new CarPhysics({
    stats: { clear: noop, add: noop },
    x: 55,
    y: 30,
    heading: -(90 * Math.PI) / 180
  });
  car = this.matter.add.image(0, 0, "car");
  car.setScale(0.05);
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  const inputState = new InputState();
  if (cursors.left.isDown) {
    inputState.right = 1;
  }
  if (cursors.right.isDown) {
    inputState.left = 1;
  }
  if (cursors.up.isDown) {
    inputState.throttle = 1;
  }
  if (cursors.down.isDown) {
    inputState.brake = 1;
  }
  const currTime = new Date();
  carPhysics.setInputs(inputState);
  carPhysics.update(currTime - prevTime);
  prevTime = currTime;

  const {
    heading,
    position: { x, y }
  } = carPhysics;
  car.setAngle((carPhysics.heading * 180) / Math.PI);
  car.setPosition(x * 10, y * 10);
}
