class Ball{
  constructor() {
    this.loc = new JSVector(Math.random()*canvas.width, Math.random()*canvas.height);
    this.vel = new JSVector(Math.random()*2, Math.random()*2);
    this.topspeed = 1;
    if(this.vel.x > this.topspeed){
      this.vel.x = this.topspeed;
    }
    if(this.vel.y > this.topspeed){
      this.vel.y = this.topspeed;
    }
    this.color = 'rgba(0, 0, 0, 1)';
    this.radius = Math.random()*15+2;
  }

  render(q){
    ctx.beginPath();
    ctx.arc(q.loc.x, q.loc.y, q.radius, 0 , 2*Math.PI);
    ctx.fillStyle = q.color;
    ctx.fill();
    ctx.strokeStyle = q.color;
    ctx.stroke();
  }

  update(q){
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
    }
  }

class Orbiter{
  constructor(){
    this.color = 'rgba(' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + .75 + ')';
    this.radius = Math.random()*15+2;
    this.angle = 0;
    this.vec = new JSVector(80,0);
    this.aVel = .1;
  }
  update(){
    this.angle += this.aVel;
    this.vec.setDirection(this.angle);
  }
  render(){
    for(let i = 0; i < moverArray.length; i++){
      var loc = JSVector.addGetNew(this.vec, moverArray[i].loc);
    }
    ctx.beginPath();
    ctx.arc(loc.x, loc.y, this.radius, 0 , 2*Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}

class Snake{
  constructor(){
    this.radius = 15;
    this.color = this.color = 'rgba(' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + .75 + ')';
    this.segments = [];
    for(var i = 0; i <100; i++){
      this.segments[i] = new JSVector(0, 0);
    }
  }
  update(){
    this.segments[0] = JSVector.addGetNew(ball.loc, orbiter.loc);
    for(var i = 1; i < this.segments.length; i++){
      this.segments[i] = JSVector.subGetNew(this.segments[i], this.segments[i-1]);
      this.segments[i].setMag(2*(this.radius));
      this.segments[i].add(this.segments[i-1]);
    }
  }
  render(){
    for(var i = 1; i < this.segments.length; i++){
      ctx.beginPath();
      ctx.arc(this.segments[i].x, this.segments[i].y, this.radius, 0 , 2*Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.strokeStyle = this.color;
      ctx.stroke();
    }
  }
}
