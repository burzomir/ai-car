import Phaser, { Rectangle } from "phaser";
import { InputState } from "./lib/CarPhysics";
import carImage from "./assets/car.svg";
import Car from "./Car";

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

let game = new Phaser.Game(config);
let car;
let cursors;
let prevTime = new Date();

function preload() {
  this.load.image("car", carImage);
}

function create() {
  this.matter.world.setBounds().disableGravity();
  car = new Car({
    x: 55,
    y: 30,
    heading: -90,
    scale: 10,
    image: this.matter.add.image(0, 0, "car").setScale(0.05),
    sensors: {
      headSensor: this.add.line(0, 0, 0, 0, 200, 0, 0xff66ff),
      headRightSensor: this.add.line(0, 0, 0, 0, 140, 0, 0xff66ff),
      headLeftSensor: this.add.line(0, 0, 0, 0, 140, 0, 0xff66ff)
    }
  });
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
  car.update(inputState, currTime - prevTime);
  prevTime = currTime;
}
