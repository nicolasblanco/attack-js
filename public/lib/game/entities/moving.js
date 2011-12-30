var EntityMoving;

EntityMoving = null;

ig.module('game.entities.moving').requires('impact.entity').defines(function() {
  return EntityMoving = ig.Entity.extend({
    setDefaultVel: function() {
      this.vel.x = ig.game.defaultVel.x;
      return this.vel.y = ig.game.defaultVel.y;
    }
  });
});
