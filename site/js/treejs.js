import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const turtles = []
let lastselected

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#WorldRender')
});
// document.body.appendChild( renderer.domElement );


renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

// renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

const alphamap = new THREE.TextureLoader().load('../images/alphamap.png');
// scene.background = texture;

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


// scene.add(torus);
scene.add(pointLight);
// scene.add(pointLightHelper, gridHelper);

let tid 
let tartgetRotation =0
function animate() {
    requestAnimationFrame(animate);

    controls.update();
    if(tid != undefined) {
        // if(turtles[tid][0].rotation.y < THREE.MathUtils.degToRad(tartgetRotation) && turtles[tid][0].rotation.y < THREE.MathUtils.degToRad(tartgetRotation +0.1)){
        //     turtles[tid][0].rotation.y += THREE.MathUtils.degToRad(turtles[tid][0].rotation.y +0.1)
        //     turtles[tid][1].rotation.y += THREE.MathUtils.degToRad(turtles[tid][1].rotation.y +0.1)
        // } else if(turtles[tid][0].rotation.y > THREE.MathUtils.degToRad(tartgetRotation) && turtles[tid][0].rotation.y > THREE.MathUtils.degToRad(tartgetRotation -0.1)) {
        //     turtles[tid][0].rotation.y += THREE.MathUtils.degToRad(turtles[tid][0].rotation.y -0.1)
        //     turtles[tid][1].rotation.y += THREE.MathUtils.degToRad(turtles[tid][1].rotation.y -0.1)
        // }
        // console.log(turtles[tid][0].rotation.y, THREE.MathUtils.degToRad(tartgetRotation))
        // console.log((turtles[tid][0].rotation.y > THREE.MathUtils.degToRad(tartgetRotation) && turtles[tid][0].rotation.y > THREE.MathUtils.degToRad(tartgetRotation -0.1)))
        // console.log(turtles[tid][0].rotation.y < THREE.MathUtils.degToRad(tartgetRotation) && turtles[tid][0].rotation.y < THREE.MathUtils.degToRad(tartgetRotation +0.1))

    }

    // torus.rotation.x += 0.01
    // torus.rotation.y += 0.005
    // torus.rotation.z += 0.01

    renderer.render(scene, camera);
}

function addBlock(x,y,z) {
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const edges = new THREE.EdgesGeometry( geometry ); 
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) ); 
    const material = new THREE.MeshStandardMaterial( { color: 0x00ff00, alphaMap: alphamap, transparent: true } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(x,y,z)
    line.position.set(x,y,z)
    scene.add( cube );
    scene.add( line );
}
function addTurtle(x,y,z,facing,id) {
    if(turtles[id] == undefined) {
        const geometry = new THREE.BoxGeometry( 0.8, 0.8, 0.8);
        const edges = new THREE.EdgesGeometry( geometry ); 
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 50 } ) ); 
        const material = new THREE.MeshStandardMaterial( { color: 0xF5e050 } );
        const turtle = new THREE.Mesh( geometry, material );
    
        turtles[id] = [turtle,line]

        scene.add( turtle );
        scene.add( line );
        turtle.position.set(x,y,z)
        line.position.set(x,y,z)
    
    } else {
        turtles[id][0].position.set(x,y,z)
        turtles[id][1].position.set(x,y,z)
    }
}

function slectedTurtleHighlighter(id) {
    if(lastselected != undefined) {
        turtles[lastselected][1].material.color = new THREE.Color(0xffffff)
    }
    console.log(turtles[id][1].material.color = new THREE.Color(0xff0000))
    turtles[id][1].material.color = new THREE.Color(0xff0000)
    lastselected = id
}

function moveTurtle() {

}
function turnTurtle(direction, id) {
    tid = id
    switch(direction) {
        case 1:
            console.log(1)
            tartgetRotation = 0
            // turtles[id][0].rotation.y = THREE.MathUtils.degToRad(0)
            // turtles[id][1].rotation.y = THREE.MathUtils.degToRad(0)
            break;
        case 2:
            console.log(1)
            tartgetRotation = 90
            // turtles[id][0].rotation.y = THREE.MathUtils.degToRad(90)
            // turtles[id][1].rotation.y = THREE.MathUtils.degToRad(90)
            break;
        case 3:
            console.log(3)
            tartgetRotation = 180
            // turtles[id][0].rotation.y = THREE.MathUtils.degToRad(180)
            // turtles[id][1].rotation.y = THREE.MathUtils.degToRad(180)
            break;
        case 4:
            console.log(4)
            tartgetRotation = 270
            // turtles[id][0].rotation.y = THREE.MathUtils.degToRad(270)
            // turtles[id][1].rotation.y = THREE.MathUtils.degToRad(270)
            break;
    }
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

// Array(200).fill().forEach(addStar);

animate();

export { addBlock, addTurtle, slectedTurtleHighlighter, turnTurtle};