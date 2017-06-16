

var playState={
	create: function(){

		game.add.sprite(0, 0, 'backgroundPark');
		game.add.sprite(0, game.world.height - 238, 'ground')
		
		cursors = game.input.keyboard.createCursorKeys();
		game.input.mouse.capture = true;


		leftArrow = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		rightArrow = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		downArrow = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		upArrow = this.input.keyboard.addKey(Phaser.Keyboard.UP);
		right = game.input.activePointer.rightButton;
		left = game.input.activePointer.leftButton;
		spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	spaceKey.onDown.add(togglePause, this);
	},
	update: function(){
		
		game.physics.arcade.collide(star, platforms);
		game.physics.arcade.overlap(redBubbles, redCeiling, popBubbleR, null, this);
		
}


