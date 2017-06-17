var loadState={
	preload: function() {
		var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
		game.load.image('backgroundPark', 'assets/maps/park.jpg');
		game.load.image('ground', 'assets/images/platform.png');
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