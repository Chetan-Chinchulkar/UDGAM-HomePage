//import './style.css';
//import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let box = document.querySelector('#sphere');
let box_width = box.offsetWidth;
let box_height = box.offsetHeight;
console.log(box_width, box_height);

// Setup

const scene = new THREE.Scene();

//const camera = new THREE.PerspectiveCamera(75, box_width / box_height, 0.1, 1000);

const camera = new THREE.OrthographicCamera( box_width / - 2, box_width / 2, box_height / 2, box_height / - 2, 1, 1000 );
//scene.add( camera );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#sphere'),
  alpha: true ,
});

//renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(box_width, box_height);
camera.position.setZ(150);
//camera.position.setX(-3);

renderer.render(scene, camera);

// Lights

//const pointLight = new THREE.PointLight(0xffffff);
//pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(/* pointLight, */ ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

//Array(200).fill().forEach(addStar);

// Background

//const spaceTexture = new THREE.TextureLoader().load('space.jpg');
//const spaceTexture = new THREE.TextureLoader().load('bkgrd.png');
//scene.background = spaceTexture;

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(120, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  //  normalMap: normalTexture,
  })
);

//moon.position.z -= 25;

//scaleMoon(16);
scene.add(moon);

//moon.position.z = 30;
//moon.position.setX(-10);

// Scroll Animation
function scaleMoon(scale) {
  //const a = -0.2797;
  //var scale2 = a*scale - a + 1 ;
  var scale2 = 1;
  moon.scale.x = scale;
  moon.scale.y = scale/scale2;
  moon.scale.z = scale/scale2;
}

var max_y = 100;
function moveCamera() {
  //var t = document.body.getBoundingClientRect().top;
  var y = (window.scrollY/window.innerWidth)*100;
  //console.log(y);
  if(y>60){document.getElementById("sphere").style.zIndex = "3";}
  if(y<(max_y+20)&&y>max_y){
      y = max_y;
  }
  if(y<=max_y){
    moon.rotation.x += 0.05 * -1;
    //moon.rotation.x = y * 0.15 * -1;


    //moon.position.y = y * 0.388 + 5;

    box.style.top = (22 - y*22/max_y).toString() + '%';
    //var hw = (40 - y*30/max_y).toString() + '%'
    
    var ratio = box_width/box_height;
    var w = (box_width - ((box_width-ratio*66.4) * y/max_y)).toString() + 'px';
    var h = (box_height - ((box_height-66.4) * y/max_y)).toString() + 'px';
    box.style.width = w;
    box.style.height = h;
    //box.style.transform

    //var scale = 1 + y * 0.014 * -1;
    //scaleMoon(scale);
  }

}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);


  moon.rotation.x += 0.001;
  moon.rotation.y += 0.001;
  moon.rotation.z += 0.001;

  //moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
moveCamera();
