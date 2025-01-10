import { GridHelper } from 'three';

class Grid {
  constructor(sketch) {
    this.sketch = sketch;

    // add a grid
    this.grid = new GridHelper(20, 20, 20);
    this.sketch.scene.add(this.grid);

    return this;
  }
}
export default Grid;
