
ig.module('game.main').requires('impact.game', 'impact.font', 'game.entities.cube', 'game.entities.player').defines(function() {
  var MyGame;
  MyGame = ig.Game.extend({
    font: new ig.Font('media/04b03.font.png'),
    defaultVel: {
      x: 0,
      y: -10
    },
    numberOfCubesByLine: 8,
    init: function() {
      var x;
      ig.input.bind(ig.KEY.SPACE, 'swap_cubes');
      ig.input.bind(ig.KEY.ENTER, 'spawn_line');
      ig.input.bind(ig.KEY.UP_ARROW, 'up');
      ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
      ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
      ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
      this.cubes = [];
      for (x = 1; x <= 4; x++) {
        this.addLineOfCubes();
      }
      return this.player = this.spawnEntity(EntityPlayer, 100, 550);
    },
    update: function() {
      if (ig.input.pressed('spawn_line')) this.addLineOfCubes();
      return this.parent();
    },
    draw: function() {
      return this.parent();
    },
    addLineOfCubes: function() {
      var lastLineY, line, x;
      lastLineY = this.getLastLineY() + 50;
      line = (function() {
        var _ref, _results;
        _results = [];
        for (x = 0, _ref = this.numberOfCubesByLine * 50 - 50; x <= _ref; x += 50) {
          _results.push(this.spawnEntity(EntityCube, x, lastLineY, {}));
        }
        return _results;
      }).call(this);
      return this.cubes.push(line);
    },
    getLastLineY: function() {
      if (this.cubes.length) {
        return _(_(this.cubes).last()).last().pos.y;
      } else {
        return 500;
      }
    },
    getCube: function(grid_pos) {
      return this.cubes[grid_pos.y][grid_pos.x];
    },
    swapCubes: function(grid_pos) {
      var first_cube, second_cube;
      this.player.canMove = false;
      first_cube = this.getCube(grid_pos);
      second_cube = this.getCube({
        x: grid_pos.x + 1,
        y: grid_pos.y
      });
      this.cubes[grid_pos.y][grid_pos.x] = second_cube;
      this.cubes[grid_pos.y][grid_pos.x + 1] = first_cube;
      first_cube.move(0, second_cube.pos);
      return second_cube.move(1, first_cube.pos);
    }
  });
  return ig.main('#canvas', MyGame, 60, 400, 600, 1);
});
