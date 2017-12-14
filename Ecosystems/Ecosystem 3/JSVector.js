function JSVector(x, y){
		this.x = x;
	  this.y = y;
	}

	JSVector.prototype.setMag = function(mag){
	  var angle = this.getDirection();
	  this.x = mag*Math.cos(angle);
	  this.y = mag*Math.sin(angle);
	} 		//  set the magnitude of a vector
	JSVector.prototype.setTh = function(th){
		let m = this.getMag();
		this.x = m*Math.cos(th);
		this.y = m*Math.sin(th);
	}
	JSVector.prototype.getMag = function(){
	  return Math.sqrt(this.x*this.x + this.y*this.y);
	}		//  get the magnitude of a vector
	JSVector.prototype.setDirection = function(dir){
	  var mag = this.getMag();
	  this.x = mag*Math.cos(dir);
	  this.y = mag*Math.sin(dir);
	} 	//  set the direction of a vector
	JSVector.prototype.getDirection = function(){
	  return Math.atan2(this.y, this.x);
	}	//  set the direction of a vector
	JSVector.prototype.add = function(vect){
	  this.x = this.x + vect.x;
	  this.y += vect.y;
	}      		//  add components of one vector to components of another vector
	JSVector.addGetNew = function(vect1, vect2){
	  var vect = new JSVector(vect1.x + vect2.x, vect1.y + vect2.y);
	  return vect;
	}		//  add components of two vectors, return a new vector
	JSVector.prototype.sub = function(vect){
	  this.x = this.x - vect.x;
	  this.y -= vect.y;
	}			//  subtract components of one vector from those of another
	JSVector.subGetNew = function(vect1, vect2){
	  var vect = new JSVector(vect1.x - vect2.x, vect1.y - vect2.y);
	  return vect;
	}	//  subtract components of two vectors, return a new vector
	JSVector.prototype.mult = function(a){
	  this.x *= a;
	  this.y *= a;
	}			//  multiply one vector by components of another vector
	JSVector.prototype.div = function(a){
	  this.x /= a;
	  this.y /= a;
	}			//  Divide components of one vector by, those of another vector
	JSVector.prototype.normalize = function(){
		this.x /= this.getMag();
		this.y /= this.getMag();
	}		//  Set the magnitude of a Vector to one
	JSVector.prototype.limit = function(lim){
		var maxSpeed = lim;
		var currSpeed = this.getMag();
		if(currSpeed > maxSpeed) this.setMag(maxSpeed);
	}			//  Set max value of a vector to some limit
	JSVector.prototype.distance = function(vec){
		this.dx = this.x - vec.x;
		this.dy = this.y - vec.y;
		return Math.sqrt(this.dx*this.dx+this.dy*this.dy);
	}    	//  Find the distance between two vectors
