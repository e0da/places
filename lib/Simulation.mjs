import { Agent } from "./Agent.mjs";
import { Behavior } from "./Behavior.mjs";

export class Simulation extends Behavior {
  onLoad() {
    const agent = new Agent();
    this.addChild(agent);
  }

  onUpdate({ dt, now, last }) {
    window.DEBUG = window.DEBUG || {};
    window.DEBUG.children = this.children;
    updateTime({ dt, now, last });
  }
}

function updateTime({ dt, now, last }) {
  window.Time = {
    ...(window.Time || {}),
    dt,
    now,
    last,
  };
}
