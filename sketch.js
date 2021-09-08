const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon;
var balls = []
var boats  = []
var boatAnimation = []
var brokenboatAnimation = []
function preload() {
 bgI = loadImage("assets/background.gif")
 boatAnimationImg = loadImage("assets/boat/boat.png")
 boatAnimationjson = loadJSON("assets/boat/boat.json")
 brokenboatAnimationImg = loadImage("assets/boat/broken_boat.png")
 brokenboatAnimationjson = loadJSON("assets/boat/broken_boat.json")
}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(0, height - 10, width * 4, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(150,150,100,50,-PI/4)
  var boatFrames = boatAnimationjson.frames
  for ( var i = 0 ; i < boatFrames.length ; i++){
    var pos = boatFrames[i].position
    var img = boatAnimationImg.get(pos.x,pos.y,pos.w,pos.h)
    boatAnimation.push(img)
  }
  var brokenboatFrames = brokenboatAnimationjson.frames
  for ( var i = 0 ; i < brokenboatFrames.length ; i++){
    var pos = brokenboatFrames[i].position
    var img = brokenboatAnimationImg.get(pos.x,pos.y,pos.w,pos.h)
    brokenboatAnimation.push(img)
  }

  
}

function draw() {
  background(bgI);
  Engine.update(engine);

  ground.display();
  cannon.display()
  tower.display();
  showboats()
  for(var i = 0 ; i < balls.length; i++){
    if(balls[i]){
balls[i].display()
if(balls[i].body.position.x > width || balls[i].body.position.y > height-110){
  World.remove(world,balls[i].body)
  delete balls[i]
}
} 
for( var j = 0 ; j < boats.length ; j++){
  if(balls[i]!==undefined && boats[j]!==undefined){
    if(Matter.SAT.collides(balls[i].body,boats[j].body).collided){
      World.remove(world,balls[i].body)
      delete balls[i]
      boats[j].animation = brokenboatAnimation
      
      setTimeout(() => {
        World.remove(world,boats[j].body)
        delete boats[j]
      },2000)
    
    }
  }
}
}
  
}
function keyPressed(){
  if(keyCode == DOWN_ARROW){
    ball = new Cannonball(cannon.x+25,cannon.y-31)
    balls.push(ball)
  }
}

function keyReleased(){
  if(keyCode == DOWN_ARROW){
    balls[balls.length -1].fire()
  }
}

function showboats(){
  if(boats.length > 0){
    if(boats[boats.length - 1] === undefined ||boats[boats.length-1].body.position.x < width -200){
      boat = new Boat(width,height -100,170,170,boatAnimation)
    boats.push(boat)
    }
    for(var i = 0; i < boats.length; i++ ){
      if(boats[i]){
      boats[i].display()
      boats[i].animate()
    Matter.Body.setVelocity(boats[i].body,{x:-1,y:0})
    }
  }
  } else{
    boat = new Boat(width,height -100,170,170,boatAnimation)
    boats.push(boat)
  }
}
