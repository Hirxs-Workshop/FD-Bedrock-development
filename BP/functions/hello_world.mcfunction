execute as @e[type=player,hasitem={location=slot.armor.head,item=fb:mask_freddy,quantity=1}] run effect @s slowness 2 1 true
execute as  @e[type=player,hasitem={location=slot.armor.head,item=fb:mask_freddy,quantity=1}] run title @s actionbar "Now you are protected!"
execute as @e[type=player,hasitem={location=slot.weapon.mainhand,item=fb:remover_tool,quantity=1}] run function remover_particles
execute as @e[type=player,hasitem={location=slot.weapon.mainhand,item=fb:rotate,quantity=1}] run function rotate_particles
execute as @a[hasitem={item=fb:flashlight,location=slot.weapon.mainhand}] run function flashlight_light