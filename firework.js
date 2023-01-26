//this class will create the actual firework made of Particle
function Firework(x,y,speed) {
    //boolean to detect when the particle should explode
    this.explode = false;
    //array that will be filled with explosion particule
    this.explosionArr = [];
    //mode of explosion
    this.mode = 0;
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.speedY = speed;1
    //first particle of the firework 
    this.firework = new Particle(x,y,false,this.mode,255,233,0,this.speedY);
  
/////////////////////////////////////////////////////////////////////

    this.update = function() {
        //if its not exploded we make our one particle go up
        if(!this.explode)
        {
            this.firework.applyForce(gravity);
            this.firework.update();
            //when it reaches its explosion point we set to true and start the explosion
            if(this.firework.vel.y >= 0)
            {
                this.explode = true;
                this.explosion();
            }
        }
        for(let i = this.explosionArr.length - 1; i >= 0; i--)
        {
            //give movement to the explosion particles + gravity
            this.explosionArr[i].applyForce(gravity);
            this.explosionArr[i].update();
            if(this.explosionArr[i].finished())
            {
                this.explosionArr.splice(i,1);
            }
        }
    }

/////////////////////////////////////////////////////////////////////
  
    this.explosion = function() {
        for(let i = 0; i < 100; i++)
        {
            //to create explosion, we create a 100 particules
            var p = new Particle(this.firework.pos.x,this.firework.pos.y,true,this.mode,this.r,this.g,this.b, this.speedY);
            this.explosionArr.push(p);
        }
    }

/////////////////////////////////////////////////////////////////////
  
    //function to display firework
    this.show = function() {
        if(!this.explode)
        {
            this.firework.show();
        }
        for(let i = 0; i < this.explosionArr.length; i++)
        {
            this.explosionArr[i].show();
        }
    }
  
/////////////////////////////////////////////////////////////////////
    
    //setter function to set mode of firework
    this.setMode = function(mode){
        this.mode = mode;
    }
  
/////////////////////////////////////////////////////////////////////

    //setter function to set the colour
    this.setColor = function(r,g,b){
        this.r = r;
        this.g = g; 
        this.b = b;
    }
  
/////////////////////////////////////////////////////////////////////

    //this function checks whether or not the firework's array of particle is empty meaning it's finished
    this.finished = function() {
        if(this.explode && this.explosionArr.length === 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}