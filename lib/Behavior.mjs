import { epsilon } from "./constants.mjs";

export class Behavior {
  loading = false;
  loaded = false;
  unloading = false;
  unloaded = true;
  starting = false;
  started = false;
  stopping = false;
  stopped = true;
  updating = false;

  constructor({ children } = { children: [] }) {
    this.children = children || [];
  }

  eachChild(fn) {
    this.children.forEach((child) => {
      fn(child);
    });
  }

  load() {
    this.unloaded = false;
    this.loading = true;
    this.eachChild((child) => child.load());
    this.onLoad();
    this.loading = false;
    this.loaded = true;
  }
  unload() {
    this.loaded = false;
    this.unloading = true;
    this.eachChild((child) => child.unload());
    this.onUnload();
    this.unloading = false;
    this.unloaded = true;
  }
  start() {
    this.stopped = false;
    this.starting = true;
    this.eachChild((child) => child.start());
    this.onStart();
    this.starting = false;
    this.started = true;
    this.update();
  }
  stop() {
    this.started = false;
    this.stopping = true;
    this.eachChild((child) => child.stop());
    this.onStop();
    this.stopping = false;
    this.stopped = true;
  }
  update({ dt, now, last } = { dt: epsilon, now: epsilon, last: 0 }) {
    if (this.stopped) return;
    this.updating = true;
    this.eachChild((child) => child.update({ dt, now, last }));
    this.onUpdate({ dt, now, last });
    this.updating = false;
  }
  onLoad() {}
  onUnload() {}
  onStart() {}
  onStop() {}
  onUpdate() {}
}
