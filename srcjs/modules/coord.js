import { Vector3, ArrowHelper } from 'three';

class Coord {
  constructor(sketch) {
    this.sketch = sketch;

    // arrows fixed to the scene
    this.xFixedArrow = new Vector3(1, 0, 0); 
    this.xFixedArrowOrigin = new Vector3(0, 0, 0);
    this.xFixedArrowHelper = new ArrowHelper(this.xFixedArrow, this.xFixedArrowOrigin, 1.2, 0xaa0000);

    this.yFixedArrow = new Vector3(0, 1, 0); 
    this.yFixedArrowOrigin = new Vector3(0, 0, 0);
    this.yFixedArrowHelper = new ArrowHelper(this.yFixedArrow, this.yFixedArrowOrigin, 1.2, 0x00aa00);

    this.zFixedArrow = new Vector3(0, 0, 1); 
    this.zFixedArrowOrigin = new Vector3(0, 0, 0);
    this.zFixedArrowHelper = new ArrowHelper(this.zFixedArrow, this.zFixedArrowOrigin, 1.2, 0x0000aa);

    this.sketch.scene.add(this.xFixedArrowHelper); 
    this.sketch.scene.add(this.yFixedArrowHelper); 
    this.sketch.scene.add(this.zFixedArrowHelper);

    return this;
  }
}
export default Coord;