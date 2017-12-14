function Att(){
    this.loc = new JSVector(Math.random()*canvas.width, Math.random()*canvas.height);
    this.vel = new JSVector(Math.random()*10-5, Math.random()*10-5);
    this.radius = 25;
    this.c = 'rgba(255, 0, 0, 1)';
  }

  Att.prototype.update = function(){
    this.loc.add(this.vel);
    if(this.loc.x + this.radius >= canvas.width || this.loc.x - this.radius <= 0){
      //this.vel.x = -(this.vel.x);
      this.loc.x = canvas.width-this.loc.x;

    }
    if(this.loc.y + this.radius >= canvas.height || this.loc.y - this.radius <= 0){
      //this.vel.y = -(this.vel.y);
      this.loc.y = canvas.height-this.loc.y;
    }
  }
  Att.prototype.render = function(){
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.radius, 0 , 2*Math.PI);
    ctx.fillStyle = this.c;
    ctx.fill();
    ctx.strokeStyle = this.c;
    ctx.stroke();
  }
