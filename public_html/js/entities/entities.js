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
        
        this.collidable = true;
    },
 
    update:function () {
        var collision =  this.collide();// stores object that the ball has collided with; whatever the ball collides with is stored in the variable
        // what do we do if it has a collisoin
        if (collision){ // check if collsion
          if(collision.type === "paddle"){
              this.vel.y *= -1;
          }//then check what type of collsion that is   
        }
        
        this.updateMovement();
        return true;
    }
    
    });
    
game.BrickEntity=me.ObjectEntity.extend({
    init: function(x,y,settings){
        settings.image = "brick";
        settings.spritewidth = "32";
        settings.spriteheight = "16";
        this.parent(x,y,settings);
    },
  update:function () {}
    });
    