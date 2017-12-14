window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable
var particles = [];
var orbiters = [];
var moverArray = [];
var j = 0;


function init(){
  //get the canvas
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,44,55, .5)';
  // get the context
  ctx = canvas.getContext('2d'); // This is the context
  createBalls(5);
  orbiter = new Orbiter();
  ball = new Ball();
  particles.push(new Particle(new JSVector(canvas.width/2, 50)));
  animate(); // Call to your animate function
}

function createBalls(n){
  for(var i = 0; i < n; i++){
    moverArray.push(new Ball());
    orbiters.push(new Orbiter());
  }
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width, canvas.height);
  j++;
  for(var i = particles.length-1; i >= 0; i--){
    if(j === 2){
      particles.push(new Particle(new JSVector(canvas.width/2, 50)));
      j = 0;
    }
    var p = particles[i];
    p.update();
    p.render();
    if(p.isDead()) {
      particles.splice(i, 1);
    }
  }
  for(let i = 0; i <moverArray.length; i++){
    var b = moverArray[i];
    update(b);
    render(b);
  orbiter.update();
  orbiter.render();
  }
}
