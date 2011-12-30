ig.module( 
  'game.main' 
)
.requires(
  'impact.game'
  'impact.font'

  'game.entities.cube'
  'game.entities.player'
)
.defines ->

  MyGame = ig.Game.extend
  
    # Load a font
    font: new ig.Font('media/04b03.font.png')
    defaultVel: { x: 0, y: -10 }
    numberOfCubesByLine: 8
    init: ->
      # Initialize your game here; bind keys etc.
      ig.input.bind(ig.KEY.SPACE, 'swap_cubes')
      ig.input.bind(ig.KEY.ENTER, 'spawn_line')

      ig.input.bind(ig.KEY.UP_ARROW, 'up')
      ig.input.bind(ig.KEY.DOWN_ARROW, 'down')
      ig.input.bind(ig.KEY.LEFT_ARROW, 'left')
      ig.input.bind(ig.KEY.RIGHT_ARROW, 'right')

      @cubes = []
      
      for x in [1..4]
        @addLineOfCubes()
      
      @player = @spawnEntity(EntityPlayer, 100, 550)

    update: ->
      if (ig.input.pressed('spawn_line'))
        @addLineOfCubes()
      # Update all entities and backgroundMaps
      @parent()
    
      # Add your own, additional update code here
    draw: ->
      # Draw all entities and backgroundMaps
      @parent()
      # Add your own drawing code here

    addLineOfCubes: ->
      lastLineY = @getLastLineY() + 50
      line = for x in [0..@numberOfCubesByLine * 50 - 50] by 50
        @spawnEntity(EntityCube, x, lastLineY, {})

      @cubes.push(line)

    getLastLineY: ->
      if @cubes.length
        _(_(@cubes).last()).last().pos.y
      else
        500

    getCube: (grid_pos) ->
      @cubes[grid_pos.y][grid_pos.x]

    swapCubes: (grid_pos) ->
      @player.canMove = false
      first_cube  = @getCube(grid_pos)
      second_cube = @getCube({ x: grid_pos.x + 1, y: grid_pos.y })
      @cubes[grid_pos.y][grid_pos.x] = second_cube
      @cubes[grid_pos.y][grid_pos.x + 1] = first_cube
      first_cube.move(0, second_cube.pos)
      second_cube.move(1, first_cube.pos)

  ig.main('#canvas', MyGame, 60, 400, 600, 1)
