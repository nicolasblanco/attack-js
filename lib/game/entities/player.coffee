EntityPlayer = null

ig.module( 
  'game.entities.player' 
)
.requires(
  'game.entities.moving'

  'impact.timer'
)
.defines ->
  EntityPlayer = EntityMoving.extend
    size: { x: 100, y: 50 }
    animSheet: new ig.AnimationSheet("media/player.png", 100, 50)

    init: (x, y, settings) ->
      @addAnim('idle', 1, [0])
      @setDefaultVel()
      @posGrid = { y: 0, x: 2 }
      @maxVel.x = @maxVel.y = 1000
      @parent(x, y, settings)
      @canMove = true
    
    update: ->
      if @movingToPos
        @finishMoving() if @movingTimer.delta() >= 0
      else if @canMove
        if ig.input.pressed('left')
          @move(@posGrid.x - 1, @posGrid.y, -480, ig.game.defaultVel.y)
        if ig.input.pressed('right')
          @move(@posGrid.x + 1, @posGrid.y, 480, ig.game.defaultVel.y)
        if ig.input.pressed('up')
          @move(@posGrid.x, @posGrid.y - 1, 0, -490)
        if ig.input.pressed('down')
          @move(@posGrid.x, @posGrid.y + 1, 0, 470)
        if ig.input.pressed('swap_cubes') and not @isOutsideCube()
          ig.game.swapCubes(@posGrid)

      @parent()
    
    move: (to_x, to_y, vel_x, vel_y) ->
      @movingToPos = { x: to_x, y: to_y }
      @vel.x = vel_x
      @vel.y = vel_y
      @movingTimer = new ig.Timer(0.1)

    setPosToCubeAt: (cube_pos_grid) ->
      cube_pos = ig.game.getCube(cube_pos_grid).pos
      @pos.x = cube_pos.x
      @pos.y = cube_pos.y

    finishMoving: ->
      @setDefaultVel()
      @posGrid.x = @movingToPos.x
      @posGrid.y = @movingToPos.y
      
      @setPosToCubeAt(@movingToPos) unless @isOutsideCube()
      @movingToPos = null

    isOutsideCube: ->
      @posGrid.x < 0 or @posGrid.x >= ig.game.numberOfCubesByLine or @posGrid.y < 0 or @posGrid.y >= ig.game.cubes.length
