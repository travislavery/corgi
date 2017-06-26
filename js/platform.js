var leftArrow;
var rightArrow;
var spaceKey;
var corgi;
var platforms;
var ground;
var caveLedge;
var background;
var enterCloud;
var hintCloud;
var mKey;

var platform={
	create: function() {
		background = game.add.tileSprite(0, 0, 3840, 2160, 'backgroundTiger');
		game.world.setBounds(0,0,3840, 2160);
		
		platforms = game.add.group();
		platforms.enableBody = true;
		ground = platforms.create(0, game.world.height - 10, 'longPlat');
		ground.body.immovable = true;
		game.add.sprite(250, 1875, 'directionSign')
		game.add.sprite(1500, 1650, 'wildBurrSign');
		caveLedge = platforms.create(2200, 500, 'cavePlat');
		caveLedge.zIndez = 1;
		caveLedge.body.setSize(350,5,0,50);
		//caveLedge.scale.setTo(0.5);
		var caveDoor = game.add.sprite(caveLedge.x+30, caveLedge.y-280, 'caveDoor'); 
		game.physics.arcade.enable(caveLedge);
		caveLedge.body.immovable = true;
		game.physics.arcade.enable(ground);
		enterCloud = game.add.sprite(-500,-500, 'enterCloud');
		hintCloud = game.add.sprite(-500,-500, 'hintCloud');
		corgi = game.add.sprite(100, game.world.height - 100, 'corgiChar');
		corgi.anchor.setTo(0.5,0.5);
		corgi.enableBody = true;
		corgi.inputEnabled = true;
		game.physics.arcade.enable(corgi);
		corgi.body.gravity.y = 600;
		corgi.body.collideWorldBounds= false;
		//corgi.body.bounce.y= .6;
		//corgi.body.collideWorldBounds= true;
		corgi.animations.add('down', [1,0,1,2], 10, true);
		corgi.animations.add('left', [5,4,5,6], 10, true);
		corgi.animations.add('right', [10,9,10,11], 10, true);
		corgi.animations.add('up', [13,12,13,14], 10, true);
		corgi.animations.add('jumpLeft', [7], 10, true);
		corgi.animations.add('jumpRight', [8], 10, true);
		corgi.animations.add('jumpStraight', [3], 10, true);
		
		mKey = this.input.keyboard.addKey(Phaser.Keyboard.M);
		leftArrow = this.input.keyboard.addKey(Phaser.Keyboard.A);
		rightArrow = this.input.keyboard.addKey(Phaser.Keyboard.D);
		spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	update: function() {
		console.log(corgi.y + ',' + corgi.x);
		game.camera.follow(corgi);
		game.physics.arcade.collide(corgi, platforms);
		movement2();
		swapMap1(corgi);
		intoCave(corgi);
		hints(corgi);
	},

	render: function() {
		
	}
}
var directionLR = 2;
function cloudSpawn() {
	var stand = objects.create((1200*Math.random()), game.world.height - (650 * Math.random()), 'cloud');
	stand.body.immovable = true;
}
function hints(object) {
	if (object.x > 3300 && object.y > 2000) {
		hintCloud.x = object.x +75;
		hintCloud.y = object.y -250;
	} else {
		hintCloud.x = -500;
		hintCloud.y = -500;
	}
}
function intoCave(object) {
	if (object.x > 2200 && object.y < 475 && object.x < 2550) {
		enterCloud.x = object.x + 75;
		enterCloud.y = object.y - 250;
		if (mKey.isDown) {
			game.state.start('play');
		}
	} else {
		enterCloud.x = -500;
		enterCloud.y = -500;
	}
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
		corgi.body.velocity.y = -800; 
	} else if (spaceKey.isDown) {
		corgi.body.velocity.y = -400;
	}
	if (corgi.body.touching.down === false) {
		if (directionLR === 1){
			corgi.frame = 7; //('jumpLeft');
		} else if (directionLR === 0) {
			corgi.frame = 8; //animations.play('jumpRight');
		} /*else if (corgi.body.velocity.x === 0);{
			corgi.frame = 3; //animations.play('jumpStraight');
		}*/
	}
}

function swapMap1(character) {
	if (character.x <= -20) {
		this.game.state.start('play');
	}
}