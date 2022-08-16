import { Behavior } from "./Behavior.mjs";
import { ResourceMap } from "./ResourceMap.mjs";
import { Transform } from "./Transform.mjs";
import { Vector2 as Vect } from "./Vector2.mjs";

export class Sprite extends Behavior {
  transform = new Transform(0, 0, 0);
  url = ResourceMap["image-line-icon"].url;
  image = null;
  resourceMap = null;

  constructor(url, width, height) {
    super();
    this.url = url || this.url;
    this.transform.width = width || ResourceMap["image-line-icon"].width;
    this.transform.height = height || ResourceMap["image-line-icon"].height;
    this.image = new Image(this.transform.width, this.transform.height);
  }

  // onLoad() {
  //   this.image.src = this.url;
  //   this.image.width = this.transform.width;
  //   this.image.height = this.transform.height;
  //   this.resourceMap.appendChild(this.image);
  // }
  onStart() {
    // FIXME: is onLoad working?
    this.resourceMap = document.querySelector("#ResourceMap");
    this.image.src = this.url;
    this.image.width = this.transform.width;
    this.image.height = this.transform.height;
    this.resourceMap.appendChild(this.image);

    this.screenCanvas = document.createElement("canvas");
    this.screenCtx = this.screenCanvas.getContext("2d");

    this.canvas = document.createElement("canvas");
    this.canvas.width = ResourceMap["image-line-icon"].width;
    this.canvas.height = ResourceMap["image-line-icon"].height;

    this.renderingContext = this.canvas.getContext("2d");
    this.renderingContext.drawImage(this.image, 0, 0);
  }

  onUpdate() {
    // FIXME: clear the screen here for now, but it belongs somewhere else, like in a background
    this.clearScreen();

    // Should detect whether repaint is needed before repainting
    this.onRender();
  }

  clearScreen() {
    return;
    const { w, h } = this.screen;
    this.screenCtx.clearRect(0, 0, w, h);
  }

  onRender() {
    this.renderingContext.drawImage(this.image, 0, 0);
    const ctx = this.screenCtx;
    const { w, h, rot, scale } = this.transform;
    // offset the top left corner from the center
    const offset = new Vect(w / 2, h / 2);
    const { x, y } = this.screenPos.minus(offset);
    ctx.translate(x, y);
    ctx.scale(w, h);
    ctx.rotate(rot);
    ctx.drawImage(this.canvas, 0, 0);
  }

  get ctx() {
    return this.renderingContext;
  }

  get screen() {
    return this.screenCanvas;
  }

  get screenPos() {
    return this.transform.pos;
  }

  get screenPosition() {
    return this.screenPos;
  }
}
