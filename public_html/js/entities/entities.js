// TODO

game.PaddleEntity = me.ObjectEntity.extend({
    init: function(x,y, settings)   {
        settings.image = "paddle";
        settings.spritewidth="48";
        settings.spriteheight="16";
        this.parent(x,y,settings);
        
        this.setVelocity(2,0);  // set x velocity and y velocity
        
        this.type = "paddle";  // sets the type of the function to paddle
        this.collidable = true; // gives this collidable properties.

    },
    update:function(){
        if(me.input.isKeyPressed("left")){ // if the ME notices the left key pressed do:
            this.vel.x -= this.accel.x*me.timer.tick;
        }
        else if (me.input.isKeyPressed("right")){ // if the ME notices the left key pressed do:
            this.vel.x += this.accel.x*me.timer.tick;
        }
        else{
            this.vel.x = 0;
        }
        this.updateMovement();
        
        
        if(this.vel.x !== 0){  // if velocity is non zero then return true ie. run this function.
            return true;
        }
    }  // runs everytimethe game is called (all the  time)
});

game.BallEntity=me.ObjectEntity.extend({
    init: function(x,y,settings){
        settings.image = "ball";
        settings.spritewidth = "16";
        settings.spriteheight = "16";
        this.parent(x,y,settings);
        
        this.setVelocity(2,2);
        this.vel.x += this.accel.x * me.timer.tick;
        this.vel.y += this.accel.y * me.timer.tick;
        
        this.previousVelocity = this.vel.clone();// record what the veolicity is before hit the wall
       
        
        this.collidable = true;
    },
 
    update: function () {
        var collision =  this.collide();// stores object that the ball has collided with; whatever the ball collides with is stored in the variable
                 // what do we do if it has a collisoin
        if (collision){ // check if collsion
          if(collision.type === "paddle"){
              this.vel.y *= -1;
              me.audio.play("paddle-sfx");
          }//then check what type of collsion that is   
         if(collision.type === "brick"){
              this.vel.y *= -1;
              game.data.score += 100;
              me.audio.play("paddle-sfx");
          
            }
        }
        
        collision = this.updateMovement();  // use to find what the velocity is  [what the velocity is after updating movement IS what's stored into collsion]
                                                // update movement returns a velocity 
        if(collision){
            if(this.vel.x === 0){
                alert("you hit the side wall");
                this.vel.x = -this.previousVelocity.x;// if velocity =0 ie it hit the wall then set it back to the neg of previous velocity
            }
            if(this.vel.y === 0){
                this.vel.y = -this.previousVelocity.y;//
            }
        }
        this.previousVelocity = this.vel.clone();// need to again clone the veolicty and store that as the new previous velocity
        
        return true;
    }
    
    });
    
game.BrickEntity=me.ObjectEntity.extend({
    init: function(x,y,settings){
        settings.image = "brick";
        settings.spritewidth = "32";
        settings.spriteheight = "16";
        this.parent(x,y,settings);
        
        this.type = "brick";
        this.collidable = true;
         
    },
      update:function () {}   
     
    });
    