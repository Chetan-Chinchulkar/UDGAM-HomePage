//import './style.css';
//import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


document.getElementById("bg_image").height = (document.querySelector("main").offsetHeight).toString() + "px";

let box = document.querySelector('#sphere');
let box_width = box.offsetWidth;
let box_height = box.offsetHeight;
let box_ratio = box_width/box_height;
console.log(box_width, box_height);

var pointerX = 0;
var pointerY = 0;
onmousemove = function(e){
    pointerX = e.clientX;
    pointerY = e.clientY;
}

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

/* const moonTexture = new THREE.TextureLoader().load('moon.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(120, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
); */
const geometry = new THREE.SphereGeometry(120, 16, 16);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff , wireframe: true});
const moon = new THREE.Mesh(geometry, material);
scene.add(moon);

//scaleMoon(16);

/* function scaleMoon(scale) {
  //const a = -0.2797;
  //var scale2 = a*scale - a + 1 ;
  var scale2 = 1;
  moon.scale.x = scale;
  moon.scale.y = scale/scale2;
  moon.scale.z = scale/scale2;
} */

var bottom_sphere_box = document.querySelector('.bottom_sphere_cont');
var max_y = 100* (
    document.querySelector('#events').getBoundingClientRect().top -
    document.querySelector("body").getBoundingClientRect().top
    )/window.innerHeight;
//var max_y = 100;
//var new_box_height = 66.4;
var new_box_height = document.querySelector('.navbar').getBoundingClientRect().height;
var sphere_zindex = 1;
var sphere_positioned_at_bottom = false;
var sphere_positioned_at_top = false;
function scrollAnimation() {
  //var t = document.body.getBoundingClientRect().top;
  var y = (window.scrollY/window.innerHeight)*100;
  //console.log('y',y);
  if(y>60){
      if(sphere_positioned_at_top == false){
      document.getElementById("sphere").style.zIndex = "3"; sphere_zindex=3;
    }
  }
  if(y<60){
    if(sphere_positioned_at_top == true){
        document.getElementById("sphere").style.zIndex = "1"; sphere_zindex=1;
        sphere_positioned_at_top = false;
    }
  }
  if(y>max_y){
      if(sphere_positioned_at_top==false){
        y = max_y;
        sphere_positioned_at_top = true;
      }
  }
  if(y<=max_y){
    moon.rotation.x += 0.05 * -1;
    //moon.rotation.x = y * 0.15 * -1;

    box.style.top = (22 - y*22/max_y).toString() + '%';
    //var hw = (40 - y*30/max_y).toString() + '%'
    
    
    var w = (box_width - ((box_width-box_ratio*new_box_height) * y/max_y)).toString() + 'px';
    var h = (box_height - ((box_height-new_box_height) * y/max_y)).toString() + 'px';
    box.style.width = w;
    box.style.height = h;

    //var scale = 1 + y * 0.014 * -1;
    //scaleMoon(scale);

  }

  if(-1 * bottom_sphere_box.getBoundingClientRect().top > -400){
      if(sphere_positioned_at_bottom == false){
        var new_top = (bottom_sphere_box.getBoundingClientRect().top).toString()+"px";
        console.log(new_top);
        $("#sphere").animate(
            {top: new_top, width: box_width, height: box_height}
            ,200,"swing");
        sphere_positioned_at_bottom = true;
        sphere_positioned_at_top = false;
      }
      if(sphere_positioned_at_bottom == true){
        document.getElementById("sphere").style.top = (bottom_sphere_box.getBoundingClientRect().top).toString()+"px";
      }

      if(sphere_zindex==3){
        document.getElementById("sphere").style.zIndex = "1";
        sphere_zindex=1;
      }
  }

  if(-1 * bottom_sphere_box.getBoundingClientRect().top < -400 && sphere_positioned_at_bottom == true){
        $("#sphere").animate(
            {top: "0px", width: new_box_height*box_ratio, height: new_box_height}
            ,200,"swing");
      document.getElementById("sphere").style.zIndex = "3";
      sphere_positioned_at_bottom = false;
      sphere_positioned_at_top = true;
      //console.log("ratio",box_ratio);
  }
    
}



  //console.log(document.querySelector('.bottom_sphere_cont').getBoundingClientRect().top,
  //document.querySelector('body').getBoundingClientRect().top);



document.body.onscroll = scrollAnimation;
scrollAnimation();

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

var shldMoveArrows = false;
document.querySelector('.bottom_sphere_cont').addEventListener("mousemove", function( event ) {
    // highlight the mouseover target
    /* event.target.style.border = "1px solid orange"; */
    shldMoveArrows = true;
    moveArrows();
  }, false);

  document.querySelector('.bottom_sphere_cont').addEventListener("mouseout", function( event ) {
    // highlight the mouseover target
    var x1 = document.getElementsByClassName("left_arrows");
    for (var i = 0; i < x1.length; i++) {
        x1[i].style.transform = "rotate(" + 0 + "deg)";
    }
    var x2 = document.getElementsByClassName("right_arrows");
    for (var i = 0; i < x2.length; i++) {
        x2[i].style.transform = "rotate(" + 180 + "deg)";
    }
    shldMoveArrows = false;
  }, false);


function moveArrows() {
    //requestAnimationFrame(moveArrows);

    var x = document.getElementsByClassName("arrow_img");
    for (var i = 0; i < x.length; i++) {
        var x_bound = x[i].getBoundingClientRect();
        var horz = pointerX - (x_bound.left + x_bound.width/2);
        var vert = pointerY - (x_bound.top + x_bound.height/2);
        var angle = Math.atan2(vert, horz);
        x[i].style.transform = "rotate(" + angle + "rad)";
    }
    //console.log(pointerX);

    }
