class Boat {
    constructor(x, y, width, height,animation) {
      var options = {
        restituiton : 0.1
      };
      this.image = loadImage("assets/boat.png");
      this.width = width;
      this.height = height;
      this.animation = animation;
      this.body = Bodies.rectangle(x, y, this.width, this.height, options);
      this.speed = 0.05
      World.add(world, this.body);
    }
    animate(){
      this.speed = this.speed + 0.05
    }
    
    display() {
      var pos = this.body.position;
      var index = floor(this.speed%this.animation.length)
      push()
      translate(pos.x,pos.y)
      rotate(this.body.angle)
      imageMode(CENTER);
      image(this.animation[index], 0,0, this.width, this.height);
     pop()
    }
  }
  