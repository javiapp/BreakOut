game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
                
                // This Loads the level
                me.levelDirector.loadLevel("javimap1");
                
            
            
                var ball = new game.BallEntity(50,50,{});    
                me.game.add(ball,4); // the 4 is what layer we want the ballto appaear in                  
               
            
            // add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});
