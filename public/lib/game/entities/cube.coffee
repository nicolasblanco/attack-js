EntityCube = null

ig.module( 
  'game.entities.cube' 
)
.requires(
  'game.entities.moving'
)
.defines ->
  EntityCube = EntityMoving.extend
    availableColors: ["blue", "green", "pink", "red"]
    size: { x: 50, y: 50 }

    init: (x, y, settings) ->
      if settings.color
        @color = settings.color
      else
        @color = @getRandomColor()

      @maxVel.x = @maxVel.y = 1000
      @animSheet = new ig.AnimationSheet("media/cube_#{@color}.png", 50, 50)
      @addAnim('idle', 1, [0])
      @setDefaultVel()

      @parent(x, y, settings)
    
    getRandomColor: ->
      @availableColors.random()

    update: ->
      if @moveToPos?
        if @movingTimer.delta() >= 0
          @vel.x = 0
          @pos.x = @moveToPos.x
          @moveToPos = null
          ig.game.player.canMove = true

      @parent()

    move: (direction, to_pos) ->
      @vel.x = if direction == 1 then -600 else 600
      @moveToPos = to_pos
      @movingTimer = new ig.Timer(0.1)
