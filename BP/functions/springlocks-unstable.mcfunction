## Springlock - Functions
execute as @e[type=player,hasitem={location=slot.armor.legs,item=fb:springlock_suit_legs_d,slot=0,quantity=1}] positioned ~~~ run function animation_springlock
execute as @e[hasitem=[{item=fb:springlock_suit_chest_d,location=slot.armor.chest},{item=fb:springlock_suit_legs_d,location=slot.armor.legs}]] positioned ~~~ run function animation_springlock_legs_chest
execute as @e[hasitem=[{item=fb:springlock_suit_chest_d,location=slot.armor.chest},{item=fb:springlock_suit_legs,location=slot.armor.legs}]] positioned ~~~ run function animation_springlock_legs_chest
execute as @e[hasitem=[{item=fb:springlock_suit_chest,location=slot.armor.chest},{item=fb:springlock_suit_legs_d,location=slot.armor.legs}]] positioned ~~~ run function animation_springlock_legs_chest

execute as @e[hasitem=[{item=fb:springlock_suit_head_d,location=slot.armor.head},{item=fb:springlock_suit_chest_d,location=slot.armor.chest},{item=fb:springlock_suit_legs_d,location=slot.armor.legs}]] positioned ~~~ run effect @s slowness 1 2 true



execute as @e[type=player,hasitem={location=slot.armor.legs,item=fb:springlock_suit_legs,slot=0,quantity=1}] run function animation_springlock
execute as @e[hasitem=[{item=fb:springlock_suit_chest,location=slot.armor.chest},{item=fb:springlock_suit_legs,location=slot.armor.legs}]] positioned ~~~ run function animation_springlock_legs_chest


execute as @e[hasitem=[{item=fb:springlock_suit_head,location=slot.armor.head},{item=fb:springlock_suit_chest,location=slot.armor.chest},{item=fb:springlock_suit_legs,location=slot.armor.legs}]] positioned ~~~ run effect @s slowness 1 2 true

##Enabled
execute as @e[type=player,hasitem={location=slot.armor.chest,item=fb:springlock_suit_failure_d,quantity=1}] positioned ~~~ run function springlock_failure

##Freddy Suit