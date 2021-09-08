class Cannonball {
    constructor(x, y) {
      var options = {
        restitution : 0.8,
        friction : 0.7,
        density : 1,
        isStatic : true
      };
      this.image = loadImage("assets/cannonball.png");
      this.r = 40
      this.body = Bodies.circle(x, y, this.r, options);
      World.add(world, this.body);
      this.path = []
    }
    fire(){
        var vector = p5.Vector.fromAngle(cannon.a)
        vector.mult(15)
        Matter.Body.setStatic(this.body,false)
        Matter.Body.setVelocity(this.body,{x:vector.x, y:vector.y})
    }    
    display() {
      var pos = this.body.position;
      push()
      imageMode(CENTER);
      image(this.image, pos.x,pos.y, this.r,this.r);
     pop()
     //this.path = [[x1,y1],[x2,y2],[x3,y3],....]
     if(this.body.velocity.x > 0){
       var position = [pos.x,pos.y]
       this.path.push(position)
     }

     for(var j = 0 ; j <this.path.length ; j++){
       image(this.image,this.path[j][0],this.path[j][1],5,5)
     }
    }

  }

