'use strict'

function Vehicle(id, loc){
  this.rad = 10;
  this.id = id;
  this.loc = loc;
  this.vel = new JSVector(Math.random()*3-1.5, Math.random()*3-1.5);
  this.acc = new JSVector(0, 0);
  this.angle = 0;
  this.maxSpeed = 6;

  // Method to update position
  this.update = function(){
  // if(this.id >= 0){
	//    var desired = JSVector.subGetNew(mouseObj.loc, this.loc);
  //    desired.normalize();
  //    desired.mult(this.maxSpeed);
  //    var steer = JSVector.subGetNew(desired, this.vel);
  //    this.applyForce(steer);
  // }
  if(this.id <0 ){
    this.maxSpeed = 9;
    var desired = JSVector.subGetNew(mouseLoc, this.loc);
    desired.normalize();
    desired.mult(this.maxSpeed);
    var steer = JSVector.subGetNew(desired, this.vel);
    this.applyForce(steer);
    this.maxSpeed = 3;
    this.maxForce = 0.3;
  }
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.acc.x = 0;
    this.acc.y = 0;
    this.checkEdges();
    this.render();
    this.seperate();
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
    ctx.arc(0,0,this.rad,0,2*Math.PI);
    // ctx.moveTo(-6, 0);
    // ctx.lineTo(6, 0);
    // ctx.lineTo(0, -24);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

  }

  this.checkEdges = function(){
    if(this.loc.x + this.rad < 0) this.loc.x  = canvas.width;
    if(this.loc.x - this.rad > canvas.width) this.loc.x  = 0;
    if(this.loc.y + this.rad < 0) this.loc.y  = canvas.height;
    if(this.loc.y - this.rad > canvas.height) this.loc.y  = 0;
  }

  this.applyForce = function(steer){
    this.acc.add(steer);
  }

  this.seperate = function(){
    var desiredSep = 24;
    var sum = new JSVector();
    var count = 0;
    for(var i = 0; i < vehicles.length; i++){
      if (vehicles[i] != this){
        var distance = this.loc.distance(vehicles[i].loc)
        if (distance < desiredSep && distance > 0){
          var f = JSVector.subGetNew(this.loc, vehicles[i].loc);
          f.normalize();
          f.div(distance);
          sum.add(f);
          count++;
        }
      }
    }
    if (count > 0){
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed /*/this.acc*/);
      var steer = JSVector.subGetNew(sum, this.vel);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
  }
}
