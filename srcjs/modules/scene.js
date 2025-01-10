import { Scene as ThreeScene, Color } from 'three';

class Scene {
  constructor() {
    var scene = new ThreeScene();
    // scene.background = new Color( 0x2880bf );
    return scene;
  }
}
export default Scene;
