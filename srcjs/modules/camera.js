import { PerspectiveCamera } from 'three';

class Camera {
  constructor() {
    // CAMERA
    const w = window.innerWidth;
    const h = window.innerHeight;
    const fov = 75;
    const aspect = w / h;
    const near = 0.1;
    const far = 10;
    //
    this.camera = new PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.z = 3;
    this.camera.position.y = 1;

    return this.camera;
  }
}
export default Camera;