'use strict'

function Vehicle(id, loc){
  this.id = id;
  this.loc = loc;
  this.vel = new JSVector(Math.random()*3-1.5, Math.random()*3-1.5);
  this.acc = new JSVector(0, 0);
  this.angle = 0;
  this.maxSpeed = 6;
  this.maxForce = 15;
  this.inside = false;

  // Method to update position
  this.update = function(){
    this.separation(vehicles);
    this.cohesion(vehicles);
    this.alignment(vehicles);
    this.loc.add(this.vel);
    var tSpeed = 1;
    if(this.vel.getMagnitude() > tSpeed){
      this.vel.setMagnitude(tSpeed);
    }
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.acc.x = 0;
    this.acc.y = 0;
    this.checkEdges();
    this.render();
}

  this.cohesion = function(vehicles){
    var neighborDist = 50;
    var d = 0;
    var count = 0;
    var sum = new JSVector(0,0);
    for(var i = 0; i < vehicles.length; i++){
      if(this == vehicles[i]){
        continue;
      }
      var d = this.loc.distance(vehicles[i].loc);
      if(d < neighborDist){
          sum.add(vehicles[i]);
          count++;
      }
    }
    sum.div(count);
    var desired = JSVector.subGetNew(sum, this.loc);
    var diff = JSVector.subGetNew(desired, this.vel);
    //var topSpeed = 4;
    diff.normalize();
    diff.mult(2);
    this.applyForce(diff);
  }

  this.separation = function(vehicles){
    var sumVec = new JSVector(0,0);
    for(var i = 0; i < vehicles.length; i++){
      if(vehicles[i] == this){
        continue;
      }
      var dist = vehicles[i].loc.distance(this.loc);
      if(dist < 35){
        var newVec = JSVector.subGetNew(this.loc, vehicles[i].loc);
        newVec.normalize();
        newVec.mult(2);
        sumVec.add(newVec);
        }
      }
      sumVec.normalize();
      sumVec.mult(2);
      this.applyForce(sumVec);
  }

  this.alignment = function(vehicles){
    var neighborDist = 50;
    var sum = new JSVector(0,0);
    var count = 0;
    for(var i = 0; i < vehicles.length; i++){
      var d = this.loc.distance(vehicles[i].loc);
      if(d < neighborDist){
        sum.add(vehicles[i].vel);
        count++;
      }
    }
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);
      var steer = JSVector.subGetNew(sum, this.vel);
      steer.limit(this.maxForce);
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
    if(this.loc.x < 0) {this.loc.x  = window.innerWidth;}
    if(this.loc.x > window.innerWidth) {this.loc.x  = 0;}
    if(this.loc.y < 0){ this.loc.y  = window.innerHeight;}
    if(this.loc.y > window.innerHeight) {this.loc.y  = 0;}
  }

  this.applyForce = function(steer){
    this.acc.add(steer);
  }

  this.seek = function(target){
    var desired = new JSVector(target, this.loc);
    desired.normalize();
    desired.mult(this.maxSpeed);
    var steer = new JSVector(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }

}
