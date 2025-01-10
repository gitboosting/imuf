import Scene from "./scene.js";
import Renderer from "./renderer.js";
import Camera from "./camera.js";
import Control from "./control.js";
import MoverBox from "./MoverBox.js";
import Coord from "./coord.js";
import Grid from "./grid.js";
import Light from "./light.js";
import { bmi2ned, ned2animeQ } from "./util.js";
import { Quaternion } from 'three';

class Sketch {
    constructor(element) {
        this.animationFunctions = [];
        this.canvas = element;
        this.scene = new Scene();
        this.renderer = new Renderer(this.canvas);
        this.camera = new Camera();
        this.control = new Control(this.camera, this.canvas);
        this.coord = new Coord(this);
        this.grid = new Grid(this);
        this.light = new Light(this);

        this.mesh = new MoverBox(this);

        this.animate();
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.animationFunctions.forEach((func) => func());
        this.renderer.render(this.scene, this.camera);
    }

    updateMesh(arr) {
        //
        try {
            let qout_ned = new Quaternion(arr[1], arr[2], arr[3], arr[0]);
            let qout_anime = ned2animeQ(qout_ned);
            this.mesh.quaternion.slerp(qout_anime, 1.0);

        } catch(err) {
            console.log(err.message);
        }
    }
}
export default Sketch;
