import { Behavior } from "./Behavior.mjs";

export class Simulation extends Behavior {
  onUpdate({ dt, now, last }) {
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
