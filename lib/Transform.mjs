import { Vector2 } from "./Vector2.mjs";

export class Transform {
  position = new Vector2(0, 0);
  rotation = 0;

  constructor(x, y, r) {
    this.position.x = x;
    this.position.y = y;
    this.rotation = r;
  }

  get pos() {
    return this.position;
  }
  set pos(v) {
    this.position = v;
  }

  get rot() {
    return this.rotation;
  }
  set rot(v) {
    this.rotation = v;
  }

  get x() {
    return this.position.x;
  }
  set x(v) {
    this.position.x = v;
  }

  get y() {
    return this.position.y;
  }
  set y(v) {
    this.position.y = v;
  }

  move(x, y) {
    this.position.x += x;
    this.position.y += y;
  }

  moveTo(x, y) {
    this.position.x = x;
    this.position.y = y;
  }

  rotate(r) {
    this.rotation += r;
  }

  rotateTo(r) {
    this.rotation = r;
  }

  lookAt(x, y) {
    const look = Math.atan2(y - this.y, x - this.x);
    this.rotation = look;
  }
}
