import { Behavior } from "./Behavior.mjs";

export class WebPageDriver extends Behavior {
  onLoad() {
    document.onreadystatechange = () => {
      if (document.readyState !== "loading") {
        this.start();
        this._stopAndUnloadDriverWhenPageUnloads();
        this.update(0);
      }
    };
  }

  onUpdate() {
    const last = performance.now();
    window.requestAnimationFrame(() => {
      const now = performance.now();
      const dt = now - last;
      this.update({ dt, now, last });
    });
  }

  _stopAndUnloadDriverWhenPageUnloads() {
    window.onunload = () => {
      this.stop();
      this.unload();
    };
  }
}
