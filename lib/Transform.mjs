import { Vector2 } from "./Vector2.mjs";

export class Transform {
  position = new Vector2(0, 0);
  rotation = 0;
  scale = new Vector2(1, 1);

  constructor(x, y, rotation, width, height) {
    if (x) this.x = x;
    if (y) this.y = y;
    if (rotation) this.rot = rotation;
    if (width) this.w = width;
    if (height) this.h = height;
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

  get width() {
    return this.scale.x;
  }
  set width(v) {
    this.scale.x = v;
  }
  get w() {
    return this.width;
  }
  set w(v) {
    this.width = v;
  }

  get height() {
    return this.scale.y;
  }
  set height(v) {
    this.scale.y = v;
  }
  get h() {
    return this.height;
  }
  set h(v) {
    this.height = v;
  }

  scaleTo(sx, sy) {
    this.scale.x = sx;
    this.scale.y = sy;
  }

  scaleBy(sx, sy) {
    this.scale.x *= sx;
    this.scale.y *= sy;
  }

  scaleByVector(v) {
    this.scale.x *= v.x;
    this.scale.y *= v.y;
  }

  scaleToVector(v) {
    this.scale.x = v.x;
    this.scale.y = v.y;
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
