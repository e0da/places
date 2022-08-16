export class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // copying
  get clone() {
    return new Vector2(this.x, this.y);
  }

  get copy() {
    return this.clone;
  }

  get duplicate() {
    return this.clone;
  }

  get dup() {
    return this.duplicate;
  }

  get length() {
    return Math.hypot(this.x, this.y);
  }

  get len() {
    return this.length;
  }

  // math
  normalize() {
    const l = this.length;
    this.x /= l;
    this.y /= l;
  }

  get negative() {
    return new Vector2(-this.x, -this.y);
  }

  get neg() {
    return this.negative;
  }

  get inverse() {
    return this.negative;
  }

  get normal() {
    return this.divide(this.length);
  }

  get unit() {
    return this.normal;
  }

  get perpendicular() {
    return new Vector2(-this.y, this.x);
  }

  get perp() {
    return this.perpendicular;
  }

  get abs() {
    return new Vector2(Math.abs(this.x), Math.abs(this.y));
  }

  get floor() {
    return new Vector2(Math.floor(this.x), Math.floor(this.y));
  }

  get ceil() {
    return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
  }

  get round() {
    return new Vector2(Math.round(this.x), Math.round(this.y));
  }

  get truncate() {
    return new Vector2(Math.trunc(this.x), Math.trunc(this.y));
  }

  limit(max) {
    return new Vector2(
      Math.min(max, Math.max(-max, this.x)),
      Math.min(max, Math.max(-max, this.y))
    );
  }

  lerp(v, t) {
    return new Vector2(
      this.x + (v.x - this.x) * t,
      this.y + (v.y - this.y) * t
    );
  }

  lerpTo(v, t) {
    this.x += (v.x - this.x) * t;
    this.y += (v.y - this.y) * t;
  }

  addTo(v) {
    this.x += v.x;
    this.y += v.y;
  }

  add(v) {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  plus(v) {
    return this.add(v);
  }

  subtract(v) {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  sub(v) {
    return this.subtract(v);
  }

  minus(v) {
    return this.subtract(v);
  }

  multiply(v) {
    return new Vector2(this.x * v.x, this.y * v.y);
  }

  mul(v) {
    return this.multiply(v);
  }

  times(v) {
    return this.multiply(v);
  }

  divide(v) {
    return new Vector2(this.x / v.x, this.y / v.y);
  }

  div(v) {
    return this.divide(v);
  }

  over(v) {
    return this.divide(v);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  cross(v) {
    return this.x * v.y - this.y * v.x;
  }

  angle(v) {
    return Math.atan2(this.cross(v), this.dot(v));
  }
}
