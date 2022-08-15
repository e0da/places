import { randomUUID } from "./utils.mjs";

export class Node {
  parent = null;
  children = [];

  static nodes = {};
  static addNode(node) {
    const { uuid } = node;
    this.nodes[uuid] = node;
  }

  constructor({ children } = { children: [] }) {
    this.uuid = randomUUID();
    children.forEach((child) => {
      this.addChild(child);
    });
  }

  eachChild(fn) {
    this.children.forEach((child) => {
      fn(child);
    });
  }

  addChild(child) {
    child.parent = this;
    this.children.push(child);
    this.constructor.addNode(child);
  }
}
