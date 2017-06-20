var leftArrow;
var rightArrow;
var spaceKey;
var corgi;
var platforms;
var ground;
var background;

var platform={
	create: function() {
		background = game.add.tileSprite(0, 0, 3840, 2160, 'backgroundTiger');
		game.world.setBounds(0,0,3840, 2160);
		
		platforms = game.add.group();
		platforms.enableBody = true;
		ground = platforms.create(0, game.world.height - 10, 'ground')
		ground.body.immovable = true;
		game.physics.arcade.enable(ground);
		corgi = game.add.sprite(100, game.world.height - 100, 'corgiChar');
		corgi.anchor.setTo(0.5,0.5);
		corgi.enableBody = true;
		corgi.inputEnabled = true;
		game.physics.arcade.enable(corgi);
		corgi.body.gravity.y = 400;
		//corgi.body.bounce.y= .6;
		//corgi.body.collideWorldBounds= true;
		corgi.animations.add('down', [1,0,1,2], 10, true);
		corgi.animations.add('left', [5,4,5,6], 10, true);
		corgi.animations.add('right', [10,9,10,11], 10, true);
		corgi.animations.add('up', [13,12,13,14], 10, true);
		corgi.animations.add('jumpLeft', [7], 10, true);
		corgi.animations.add('jumpRight', [8], 10, true);
		corgi.animations.add('jumpStraight', [3], 10, true);
		

		leftArrow = this.input.keyboard.addKey(Phaser.Keyboard.A);
		rightArrow = this.input.keyboard.addKey(Phaser.Keyboard.D);
		spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	update: function() {
		game.camera.follow(corgi);
		game.physics.arcade.collide(corgi, platforms);
		movement2();
	}
}
var directionLR = 2;
function cloudSpawn() {
	var stand = objects.create((1200*Math.random()), game.world.height - (650 * Math.random()), 'cloud');
	stand.body.immovable = true;
}
function movement2() {
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
			corgi.body.velocity.y = -300; 
		}
	if (corgi.body.touching.down === false) {
		console.log(corgi.body.velocity.x);
		if (corgi.body.velocity.x === -300){
			corgi.frame = 7; //('jumpLeft');
		} else if (corgi.body.velocity.x === 300) {
			corgi.frame = 8; //animations.play('jumpRight');
		} else if (corgi.body.velocity.x === 0);{
			corgi.frame = 3; //animations.play('jumpStraight');
		}
	}
}