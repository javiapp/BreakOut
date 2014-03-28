
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
if (!me.video.init("screen", 480, 320, true, 'auto')) {
    alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(debugPanel, "debug");
		});
	}

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

        // Enable they keyboard with this code
        me.input.bindKey(me.input.KEY.LEFT, "left");  // tells ME to use the bind key method to bind the left key ot the tag given :ie. "left"
        me.input.bindKey(me.input.KEY.RIGHT, "right");
	
        //Disable the Gravity
        me.sys.gravity = 0;
        
            
        // Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());

        // adding the paddle entity into the entityPool
        me.entityPool.add("paddle", game.PaddleEntity);  //first arg is have an image called "paddle" second is associate it with PaddleEneity  \\ also have to connect it
        me.entityPool.add("ball", game.BallEntity);
        me.entityPool.add("brick", game.BrickEntity);  // MUST 0. get the file 1. add entity to resouces, 2. create enityt in entities.js THEN 3. add it to the entityh pool in game.js
        
        
        // Start the game.
        me.state.change(me.state.PLAY);
	}
};
