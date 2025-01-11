// const THREE = require('three');    // uncomment for testing
import { Vector3, Quaternion } from 'three';

function anime2bmi(anime) {
    // convert animation coord to bmi coord
    // anime is a THREE.Vector3
    return new Vector3(anime.x, -anime.z, anime.y);
}

function bmi2anime(bmi) {
    // convert bmi coord to animation coord
    return new Vector3(bmi.x, bmi.z, -bmi.y);
}

export function bmi2ned(bmi) {
    // convert bmi coord to ned coord
    return new Vector3(bmi.x, -bmi.y, -bmi.z);
}

function ned2bmi(ned) {
    // convert ned coord to bmi coord
    return new Vector3(ned.x, -ned.y, -ned.z);
}

function anime2nedQ(bmiQ) {
    // convert a quaternion in anime frame to ned frame
    const q0f2 = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0).normalize(), -1 * Math.PI/2.0);
    const qf2 = new Quaternion();
    qf2.multiply(q0f2).multiply(bmiQ).multiply(q0f2.conjugate());
    return qf2;
}

export function ned2animeQ(nedQ) {
    // convert a quaternion in ned frame to anime frame
    const q0f2 = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0).normalize(), 1 * Math.PI/2.0);
    const qf2 = new Quaternion();
    qf2.multiply(q0f2).multiply(nedQ).multiply(q0f2.conjugate());
    return qf2;
}

export const timer = ms => new Promise(res => setTimeout(res, ms));

// uncomment for testing
//
// module.exports = {
//     bmi2anime: bmi2anime,
//     anime2bmi: anime2bmi,
//     bmi2ned: bmi2ned,
//     ned2bmi: ned2bmi,
//     anime2nedQ: anime2nedQ,
//     ned2animeQ: ned2animeQ
// }