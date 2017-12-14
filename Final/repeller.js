function Rep(){
  this.loc = new JSVector(Math.random()*canvas.width, Math.random()*canvas.height);
  this.vel = new JSVector(Math.random()*10-5, Math.random()*10-5);
  this.radius = 25;
  this.c = 'rgba(2, 255, 0, 1)';
}

Rep.prototype.update = function(){
  this.loc.add(this.vel);
  if(this.loc.x + this.radius >= canvas.width || this.loc.x - this.radius <= 0){
    this.loc.x = canvas.width-this.loc.x;
   //this.vel.x = -(this.vel.x);
 }
  if(this.loc.y + this.radius >= canvas.height || this.loc.y - this.radius<= 0){
    this.loc.y = canvas.height-this.loc.y;
   //this.vel.y = -(this.vel.y);
  }
}

Rep.prototype.render = function(){
  ctx.beginPath();
  //ctx.arc(this.loc.x,this.loc.y,this.rad,0,2*Math.PI);
  ctx.arc(this.loc.x, this.loc.y, this.radius, 0 , 2*Math.PI);
  //ctx.rect(this.loc.x,this.loc.y,this.rad,this.rad)
  ctx.fillStyle = this.c;
  ctx.fill();
  ctx.strokeStyle = this.c;
  ctx.stroke();
}
