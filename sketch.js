var dog,happydog,foodS,database;
var lastFed,fedTime;
var foodObj;                                          ;
var foodStock=0;

function preload()
{

	dog1= loadImage("Dog.png");
  happydog = loadImage("happydog.png");

}


function setup() {
  database = firebase.database();
	createCanvas(500,500);

  dog= createSprite(300,250,1,1);
  dog.addImage(dog1);
  dog.scale=0.25;

  foodObj = new Food();
  
  button = createButton("ADD FOOD")
  button.position(360,100);
  button.mousePressed(addFood)

  button2 = createButton("FEED THE PET")
  button2.position(360,130);
  button2.mousePressed(feeddog)
}


function draw() {  

  background(46,139,87);
  

 fedTime = database.ref('FeedTime');
 fedTime.on("value",function(data)
 {
   lastFed = data.val();
 });
  
 fill(255,255,254)
 textSize(15);
 if(lastFed>=12)
 {
  text("last Fed : " + lastFed%12 +"PM",350,30);
 }
 else if(lastFed === 00)
 {
  text("last Fed : 12AM " ,350,30);
 }
 else{
  text("last Fed : " + lastFed +"AM",350,30)
 }

 foodObj.display();

 drawSprites();
}

function readStock(data)
{
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function addFood()
{
   foodS++;
   database.ref('/').update({
   Food:foodS
  });
}

function feeddog()
  {
     dog.addImage("happydog");
     foodObj.updateFoodStock(foodObj.getFoodStock()-1);
     database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FedTime: hour()
    });
  }
