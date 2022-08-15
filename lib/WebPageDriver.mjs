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
    /* On Safari on macOS, I always see whole numbers passed to the
     * requestAnimationFrame callback. When I measure with performance.now(), I
     * see more of the variance I expect. My understanding is that the callback
     * should receive a DOMHighResTimeStamp, but that doesn't seem to be what I'm
     * seeing unless requestAnimationFrame is running very, very precisely. But,
     * again, I'm seeing variance in performance.now(). I dunno?
     * <https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame#callback>
     */
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
