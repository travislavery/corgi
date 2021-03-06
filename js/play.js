var platforms;
var ground;
var corgi;
var leftArrow;
var rightArrow;
var downArrow;
var upArrow;
var growl;
var bark;
var yawn;
var eKey;
var qKey;
var fKey;
var pKey;
var distance;
var normalize;
var squirrel;
var squirrels;

var playState={
	create: function(){
		platforms = game.add.group();
		platforms.enableBody = true;
		var upperBound = platforms.create(0, 160, 'longPlat');
		upperBound.body.immovable=true;
		game.add.sprite(0, 0, 'backgroundPark');
		
		//ground = platforms.create(0, game.world.height - 1, 'ground')
		//ground.body.immovable = true;
		corgi = game.add.sprite(100, game.world.height-10, 'corgiChar');
		corgi.anchor.setTo(0.5,0.5);
		corgi.enableBody = true;
		corgi.inputEnabled = true;
		game.physics.arcade.enable(corgi);
		corgi.collideWorldBounds = true;
		//corgi.body.gravity.y = 300;
		corgi.body.bounce.y = 0.3;
		corgi.animations.add('down', [1,0,1,2], 10, true);
		corgi.animations.add('left', [5,4,5,6], 10, true);
		corgi.animations.add('right', [10,9,10,11], 10, true);
		corgi.animations.add('up', [13,12,13,14], 10, true);
		
		squirrels= game.add.group();
		squirrel= squirrels.create(100,100,'squirrel');
		squirrels.enableBody = true;
		
		
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
		//console.log(Math.floor(corgi.y) + ',' + Math.floor(corgi.x));//corgi.scale);
		distance = (corgi.y);
		movement();
		game.physics.arcade.collide(corgi, platforms);
		game.physics.arcade.collide(corgi, squirrels);

		//game.physics.arcade.overlap(redBubbles, redCeiling, popBubbleR, null, this);
		corgi.scale.set(distance/500);
		corgWrap(corgi);
		pKey.onDown.add(toPlatform, this);
		swapMap0(corgi);
		circleCorg();
	}		
}
function corgWrap(object) {
	if (object.body.x > 1280){
		object.body.x = -20;
	} else if (object.body.x < -20) {
		object.body.x = 1280;
	}
	if (object.body.y > 1203){
		object.body.y = 900;
	} 
}
function movement() {
	if (leftArrow.isDown) {
		corgi.body.velocity.x = -distance/.9;
		corgi.animations.play('left');
	} else if (rightArrow.isDown) {
		corgi.body.velocity.x = distance/.9;
		corgi.animations.play('right');
	} else if (upArrow.isDown) {
		corgi.body.velocity.y = -distance/.9;
		corgi.animations.play('up');
	} else if (downArrow.isDown) {
		corgi.body.velocity.y = distance/.9;
		corgi.animations.play('down');
	} else {
		corgi.body.velocity.x = 0;
		corgi.body.velocity.y = 1;
		corgi.animations.stop();
		corgi.frame = 1;
	}
}
function bark() {
	game.sound.play('bark');
	squirrelspawn();
}
function growl() {
	game.sound.play('growl');
	squirrel.animations.stop();
}
function yawn() {
	game.sound.play('yawn');
	corgi.animations.stop();
	corgi.frame=3;
	squirrelspawn();
}
function toPlatform() {
	this.game.state.start('flappyCorg');
}

function swapMap0(character) {
	if (character.x <= 200 && character.y <= 275) {
		this.game.state.start('platform');
	}
}
var killCount = 0;
var exists = false;
 function squirrelspawn() {
 	var randomX= Math.random();
 	if (randomX >= .5) {
 		randomX = 0;
 	} else {
 		randomX = 1300;
 	}
 	var randomY= Math.random()*650;
 	if (randomY < 250) {
 		randomY += 300;
 	}
 	squirrel = squirrels.create(randomX,randomY,'squirrel');
 	squirrel.anchor.setTo(0.5,0.5);

 	squirrel.animations.add('leftRun', [39,40,41], 10, true);
	squirrel.animations.add('rightRun', [32,33,34], 10, true);
	squirrel.enableBody=true;
	squirrel.inputEnabled=true;
 	game.physics.arcade.enable(squirrel);
 	if (randomX === 0) {
 		squirrel.animations.play('rightRun');
 		squirrel.body.velocity.x = 200;
	} else if (randomX === 1300) {
		squirrel.animations.play('leftRun');
		squirrel.body.velocity.x = -200;
	}
 	squirrel.scale.set(squirrel.y/250);
 	if (squirrels > 0){
 		exists = true;
 	} else {
 		exists = false;
 	}
 	squirrel.events.onInputDown.add(followNow, this);
 }
var corgFollowers = [];
function followNow(s) {
	corgFollowers.push(s);
	//s.y = corgi.y+50;
	//s.pivot.x = corgi.x;
	//s.pivot.y = corgi.y;
}

function circleCorg() {
	if (corgFollowers.length > 0) {
		for (var i = 0; i > corgFollowers.length; i++) {
			corgFollowers[i].rotation += 0.05;
		}
	}
}
