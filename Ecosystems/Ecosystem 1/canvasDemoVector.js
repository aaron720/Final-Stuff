window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable
var balls = [];
//var audio = new Audio('');

function init(){
  //get the canvas
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = 900;
  canvas.height = 600;
  canvas.style.border = 'solid black 2px';
  canvas.style.backgroundColor = 'rgba(0,44,55, .5)';
  // get the context
  ctx = canvas.getContext('2d'); // This is the context

  createBalls(15);
  animate(); // Call to your animate function
}
// To do::
//  1. Declare and init variables x, y, dx, dy, radius;

// var ball = {
//   x:Math.random()*canvas.width,
//   y:Math.random()*canvas.height,
//   radius:Math.random()*500,
//   dx:Math.random()*150,
//   dy:Math.random()*150
// }
function animate(){
  //console.log(ball.radius);
  //audio.play();
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width, canvas.height);
for(var i = 0; i < balls.length; i++){
  //console.log(ball.radius);
  balls[i].render();
  //console.log(ball.radius);
  balls[i].update();
  }
}
function createBalls(numBalls){
  for(var i = 0; i < numBalls; i++){
    // var x = Math.random()*window.innerWidth;
    // var y = Math.random()*window.innerHeight;

    balls.push(new Ball());
  }
}
function getRandomColor() {
    var color = "";
    for(var i = 0; i < 3; i++) {
        var sub = Math.floor(Math.random() * 256).toString(16);
        color += (sub.length == 1 ? "0" + sub : sub);
    }
    return "#" + color;
}

function Ball(){
  this.loc = new JSVector(Math.random()*canvas.width, Math.random()*canvas.height);
  this.vel = new JSVector(Math.random()*10-5, Math.random()*10-5);
  this.radius = Math.random()*15+10;
  //this.update = function;
}

Ball.prototype.update = function(){
  //console.log(ball.radius);
  this.loc.add(this.vel);
  if(this.loc.x + this.radius >= canvas.width || this.loc.x - this.radius <= 0){
    this.vel.x = -(this.vel.x);
  }
  if(this.loc.y + this.radius >= canvas.height || this.loc.y - this.radius <= 0){
    this.vel.y = -(this.vel.y);
  }
}
Ball.prototype.render = function(){
  console.log(this.ra);
  ctx.beginPath();

  ctx.arc(this.loc.x, this.loc.y, this.radius, 0 , 2*Math.PI);

  ctx.fill();
  ctx.strokeStyle = 0;
  ctx.stroke();
}
