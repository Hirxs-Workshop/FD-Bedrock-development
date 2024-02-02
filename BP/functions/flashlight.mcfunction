scoreboard objectives add flashlight dummy
scoreboard objectives add flashlighth dummy
scoreboard players add @a flashlight 0
scoreboard players add @a flashlighth 0
execute as @a[scores={flashlight=!0},hasitem={item=fb:flashlight,location=slot.weapon.mainhand}] positioned ~~1~ run function flashlight_light
execute as @a[scores={flashlight=!0},hasitem={item=fb:flashlight,location=slot.weapon.offhand}] positioned ~~1~ run function flashlight_light
scoreboard players set @a[scores={flashlight=!0},hasitem={item=fb:flashlight,location=slot.weapon.mainhand}, tag=horror_2] flashlighth 4
scoreboard players set @a[scores={flashlighth=0}, tag=horror_2] flashlight 0
scoreboard players add @a[scores={flashlight=!0},hasitem={item=fb:flashlight,location=slot.weapon.mainhand}] flashlight -1
scoreboard players add @a[scores={flashlight=!0},hasitem={item=fb:flashlight,location=slot.weapon.offhand}] flashlight -1
scoreboard players add @a[scores={flashlighth=!0}, tag=horror_2] flashlighth -1