import { Behavior } from "./Behavior.mjs";
import { Transform } from "./Transform.mjs";

export class Agent extends Behavior {
  renderingContext = null;
  transform = new Transform(0, 0, 0);

  constructor() {
    super();
    this.name = `Agent 0x${this.uuid.substring(0, 8)}`;
  }

  onStart() {
    const canvas = document.querySelector("canvas");
    this.renderingContext = canvas.getContext("2d");
    this.transform.moveTo(100, 100);
  }

  onUpdate() {
    this.transform.rotate(0.1);
    this.draw();
  }

  draw() {
    const { x, y, rot } = this.transform;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rot);
    this.ctx.fillRect(-10, -10, 20, 20);
    this.ctx.restore();
  }

  get ctx() {
    return this.renderingContext;
  }
}
