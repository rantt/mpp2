var Actor = function(game, map, tilex, tiley, image, frame) {
  this.game = game;
  this.map = map;

  this.isMoving = false;

  Phaser.Sprite.call(this, this.game, tilex*32, tiley*32, image);
  this.frame = frame;


  this.marker = new Phaser.Point(tilex,tiley);

  this.game.physics.arcade.enable(this); // set up player physics

  this.body.fixedRotation = true; // no rotation
  this.body.moves = false;

  this.game.add.existing(this);

  this.direction = 'down';

};

Actor.prototype = Object.create(Phaser.Sprite.prototype);
Actor.prototype.moveTo = function(x,y) {
  if (this.isMoving || this.cantMove(x, y)) {return;}
  this.isMoving = true;

  this.game.add.tween(this).to({x: this.x + x*32, y: this.y + y*32}, 120, Phaser.Easing.Linear.None, true).onComplete.add(function() {
      this.marker.x += x;
      this.marker.y += y;
      this.isMoving = false;

    },this); 


};
Actor.prototype.cantMove = function(x,y) {
  if (this.inCombat) {return true;}

  var newx = this.marker.x + x;
  var newy = this.marker.y + y;

  var tile1 = this.map.getTile(newx, newy, 0); 

  //Block Moving onto a non-existent tile
  if (tile1 === null) {
    return true;
  }

  //Block Layer 1 Collisions
  if (this.map.getTile(newx, newy, 0).collideDown) {
    return true;
  }

};

Actor.prototype.constructor = Actor;
