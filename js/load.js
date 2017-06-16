var loadState={
	preload: function() {
		var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
		game.load.image('backgroundPark', 'assets/maps/park.jpg');
		game.load.image('ground', 'assets/images/platform.png');
		game.load.spritesheet('corgiChar','assets/sprites/corgi.png',250,218);
		game.load.audio('zeldaFTW', 'assets/music/lozow.mp3');

		game.scale.scaleMode = Phaser.Scale Manager.SHOW_ALL;
		game.scale.PageAlignHorizontally = true;
		game.scale.PageAlignVertically = true;
		game.stage.backgroundColor = '#000000';

		
	},
	create: function(){
		game.state.start('title');
	}
}