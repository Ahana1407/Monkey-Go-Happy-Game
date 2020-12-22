
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
var survivalTime=0
var ground

function preload(){
  
  
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400)
  

//creating ground
  ground = createSprite(400,350,900,10)
  ground.velocityX = -4
  
  
  console.log(ground.x)
  
  //creating monkey
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale = 0.1
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  
}


function draw() {
  background("lightblue")
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 300,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time:  "+ survivalTime, 100,50);
  
  if (monkey.isTouching(foodGroup)){
    foodGroup.destroyEach()
    score = score+2
  }    
  if (monkey.isTouching(obstacleGroup)){
  monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0)
    foodGroup.setVelocityXEach(0)
    textSize(50)
    text("YOU LOST", 200,200)
       
  }
  
  
  if (ground.x<150){  
  ground.x=ground.width/2}
  
  if(keyDown("space") && monkey.y>=100){
    monkey.velocityY = -12
     }
  //add gravity
  monkey.velocityY = monkey.velocityY+0.8
  
  monkey.collide(ground);
  
  food();
  spawnObstacles();
  
  drawSprites()
  
}

  function food(){
     if (frameCount % 150 === 0) {
      var banana = createSprite(300,200,40,10);
      banana.y = Math.round(random(120,200));
      banana.addImage(bananaImage);
      banana.scale = 0.1;
      banana.velocityX = -3;

       //assign lifetime to the variable
      banana.lifetime = 150;

       foodGroup.add(banana);
     }
  }

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,306,10,40);
   obstacle.velocityX = -6;
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.2;
   obstacle.lifetime = 100;

    obstacleGroup.add(obstacle);

 }
}


