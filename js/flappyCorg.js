var hellSprite;

var flappyCorg={
	create: function(){

		hellSprite = game.add.tileSprite(0, 0, 1600, 1000, 'hell1');
		platforms = game.add.group();
		platforms.enableBody = true;
		//ground = platforms.create(0, game.world.height - 1, 'ground')
		//ground.body.immovable = true;

		corgi = game.add.sprite(200, game.world.centerY, 'corgiChar');
		corgi.anchor.setTo(0.5,0.5);
		corgi.enableBody = true;
		corgi.inputEnabled = true;
		corgi.input.start(0, true);
		game.physics.arcade.enable(corgi);
		corgi.collideWorldBounds = true;
		corgi.body.gravity.y = 600;
		corgi.animations.add('down', [1,0,1,2], 10, true);
		corgi.animations.add('left', [5,4,5,6], 10, true);
		corgi.animations.add('right', [10,9,10,11], 10, true);
		corgi.animations.add('up', [13,12,13,14], 10, true);
		game.camera.follow(corgi, Phaser.Camera.FOLLOW_TOPDOWN);
		
		cursors = game.input.keyboard.createCursorKeys();
		game.input.mouse.capture = true;
		leftArrow = this.input.keyboard.addKey(Phaser.Keyboard.A);
		rightArrow = this.input.keyboard.addKey(Phaser.Keyboard.D);
		downArrow = this.input.keyboard.addKey(Phaser.Keyboard.S);
		upArrow = this.input.keyboard.addKey(Phaser.Keyboard.W);
		eKey = this.input.keyboard.addKey(Phaser.Keyboard.E);
		qKey = this.input.keyboard.addKey(Phaser.Keyboard.Q);
		fKey = this.input.keyboard.addKey(Phaser.Keyboard.F);
		pKey = this.input.keyboard.addKey(Phaser.Keyboard.P);
		right = game.input.activePointer.rightButton;
		left = game.input.activePointer.leftButton;
		spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	qKey.onDown.add(bark, this);
    	eKey.onDown.add(growl, this);
    	fKey.onDown.add(yawn, this);
    	
	},
	update: function(){
		console.log(Math.floor(corgi.y) + ',' + Math.floor(corgi.x));
		if (corgi.x < 2500) {
			movement4();
		} else if (corgi.x > 2500) {
			movement3();
		}
		//game.physics.arcade.collide(corgi, platforms);
		//game.physics.arcade.overlap(redBubbles, redCeiling, popBubbleR, null, this);
		
	}		
}
function movement4(){
	corgi.body.velocity.x = 250;
	corgi.frame= 8;
	if (spaceKey.isDown) {
		corgi.body.velocity.y = -400;
	}
}

function movement3(){
	if (leftArrow.isDown) {
		corgi.body.velocity.x = -300;
		corgi.animations.play('left');
		directionLR = 1;
	} else if (rightArrow.isDown) {
		corgi.body.velocity.x = 300;
		corgi.animations.play('right');
		directionLR = 0;
	} else {
		corgi.body.velocity.x = 0;
		corgi.animations.stop();
		corgi.frame = 1;
	}
	if (spaceKey.isDown && corgi.body.touching.down) {
		corgi.body.velocity.y = -800; 
	} else if (spaceKey.isDown) {
		corgi.body.velocity.y = -400;
	}
}