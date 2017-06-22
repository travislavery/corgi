var loadState={
	preload: function() {
		var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
		game.load.image('longPlat', 'assets/images/longPlatform.png');
		game.load.image('backgroundPark', 'assets/maps/park.jpg');
		game.load.image('backgroundTiger', 'assets/maps/tiger2.png');
		game.load.image('ground', 'assets/images/platform.png');
		game.load.image('cavePlat', 'assets/images/cavePlat.png');
		game.load.image('caveDoor', 'assets/images/caveDoor.png');
		game.load.image('enterCloud', 'assets/images/enterCloud.png');
		game.load.image('hintCloud', 'assets/images/hintCloud.png');
		game.load.image('wildBurrSign', 'assets/images/wildBurrSign.png');
		game.load.image('directionSign', 'assets/images/directionSign1.png');
		game.load.spritesheet('corgiChar','assets/sprites/corgi2.png',199.25,174.5);
		//game.load.audio('zeldaFTW', 'assets/music/lozow.mp3');
		game.load.audio('bark', 'assets/sounds/barkOod.mp3');
		game.load.audio('growl', 'assets/sounds/growlOod.mp3');
		game.load.audio('yawn', 'assets/sounds/yawnOod.mp3');

		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.PageAlignHorizontally = true;
		game.scale.PageAlignVertically = true;
		game.stage.backgroundColor = '#000000';

		
	},
	create: function(){
		game.state.start('title');
	}
}