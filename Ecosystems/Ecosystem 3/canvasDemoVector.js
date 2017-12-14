window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable
var moverArray = [];
var particles = [];
var orbiters = [];
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
  animate(); // Call to your animate function
  particles.push(new Particle(new JSVector(canvas.width/2, 50)));
}

function createBalls(n){
  for(var i = 0; i < n; i++){
    moverArray.push(new Ball());
    orbiters.push(new Orbiter());
  }
}

function render(q){
  ctx.beginPath();
  ctx.arc(q.loc.x, q.loc.y, q.radius, 0 , 2*Math.PI);
  ctx.fillStyle = q.color;
  ctx.fill();
  ctx.strokeStyle = q.color;
  ctx.stroke();
}

function update(q){
  q.loc.add(q.vel);
  if(q.loc.x + q.radius >= canvas.width || q.loc.x - q.radius <= 0){
    q.vel.x = -(q.vel.x);
    //this.loc.x = canvas.width-this.loc.x;
  }
  if(q.loc.y + q.radius >= canvas.height || q.loc.y - q.radius <= 0){
    q.vel.y = -(q.vel.y);
    //this.loc.y = canvas.width-this.loc.y;
    }
  if(q.dy > 30){
    q.dy = 30;
  }
  q.dy += q.gravity;
  q.aVel += q.aA;
  q.angle += q.aVel;
  }


function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width, canvas.height);
  j++;
  for(let i = 0; i <moverArray.length; i++){
    var b = moverArray[i];
    update(b);
    render(b);
  orbiter.update();
  orbiter.render();
  }
}
