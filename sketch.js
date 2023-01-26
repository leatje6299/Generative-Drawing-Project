var gravity, gravityInc = 0;
var fireworks = [];

//button variables
var buttonY = 120;
var buttonYHeight = 20;
var buttonXWidth = buttonYHeight;
var buttonX = 20;
var isPressed = false;
var proIsClicked = false;
var normalIsClicked = true;

//variables which will be used for interaction
var mode = 0;
var speed = 0;
var r,g,b = 0;

/////////////////////////////////////////////////////////////////////

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);
}

/////////////////////////////////////////////////////////////////////

function draw() {
  background(0,80);
  gravity = createVector(0,0.2 + gravityInc);
  
  push();
  for(let i = fireworks.length - 1; i >= 0; i--)
  {
    fireworks[i].update();
    fireworks[i].show();
    fireworks[i].setMode(mode);
    fireworks[i].setColor(r,g,b);
    if(fireworks[i].finished())
    {
      //destroy the particles once over -> better performance
      fireworks.splice(i,1);
    }
  }
  pop();
  push();
  UIdraw();
  pop();
  if(random(0,1) < 0.02)
  {
    //firework will randomly draw in the background
    fireworks.push(new Firework(random(width),height,speed));  
  }
}

/////////////////////////////////////////////////////////////////////

function mousePressed(){
  //create new fireworks
  if(mouseX > 220 || mouseY > 230)
  {
    fireworks.push(new Firework(mouseX,mouseY,speed));
  }
  //button detection
  if(mouseX > buttonX && mouseX < buttonX + buttonXWidth && mouseY > buttonY && mouseY < buttonY + buttonYHeight)
  {
    if(proIsClicked)
    {
      r = 144;
      g = 129;
      b = 33;
    }
    if(normalIsClicked)
    {
      r = 255;
      g = 0;
      b = 0;
    }
  }
  if(mouseX > buttonX + 30 && mouseX < buttonX + buttonXWidth + 30 && mouseY > buttonY && mouseY < buttonY + buttonYHeight)
  {
    if(proIsClicked)
    {
      r = 0;
      g = 74;
      b = 156;
    }
    if(normalIsClicked)
    {
      r = 0;
      g = 0;
      b = 255;
    }
  }
  if(mouseX > buttonX + 60 && mouseX < buttonX + buttonXWidth + 60 && mouseY > buttonY && mouseY < buttonY + buttonYHeight)
  {
    if(proIsClicked)
    {
      r = 255;
      g = 231;
      b = 107;
    }
    if(normalIsClicked)
    {
      r = 255;
      g = 233;
      b = 0;
    }
  }
  if(mouseX > buttonX + 90 && mouseX < buttonX + buttonXWidth + 90 && mouseY > buttonY && mouseY < buttonY + buttonYHeight)
  {
    r = 255;
    g = 255;
    b = 255;
  }
  if(mouseX > buttonX + 120 && mouseX < buttonX + buttonXWidth + 120 && mouseY > buttonY && mouseY < buttonY + buttonYHeight)
  {
    //fun random colour
    r = random(0,255);
    g = random(0,255);
    b = random(0,255);
  }
  if(mouseX > 10 && mouseX < 110 && mouseY > 300 && mouseY < 330)
  {
    proIsClicked = true;
    normalIsClicked = false;
    proView(); //for current colour
  }
  if(mouseX > 160 && mouseX < 260 && mouseY > 300 && mouseY < 330)
  {
    proIsClicked = false;
    normalIsClicked = true;
    normView(); //for current colour
  }
}

/////////////////////////////////////////////////////////////////////

function keyPressed(){
  //CHANGE MODE
  if(keyCode === 49)
  {
    mode = 1;
  }
  if(keyCode === 50)
  {
    mode = 0;
  }
  if(keyCode === 51)
  {
    mode = 2;
  }
  if(keyCode === 52)
  {
    mode = 3;
  }
  //INCREASE OR DECREASE SPEED
  if(keyCode === 187 || keyCode === 107)
  {
    speed += 2;
  }
  if(keyCode === 189 || keyCode === 109)
  {
    speed -= 2;
  }
  //INCREASE OR DECREASE GRAVITY
  if(keyCode === UP_ARROW)
  {
    gravityInc += 0.2;
  }
    if(keyCode === DOWN_ARROW)
  {
    gravityInc -= 0.05;
  }
}

/////////////////////////////////////////////////////////////////////

//this function displays the UI
function UIdraw() {
  fill(100);
  rect(10,10,250,270);
  push();
  translate(0,20)
  fill(0);
  text("PRESS MOUSE BUTTON!",20,10);
  text("PRESS 1 for a heart",20,30);
  text("PRESS 2 for an explosion",20,50);
  text("PRESS 3 for a flower",20,70);
  text("PRESS 4 for a circle",20,90);
  stroke(255);
  fill(255,0,0);
  rect(buttonX,buttonY - 20,buttonXWidth,buttonYHeight);
  fill(0,0,255);
  rect(buttonX + 30,buttonY - 20,buttonXWidth,buttonYHeight);
  fill(255,233,0);
  rect(buttonX + 60,buttonY - 20,buttonXWidth,buttonYHeight);
  fill(255,255,255);
  rect(buttonX + 90,buttonY - 20,buttonXWidth,buttonYHeight);
  fill(255,255,255);
  rect(buttonX + 120,buttonY - 20,buttonXWidth,buttonYHeight);
  fill(0);
  noStroke();
  text("↑ USE these BUTTONS ↑",20,140);
  text("R means RANDOM",20,160);
  text("R",145,115);
  text("PRESS + or - to change the speed",20,190);
  text("You " + incOrNotSpeed() + " the speed by " + speed,20,210);
  text("PRESS UP and DOWN arrow for the gravity",20,230);
  text("You have " + incOrNotGrav() + " the gravity by " + gravityInc,20,250);
  pop();
  fill(100);
  rect(10,300,100,30);
  rect(160,300,100,30);
  fill(0);
  text("Protanopia view",15,318);
  text("Normal view",175,318)
}

/////////////////////////////////////////////////////////////////////

//function to display whether speed was increased or decreased
function incOrNotSpeed(){
  if(speed >= 0)
    {
      return "increased";
    }
  else
    {
      return "decreased";
    }
}

/////////////////////////////////////////////////////////////////////

//function to display whether gravity was increased or decreased
function incOrNotGrav(){
  if(gravityInc >= 0)
  {
    return "increased";
  }
  else
  {
    return "decreased";    
  }
}

/////////////////////////////////////////////////////////////////////

//this function changes the current colour to the colour blindness type
function proView(){
  if(r == 255 & g == 0 && b == 0)
  {
    r = 144;
    g = 129;
    b = 33;
  }
  if(r == 0 && g == 0 && b == 255)
  {
    r = 0;
    g = 74;
    b = 156;
  }
  if(r == 255 && g == 233 && b == 0)
  {
    r = 255;
    g = 231;
    b = 107;
  }
}

/////////////////////////////////////////////////////////////////////

//this function changes the current colour back to trichromacy colour
function normView(){
  if(r == 144 & g == 129 && b == 33)
  {
    r = 255;
    g = 0;
    b = 0;
  }
  if(r == 0 && g == 74 && b == 156)
  {
    r = 0;
    g = 0;
    b = 255;
  }
  if(r == 255 && g == 231 && b == 107)
  {
    r = 255;
    g = 233;
    b = 0;
  }
}