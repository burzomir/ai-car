import CarPhysics, { InputState } from "./lib/CarPhysics";
import { noop } from "./lib/fp";

class Car {
  constructor({
    x = 0,
    y = 0,
    heading = 0,
    scale = 10,
    image,
    sensors: { headSensor, headRightSensor, headLeftSensor }
  }) {
    this.carPhysics = new CarPhysics({
      stats: { clear: noop, add: noop },
      x,
      y,
      heading: -(heading * Math.PI) / 180
    });
    this.scale = scale;
    this.headSensor = headSensor;
    this.headRightSensor = headRightSensor;
    this.headLeftSensor = headLeftSensor;
    this.headSensor.setOrigin(0, 0);
    this.headRightSensor.setOrigin(0, 0);
    this.headLeftSensor.setOrigin(0, 0);
    this.image = image;
  }

  update(inputState = new InputState(), dt = 0) {
    this.carPhysics.setInputs(inputState);
    this.carPhysics.update(dt);

    const {
      heading,
      position: { x, y }
    } = this.carPhysics;

    const position = [x * this.scale, y * this.scale];
    this.image.setPosition(...position);
    this.headSensor.setPosition(...position);
    this.headRightSensor.setPosition(...position);
    this.headLeftSensor.setPosition(...position);

    const angle = (heading * 180) / Math.PI;
    this.image.setAngle(angle);
    this.headSensor.setAngle(angle);
    this.headRightSensor.setAngle(angle + 45);
    this.headLeftSensor.setAngle(angle - 45);
  }
}

export default Car;
