import { Behavior } from "./Behavior.mjs";

export class Agent extends Behavior {
  constructor() {
    super();
    this.name = `Agent 0x${this.uuid.substring(0, 8)}`;
  }
}
