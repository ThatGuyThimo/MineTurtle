import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#WorldRender')
});
// document.body.appendChild( renderer.domElement );


renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

// renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

const texture = new THREE.TextureLoader().load('space.jpg');
scene.background = texture;

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial( {color: 0xFF6347 } );
const material = new THREE.MeshPhongMaterial( {color: 0xFF6347 } );
const torus = new THREE.Mesh(geometry, material);

const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(0, 0, 30);

const ambiantLight = new THREE.AmbientLight(0xffffff);
scene.add(ambiantLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(40, 40);


scene.add(torus);
scene.add(pointLight);
scene.add(pointLightHelper, gridHelper);


function animate() {
    requestAnimationFrame(animate);

    controls.update();

    torus.rotation.x += 0.01
    torus.rotation.y += 0.005
    torus.rotation.z += 0.01

    renderer.render(scene, camera);
}

function addStar() {
    const geometry = new THREE.SphereGeometry(0.15, 24, 24);
    // const material = new THREE.MeshStandardMaterial( {color: 0xffffff } );
    const material = new THREE.MeshPhongMaterial( {color: 0xffffff } );
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

animate();