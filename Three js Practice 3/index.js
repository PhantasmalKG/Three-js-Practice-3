import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import spline from "./spineCreator.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.5);
const aspect = w/h;
const near = 0.1;
const far = 1000;
const fov = 75;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.5;

console.log(spline);
const points = spline.getPoints(100);
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({color: 0x00ff00});
// const newLine = new THREE.Line(geometry, material);
// scene.add(newLine);



const tubeGeo = new THREE.TubeGeometry(spline, 222, 0.65, 16, true)
const tubeMat = new THREE.MeshBasicMaterial(
    { color:0xffffff,
    //   side: THREE.DoubleSide, 
      wireframe: true}
);
const tube = new THREE.Mesh(tubeGeo, tubeMat);
scene.add(tube);

//create edges geometry from spline
const edges = new THREE.EdgesGeometry(tubeGeo, 1);
const lineMat = new THREE.LineBasicMaterial({color: 0xffffff});
const tubeLines = new THREE.LineSegments(edges, lineMat);
scene.add(tubeLines);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemiLight);

function updateCamera(t){
    const time = t + 0.05;
    const loopTime = 200 * 1000;
    const p = (time % loopTime) / loopTime;
    const pos = tubeGeo.parameters.path.getPointAt(p);
    const lookAt = tubeGeo.parameters.path.getPointAt((p + 0.03) % 1);
    camera.position.copy(pos);
    camera.lookAt(lookAt);
}


function animate(t = 0){
    requestAnimationFrame(animate);
    updateCamera(t);
    renderer.render(scene, camera);
    orbitControls.update();
}

animate();

function windowSizeRefresh(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera. updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', windowSizeRefresh, false);