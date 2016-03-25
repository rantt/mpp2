/*global Game*/

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */

// // Choose Random integer in a range
function rand (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// var musicOn = true;


var wKey;
var aKey;
var sKey;
var dKey;
var score = 0;
var fireRef;
var player;
var cursors;
var leftArrow;
var rightArrow;
var upArrow;
var downArrow;
var actors = {};


Game.Play = function(game) {
  this.game = game;
};

Game.Play.prototype = {
  init: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  },
  create: function() {
    this.game.world.setBounds(0, 0 ,Game.w ,Game.h);


    cursors = this.game.input.keyboard.createCursorKeys();
    // var myDataRef = new Firebase('https://tan6b7d70i7.firebaseio-demo.com/');

		FLOOR = 0;
		WALL = 1;
    
    var cave = "1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,0,1,1,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1\n\
0,1,1,1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1\n\
0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1\n\
0,0,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1\n\
0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1\n\
1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1\n\
1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
0,0,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
1,1,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n\
1,1,0,0,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1";

    // console.log(cave);
      game.load.tilemap('level', null, cave, Phaser.Tilemap.CSV );
      map = game.add.tilemap('level', 32, 32);
      map.addTilesetImage('tiles'); //use generated sheet

      layer = map.createLayer(0);

      map.setCollision(WALL); //Black Empty Space
      layer.resizeWorld();



    // fireRef.child("player/uid").on("value", function(player) {
    //   console.log(player);
    // });


		player = new Actor(this.game, map, 5, 5, 'hero', rand(0,6));

    player.uid = parseInt(JSON.parse(localStorage.getItem('atPlayer')));

    player.movements = function() {

        if (!this.tweening) {
          var position = {};

          if ( (cursors.left.isDown || leftArrow)) {
            this.moveTo(-1,0);
            this.direction = 'left';
            // fireRef.set({player: {direction: 'left', x: this.x, y: this.y, frame: this.frame,uid: this.uid}});
            position[player.uid] = {direction: this.direction, x: this.x, y: this.y, frame: this.frame,uid: this.uid}
            fireRef.set(position);
            // fireRef.push({player: {direction: 'left', x: this.x, y: this.y, frame: this.frame},uid: this.uid});
          }
          else if ( (cursors.right.isDown || rightArrow)) {
            this.moveTo(1,0);
            this.direction = 'right';
            // fireRef.set({player: {direction: 'right', x: this.x, y: this.y, frame: this.frame,uid: this.uid}});
            position[player.uid] = {direction: this.direction, x: this.x, y: this.y, frame: this.frame,uid: this.uid}
            fireRef.set(position);
          }
          else if ( (cursors.up.isDown || upArrow)) {
            this.moveTo(0,-1);
            this.direction = 'up';
            // fireRef.set({player: {direction: 'up', x: this.x, y: this.y, frame: this.frame, uid: this.uid}});
            position[player.uid] = {direction: this.direction, x: this.x, y: this.y, frame: this.frame,uid: this.uid}
            fireRef.set(position);
          }
          else if ( (cursors.down.isDown || downArrow)) {
            this.moveTo(0,1);
            this.direction = 'down';
            // fireRef.set({player: {direction: 'down', x: this.x, y: this.y, frame: this.frame, uid: this.uid}});
            position[player.uid] = {direction: this.direction, x: this.x, y: this.y, frame: this.frame,uid: this.uid}
            fireRef.set(position);
          }
        } 

    };

    fireRef.on('child_changed', function(snapshot) {
      var actor = snapshot.val();
      if (actor.uid !== player.uid) {
        if (actors[actor.uid] === undefined) {
          actors[actor.uid] = new Actor(game, map, actor.x, actor.y, 'hero', actor.frame);
        }else{ 
          actors[actor.uid].x = actor.x;
          actors[actor.uid].y = actor.y;

          if (actor.direction === 'left') {
            actors[actor.uid].moveTo(-1,0);
            // actors[actor.uid].animations.play('left'); 
          }else if (actor.direction === 'right') {
            actors[actor.uid].moveTo(1,0);
            // actors[actor.uid].animations.play('right'); 
          }else if (actor.direction === 'up') {
            actors[actor.uid].moveTo(0,-1);
            // actors[actor.uid].animations.play('up'); 
          }else if (actor.direction === 'down') {
            actors[actor.uid].moveTo(0,1);
            // actors[actor.uid].animations.play('down'); 
          }

        }
        // console.log(actor,player.uid);
      }
      // console.log(snapshot);
    //We'll fill this in later.
    });

    // // Music
    // this.music = this.game.add.sound('music');
    // this.music.volume = 0.5;
    // this.music.play('',0,1,true);

    //Setup WASD and extra keys
    wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    // muteKey = game.input.keyboard.addKey(Phaser.Keyboard.M);

    this.game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);

    this.loadTouchControls();

    //Create Twitter button as invisible, show during win condition to post highscore
    this.twitterButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200,'twitter', this.twitter, this);
    this.twitterButton.anchor.set(0.5);
    this.twitterButton.visible = false;
  },
  loadTouchControls: function() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      //Draw Arrow w/ Bitmap Data
      var bmdsize = 80;
      this.arrowbmd = this.game.add.bitmapData(bmdsize,bmdsize);
      this.arrowbmd.ctx.clearRect(0,0,bmdsize,bmdsize);
      this.arrowbmd.ctx.strokeStyle = 'white';
      this.arrowbmd.ctx.lineWidth = 2;
      this.arrowbmd.ctx.fill();
      this.arrowbmd.ctx.beginPath();
      this.arrowbmd.ctx.moveTo(bmdsize*1/2,0);
      this.arrowbmd.ctx.lineTo(0,bmdsize*1/2);
      this.arrowbmd.ctx.lineTo(bmdsize*1/4,bmdsize*1/2);
      this.arrowbmd.ctx.lineTo(bmdsize*1/4,bmdsize);
      this.arrowbmd.ctx.lineTo(bmdsize*3/4,bmdsize);
      this.arrowbmd.ctx.lineTo(bmdsize*3/4,bmdsize*1/2);
      this.arrowbmd.ctx.lineTo(bmdsize,bmdsize*1/2);
      this.arrowbmd.ctx.fill();

      //Add Touch Controls for mobile
      //Up Arrow
      this.upArrow = this.game.add.sprite(140, Game.h - 160, this.arrowbmd);
      this.upArrow.tint = 0xdcdcdc;
      this.upArrow.alpha = 0.5;
      this.upArrow.anchor.setTo(0.5, 0.5);
      this.upArrow.inputEnabled = true;
      this.upArrow.fixedToCamera = true;
      this.upArrow.events.onInputDown.add(function() {
        upArrow = true;
      },this);
      this.upArrow.events.onInputUp.add(function() {
        upArrow = false;
      },this);
      // this.upArrow.visible = false;

      //Up Down
      this.downArrow = this.game.add.sprite(140, Game.h - 40, this.arrowbmd);
      this.downArrow.tint = 0xdcdcdc;
      this.downArrow.alpha = 0.5;
      this.downArrow.anchor.setTo(0.5, 0.5);
      this.downArrow.inputEnabled = true;
      this.downArrow.angle = 180;
      this.downArrow.fixedToCamera = true;
      this.downArrow.events.onInputDown.add(function() {
        downArrow = true;
      },this);
      this.downArrow.events.onInputUp.add(function() {
        downArrow = false;
      },this);
      // this.downArrow.visible = false;

      //Up Left 
      this.leftArrow = this.game.add.sprite(60, Game.h - 100, this.arrowbmd);
      this.leftArrow.tint = 0xdcdcdc;
      this.leftArrow.alpha = 0.5;
      this.leftArrow.anchor.setTo(0.5, 0.5);
      this.leftArrow.inputEnabled = true;
      this.leftArrow.fixedToCamera = true;
      this.leftArrow.angle = -90;
      this.leftArrow.events.onInputDown.add(function() {
        leftArrow = true;
      },this);
      this.leftArrow.events.onInputUp.add(function() {
        leftArrow = false;
      },this);
      // this.leftArrow.visible = false;

      //Up Right 
      this.rightArrow = this.game.add.sprite(220, Game.h - 100, this.arrowbmd);
      this.rightArrow.tint = 0xdcdcdc;
      this.rightArrow.alpha = 0.5;
      this.rightArrow.anchor.setTo(0.5, 0.5);
      this.rightArrow.inputEnabled = true;
      this.rightArrow.angle = 90;
      this.rightArrow.fixedToCamera = true;
      this.rightArrow.events.onInputDown.add(function() {
        rightArrow = true;
      },this);
      this.rightArrow.events.onInputUp.add(function() {
        rightArrow = false;
      },this);
    }
  },
  update: function() {

    player.movements();

    // // Toggle Music
    // muteKey.onDown.add(this.toggleMute, this);

  },
  twitter: function() {
    //Popup twitter window to post highscore
    var game_url = 'http://www.divideby5.com/games/GAMETITLE/'; 
    var twitter_name = 'rantt_';
    var tags = ['1GAM'];

    window.open('http://twitter.com/share?text=My+best+score+is+'+score+'+playing+GAME+TITLE+See+if+you+can+beat+it.+at&via='+twitter_name+'&url='+game_url+'&hashtags='+tags.join(','), '_blank');
  },

  // toggleMute: function() {
  //   if (musicOn == true) {
  //     musicOn = false;
  //     this.music.volume = 0;
  //   }else {
  //     musicOn = true;
  //     this.music.volume = 0.5;
  //   }
  // },
  // render: function() {
  //   game.debug.text('Health: ' + tri.health, 32, 96);
  // }

};
