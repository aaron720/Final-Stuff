'use strict'



function Vehicle(id, loc){
  this.id = id;
  this.loc = loc;
  this.vel = new JSVector(Math.random()*3-1.5, Math.random()*3-1.5);
  this.acc = new JSVector(0, 0);
  this.angle = 0;
  this.maxSpeed = 6;
  this.applyForce = function(f){
    this.acc.add(f);
  }
  // Method to update position
  this.update = function(){
    if(this.id >= 0){
      var desired = JSVector.subGetNew(mouseObj.loc, this.loc);
      desired.normalize();
      desired.mult(this.maxSpeed);
      var steer = JSVector.subGetNew(desired, this.vel);
      this.applyForce(steer);
    }
    if(this.id < 0){
      this.maxSpeed = 10;
      var desired = JSVector.subGetNew(mouseLoc, this.loc);
      desired.normalize();
      desired.mult(this.maxSpeed);
      var steer = JSVector.subGetNew(desired, this.vel);
      this.applyForce(steer);
      this.maxSpeed = 6;
    }
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.acc.x = 0;
    this.acc.y = 0;
    this.checkEdges();
    this.render();
  }
// Method to display
  this.render = function() {
    if(this.id >= 0){
      ctx.strokeStyle = "rgba(0, 255, 0, 1)";
      ctx.fillStyle = "rgba(0, 255, 0, .75)";
    }else{
      ctx.strokeStyle = "rgba(255, 0, 0, 1)";
      ctx.fillStyle = "rgba(255, 0, 0, .75)";
    }
    ctx.save();
    ctx.translate(this.loc.x, this.loc.y);
    this.angle = this.vel.getDirection()+Math.PI/2;
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(-6, 0);
    ctx.lineTo(6, 0);
    ctx.lineTo(0, -24);
    ctx.fill();
    ctx.restore();

  }

  this.checkEdges = function(){
    if(this.loc.x < 0) this.loc.x  = window.innerWidth;
    if(this.loc.x > window.innerWidth) this.loc.x  = 0;
    if(this.loc.y < 0) this.loc.y  = window.innerHeight;
    if(this.loc.y > window.innerHeight) this.loc.y  = 0;
  }

}
