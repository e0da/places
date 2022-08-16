import { Behavior } from "./Behavior.mjs";
import { Sprite } from "./Sprite.mjs";
import { Transform } from "./Transform.mjs";

export class Agent extends Behavior {
  sprite = new Sprite(null, 10, 10);
  transform = new Transform(0, 0, 0);

  constructor() {
    super();
    this.name = `Agent 0x${this.uuid.substring(0, 8)}`;
    this.addChild(this.sprite);
  }

  onStart() {
    this.transform.moveTo(100, 100);
  }

  onUpdate() {
    this.transform.rotate(0.1);
  }
}
