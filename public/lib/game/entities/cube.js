var EntityCube;

EntityCube = null;

ig.module('game.entities.cube').requires('game.entities.moving').defines(function() {
  return EntityCube = EntityMoving.extend({
    availableColors: ["blue", "green", "pink", "red"],
    size: {
      x: 50,
      y: 50
    },
    init: function(x, y, settings) {
      if (settings.color) {
        this.color = settings.color;
      } else {
        this.color = this.getRandomColor();
      }
      this.maxVel.x = this.maxVel.y = 1000;
      this.animSheet = new ig.AnimationSheet("media/cube_" + this.color + ".png", 50, 50);
      this.addAnim('idle', 1, [0]);
      this.setDefaultVel();
      return this.parent(x, y, settings);
    },
    getRandomColor: function() {
      return this.availableColors.random();
    },
    update: function() {
      if (this.moveToPos != null) {
        if (this.movingTimer.delta() >= 0) {
          this.vel.x = 0;
          this.pos.x = this.moveToPos.x;
          this.moveToPos = null;
          ig.game.player.canMove = true;
        }
      }
      return this.parent();
    },
    move: function(direction, to_pos) {
      this.vel.x = direction === 1 ? -600 : 600;
      this.moveToPos = to_pos;
      return this.movingTimer = new ig.Timer(0.1);
    }
  });
});
