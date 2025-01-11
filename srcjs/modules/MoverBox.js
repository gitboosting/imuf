import { BoxGeometry, MeshStandardMaterial, MeshBasicMaterial, Mesh, Vector3, ArrowHelper } from 'three';

class MoverBox {
  constructor(sketch) {
    this.sketch = sketch;

    // MESH
    const geo = new BoxGeometry(0.75, 0.75, 0.75);
    const mat = new MeshStandardMaterial({
        color: 0xffffff,
        flatShading: true
    });
    this.mesh = new Mesh(geo, mat);
    const wireMat = new MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
    })
    const wireMesh = new Mesh(geo, wireMat);
    wireMesh.scale.setScalar(1.001);
    this.mesh.add(wireMesh);
    //
    // arrows fixed to the box
    const xArrow = new Vector3(1, 0, 0);
    const xArrowOrigin = new Vector3(0, 0, 0);
    const xArrowHelper = new ArrowHelper(xArrow, xArrowOrigin, 1.0, 0xff0000);

    const yArrow = new Vector3(0, 1, 0);
    const yArrowOrigin = new Vector3(0, 0, 0);
    const yArrowHelper = new ArrowHelper(yArrow, yArrowOrigin, 1.0, 0x00ff00);

    const zArrow = new Vector3(0, 0, 1);
    const zArrowOrigin = new Vector3(0, 0, 0);
    const zArrowHelper = new ArrowHelper(zArrow, zArrowOrigin, 1.0, 0x0000ff);

    this.mesh.add(xArrowHelper); this.mesh.add(yArrowHelper); this.mesh.add(zArrowHelper);
    //
    // add mesh to scene
    this.sketch.scene.add(this.mesh);

    this.sketch.animationFunctions.push(this.animation.bind(this));

    return this.mesh;
  }
  animation() {
    // this.mesh.position.x = Math.sin(Date.now() * 0.001) * 0.5;
  }
}
export default MoverBox;
