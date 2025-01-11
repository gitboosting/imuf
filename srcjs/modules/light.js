import { HemisphereLight } from 'three';

class Light {
  constructor(sketch) {
    this.sketch = sketch;

    // add a hemi light
    this.light = new HemisphereLight(0x0099ff, 0xaa5500);
    this.sketch.scene.add(this.light);

    return this;
  }
}
export default Light;