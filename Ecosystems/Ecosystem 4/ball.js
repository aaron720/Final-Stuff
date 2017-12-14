class Particle{
  constructor(){
    this.vel = new JSVector(Math.random(-1, 1), Math.random(-1, 1));
    this.radius = Math.random()*15+2;
    this.loc =  new JSVector(canvas.width/2, 20);
    this.acc = new JSVector(0, .05);
    this.lifespan = 500.0;
    this.color = 'rgba(0, 0, 0,';
  }
  update(){
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    if(this.loc.x + this.radius >= canvas.width || this.loc.x - this.radius <= 0){
      this.vel.x = -(this.vel.x);
      //this.loc.x = canvas.width-this.loc.x;
    }
    if(this.loc.y + this.radius >= canvas.height || this.loc.y - this.radius <= 0){
      this.vel.y = -(this.vel.y);
      //this.loc.y = canvas.width-this.loc.y;
      }
    if(this.dy > 30){
      this.dy = 30;
    }
    this.lifespan -= 2;
  }


  render(){
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.radius, 0 , 2*Math.PI);
    this.c = this.color + this.lifespan/375.0 + ')';
    ctx.fillStyle = this.c;
    ctx.fill();
    ctx.strokeStyle = this.c;
    ctx.stroke();
  }

  isDead(){
    if(this.lifespan < 0.0){
      return true;
    } else {
      return false;
    }
  }
}

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
