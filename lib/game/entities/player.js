var EntityPlayer;

EntityPlayer = null;

ig.module('game.entities.player').requires('game.entities.moving', 'impact.timer').defines(function() {
  return EntityPlayer = EntityMoving.extend({
    size: {
      x: 100,
      y: 50
    },
    animSheet: new ig.AnimationSheet("media/player.png", 100, 50),
    init: function(x, y, settings) {
      this.addAnim('idle', 1, [0]);
      this.setDefaultVel();
      this.posGrid = {
        y: 0,
        x: 2
      };
      this.maxVel.x = this.maxVel.y = 1000;
      this.parent(x, y, settings);
      return this.canMove = true;
    },
    update: function() {
      if (this.movingToPos) {
        if (this.movingTimer.delta() >= 0) this.finishMoving();
      } else if (this.canMove) {
        if (ig.input.pressed('left')) {
          this.move(this.posGrid.x - 1, this.posGrid.y, -480, ig.game.defaultVel.y);
        }
        if (ig.input.pressed('right')) {
          this.move(this.posGrid.x + 1, this.posGrid.y, 480, ig.game.defaultVel.y);
        }
        if (ig.input.pressed('up')) {
          this.move(this.posGrid.x, this.posGrid.y - 1, 0, -490);
        }
        if (ig.input.pressed('down')) {
          this.move(this.posGrid.x, this.posGrid.y + 1, 0, 470);
        }
        if (ig.input.pressed('swap_cubes') && !this.isOutsideCube()) {
          ig.game.swapCubes(this.posGrid);
        }
      }
      return this.parent();
    },
    move: function(to_x, to_y, vel_x, vel_y) {
      this.movingToPos = {
        x: to_x,
        y: to_y
      };
      this.vel.x = vel_x;
      this.vel.y = vel_y;
      return this.movingTimer = new ig.Timer(0.1);
    },
    setPosToCubeAt: function(cube_pos_grid) {
      var cube_pos;
      cube_pos = ig.game.getCube(cube_pos_grid).pos;
      this.pos.x = cube_pos.x;
      return this.pos.y = cube_pos.y;
    },
    finishMoving: function() {
      this.setDefaultVel();
      this.posGrid.x = this.movingToPos.x;
      this.posGrid.y = this.movingToPos.y;
      if (!this.isOutsideCube()) this.setPosToCubeAt(this.movingToPos);
      return this.movingToPos = null;
    },
    isOutsideCube: function() {
      return this.posGrid.x < 0 || this.posGrid.x >= ig.game.numberOfCubesByLine || this.posGrid.y < 0 || this.posGrid.y >= ig.game.cubes.length;
    }
  });
});
