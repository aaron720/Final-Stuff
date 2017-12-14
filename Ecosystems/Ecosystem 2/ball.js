function Ball(){
    this.loc = new JSVector(Math.random()*canvas.width, Math.random()*canvas.height);
    this.vel = new JSVector(Math.random()*10-5, Math.random()*10-5);
    this.radius = Math.random()*15+10;
    this.acc = new JSVector(0,0);
    this.c = 'rgba(' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + .75 + ')';
    //this.update = function;
  }

  Ball.prototype.update = function(){
    //console.log(ball.radius);
    this.loc.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(10);
    this.acc.x = 0;
    this.acc.y = 0;

    if(this.loc.x + this.radius >= canvas.width || this.loc.x - this.radius <= 0){
      this.vel.x = -(this.vel.x);
    }
    if(this.loc.y + this.radius >= canvas.height || this.loc.y - this.radius <= 0){
      this.vel.y = -(this.vel.y);
    }

    this.render();
  }
  Ball.prototype.render = function(){
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.radius, 0 , 2*Math.PI);
    ctx.fillStyle = this.c;
    ctx.fill();
    ctx.strokeStyle = this.c;
    ctx.stroke();
    //this.dragSegment(0, mouseLoc.x, mouseLoc.y);
    for(var i=0; i<x.length-1; i++){
      this.dragSegment(i+1, x[i], y[i]);
    }
  }
  Ball.prototype.dragSegment = function(i, xin, yin) {
  var dx = xin - x[i];
  var dy = yin - y[i];
  var angle = Math.atan2(dy, dx);
  x[i] = xin - Math.cos(angle) * segLength;
  y[i] = yin - Math.sin(angle) * segLength;
  this.segment(x[i], y[i], angle);
}

Ball.prototype.segment = function(x, y, a) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(a);
  //ctx.line(0, 0, this.rad, 0);
  ctx.restore();
}

Ball.prototype.applyForce = function(f){
  this.acc.add(f);
}

// function Orbit(){
//
//   this.angle = 120;
//   this.speed = 3;
//   this.amplitude = 100;
//   this.x = Math.cos(this.angle)*this.amplitude;
//   this.y = Math.sin(this.angle)*this.amplitude;
//   this.loc = new JSVector(this.x, this.y);
//
//   this.update(){
//      ctx.save();
//      ctx.translate(Att.loc.x, Att.loc.y);
//      Orbit.loc.x = Math.cos(this.angle)*this.amplitude;
//      Orbit.loc.y = Math.sin(this.angle)*this.amplitude;
//      ctx.restore();
//   }
// }
