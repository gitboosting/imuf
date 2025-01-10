import { WebGLRenderer } from 'three';

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;

    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w/2, h/2);
    return this.renderer;
  }
}
export default Renderer;