window.onload = init;

// All of these are global
var canvas;
var ctx;
var colorArray = [
  'rgb(163, 48, 37, .3)', 'rgba(241, 167, 28, .3)', 'rgba(238, 241, 28, .3)',
  'rgba(28, 241, 238, .3)', 'rgba(28, 110, 241, .3)', 'rgba(128, 28, 241, .3)',
  'rgba(216, 28, 241, .3)', 'rgba(241, 28, 103, .3)', 'rgba(155, 7, 14, .3)'
];
var vehicles = [];
var mouseX, mouseY;
var mouseLoc = new JSVector(0, 0);

function init(){
  //get the canvas
  canvas = document.getElementById('cnv');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(100,20,200)';
  canvas.addEventListener('mousemove', function(){
    mouseX = event.offsetX;     // Get the mouse coordinate
    mouseY = event.offsetY;
  }
  , false);

  // get the context
  ctx = canvas.getContext('2d'); // This is the context
  makeVehicle(50);

  animate();
}

function animate(){
  mouseLoc.x = mouseX;
  mouseLoc.y = mouseY;
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
  for(var i = 0; i < vehicles.length; i++){
    vehicles[i].update();
    // if(vehicles[i].id == -1){
    //   continue;
    // } else{
    //   for(var j = 0; j < vehicles.length; j++){
    //     if(vehicles[j].id == -1 || vehicles[j].id = i){
    //
    //     }
    //   }
    // }
  }
}

function makeVehicle(num){

  for(var i = 0; i < num; i++){
    vehicles.push(new Vehicle(i, new JSVector(Math.random()*canvas.width, Math.random()*canvas.height)));
  }
    console.log(vehicles.length);
}
