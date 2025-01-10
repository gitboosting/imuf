import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class Control {
  constructor(camera, canvas) {
    this.controls = new OrbitControls(camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.03;

    return this.controls;
  }
}
export default Control;