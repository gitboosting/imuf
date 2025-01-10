import Sketch from "./with_this.js";
import { timer } from "./util.js"

function getSketch(canvas) {
    //
    // a function to return a sketch given an element id
    return new Sketch(canvas);
}

async function init(oriJson, dt, sketch) {
    for (let i = 0; i < oriJson.length; i++) {
        await timer(dt);
        sketch.updateMesh(oriJson[i]);
    }
}

export { getSketch, init };
