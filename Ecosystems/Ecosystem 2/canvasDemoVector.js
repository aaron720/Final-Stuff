window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable
var balls = [];
var atts = [];
var reps = [];
var testMover;

var x = [], y = [], segNum = 20, segLenth = 18;

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
  //ctx.translate(testMover.loc.x , testMover.loc.y);
  //testMover = new Ball();
  //createBalls(15);
  for(var i = 0; i < 55; i++){
    balls.push(new Ball());
  }
  for(var i = 0; i < 1; i++){
    atts.push(new Att());
  }
  for(var i = 0; i < 1; i++){
    reps.push(new Rep());
  }
  //canvas.addEventListener('mousemove', handleMouseMove);
  animate(); // Call to your animate function
}

// function handleMouseMove(evt){
//   mouseLoc.x = evt.offsetX;
//   mouseLoc.y = evt.offsetY;
// }

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width, canvas.height);
  //ctx.translate(testMover.loc.x , testMover.loc.y);

  //balls[i].translate(xLoc, yLoc)

  //testMover.update();
  //testMover.render();

  for(var i = 0; i < balls.length; i++){
    balls[i].update();
  //  balls[i].render();
    //balls[i].update();
    }
    for(var i = 0; i < atts.length; i++){
      var att = atts[i];
      att.update();
      att.render();
      for(var j = 0; j < balls.length; j++){
        var ball = balls[j];
        var att = atts[i];
        var distance = att.loc.distance(ball.loc)
        if (distance <= 300 && distance >= 50){
          var f = JSVector.subGetNew(atts[i].loc, balls[j].loc);
          f.normalize();
          f.mult(.75);
          ball.applyForce(f);
        }
      }
    }

    for(var i = 0; i < reps.length; i++){
      var rep = reps[i];
      rep.update();
      rep.render();
      for(var j = 0; j < balls.length; j++){
        var ball = balls[j];
        var rep = reps[i];
        var distance = ball.loc.distance(rep.loc)
        if (distance <= 300){
          var f = JSVector.subGetNew(balls[j].loc, reps[i].loc);
          f.normalize();
          f.mult(0.75);
          ball.applyForce(f);
        }
      }
    }
  for(var i = 0; i < x.length-1; i++){
    dragSegment(i+1, x[i], y[i]);
    }
  }

function dragSegment(i, xin, yin) {
  var dx = xin - x[i];
  var dy = yin - y[i];
  var angle = atan2(dy, dx);
  x[i] = xin - cos(angle) * segLength;
  y[i] = yin - sin(angle) * segLength;
  segment(x[i], y[i], angle);
}
