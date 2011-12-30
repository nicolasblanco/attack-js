EntityMoving = null

ig.module( 
  'game.entities.moving' 
)
.requires(
  'impact.entity'
)
.defines ->
  EntityMoving = ig.Entity.extend
    setDefaultVel: ->
      @vel.x = ig.game.defaultVel.x
      @vel.y = ig.game.defaultVel.y
