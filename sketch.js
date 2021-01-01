
var monkey , monkey_running
var ground,invisibleGround,groundImage;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 
  monkey = createSprite(100,3,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
   
  ground = createSprite(400,350,900, 10);
  
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  

  
}


function draw() {
  
 ground = createSprite(80,250,900, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);

  
  invisibleGround = createSprite(120,255,900, 10);
  
invisibleGround.velocityX = -4;
  invisibleGround.x = ground.width/2;
  console.log(ground.x);
  monkey.collide(invisibleGround);
  invisibleGround.visible = false;
  
  
   background("skyblue");
  fill("black");
  text("SURVIVAL TIME: "+survivalTime, 470, 20);
  text("Score: "+bananaScore,300,20);
  
  if (gameState === PLAY){
    obstacles();
    bananas();
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
    ground.velocityX = -(4 + 3* survivalTime/100)
    
    ground.velocityX = -(50);
  
    
    if(keyDown("space")&& monkey.y >= 201) {
        monkey.velocityY = -13;
      
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
    
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkey_running);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("white")
    stroke("white")
    textSize(30);
    text("GAMEOVER!", 220, 170);
    fill("black");
    textSize(20);
    text("Press 'R' to restart", 240, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      survivalTime= 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  

  drawSprites();
}
function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50 );
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+survivalTime*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);

    
  }
  

  
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,230,100,50);
    obstacle.addAnimation( "rock",obstacleImage);
    
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+survivalTime*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
    
  }
  
  
           









