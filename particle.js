function Particle(x,y,explosion,mode,r,g,b,speed) {
    //particle variables
    this.x = x; 
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;
    this.speed = speed;
    this.pos = createVector(x, y);
    this.acc = createVector(0, 0);
    this.lifespan = 255;
  
    //MODES
    //when the particle exploded into a 100 particles
    if(explosion)
    {
      //the person can change the mode depending on what shape of fireworks he/she wants
      if(mode == 0) //mode 0 is a basic firework
      {
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(2, 10));
      }
      if(mode == 1) //mode 1 is a heart
      {
        const a = random(TWO_PI);
        const r = 15;
        const x = r * 16 * pow(sin(a),3);
        const y = -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
        this.vel = createVector(x,y);
        this.vel.mult(0.02);
      }
      if(mode == 2) //mode 2 is a flower
      {
        const a = random(TWO_PI);
        const r = 12 + sin(9 * a);
        const x = cos(a) * r;
        const y = sin(a) * r;
        this.vel = createVector(x,y);
        this.vel.mult(0.3);
      }
      if(mode == 3) //circle
      {
        this.vel = p5.Vector.random2D();
        this.vel.mult(4);
      }
    }
    else //this is for the first particle before the explosion
        //simple up velocity on the particle
    {
      this.vel = createVector(random(-0.5,0.5), random(-7 - this.speed,-17 - this.speed));
    }
  
/////////////////////////////////////////////////////////////////////
  
    //this function updates the position and lifespan of the particles 
    this.update = function() {
      this.vel.add(this.acc); //add acceleration to the velocity 
      this.pos.add(this.vel); //then add velocity to position of particle to move it 
      this.acc.mult(0); //we reset the acceleration
      if(explosion)
      {
        //we decrease the lifespan and velocity to make the particle fall slower once exploded
        this.lifespan -= 6;
        this.vel.mult(0.95);
      }
    }

/////////////////////////////////////////////////////////////////////
  
    //this function checks whether or not the particle's lifespan are below 0 meaning they are finished
    this.finished = function(){
      if(this.lifespan < 0)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  
/////////////////////////////////////////////////////////////////////

    //this function gives an effect of gravity to each particles
    this.applyForce = function(force) {
      this.acc.add(force);
    }
  
    //this function displays the particle
    this.show = function() {
      //if the particle is not exploded yet, we draw a trail
      if(!explosion)
      {
        for(let i = 0; i < 4; i++)
          {
            stroke(this.r,this.g,this.b,this.lifespan/(i+1));
            strokeWeight(5-i);
            point(this.pos.x, this.pos.y + (i * random(10,12)));
          }
      }

      stroke(this.r,this.g,this.b,this.lifespan);
      strokeWeight(5);
      point(this.pos.x, this.pos.y);
    }
  }